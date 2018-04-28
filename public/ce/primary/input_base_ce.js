class InputBaseCE extends CustomElement3 {

	constructor() {
		super();
		//this.parent;
	}

	// static get observedAttributes() {
	// 	return [ 'value', 'placeholder', 'year', 'sb' ];
	// }

	extend() {
		InputBaseCE.extend.call(this);
		this.extendBaseModel(this); //adds new methods to this.model
		this.extendBaseView(this, this.model); //adds new methods to this.view
		this.extendBaseCtrl(this, this.model, this.view); //adds new methods to this.ctrl
	}



	extendCtrl(that, model, view) {

		//init
		this.ctrl.run = function() {
			if (!h.boolean.isEmpty(that.value)) {
				let attribute = 'value';
				view.updateView(attribute, that.value);
			}
			if (!h.boolean.isEmpty(that.placeholder)) {
				let attribute = 'placeholder';
				view.updateView(attribute, that.placeholder);
			}
			if (!h.boolean.isEmpty(that.sb)) {
				that.ctrl.stream();
			}	
		};

		this.ctrl.addedUserAction = function(data, attribute) {
			return new Promise((resolve, reject) => {
			
				resolve({data: data, attribute: attribute});
			}
		)};


		//stream from element
		this.ctrl.stream = function() {
			const element$ = function(element) {
				return Rx.Observable.merge(Rx.Observable.of(element), Rx.Observable.fromEvent(element, 'blur').map(x => x.target), Rx.Observable.fromEvent(element, 'click').map(x => x.target), Rx.Observable.fromEvent(element, 'keyup').filter(x => x.keyCode == 13).map(x => x.target));
			};

			element$(that)
			.map(element => element.value)
			.subscribe(myRxmq.channel(that.sbChannel).behaviorsubject(that.sbSubject));
		};

		this.ctrl.changedAttribute = function(details) {
			myRxmq.channel(that.sbChannel).behaviorsubject(that.sbSubject).next(details.changedAttribute.newVal);
		};


		//local events initiated by parent


		//local events initiated by model


		//local events initiated by global stream
		this.ctrl.capitalize$ = function(e) {
			const combineLatest$ = function(...streams) {
				return Rx.Observable.combineLatest(streams);
			};
			combineLatest$(myRxmq.channel(e.detail[0]).behaviorobserve(e.detail[1]), myRxmq.channel(e.detail[0]).behaviorobserve('increase'))					
			.map(([e1, e2]) => [Number(e1), Number(e2)])
			.do(console.log)
			.subscribe((x) => {
				let year = that.year;
				let numYear = Number(year);
				let result = x[0] * Math.pow((x[1] + 1), numYear);
				let roundedResult = parseFloat(Math.round(result * 1000) / 1000).toFixed(3);
				that.value = roundedResult;
				let attribute = 'value';
				view.updateView(attribute, that.value);
			})
		}

		this.ctrl.copy$ = function(e) {
			myRxmq.channel(e.detail[0]).behaviorobserve(e.detail[1])
			.subscribe((x) => {
				that.value = x;
				let input = that.shadowRoot.querySelector('#input');
				let attribute = 'value';
				view.updateView(attribute, that.value);
			})
		}

		
	}

	extendView(that, model) {
		this.view.renderPlaceholder = function(obj) {
			that.shadowRoot.querySelector('#input').placeholder = obj;
		};

		this.view.renderValue = function(obj) {
			that.shadowRoot.querySelector('#input').value = obj;
		};

		this.view.updateView = function(attribute, data) {
			switch(attribute) {
				case 'value':
				that.view.renderValue.call(that, data);
				break;
				case 'placeholder':
				that.view.renderPlaceholder.call(that, data);
				break;
			}	
		};
	}

	extendModel(that) {
		let db = {};
		db.placeholder = "";
		db.value = "";
		db.sb = "";

		this.model.updateModelWithAttribute = function(attribute, newVal, parent) {
			let oldVal;
			that[attribute] = newVal;
			if (parent !== undefined) {
				that.parent = parent;
			}

			switch(attribute) {
				case 'value':
					oldVal = db.value;
					db.value = newVal;
					eventDispatcher(that.eventTarget, 'updatedmodel', {parent: that.parent, child: that, name: 'value', oldVal: oldVal, newVal: db.value});
					break;
				case 'placeholder':
					oldVal = db.placeholder;
					db.placeholder = newVal;
					eventDispatcher(that.eventTarget, 'updatedmodel', {parent: that.parent, child: that, name: 'placeholder', oldVal: oldVal, newVal: db.placeholder});
					break;
			} 	
		};

		this.model.get = function(attribute) {
			return db[attribute];
		};
	}
}

window.customElements.define('input-base-ce', InputBaseCE);

export { InputBaseCE };




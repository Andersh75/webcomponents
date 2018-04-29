class HeadlineBaseCE extends CustomElement3 {
	constructor() {
		super();
		//this.parent;
	}

	// static get observedAttributes() {
	// 	return [ 'title' ];
	// }

	extend() {
		HeadlineBaseCE.extend.call(this);
		this.extendBaseModel(this); //adds new methods to this.model
		this.extendBaseView(this, this.model); //adds new methods to this.view
		this.extendBaseCtrl(this, this.model, this.view); //adds new methods to this.ctrl
	}
	
	//Controller
	extendCtrl(that, model, view) {

		//init
		this.ctrl.run = function() {
			if (!h.boolean.isEmpty(that.title)) {
				let attribute = 'title';
				view.updateView(attribute, that.title);
			}
		};


		//stream from element
		this.ctrl.stream = function() {
			// const element$ = function(element) {
			// 	return Rx.Observable.merge(Rx.Observable.of(element), Rx.Observable.fromEvent(element, 'blur').map(x => x.target), Rx.Observable.fromEvent(element, 'click').map(x => x.target), Rx.Observable.fromEvent(element, 'keyup').filter(x => x.keyCode == 13).map(x => x.target));
			// };

			// element$(that)
			// .map(element => element.value)
			// .subscribe(myRxmq.channel(that.sbChannel).behaviorsubject(that.sbSubject));
		};

		this.ctrl.changedAttribute = function(details) {
			// console.log('changedAttribute');
			// console.log(details.changedAttribute);
			// myRxmq.channel(that.sbChannel).behaviorsubject(that.sbSubject).next(details.changedAttribute.newVal);
		};


		//local events initiated by parent


		//local events initiated by parent


		//local events initiated by global stream
		this.ctrl.capitalize$ = function(e) {
			const combineLatest$ = function(...streams) {
				return Rx.Observable.combineLatest(streams);
			};
			combineLatest$(myRxmq.channel(e.detail[0]).behaviorobserve(e.detail[1]), myRxmq.channel(e.detail[0]).behaviorobserve('increase'))					
			.map(([e1, e2]) => [Number(e1), Number(e2)])
			.subscribe((x) => {
				let year = that.year;
				let numYear = Number(year);
				let result = x[0] * Math.pow((x[1] + 1), numYear);
				let roundedResult = parseFloat(Math.round(result * 1000) / 1000).toFixed(3);
				that.title = roundedResult;
				let attribute = 'title';
				view.updateView(attribute, that.title);
			})
		}

		this.ctrl.copy$ = function(e) {
			myRxmq.channel(e.detail[0]).behaviorobserve(e.detail[1])
			.subscribe((x) => {
				that.title = x;
				let input = that.shadowRoot.querySelector('#input');
				let attribute = 'title';
				view.updateView(attribute, that.title);
			})
		}


	}


	//View
	//always passive
	extendView(that, model) {
		this.view.renderTitle = function(obj) {
			that.shadowRoot.querySelector('#headline').textContent = obj;
		};

		this.view.updateView = function(attribute, item) {
			switch(attribute) {
				case 'title':
				that.view.renderTitle.call(that, item);
				break;
			}	
		};
	}
	
	//Model
	extendModel(that) {
		let db = {};
		db.title = "";

		this.model.updateModelWithAttribute = function(attribute, newVal, parent) {
			let oldVal = {};

			if (parent !== undefined) {
				that.parent = parent;
			}

			switch(attribute) {
				case 'title':
					that[attribute] = newVal.title;
					oldVal.title = db.title;
					db.title = newVal.title;
					eventDispatcher(that.eventTarget, 'updatedmodel', {parent: that.parent, child: that, name: 'title', oldVal: oldVal, newVal: db});
					break;
				default:
					that[attribute] = newVal;
			} 	
		};

		this.model.get = function(attribute) {
			return db[attribute];
		};
	}
}

window.customElements.define('headline-base-ce', HeadlineBaseCE);

export { HeadlineBaseCE };
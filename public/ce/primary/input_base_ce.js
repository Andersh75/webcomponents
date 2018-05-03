class InputBaseCE extends CustomElement3 {

	constructor() {
		super();
	}

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
				that[attribute] = that.value;
			}
			if (!h.boolean.isEmpty(that.placeholder)) {
				let attribute = 'placeholder';
				that[attribute] = that.placeholder;
			}
		};

		this.ctrl.changedAttribute = function(changedAttribute) {
			let attribute = changedAttribute.attribute;

			if (attribute === "value") {
				that.ctrl.stream(that.value);	
			}
			let newVal = model.get(attribute);
			that.view.updateView(attribute, newVal);
		};

		this.ctrl.addedUserAction = function(data, attribute) {
			return new Promise((resolve, reject) => {
				resolve({data: data, attribute: attribute});
			});
		};


		//local events initiated by parent


		//local events initiated by model


		//local events initiated by global stream
		// this.ctrl.capitalize$ = function(e) {
		// 	const combineLatest$ = function(...streams) {
		// 		return Rx.Observable.combineLatest(streams);
		// 	};
		// 	combineLatest$(myRxmq.channel(e.detail[0]).behaviorobserve(e.detail[1]), myRxmq.channel(e.detail[0]).behaviorobserve('increase'))					
		// 	.map(([e1, e2]) => [Number(e1), Number(e2)])
		// 	.do(console.log)
		// 	.subscribe((x) => {
		// 		let year = that.year;
		// 		let numYear = Number(year);
		// 		let result = x[0] * Math.pow((x[1] + 1), numYear);
		// 		let roundedResult = parseFloat(Math.round(result * 1000) / 1000).toFixed(3);
		// 		that.value = roundedResult;
		// 		let attribute = 'value';
		// 		view.updateView(attribute, that.value);
		// 	})
		// }

		this.ctrl.capitalize$ = function(e) {
			console.log('CAPITALIZE');
			const combineLatest$ = function(...streams) {
				return Rx.Observable.combineLatest(streams);
			};
			combineLatest$(myRxmq.channel(e.detail[0]).behaviorobserve(e.detail[1]), myRxmq.channel('inflation').behaviorobserve('rate'))				
			.map(([e1, e2]) => [Number(e1), Number(e2)])
			.subscribe((x) => {
				let year = that.year;
				let numYear = Number(year);
				let result = x[0] * Math.pow((x[1] + 1), numYear);
				let roundedResult = parseFloat(Math.round(result * 1000) / 1000).toFixed(3);
				that.value = roundedResult;
			});
		};

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
		that.db.placeholder = "";
		that.db.value = "";
		that.db.sb = "";
	}
}

window.customElements.define('input-base-ce', InputBaseCE);

export { InputBaseCE };




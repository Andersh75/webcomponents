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



	extendCtrl(model, view) {

		//init
		this.ctrl.run = function () {
			if (!h.boolean.isEmpty(this.value)) {
				let attribute = 'value';
				this[attribute] = this.value;
			}
			if (!h.boolean.isEmpty(this.placeholder)) {
				let attribute = 'placeholder';
				this[attribute] = this.placeholder;
			}
		};

		this.ctrl.addedUserAction = function (data, attribute) {
			return new Promise((resolve, reject) => {
				resolve({
					data: data,
					attribute: attribute
				});
			});
		};


		//local events initiated by parent


		//local events initiated by model


		//local events initiated by global stream
		this.ctrl.capitalize$ = function (e) {
			console.log('HERE!!!');
			combineLatest$(myRxmq.channel(e.detail[0]).behaviorobserve(e.detail[1]), myRxmq.channel('inflation').behaviorobserve('rate'))
				.do(x => console.log('IN CAPITALIZE: ' + x))
				.map(([e1, e2]) => {
					try {
						return [e1.data, e2.data];
					} catch (error) {
						return [e1, e2];
					}
				})
				.map(([e1, e2]) => [Number(e1), Number(e2)])		
				.subscribe((x) => {
					let year = this.year;
					let numYear = Number(year);
					let result = x[0] * Math.pow((x[1] + 1), numYear);
					let roundedResult = parseFloat(Math.round(result * 1000) / 1000).toFixed(3);
					this.value = roundedResult;
				});
		};

		this.ctrl.copy$ = function (e) {
			combineLatest$(myRxmq.channel(e.detail[0]).behaviorobserve(e.detail[1]))
				.do(console.log)
				.subscribe((x) => {
					this.value = x.data;
					let attribute = 'value';
					view.updateView(attribute, this.value);
				});
		}


	}

	extendView(model) {
		this.view.renderPlaceholder = function (obj) {
			this.shadowRoot.querySelector('#input').placeholder = obj;
		};

		this.view.renderValue = function (obj) {
			this.shadowRoot.querySelector('#input').value = obj;
		};

		this.view.updateView = function (attribute, data) {
			switch (attribute) {
			case 'value':
				this.view.renderValue.call(this, data);
				break;
			case 'placeholder':
				this.view.renderPlaceholder.call(this, data);
				break;
			}
		};
	}

	extendModel() {

	}
}

const combineLatest$ = function (...streams) {
	return Rx.Observable.combineLatest(streams);
};

window.customElements.define('input-base-ce', InputBaseCE);

export {
	InputBaseCE
};
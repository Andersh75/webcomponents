import { CustomElement3 } from '/js/customelement3.js';

class HeadlineBaseCE extends CustomElement3 {

	constructor() {
		super();
	}

	extend() {
		HeadlineBaseCE.extend.call(this);
		this.extendBaseModel(this); //adds new methods to this.model
		this.extendBaseView(this, this.model); //adds new methods to this.view
		this.extendBaseCtrl(this, this.model, this.view); //adds new methods to this.ctrl
	}

	//Controller
	extendCtrl(model, view) { //eslint-disable-line

		//init
		this.ctrl.run = function () {
			if (!h.boolean.isEmpty(this.title)) {
				let attribute = 'title';
				this[attribute] = this.title;
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


		//local events initiated by parent


		//local events initiated by global stream
		this.ctrl.capitalize$ = function (e) {
			let capitalizer = e.detail[2].local.capitalizer;
			combineLatest$(myRxmq.channel(e.detail[0]).behaviorobserve(e.detail[1]), myRxmq.channel(capitalizer).behaviorobserve('rate'))
				.map(([x1, x2]) => {
					try {
						return [x1.data, x2.data];
					} catch (error) {
						return [x1, x2];
					}
				})
				.map(([e1, e2]) => [Number(e1), Number(e2)])		

				.subscribe((x) => {
					let year = this.year;
					let numYear = Number(year);
					let result = x[0] * Math.pow((x[1] + 1), numYear);
					let roundedResult = parseFloat(Math.round(result * 1000) / 1000).toFixed(0);
					if (h.boolean.isNumber(roundedResult)) {
						//this.title = Number(roundedResult).toLocaleString('sv');
						this.title = Number(roundedResult);
					}
				});
		};

		this.ctrl.initial$ = function (e) {
			if (e.detail[2].year == 0) {
				combineLatest$(myRxmq.channel(e.detail[0]).behaviorobserve(e.detail[1]))
					.map((x1) => {
						try {
							return x1[0].data;
						} catch (error) {
							return x1[0];
						}
					})
					.map((x1) => Number(x1))
					.subscribe((x) => {
						let result = x;
						let roundedResult = parseFloat(Math.round(result * 1000) / 1000).toFixed(0);
						if (h.boolean.isNumber(roundedResult)) {
							//this.title = Number(roundedResult).toLocaleString('sv');
							this.title = Number(roundedResult);
						}
					});
			} else {
				this.title = 0;
			}
			
		};

		this.ctrl.sum$ = function (e) {
			let testObj = {};
			myRxmq.channel(e.detail[0]).behaviorobserve('*')
				.map((x) => {
					try {
						return x.map(item => item.data);
					} catch (error) {
						return x;
					}
				})
				.map((x) => {
					try {
						return x.map(item => Number(item));
					} catch (error) {
						return x;
					}
				})
				.map((x) => {
					try {
						return x.reduce((acc, item) => acc + item);
					} catch (error) {
						return x;
					}
				})	
				.subscribe((x) => {
					let result = x;
					//let roundedResult = parseFloat(Math.round(result * 1000) / 1000).toFixed(3);
					this.title = result;
				});
		};

	}


	//View
	//always passive
	extendView(model) {
		this.view.renderTitle = function (obj) {
			//this.shadowRoot.querySelector('#headline').textContent = obj;

			let headline = this.shadowRoot.querySelector('#headline');

			const helloTemplate = (name) => this.html`${name}`;
 
			// Call the function with some data, and pass the result to render()


			//let separatedNumbers = Number(obj).toLocaleString('sv');
			
			// This renders <div>Hello Steve!</div> to the document body
			this.render(helloTemplate(obj), headline);
		};

		this.view.updateView = function (attribute, item) {
			switch (attribute) {
				case 'title':
					this.view.renderTitle.call(this, item);
					break;
			}
		};
	}

	//Model
	extendModel() {

	}
}

const combineLatest$ = function (...streams) {
	return Rx.Observable.combineLatest(streams);
};

window.customElements.define('headline-base-ce', HeadlineBaseCE);

export {
	HeadlineBaseCE
};
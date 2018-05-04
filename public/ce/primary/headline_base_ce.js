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
	extendCtrl(model, view) {  //eslint-disable-line

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
			console.log('e.detail in head');
			console.log(e.detail);
			let capitalizer = e.detail[2].capitalizer;
			console.log(capitalizer);
			combineLatest$(myRxmq.channel(e.detail[0]).behaviorobserve(e.detail[1]), myRxmq.channel(capitalizer).behaviorobserve('rate'))
				.map(([e1, e2]) => [Number(e1), Number(e2)])
				.subscribe((x) => {
					let year = this.year;
					let numYear = Number(year);
					let result = x[0] * Math.pow((x[1] + 1), numYear);
					let roundedResult = parseFloat(Math.round(result * 1000) / 1000).toFixed(0);
					if (h.boolean.isNumber(roundedResult)) {
						this.title = Number(roundedResult).toLocaleString('sv');
					}
				});
		};

		this.ctrl.initial$ = function (e) {
			combineLatest$(myRxmq.channel(e.detail[0]).behaviorobserve(e.detail[1]), myRxmq.channel('inflation').behaviorobserve('rate'))
				.map(([e1, e2]) => [Number(e1), Number(e2)])
				.subscribe((x) => {
					let year = this.year;
					let result = x[0] * Math.pow((x[1] + 1), 0);
					let roundedResult = parseFloat(Math.round(result * 1000) / 1000).toFixed(0);
					if (h.boolean.isNumber(roundedResult)) {
						this.title = Number(roundedResult).toLocaleString('sv');
					}
				});
		};

		this.ctrl.capitalizeownrepair$ = function (e) {
			combineLatest$(myRxmq.channel(e.detail[0]).behaviorobserve(e.detail[1]), myRxmq.channel('ownrepairpriceincrease').behaviorobserve('rate'))
				.map(([e1, e2]) => [Number(e1), Number(e2)])
				.subscribe((x) => {
					let year = this.year;
					let numYear = Number(year);
					let result = x[0] * Math.pow((x[1] + 1), numYear);
					let roundedResult = parseFloat(Math.round(result * 1000) / 1000).toFixed(0);
					if (h.boolean.isNumber(roundedResult)) {
						this.title = Number(roundedResult).toLocaleString('sv');
					}
				});
		};

		// this.ctrl.discount$ = function(e) { 
		// 	combineLatest$(myRxmq.channel(e.detail[0]).behaviorobserve(e.detail[1]), myRxmq.channel('discount').behaviorobserve('rate'))					
		// 	.map(([e1, e2]) => [Number(e1), Number(e2)])
		// 	.subscribe((x) => {
		// 		let year = this.year;
		// 		let numYear = Number(year);
		// 		let result = x[0] / Math.pow((x[1] + 1), numYear);
		// 		let roundedResult = parseFloat(Math.round(result * 1000) / 1000).toFixed(0);
		// 		this.title = Number(roundedResult).toLocaleString('sv');
		// 	})
		// }

	}


	//View
	//always passive
	extendView(model) {
		this.view.renderTitle = function (obj) {
			this.shadowRoot.querySelector('#headline').textContent = obj;
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
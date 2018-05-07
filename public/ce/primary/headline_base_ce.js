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
			// console.log('e in catitalize');
			// console.log(e);
			let capitalizer = e.detail[2].local.capitalizer;
			combineLatest$(myRxmq.channel(e.detail[0]).behaviorobserve(e.detail[1]), myRxmq.channel(capitalizer).behaviorobserve('rate'))
				// .do(console.log('do in capitalize1'))
				// .do(console.log)
				// .filter(([x1, x2]) => {
				// 	try {
				// 		if (x1.detail.hasOwnProperty('element')) {
				// 			if (e.detail[2].blacklist.element.indexOf(x1.detail.element) == -1) {
				// 				return true;
				// 			} else {
				// 				return false;
				// 			}
				// 		}
				// 	} catch (error) {
				// 		return false;
				// 	}
				// 	//return true;
				// })
					
				// .do(console.log(e))
				// .do(console.log(capitalizer))
				// .do(console.log('do in capitalize2'))
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


						//WHY RUNDGÅNG?????
					}
				});
		};

		this.ctrl.initial$ = function (e) {
			console.log('e in initial');
			console.log(e);
			if (e.detail[2].year == 0) {
				combineLatest$(myRxmq.channel(e.detail[0]).behaviorobserve(e.detail[1]))
					.do(console.log('in initial'))
					.do(console.log)
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
			}
			
		};

		this.ctrl.sum$ = function (e) {
			console.log('e in sum');
			console.log(e);
			let testObj = {};
			myRxmq.channel(e.detail[0]).behaviorobserve('*')
				.do(x => console.log('IN SUM: ' + x))
				.do(x => console.log(x))
				// .do(x => {
				// 	if (!testObj.hasOwnProperty(x[0].detail.subject)) {
				// 		testObj[x[0].detail.subject] = x[0].data;
				// 	}
				// })
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
					// let year = this.year;
					// let numYear = Number(year);
					console.log('x in sum');
					console.log(x);


					console.log(testObj);
					let result = x;
					//let roundedResult = parseFloat(Math.round(result * 1000) / 1000).toFixed(3);
					this.title = result;
				});
		};


		// this.ctrl.capitalizeownrepair$ = function (e) {
		// 	combineLatest$(myRxmq.channel(e.detail[0]).behaviorobserve(e.detail[1]), myRxmq.channel('ownrepairpriceincrease').behaviorobserve('rate'))
		// 		.map(([e1, e2]) => [Number(e1.data), Number(e2.data)])
		// 		.subscribe((x) => {
		// 			let year = this.year;
		// 			let numYear = Number(year);
		// 			let result = x[0] * Math.pow((x[1] + 1), numYear);
		// 			let roundedResult = parseFloat(Math.round(result * 1000) / 1000).toFixed(0);
		// 			if (h.boolean.isNumber(roundedResult)) {
		// 				this.title = Number(roundedResult).toLocaleString('sv');
		// 			}
		// 		});
		// };

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
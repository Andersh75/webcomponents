import { CustomElement3 } from '/js/customelement3.js';

class ChartBaseCE extends CustomElement3 {

	constructor() {
		super();
	}

	extend() {
		ChartBaseCE.extend.call(this);
		this.extendBaseModel(this); //adds new methods to this.model
		this.extendBaseView(this, this.model); //adds new methods to this.view
		this.extendBaseCtrl(this, this.model, this.view); //adds new methods to this.ctrl
	}

	//Controller
	extendCtrl(model, view) { //eslint-disable-line

		//init
		this.ctrl.run = function () {
			if (!h.boolean.isEmpty(this.chartdata)) {
				let attribute = 'chartdata';
				this[attribute] = this.chartdata;
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
		this.ctrl.renderchart$ = function (e) {
			var label = "hej";
			myRxmq.channel(e.detail[0]).behaviorsubject(e.detail[1])
				.filter(x => x !== undefined)				
				.map(x => x.data)
				.do(x => label = x.label)
				.map(x => x.data)
				.map(x => x.map(item => item.map(element => myRxmq.channel(element.channel).behaviorsubject(element.subject))))
				.map(x => x.map(item => Rx.Observable.combineLatest(item)))
				.mergeMap(x => Rx.Observable.combineLatest(x))
				.map(x => x.map(item => item.map(element => {
					if (element !== undefined && element !== null) {
						return element;
					} else {
						return undefined;
					}
				})))
				.filter(x => {
					let defined = true;
					x.forEach(y => {
						y.forEach(z => {

							if (z === undefined || z === null) {
								defined = false;
							} 
						});
					});
					return defined;
				})
				.subscribe(x => {
					let headline = this.shadowRoot.querySelector('#headline');
					
					let data = x.map(item => item.map(element => {
						if (element !== undefined && element !== null) {
							if (element.detail.hasOwnProperty('label')) {
								headline.title = element.detail.label;
							}
							return element.data;
						} else {
							return undefined;
						}
					}));

					//headline.title = 'hej';
					let obj = {};
					obj.data = data;
					obj.label = label;

					this.chartdata = JSON.stringify(obj);
				});
		};

	}


	//View
	//always passive
	extendView(model) {
		this.view.renderChartdata = function (obj) {
			let labelsArray = [];
			let lengthOfLablesArray = JSON.parse(obj).data[0].length;
			labelsArray = h.arr.seqArrayFromTo(JSON.parse(obj).label, (JSON.parse(obj).label + lengthOfLablesArray - 1));
			new Chartist.Line(this.shadowRoot.querySelector('.ct-chart'), {
				labels: labelsArray,
				series: JSON.parse(obj).data
			}, {
				fullWidth: true,
				chartPadding: {
					right: 40
				}
			});
		};

		this.view.updateView = function (attribute, item) {
			switch (attribute) {
				case 'chartdata':
					this.view.renderChartdata.call(this, item);
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

window.customElements.define('chart-base-ce', ChartBaseCE);

export {
	ChartBaseCE
};
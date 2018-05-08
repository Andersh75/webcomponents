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
			myRxmq.channel(e.detail[0]).behaviorsubject(e.detail[1])
				.filter(x => x !== undefined)
				.map(x => x.data)
				.map(x => x.map(item => item.map(element => myRxmq.channel(element.channel).behaviorsubject(element.subject))))
				.map(x => x.map(item => Rx.Observable.combineLatest(item)))
				.mergeMap(x => Rx.Observable.combineLatest(x))
				.map(x => x.map(item => item.map(element => {
					if (element !== undefined && element !== null) {
						return element.data;
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
					this.chartdata = JSON.stringify(x);
				});
		};

	}


	//View
	//always passive
	extendView(model) {
		this.view.renderChartdata = function (obj) {
			new Chartist.Line(this.shadowRoot.querySelector('.ct-chart'), {
				//labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
				series: JSON.parse(obj)
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
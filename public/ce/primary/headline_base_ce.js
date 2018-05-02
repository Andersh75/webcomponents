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
	extendCtrl(that, model, view) {

		//init
		this.ctrl.run = function() {
			if (!h.boolean.isEmpty(that.title)) {
				let attribute = 'title';
				that[attribute] = that.title;
			}

			if (!h.boolean.isEmpty(that.sr)) {
				let attribute = 'sr';
				that[attribute] = that.sr;
			}
		};

		this.ctrl.changedAttribute = function(changedAttribute) {
			let attribute = changedAttribute.attribute;

			if (attribute === "title") {
				that.ctrl.stream(that.title);	
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


		//local events initiated by parent


		//local events initiated by global stream
		this.ctrl.priceandcapitalize$ = function(e) {
			const combineLatest$ = function(...streams) {
				return Rx.Observable.combineLatest(streams);
			};

			combineLatest$(myRxmq.channel(e.detail[0]).behaviorobserve(e.detail[1]), myRxmq.channel(e.detail[0]).behaviorobserve('price'), myRxmq.channel('inflation').behaviorobserve('rate'))				
			.map(([e1, e2, e3]) => [Number(e1), Number(e2), Number(e3)])
			//.do(console.log)	
			.subscribe((x) => {
				let year = that.year;
				let numYear = Number(year);
				let result = x[0] * x[1] * Math.pow((x[2] + 1), numYear);
				let roundedResult = parseFloat(Math.round(result * 1000) / 1000).toFixed(3);
				if(h.boolean.isNumber(roundedResult)) {
					that.title = roundedResult;
				}	
			});
		};

		this.ctrl.discount$ = function(e) { 
			const combineLatest$ = function(...streams) {
				return Rx.Observable.combineLatest(streams);
			};

			combineLatest$(myRxmq.channel(e.detail[0]).behaviorobserve(e.detail[1]), myRxmq.channel('discount').behaviorobserve('rate'))					
			.map(([e1, e2]) => [Number(e1), Number(e2)])
			.subscribe((x) => {
				let year = that.year;
				let numYear = Number(year);
				let result = x[0] / Math.pow((x[1] + 1), numYear);
				let roundedResult = parseFloat(Math.round(result * 1000) / 1000).toFixed(3);
				that.title = roundedResult;
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
		that.db.title = "";
		that.db.sb = "";
	}
}

window.customElements.define('headline-base-ce', HeadlineBaseCE);

export { HeadlineBaseCE };
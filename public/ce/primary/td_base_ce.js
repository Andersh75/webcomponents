class TdBaseCE extends CustomElement3 {

	constructor() {
		super();
	}

	extend() {
		TdBaseCE.extend.call(this);
		this.extendBaseModel(this); //adds new methods to this.model
		this.extendBaseView(this, this.model); //adds new methods to this.view
		this.extendBaseCtrl(this, this.model, this.view); //adds new methods to this.ctrl
	}



	extendCtrl(that, model, view) {

		//init
		this.ctrl.run = function() {
			console.log('HERE');
			
			if (!h.boolean.isEmpty(that.value)) {
				let attribute = 'value';
				that[attribute] = that.value;
			}
		};

		this.ctrl.changedAttribute = function(changedAttribute) {
			let attribute = changedAttribute.attribute;

			if (attribute === "value") {
				console.log('CA VALUE');
				console.log(that.cells);
				let newVal = model.get(attribute);
				that.view.updateView(attribute, newVal);
			}
		};

		this.ctrl.addedUserAction = function(data, attribute) {
			return new Promise((resolve, reject) => {
				resolve({data: data, attribute: attribute});
			});
		};


		//local events initiated by parent


		//local events initiated by model


		//local events initiated by global stream
		this.ctrl.copy$ = function(e) {
			console.log('copy');
			console.log(e.detail);
			myRxmq.channel(e.detail[0]).behaviorobserve(e.detail[1])
			.subscribe((x) => {
				console.log('x');
				console.log(x);
				that.cell = x;
				let attribute = 'cell';
				view.updateView(attribute, that.cell);
			})
		}
	}

	extendView(that, model) {
		this.view.renderValue = function(obj) {

			that.shadowRoot.querySelector('#td').innerHTML = obj;
		};

		this.view.updateView = function(attribute, data) {
			switch(attribute) {
				case 'value':
				that.view.renderValue.call(that, data);
				break;
			}
		};
	}

	extendModel(that) {
		that.db.value = "";
		that.db.sb = "";
	}
}

window.customElements.define('td-base-ce', TdBaseCE);

export { TdBaseCE };




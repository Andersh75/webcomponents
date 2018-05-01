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
		};

		this.ctrl.changedAttribute = function(changedAttribute) {
			if (changedAttribute.attribute === "title") {
				that.ctrl.stream(that.title);	
			}	
		};

		this.ctrl.addedUserAction = function(data, attribute) {
			return new Promise((resolve, reject) => {
				resolve({data: data, attribute: attribute});
			});
		};


		//local events initiated by parent


		//local events initiated by parent


		//local events initiated by global stream


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
class HeadlineSelectBaseCE extends CustomElement3 {

	constructor() {
		super();		
	}

	extend() {
		HeadlineSelectBaseCE.extend.call(this);
		this.extendBaseModel(this); //adds new methods to this.model
		this.extendBaseView(this, this.model); //adds new methods to this.view
		this.extendBaseCtrl(this, this.model, this.view); //adds new methods to this.ctrl
	}

	extendCtrl(that, model, view) {

		//init
		this.ctrl.run = function() {
			let headline = that.shadowRoot.querySelector('#headline');
			let select = that.shadowRoot.querySelector('#select');

			if (headline !== null) {
				if (!h.boolean.isEmpty(that.title)) {
					eventDispatcher(headline.eventTarget, 'attributefromparent', {parent: that, attribute: 'title', data: that.title}); //Makes child component announce from headline component internally. The parent is attached in event e.details.
				}
			}

			if (select !== null) {
				if (!h.boolean.isEmpty(that.selectedindex)) {
					eventDispatcher(select.eventTarget, 'attributefromparent', {parent: that, attribute: 'selectedindex', data: that.selectedindex});
				}
			}		
		};

		this.ctrl.changedAttribute = function(details) {
			if (details.changedAttribute.name === "selectedvalue") {
				that.ctrl.stream(that.selectedvalue);	
			}	
		};

		this.ctrl.addedUserAction = function(data, attribute) {
			return new Promise((resolve, reject) => {
				resolve({data: data, attribute: attribute});
			});
		};


		//local events initiated by user


		//local events initiated by child

		//local events initiated by global stream

		//local events initiated by parent
		this.ctrl.clearallfromparent = function(e) {
			let select = that.shadowRoot.querySelector('#select');
			eventDispatcher(select.eventTarget, 'clearselffromparent', {parent: that, attribute: 'selectedindex', data: 0});
		};

	}
	
	//View
	extendView(that, model) {
		this.view.updateView = function(attribute, item) {
		};

	}
	
	//Model
	extendModel(that) {
		that.db.title = "";
		that.db.selectedindex = "0";
		that.db.selectedvalue = "";
		that.db.sb = "";
	}
}

window.customElements.define('headline-select-base-ce', HeadlineSelectBaseCE);

export { HeadlineSelectBaseCE };
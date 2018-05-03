class HeadlineAnyselectBaseCE extends CustomElement3 {

	constructor() {
		super();		
	}

	extend() {
		HeadlineAnyselectBaseCE.extend.call(this);
		this.extendBaseModel(this); //adds new methods to this.model
		this.extendBaseView(this, this.model); //adds new methods to this.view
		this.extendBaseCtrl(this, this.model, this.view); //adds new methods to this.ctrl
	}

	extendCtrl(model, view) {

		//init
		this.ctrl.run = function() {
			let headline = this.shadowRoot.querySelector('#headline');

			if (headline !== null) {
				if (!h.boolean.isEmpty(this.title)) {
					eventDispatcher(headline.eventTarget, 'attributefromparent', {parent: this, attribute: 'title', newVal: this.title}); //Makes child component announce from headline component internally. The parent is attached in event e.details.
				}
			}
		};

		this.ctrl.changedAttribute = function(changedAttribute) {
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
		// this.ctrl.clearallfromparent = function(e) {
		// 	let select = this.shadowRoot.querySelector('#select');
		// 	eventDispatcher(select.eventTarget, 'clearselffromparent', {parent: this, attribute: 'selectedindex', newVal: 0});
		// };

	}
	
	//View
	extendView(model) {
	}
	
	//Model
	extendModel() {
		this.db.title = "";
		this.db.sb = "";
	}
}

window.customElements.define('headline-anyselect-base-ce', HeadlineAnyselectBaseCE);

export { HeadlineAnyselectBaseCE };
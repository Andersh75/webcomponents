import { CustomElement3 } from '/js/customelement3.js';

class HeadlineAnyinputBaseCE extends CustomElement3 {

	constructor() {
		super();
	}

	extend() {
		HeadlineAnyinputBaseCE.extend.call(this);
		this.extendBaseModel(this); //adds new methods to this.model
		this.extendBaseView(this, this.model); //adds new methods to this.view
		this.extendBaseCtrl(this, this.model, this.view); //adds new methods to this.ctrl
	}

	//extends this.ctrl in CustomElement
	extendCtrl(model, view) {
		
		//intit
		this.ctrl.run = function() {
			let headline = this.shadowRoot.querySelector('#headline');
			let input = this.shadowRoot.querySelector('#input');

			if (headline !== null) {
				if (!h.boolean.isEmpty(this.title)) {
					this.eventDispatcher(headline.eventTarget, 'attributefromparent', {parent: this, attribute: 'title', newVal: this.title}); //Makes child component announce from headline component internally. The parent is attached in event e.details.
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

		//local events initiated by child


		//local events initiated by global stream
				
			
		//local events initiated by parent
		// this.ctrl.clearallfromparent = function(e) {
		// 	let input = this.shadowRoot.querySelector('#input');
		// 	eventDispatcher(input.eventTarget, 'clearselffromparent', {parent: this, attribute: 'value', newVal: ""});
		// };
		
		
	}

	//extends this.view in CustomElement
	extendView(model) {

	}

	//extends this.model from CustomElement
	extendModel() {
		this.db.title = "";
		this.db.sb = "";	
	}
	
	
}

window.customElements.define('headline-anyinput-base-ce', HeadlineAnyinputBaseCE);

export { HeadlineAnyinputBaseCE };

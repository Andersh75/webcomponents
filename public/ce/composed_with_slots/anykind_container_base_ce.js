import { CustomElement3 } from '/js/customelement3.js';

class AnykindContainerBaseCE extends CustomElement3 {

	constructor() {
		super();
		//this.parent;
	}

	// static get observedAttributes() {
	// 	return [];
	// }

	extend() {
		AnykindContainerBaseCE.extend.call(this);
		this.extendBaseModel(this); //adds new methods to this.model
		this.extendBaseView(this, this.model); //adds new methods to this.view
		this.extendBaseCtrl(this, this.model, this.view); //adds new methods to this.ctrl
	}

	extendCtrl(model, view) {
		//local
		this.ctrl.run = function() {
		};

		//parent
		this.ctrl.clearAnyformsFromParent = function(e) {
			let anyform = this.shadowRoot.querySelector('#anyform');
			Array.prototype.slice.call(anyform.assignedNodes()).forEach(node => {
				eventDispatcher(node.eventTarget, 'clearallfromparent');
			})
		};
	}

			
	extendView(model) {

	}

	extendModel() {
		
	}
}

window.customElements.define('anykind-container-base-ce', AnykindContainerBaseCE);

export { AnykindContainerBaseCE };
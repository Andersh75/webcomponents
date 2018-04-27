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

	extendCtrl(that, model, view) {
		//local
		this.ctrl.run = function() {
		};

		//parent
		this.ctrl.clearAnyformsFromParent = function(e) {
			let anyform = that.shadowRoot.querySelector('#anyform');
			Array.prototype.slice.call(anyform.assignedNodes()).forEach(node => {
				eventDispatcher(node.eventTarget, 'clearallfromparent');
			})
		};
	}

			
	extendView(that, model) {

	}

	extendModel(that) {
		
	}
}

window.customElements.define('anykind-container-base-ce', AnykindContainerBaseCE);

export { AnykindContainerBaseCE };
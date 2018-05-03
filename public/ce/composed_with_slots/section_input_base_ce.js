class SectionInputBaseCE extends CustomElement3 {

	constructor() {
		super();
		//this.parent;
	}

	// static get observedAttributes() {
	// 	return [];
	// }

	extend() {
		SectionInputBaseCE.extend.call(this);
		this.extendBaseModel(this); //adds new methods to this.model
		this.extendBaseView(this, this.model); //adds new methods to this.view
		this.extendBaseCtrl(this, this.model, this.view); //adds new methods to this.ctrl
	}

	extendCtrl(model, view) {
		//local
		this.ctrl.run = function() {
			//alert('base');
		};

		//initiated by remote event
		this.ctrl.clearAnykindContainers = function() {
			let anycontainer = this.shadowRoot.querySelector('#anycontainer');
			Array.prototype.slice.call(anycontainer.assignedNodes()).forEach(node => {
				eventDispatcher(node.eventTarget, 'clearanyformsfromparent');
			})
		}
	}
	
	extendView(model) {

	}

	extendModel() {
		
	}

}

window.customElements.define('section-input-base-ce', SectionInputBaseCE);

export { SectionInputBaseCE };

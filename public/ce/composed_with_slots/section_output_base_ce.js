import { CustomElement3 } from '/js/customelement3.js';

class SectionOutputBaseCE extends CustomElement3 {

	constructor() {
		super();
		//this.parent;
	}

	// static get observedAttributes() {
	// 	return [];
	// }

	extend() {
		SectionOutputBaseCE.extend.call(this);
		this.extendBaseModel(this); //adds new methods to this.model
		this.extendBaseView(this, this.model); //adds new methods to this.view
		this.extendBaseCtrl(this, this.model, this.view); //adds new methods to this.ctrl
	}

	extendCtrl(model, view) {
		//local
		this.ctrl.run = function() {
		};

		//global
		this.ctrl.clearsection = function() {
			alert('wrong!');
		}

		//stream from element
		this.ctrl.stream = function() {
			alert('wrong!');
		};

		this.ctrl.changedAttribute = function(details) {
			alert('wrong!');
		};
	}

	extendView(model) {
		
	}		

	extendModel() {
		
	}
}

window.customElements.define('section-output-base-ce', SectionOutputBaseCE);

export { SectionOutputBaseCE };
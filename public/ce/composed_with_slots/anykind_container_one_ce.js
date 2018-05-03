import { AnykindContainerBaseCE } from '/ce/composed_with_slots/anykind_container_base_ce.js';

const tpl = window.document.createElement("template");
tpl.innerHTML = `
<link rel="stylesheet" href="//cdn.jsdelivr.net/chartist.js/latest/chartist.min.css">
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">

<style>
		:host {
			display: grid;
			grid-template-columns: auto;
			  grid-template-rows: auto;
			grid-gap: 20px;
			padding-top: 20px;
			padding-bottom: 20px;
			padding-left: 40px;
			padding-right: 40px;
			background-color: 
		}
					
		#headline::slotted(*) {
			color: green;
			grid-column-start: auto;
			  grid-column-end: auto;
			  grid-row-start: 1;
			  grid-row-end: 1;
		}

		#anyform::slotted(*) {
			color: green;
			grid-column-start: auto;
			  grid-column-end: auto;
			  grid-row-start: 2;
			  grid-row-end: 2;
		}

		#anytable::slotted(*) {
			color: green;
			//background-color: white;
			grid-column-start: auto;
			  grid-column-end: auto;
			  grid-row-start: 2;
			  grid-row-end: 2;
		}

		</style>
		<slot name="headline" id="headline"></slot>
		<slot name="anytable" id="anytable"></slot>
		<slot name="anyform" id="anyform"></slot>
`;

class AnykindContainerOneCE extends AnykindContainerBaseCE {

	constructor() {
		super();
		this.tpl = tpl;
		this.extend();
	}

	static get observedAttributes() {
		return [];
	}
		
	extendBaseCtrl(that, model, view) {
		//local

	}
	
	extendBaseView(that, model) {

	}

	extendBaseModel(that) {
		
	}
}

window.customElements.define('anykind-container-one-ce', AnykindContainerOneCE);
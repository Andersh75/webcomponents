import { AnykindContainerBaseCE } from '/ce/composed_with_slots/anykind_container_base_ce.js';

const tpl = window.document.createElement("template");
tpl.innerHTML = `
<link rel="stylesheet" href="//cdn.jsdelivr.net/chartist.js/latest/chartist.min.css">
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">

<style>
		:host {
			display: grid;
			grid-template-rows: 48px 1fr;
			grid-template-areas: 
			'header'
			'body';
		}
					
		#headline::slotted(*) {
			color: green;
			grid-area: header;
			height: 24px;
		}

		#tablecontainer {
			//display: none;
			background-color: var(--main-bg-color, azure);
			grid-area: body;
		}
		
		// @media (min-width: 1480px) {
		// #tablecontainer {
		// 	display: grid;
		// 	background-color: var(--main-bg-color, azure);
		// 	grid-area: body;
		// }

		#anytable::slotted(*) {
			color: green;
			display: block;
		}
	}

		</style>
		<slot name="headline" id="headline"></slot>
		<div id="tablecontainer">
			<slot name="anytable" id="anytable"></slot>
		</div>
`;

class AnykindContainerVCE extends AnykindContainerBaseCE {

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

window.customElements.define('anykind-container-v-ce', AnykindContainerVCE);
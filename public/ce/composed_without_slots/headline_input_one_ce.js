import { HeadlineInputBaseCE } from '/ce/composed_without_slots/headline_input_base_ce.js';
	// Low level component with no children.
	// No slots.
	// Included ce-components: headline-ce, input-ce.
	// Id pattern: same as component.
	// Sections in controller: init, local, global, child, parent.

const tpl = window.document.createElement("template");
tpl.innerHTML = `
	<link rel="stylesheet" href="//cdn.jsdelivr.net/chartist.js/latest/chartist.min.css">
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">

	<style>
		:host {
			display: inline-grid;
			grid-template-columns: auto;
			grid-template-rows: 20px auto 20px auto 20px auto 20px;
			background-color: beige
		}
		
		#headline {
			color: green;
			grid-column-start: 1;
			grid-column-end: 1;
			grid-row-start: 2;
			grid-row-end: 2;
		}

		#input {
			color: green;
			grid-column-start: 1;
			grid-column-end: 1;
			grid-row-start: 4;
			grid-row-end: 4;
		}

		/* #anyinput::slotted(*) {
			color: green;
			grid-column-start: 1;
			grid-column-end: 1;
			grid-row-start: 6;
			grid-row-end: 6;
		} */

	</style>

	<headline-one-ce id="headline" title class="h5"></headline-one-ce>
	<input-one-ce id="input" sb="" placeholder value></input-one-ce>
`;

class HeadlineInputOneCE extends HeadlineInputBaseCE {

	constructor() {
		super();
		this.tpl = tpl;
		this.parent;
		this.extend();
		this.extendBase();
	}

	static get observedAttributes() {
		return [ 'title', 'placeholder', 'value' ];
	}

	//Controller
	extendCtrl(that, model, view) {
	}


	//View
	//always passive
	extendView(that, model) {
		
	}
	
	
}

window.customElements.define('headline-input-one-ce', HeadlineInputOneCE);

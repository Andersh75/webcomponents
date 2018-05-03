import { SectionInputBaseCE } from '/ce/composed_with_slots/section_input_base_ce.js';

const tpl = window.document.createElement("template");
tpl.innerHTML = `
<link rel="stylesheet" href="//cdn.jsdelivr.net/chartist.js/latest/chartist.min.css">
<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css" integrity="sha384-9gVQ4dYFwwWSjIDZnLEWnxCjeSWFphJiwGPXr1jddIhOegiu1FwO5qRGvFXOdJZ4" crossorigin="anonymous">
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/js/bootstrap.min.js" integrity="sha384-uefMccjFJAIv6A+rW+L4AHf99KvxDjWSu1z9VI8SKNVmz4sk7buKt/6v9KI65qnm" crossorigin="anonymous"></script>

<style>
		:host {
			display: grid;
			padding: 100px;
			padding-top: 60px;
			padding-bottom: 20px;
			grid-template-columns: auto;
			  grid-template-rows: auto;
			grid-column-gap: 20px;
			grid-row-gap: 20px;
			background-color: var(--main-bg-color, azure);
		}
		
		/* :host([color="blue"]) ::slotted(h1) {
			color: yellow;
		}

		:host([color="blue"]) ::slotted([data-test]) {
			color: red;
		}

		:host([color="blue"]) ::slotted(headline-ce) {
			color: green;
		} */

		#anyheadline::slotted(*) {
			padding-left:40px;
			color: green;
			grid-column-start: 1;
			  grid-column-end: 1;
			  grid-row-start: 1;
			  grid-row-end: 1;
		}

		#anybutton::slotted(*) {
			justify-self:end;
			grid-column: 5;
			  grid-row-start: 1;
			  grid-row-end: 1;
		}

		#inflationcontainer::slotted(*) {
			color: green;
			grid-column-start: auto;
			  grid-column-end: auto;
			  grid-row-start: 2;
			  grid-row-end: 2;
		}

		#periodcontainer::slotted(*) {
			color: green;
			grid-column-start: auto;
			  grid-column-end: auto;
			  grid-row-start: 2;
			  grid-row-end: 2;
		}

		#heatcontainer::slotted(*) {
			color: green;
			grid-column-start: auto;
			  grid-column-end: auto;
			  grid-row-start: 2;
			  grid-row-end: 2;
		}

		#anycontainer::slotted(*) {
			color: green;
			grid-column-start: auto;
			  grid-column-end: auto;
			  grid-row-start: 2;
			  grid-row-end: 2;
		}

		</style>

		<slot id="anyheadline" name="anyheadline"></slot>
		<slot id="anybutton" name="anybutton"></slot>
		<slot id="anycontainer" name="anycontainer"></slot>

		
`;


class SectionInputOneCE extends SectionInputBaseCE {

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

window.customElements.define('section-input-one-ce', SectionInputOneCE);

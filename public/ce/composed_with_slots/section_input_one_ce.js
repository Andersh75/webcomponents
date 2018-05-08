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
			background-color: var(--main-bg-color, azure);


			grid-template-areas: 
			'header'
			'body';
			grid-template-columns: 1fr;
			grid-template-rows: auto;
			grid-column-gap: 20px;
			grid-row-gap: 20px;
			
		}

		#container {
			display: grid;
			//padding: 100px;
			// padding-top: 60px;
			// padding-bottom: 20px;
			background-color: var(--main-bg-color, azure);

			grid-area: body;
			grid-template-columns: repeat(2, minmax(300px, 1fr));

			grid-column-gap: 20px;
			grid-row-gap: 20px;	
		}

		/* For large screens */
		@media (min-width: 1200px) {
			#container {
				display: grid;
				//padding: 100px;
				// padding-top: 60px;
				// padding-bottom: 20px;
				background-color: var(--main-bg-color, azure);

				grid-area: body;
				grid-template-columns: repeat(3, minmax(300px, 1fr));

				grid-column-gap: 20px;
				grid-row-gap: 20px;	
			}
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

			// grid-column-start: 1;
			//   grid-column-end: 1;
			//grid-row-start: 1;
			//   grid-row-end: 1;

			grid-area: header;
		}

		// #anybutton::slotted(*) {
		// 	justify-self:end;
		// 	grid-column: 5;
		// 	  grid-row-start: 1;
		// 	  grid-row-end: 1;
		// }

		#anycontainer::slotted(*) {
			color: green;
			// grid-column-start: auto;
			//   grid-column-end: auto;
			//grid-row-start: 2;
			//   grid-row-end: 2;
			grid-row-start: > 1;
		}

		</style>



		
		<slot id="anyheadline" name="anyheadline"></slot>
		<div id="container">
			<slot id="anycontainer" name="anycontainer"></slot>
		</div>
		<slot id="anybutton" name="anybutton"></slot>


		
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

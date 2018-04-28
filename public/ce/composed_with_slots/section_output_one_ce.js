import { SectionOutputBaseCE } from '/ce/composed_with_slots/section_output_base_ce.js';

const tpl = window.document.createElement("template");
tpl.innerHTML = `
<link rel="stylesheet" href="//cdn.jsdelivr.net/chartist.js/latest/chartist.min.css">
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">

	<style>
			:host {
				display: grid;
				padding: 40px;
				padding-top: 60px;
				background-color: azure;
				grid-template-columns: 100%;
  				grid-template-rows: auto;
				grid-column-gap: 20px;
				grid-row-gap: 20px;
			}


			#anyheadline::slotted(*) {
				color: green;
				grid-column-start: 1;
  				grid-column-end: 1;
  				grid-row-start: 1;
  				grid-row-end: 1;
			}

			#anycontainer::slotted(*) {
				color: green;
				grid-column-start: auto;
  				grid-column-end: auto;
  				grid-row-start: auto;
  				grid-row-end: auto;
			}
			
			
			</style>
		<slot id="anyheadline" name="anyheadline"></slot>
		<slot id="anycontainer" name="anycontainer"></slot>
`;

	class SectionOutputOneCE extends SectionOutputBaseCE {

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

	window.customElements.define('section-output-one-ce', SectionOutputOneCE);
import { SectionInputBaseCE } from '/ce/composed_with_slots/section_input_base_ce.js';

const tpl = window.document.createElement("template");
tpl.innerHTML = `
<link rel="stylesheet" href="//cdn.jsdelivr.net/chartist.js/latest/chartist.min.css">
<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css" integrity="sha384-9gVQ4dYFwwWSjIDZnLEWnxCjeSWFphJiwGPXr1jddIhOegiu1FwO5qRGvFXOdJZ4" crossorigin="anonymous">
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/js/bootstrap.min.js" integrity="sha384-uefMccjFJAIv6A+rW+L4AHf99KvxDjWSu1z9VI8SKNVmz4sk7buKt/6v9KI65qnm" crossorigin="anonymous"></script>

<style>
/* window smaller than 600px */
	:host {
		grid-area: input;
		background-color: var(--main-bg-color, azure);
		display: grid;
		grid-template-columns: 1fr minmax(0px, 280px) 1fr;
		grid-template-areas:
		'. head .'
		'. box .';
	}
/* window larger than 760px */
		@media (min-width: 760px) {
		:host {
			background-color: var(--main-bg-color, azure);
			display: grid;
			grid-template-columns: 1fr minmax(300px, 760px) 1fr;
			grid-template-areas:
			'. head .'
			'. box .';
		}
	}

		/* large screen larger than 1480px */
		@media (min-width: 1480px) {
			:host {
				background-color: var(--main-bg-color, azure);
				display: grid;
				grid-template-columns: 1fr 1480px 1fr;
				grid-template-areas:
				'. head .'
				'. box .';
			}
		}

		/* window smaller than 600px */
		#container {
			padding-left:40px;
			padding-right:40px;
			display: grid;
			grid-area: box;
			grid-column-gap: 40px;
			background-color: var(--main-bg-color, azure);

			grid-template-columns: repeat(auto-fit, minmax(200px, 200px));
			
		}
		
		/* window larger than 760px */
		@media (min-width: 760px) {
			#container {
				padding-left:40px;
				padding-right:40px;
				display: grid;
				grid-area: box;
				grid-column-gap: 40px;
				background-color: var(--main-bg-color, azure);
				
				grid-template-columns: repeat(auto-fit, minmax(200px, 200px));
				
			}
		}
		/* large screen larger than 1480px */
		@media (min-width: 1480px) {
			#container {
				padding-left:40px;
				padding-right:40px;
				display: grid;
				grid-area: box;
				grid-column-gap: 40px;
				background-color: var(--main-bg-color, azure);
				
				grid-template-columns: 200px 200px 200px 200px 200px 200px;
				
			}
		}
		#anyheadline::slotted(*) {
			padding:30px 30px 10px 40px;
			

			color: green;
			grid-area: head;
			// grid-column-start: 1;
			// 	grid-column-end: 1;
			// grid-row-start: 1;
			// 	grid-row-end: 1;
	
			// grid-area: header;
		}


		#anycontainer::slotted(*) {
			color: green;
			
			// grid-column-start: auto;
			//   grid-column-end: auto;
			//grid-row-start: 2;
			//   grid-row-end: 2;
			//grid-row-start: > 1;
		}





		/* For large screens */
		// @media (min-width: 1200px) {
		// 	#container {
		// 		display: grid;
		// 		//padding: 100px;
		// 		// padding-top: 60px;
		// 		// padding-bottom: 20px;
		// 		background-color: var(--main-bg-color, azure);

		// 		grid-area: body;
		// 		grid-template-columns: repeat(3, minmax(300px, 1fr));

		// 		grid-column-gap: 20px;
		// 		grid-row-gap: 20px;	
		// 	}
		// }
		
		/* :host([color="blue"]) ::slotted(h1) {
			color: yellow;
		}

		:host([color="blue"]) ::slotted([data-test]) {
			color: red;
		}

		:host([color="blue"]) ::slotted(headline-ce) {
			color: green;
		} */


		// #anybutton::slotted(*) {
		// 	justify-self:end;
		// 	grid-column: 5;
		// 	  grid-row-start: 1;
		// 	  grid-row-end: 1;
		// }



		</style>



		
		<slot id="anyheadline" name="anyheadline"></slot>
		
		<div id="container">
		<slot id="anycontainer" name="anycontainer">
		</slot></div>
		

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

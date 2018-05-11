import { SectionOutputBaseCE } from '/ce/composed_with_slots/section_output_base_ce.js';

const tpl = window.document.createElement("template");
tpl.innerHTML = `
<link rel="stylesheet" href="//cdn.jsdelivr.net/chartist.js/latest/chartist.min.css">
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">

	<style>
	:host {
		background-color: var(--main-bg-color, azure);
		display: grid;
		grid-template-columns: minmax(0px, 280px);
		grid-template-areas:
		'head'
		'box';
	}

	/* window larger than 760px */
		@media (min-width: 760px) {
		:host {
			grid-template-columns: minmax(300px, 760px);
		}
	}

		/* large screen larger than 1480px */
		@media (min-width: 1480px) {
			:host {
				grid-template-columns: 1480px;
			}
		}

		#container {
			padding-left:40px;
			padding-right:40px;
			display: grid;
			grid-area: box;
			grid-column-gap: 40px;
			background-color: var(--main-bg-color, azure);
			grid-template-columns: 1fr;	
		}

		/* window larger than 760px */
		@media (min-width: 760px) {
			#container {				
				grid-template-columns: 1fr;
				
			}
		}
		/* large screen larger than 1480px */
		@media (min-width: 1480px) {
			#container {
				grid-template-columns: 1fr 1fr;
				
			}
		}
		

		#anyheadline::slotted(*) {
			padding:30px 30px 30px 40px;
			color: green;
			grid-area: head;
		}

		#anycontainer::slotted(*) {
			color: green;
		}

		</style>

		<slot id="anyheadline" name="anyheadline"></slot>
		<div id="container">
			<slot id="anycontainer" name="anycontainer"></slot>	
		</div>		
`;


//<slot id="anytable" name="anytable"></slot>
	class SectionTwoColumnCE extends SectionOutputBaseCE {

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

	window.customElements.define('section-two-column-ce', SectionTwoColumnCE);
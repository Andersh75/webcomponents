import { SectionInputBaseCE } from '/ce/composed_with_slots/section_input_base_ce.js';

const tpl = window.document.createElement("template");
tpl.innerHTML = `
<link rel="stylesheet" href="//cdn.jsdelivr.net/chartist.js/latest/chartist.min.css">
<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css" integrity="sha384-9gVQ4dYFwwWSjIDZnLEWnxCjeSWFphJiwGPXr1jddIhOegiu1FwO5qRGvFXOdJZ4" crossorigin="anonymous">
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/js/bootstrap.min.js" integrity="sha384-uefMccjFJAIv6A+rW+L4AHf99KvxDjWSu1z9VI8SKNVmz4sk7buKt/6v9KI65qnm" crossorigin="anonymous"></script>

<style>
	:host {
		padding-top: 40px;
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
			grid-row-gap: 40px;
			background-color: var(--main-bg-color, azure);
			grid-template-columns: repeat(auto-fit, minmax(200px, 200px));
			
		}
		
		/* window larger than 760px */
		@media (min-width: 760px) {
			#container {				
				grid-template-columns: repeat(auto-fit, minmax(200px, 200px));
				
			}
		}
		/* large screen larger than 1480px */
		@media (min-width: 1480px) {
			#container {
				grid-template-columns: 200px 200px 200px 200px 200px 200px;
				
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

import { AnykindContainerBaseCE } from '/ce/composed_with_slots/anykind_container_base_ce.js';

const tpl = window.document.createElement("template");
tpl.innerHTML = `
<link rel="stylesheet" href="//cdn.jsdelivr.net/chartist.js/latest/chartist.min.css">
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">


<style>
		:host {
			display: grid;
			padding-top: 20px;
			padding-bottom: 20px;
			// padding-left: 40px;
			// padding-right: 40px;
			//max-width: 400px;
			//grid-template-columns: minmax(200px, 400px));
			grid-template-rows: 48px 1fr;
			// grid-column-gap: 20px;
			// grid-row-gap: 20px;	

			grid-template-areas: 
			'header'
			'body';

			// grid-template-columns: auto;
			// grid-template-rows: auto;


			//width: minmax(min-content, 300px);
			//width: 300px;
			
		}
		#headline::slotted(*) {
			color: green;
			grid-area: header;
			height: 24px;
			
		}

		#container {
			//display: grid;
			//padding: 100px;
			// padding-top: 60px;
			// padding-bottom: 20px;
			background-color: var(--main-bg-color, azure);

			grid-area: body;
			//grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));

			// grid-column-gap: 20px;
			// grid-row-gap: 20px;	
		}


		#anyform::slotted(*) {
			color: green;
			display: block;

			
			//grid-column-start: auto;
			// grid-column-end: auto;
			// grid-row-start: 2;
			// grid-row-end: 2;
		}






					
		



		// #anytable::slotted(*) {
		// 	color: green;
		// 	//background-color: white;
		// 	grid-column-start: auto;
		// 	grid-column-end: auto;
		// 	grid-row-start: 2;
		// 	grid-row-end: 2;
		// }

		</style>
		<slot name="headline" id="headline"></slot>
		<slot name="anytable" id="anytable"></slot>
		<div id="container">
			<slot name="anyform" id="anyform"></slot>
		</div>
		

`;

{/* <div id="container">
			
</div> */}

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
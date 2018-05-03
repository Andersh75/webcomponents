import { ButtonBaseCE } from '/ce/primary/button_base_ce.js';

//TODO: DECIDE ON HOW IT SHPOULD WORK AND CHANGE LOGIC BELOW

const tpl = window.document.createElement("template");
tpl.innerHTML = `
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">

		<style>

		</style>

	<button type="button" class="btn btn-secondary"></button>
`;


	
	class ButtonOneCE extends ButtonBaseCE {

		constructor() {
			super();
			this.tpl = tpl;
			this.extend();
		}

			
		static get observedAttributes() {
			return [ 'toggle', 'value' ];
		}
		
		extendBaseCtrl(that, model, view) {
			//local
	
		}
		
		extendBaseView(that, model) {
	
		}
	
		extendBaseModel(that) {
			
		}	
	}



	window.customElements.define('button-one-ce', ButtonOneCE);

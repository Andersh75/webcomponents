import { SelectBaseCE } from '/ce/primary/select_base_ce.js';

const tpl = window.document.createElement("template");
tpl.innerHTML = `

	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">

	<style>
		
	</style>
			<select id="select" class="form-control form-control-sm">
			  <option disabled selected value="">Procent...</option>
			  <option value="0.01">0.01</option>
			  <option value="0.02">0.02</option>
			  <option value="0.03">0.03</option>
			  <option value="0.04">0.04</option>
			  <option value="0.05">0.05</option>
			</select>
`;



	class SelectInflationCE extends SelectBaseCE {

		constructor() {
			super();
			this.tpl = tpl;
			this.extend();
		}
	

		static get observedAttributes() {
			return [ 'selectedindex', 'selectedvalue', 'sb', 'sr'];
		}

		
		extendBaseCtrl(that, model, view) {
			//local
	
		}
		
		extendBaseView(that, model) {
	
		}
	
		extendBaseModel(that) {
			
		}
	}

	window.customElements.define('select-inflation-ce', SelectInflationCE);

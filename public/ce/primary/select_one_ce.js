import { SelectBaseCE } from '/ce/primary/select_base_ce.js';

const tpl = window.document.createElement("template");
tpl.innerHTML = `

	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">

	<style>
		
	</style>
		<div class="input-group mb-3">
			<select id="select" class="custom-select">
			  <option disabled selected value="">välj...</option>
			  <option value="0.01">1</option>
			  <option value="0.02">2</option>
			  <option value="0.03">3</option>
			  <option value="0.04">5</option>
			  <option value="0.05">5</option>
			</select>
		  </div>
`;



	class SelectOneCE extends SelectBaseCE {

		constructor() {
			super();
			this.tpl = tpl;
			this.extend();
		}
	

		static get observedAttributes() {
			return [ 'selectedindex', 'sb', 'selectedvalue'];
		}

		
		extendBaseCtrl(that, model, view) {
			//local
			console.log('extend Base');
	
		}
		
		extendBaseView(that, model) {
	
		}
	
		extendBaseModel(that) {
			
		}
	}

	window.customElements.define('select-one-ce', SelectOneCE);

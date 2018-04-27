import { SelectBaseCE } from '/ce/primary/select_base_ce.js';

const tpl = window.document.createElement("template");
tpl.innerHTML = `

	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">

	<style>
		
	</style>
		<div class="input-group mb-3">
			<select id="select" class="custom-select">
			  <option disabled selected value="">välj...</option>
			  <option value="0.90">0,90kr</option>
			  <option value="0.95">0,95kr</option>
			  <option value="1.00">1,00kr</option>
			  <option value="1.05">1,05kr</option>
			  <option value="1.10">1,10kr</option>
			</select>
		  </div>
`;



	class SelectKwhpriceCE extends SelectBaseCE {

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

	window.customElements.define('select-kwhprice-ce', SelectKwhpriceCE);

import { SelectBaseCE } from '/ce/primary/select_base_ce.js';

const tpl = window.document.createElement("template");
tpl.innerHTML = `

	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">

	<style>
		
	</style>
			<select id="select"  class="form-control form-control-sm">
			  <option disabled selected value="">Kr...</option>
			  <option value="0.90">0,90kr</option>
			  <option value="0.95">0,95kr</option>
			  <option value="1.00">1,00kr</option>
			  <option value="1.05">1,05kr</option>
			  <option value="1.10">1,10kr</option>
			  <option value="1.20">1,20kr</option>
			</select>
`;



	class SelectWaterpriceCE extends SelectBaseCE {

		constructor() {
			super();
			this.stream = "selectedvalue";
			this.tpl = tpl;
			this.extend();
		}
	

		static get observedAttributes() {
			return [ 'selectedindex', 'sb', 'selectedvalue', 'sr'];
		}

		
		extendBaseCtrl(that, model, view) {
	
		}
		
		extendBaseView(that, model) {
	
		}
	
		extendBaseModel(that) {
			this.db.selectedindex = "0";
			this.db.selectedvalue = "";
			this.db.sb = "";
			this.db.sr = "";
		}
	}

	window.customElements.define('select-waterprice-ce', SelectWaterpriceCE);

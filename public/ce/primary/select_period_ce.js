import { SelectBaseCE } from '/ce/primary/select_base_ce.js';

const tpl = window.document.createElement("template");
tpl.innerHTML = `

	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">

	<style>
		
	</style>
		<select id="select" class="form-control form-control-sm">
			<option disabled selected value="">År...</option>
			<option value="1">1</option>
			<option value="2">2</option>
			<option value="3">3</option>
			<option value="4">4</option>
			<option value="5">5</option>
			<option value="6">6</option>
			<option value="7">7</option>
			<option value="8">8</option>
			<option value="9">9</option>
			<option value="10">10</option>
		</select>
`;


	class SelectPeriodCE extends SelectBaseCE {

		constructor() {
			super();
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
			
		}
	}

	window.customElements.define('select-period-ce', SelectPeriodCE);

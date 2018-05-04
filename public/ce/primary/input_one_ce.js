import { InputBaseCE } from '/ce/primary/input_base_ce.js';

const tpl = window.document.createElement("template");
tpl.innerHTML = `
	<link rel="stylesheet" href="//cdn.jsdelivr.net/chartist.js/latest/chartist.min.css">
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">


	<input id="input" type="text" class="form-control form-control-sm">
`;


		
class InputOneCE extends InputBaseCE {
	constructor() {
		super();
		this.stream = "value";
		this.tpl = tpl;
		this.extend();
	}

	static get observedAttributes() {
		return ['value', 'placeholder', 'year', 'sb', 'sr'];
	}

	extendBaseCtrl(that, model, view) {

	}
	
	extendBaseView(that, model) {

	}

	extendBaseModel(that) {
		this.db.placeholder = "";
		this.db.value = "";
		this.db.year = "";
		this.db.sb = "";
		this.db.sr = "";
	}	
}

window.customElements.define('input-one-ce', InputOneCE);
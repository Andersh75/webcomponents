import { TableBaseCE } from '/ce/primary/table_base_ce.js';

const tpl = window.document.createElement("template");
tpl.innerHTML = `
	<link rel="stylesheet" href="//cdn.jsdelivr.net/chartist.js/latest/chartist.min.css">
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">


	<table id="table" class="table table-bordered"></table>
`;


		
class TableOneCE extends TableBaseCE {
	constructor() {
		super();
		this.tpl = tpl;
		this.extend();
	}

	static get observedAttributes() {
		return ['cells', 'sb', 'sr', 'srdispatch', 'sbdispatch', 'type'];
	}

	extendBaseCtrl(that, model, view) {

	}
	
	extendBaseView(that, model) {

	}

	extendBaseModel(that) {
		
	}	
}

window.customElements.define('table-one-ce', TableOneCE);
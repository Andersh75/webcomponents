import { DivtableBaseCE } from '/ce/primary/divtable_base_ce.js';

const tpl = window.document.createElement("template");
tpl.innerHTML = `
	<link rel="stylesheet" href="//cdn.jsdelivr.net/chartist.js/latest/chartist.min.css">
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">

	<style>
		#table {
			display: table;
			// text-align: center;
			// width: 100%;
			// border-collapse: collapse;
		}

		#resp-table-header {
			display: table-header-group;
			//background-color: grey;
		}

		.table-headercell {
			display: table-cell;
			//border: 1px solid black;
		}

		#resp-table-body {
			display: table-row-group;
		}

		.resp-table-row {
			display: table-row;
		}

		.resp-table-cell {
			display: table-cell;
			//border: 1px solid black;
		}




	</style>

	<div id="table" class="table table-dark"></div>
`;


		
class DivtableOneCE extends DivtableBaseCE {
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

window.customElements.define('divtable-one-ce', DivtableOneCE);
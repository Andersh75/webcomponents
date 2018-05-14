import { TableBaseCE } from '/ce/primary/table_base_ce.js';

const tpl = window.document.createElement("template");
tpl.innerHTML = `
	<link rel="stylesheet" href="//cdn.jsdelivr.net/chartist.js/latest/chartist.min.css">
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">

	<style>

		#table {
			background-color: white;
		}
	</style>
	<div class="table-responsive">
		<table id="table" class="table table-striped table-bordered"></table>
	</div>
`;


		
class TableOneCE extends TableBaseCE {
	constructor() {
		super();
		this.stream = undefined;
		this.tpl = tpl;
		this.startyear = 0;
		this.extend();
	}

	static get observedAttributes() {
		return ['cells', 'sb', 'sr', 'celldispatch', 'type', 'title', 'period', 'startyear'];
	}

	extendBaseCtrl(that, model, view) {

	}
	
	extendBaseView(that, model) {

	}

	extendBaseModel(that) {
		this.db.sb = "";
		this.db.sr = "";
		this.db.celldispatch = "";
		this.db.title = "";
		this.db.period = "";
		this.db.type = "";
		this.db.startyear = "";
	}	
}

window.customElements.define('table-one-ce', TableOneCE);
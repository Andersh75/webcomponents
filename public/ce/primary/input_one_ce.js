import { InputBaseCE } from '/ce/primary/input_base_ce.js';

const tpl = window.document.createElement("template");
tpl.innerHTML = `
	<link rel="stylesheet" href="//cdn.jsdelivr.net/chartist.js/latest/chartist.min.css">
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">


	<div id="wrapper" class="input-group input-group-sm mb-3">
		<input id="input" type="text" class="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm">
	</div>
`;


		
class InputOneCE extends InputBaseCE {
	constructor() {
		super();
		this.tpl = tpl;
		this.parent;
		this.extend();
		this.extendBase();
	}

	extendCtrl(that, model, view) {
		
		
	}


	extendView(that, model) {
		
	}
}

window.customElements.define('input-one-ce', InputOneCE);
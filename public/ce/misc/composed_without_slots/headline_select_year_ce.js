import { HeadlineSelectBaseCE } from '/ce/composed_without_slots/headline_select_base_ce.js';
	// specific:
	// required attributes: headline-ce: title, select-ce: selectedindex

	const tpl = window.document.createElement("template");
tpl.innerHTML = `
<link rel="stylesheet" href="//cdn.jsdelivr.net/chartist.js/latest/chartist.min.css">
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">

	<style>
			:host {
				display: inline-grid;
				grid-template-columns: auto;
  				grid-template-rows: 20px auto 20px auto 20px;
				background-color: 
			}
			
			#headline {
				color: green;
				grid-column-start: 1;
  				grid-column-end: 1;
  				grid-row-start: 2;
  				grid-row-end: 2;
			}

			#select {
				color: green;
				grid-column-start: 1;
  				grid-column-end: 1;
  				grid-row-start: 4;
  				grid-row-end: 4;
			}


			</style>
			<form>	
				<div class="form-group">
					<headline-label-ce id="headline" title></headline-label-ce>
					<select-year-ce id="select" sb="" selectedindex selectedvalue></select-year-ce>
				</div>
			</form>
`;



class HeadlineSelectYearCE extends HeadlineSelectBaseCE {

	constructor() {
		super();
		this.tpl = tpl;
		this.extend();
	}

	static get observedAttributes() {
		return [ 'title', 'placeholder', 'datatarget', 'selectedindex', 'selectedvalue', 'sb', 'sr' ];
	}
		
	extendBaseCtrl(that, model, view) {

	}
	
	extendBaseView(that, model) {

	}

	extendBaseModel(that) {
		
	}

}

window.customElements.define('headline-select-year-ce', HeadlineSelectYearCE);

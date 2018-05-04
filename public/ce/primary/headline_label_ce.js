
	// specific:
	// Headline-ce is a low level component with no children.No slots.Does not report to parent.
	// required attributes: headline-ce: title

	// General notes:
	// Preferrably query select by id.
	// Set id on tags.
	// All event names initiated by parent to be run by child should end with "FromParent".
	// First line in functions initiated by parent should always start with: "parent = e.detail;"
	// Model and View announce thru local events. Controller calls function in Model and View directly. If present controller announce to parent and child thru the parents and childrens local events.
	// View is always passive.

import { HeadlineBaseCE } from '/ce/primary/headline_base_ce.js';

const tpl = window.document.createElement("template");
tpl.innerHTML = `
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
	<style>
	.label {
		font-size: 14px;
	  }

	</style>

	<label id="headline" class="label"></label>
`;


class HeadlineLabelCE extends HeadlineBaseCE {
	constructor() {
		super();
		this.stream = "title";
		this.tpl = tpl;
		this.extend();
	}

	static get observedAttributes() {
		return ['title', 'sb', 'sr', 'srdispatch'];
	}
	
	extendBaseCtrl(that, model, view) {

	}
	
	extendBaseView(that, model) {
		
	}

	extendBaseModel(that) {
		this.db.title = "";
		this.db.sb = "";
		this.db.sr = "";
		this.db.srdispatch = "";
	}	
	

}

window.customElements.define('headline-label-ce', HeadlineLabelCE);

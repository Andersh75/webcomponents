
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

	</style>

	<span id="headline"></span>
`;


class HeadlineOneCE extends HeadlineBaseCE {
	constructor() {
		super();
		this.tpl = tpl;
		this.parent;
		this.extend();
		this.extendBase();
	}

	static get observedAttributes() {
		return ['title'];
	};
	
	//Controller
	extendCtrl(that, model, view) {
	}


	//View
	//always passive
	extendView(that, model) {
		
	}
	

}

window.customElements.define('headline-one-ce', HeadlineOneCE);

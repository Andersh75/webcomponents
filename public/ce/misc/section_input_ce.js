

const tpl = window.document.createElement("template");
tpl.innerHTML = `
<link rel="stylesheet" href="//cdn.jsdelivr.net/chartist.js/latest/chartist.min.css">
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">

<style>
		:host {
			display: grid;
			padding: 40px;
			padding-top: 60px;
			grid-template-columns: auto;
			  grid-template-rows: auto;
			grid-column-gap: 20px;
			grid-row-gap: 20px;
			background-color: var(--main-bg-color, azure);
		}
		
		/* :host([color="blue"]) ::slotted(h1) {
			color: yellow;
		}

		:host([color="blue"]) ::slotted([data-test]) {
			color: red;
		}

		:host([color="blue"]) ::slotted(headline-ce) {
			color: green;
		} */

		#anyheadline::slotted(*) {
			color: green;
			grid-column-start: 1;
			  grid-column-end: 1;
			  grid-row-start: 1;
			  grid-row-end: 1;
		}

		#anybutton::slotted(*) {
			justify-self:end;
			grid-column: 5;
			  grid-row-start: 1;
			  grid-row-end: 1;
		}

		#inflationcontainer::slotted(*) {
			color: green;
			grid-column-start: auto;
			  grid-column-end: auto;
			  grid-row-start: 2;
			  grid-row-end: 2;
		}

		#periodcontainer::slotted(*) {
			color: green;
			grid-column-start: auto;
			  grid-column-end: auto;
			  grid-row-start: 2;
			  grid-row-end: 2;
		}

		#heatcontainer::slotted(*) {
			color: green;
			grid-column-start: auto;
			  grid-column-end: auto;
			  grid-row-start: 2;
			  grid-row-end: 2;
		}

		#anycontainer::slotted(*) {
			color: green;
			grid-column-start: auto;
			  grid-column-end: auto;
			  grid-row-start: 2;
			  grid-row-end: 2;
		}

		</style>
	
		<slot id="anyheadline" name="anyheadline"></slot>
		<slot id="anybutton" name="anybutton"></slot>
		<slot id="anycontainer" name="anycontainer"></slot>
`;



class SectionInputCE extends CustomElement2 {

	constructor() {
		super();
		this.tpl = tpl;
		this.parent;
		this.extend();
	}

	extendCtrl(that, model, view) {
		//local
		this.ctrl.run = function() {
		};

		//initiated by remote event
		this.ctrl.clearAnykindContainers = function() {
			let anycontainer = that.shadowRoot.querySelector('#anycontainer');
			Array.prototype.slice.call(anycontainer.assignedNodes()).forEach(node => {
				eventDispatcher(node.eventTarget, 'clearanyformsfromparent');
			})
		}
	}
	
	extendView(that, model) {

	}

	extendModel(that) {
		
	}

}

window.customElements.define('section-input-ce', SectionInputCE);

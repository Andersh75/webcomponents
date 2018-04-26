const tpl = window.document.createElement("template");
tpl.innerHTML = `
<link rel="stylesheet" href="//cdn.jsdelivr.net/chartist.js/latest/chartist.min.css">
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">

<style>
		:host {
			display: grid;
			grid-template-columns: auto;
			  grid-template-rows: auto;
			grid-gap: 20px;
			padding: 40px;
			background-color: beige
		}
					
		#headline::slotted(*) {
			color: green;
			grid-column-start: auto;
			  grid-column-end: auto;
			  grid-row-start: 1;
			  grid-row-end: 1;
		}

		#anyform::slotted(*) {
			color: green;
			grid-column-start: auto;
			  grid-column-end: auto;
			  grid-row-start: 2;
			  grid-row-end: 2;
		}

		</style>
		<slot name="headline" id="headline"></slot>
		<slot name="anyform" id="anyform"></slot>
`;

class AnykindContainerCE extends CustomElement2 {

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

		//parent
		this.ctrl.clearAnyformsFromParent = function(e) {
			let anyform = that.shadowRoot.querySelector('#anyform');
			Array.prototype.slice.call(anyform.assignedNodes()).forEach(node => {
				eventDispatcher(node.eventTarget, 'clearallfromparent');
			})
		};
	}

			
	extendView(that, model) {

	}

	extendModel(that) {
		
	}
}

window.customElements.define('anykind-container-ce', AnykindContainerCE);

export { AnykindContainerCE };
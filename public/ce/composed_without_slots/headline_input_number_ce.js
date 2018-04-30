import { HeadlineInputBaseCE } from '/ce/composed_without_slots/headline_input_base_ce.js';
	// Low level component with no children.
	// No slots.
	// Included ce-components: headline-ce, input-ce.
	// Id pattern: same as component.
	// Sections in controller: init, local, global, child, parent.

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

		#input {
			color: green;
			grid-column-start: 1;
			grid-column-end: 1;
			grid-row-start: 4;
			grid-row-end: 4;
		}

		/* #anyinput::slotted(*) {
			color: green;
			grid-column-start: 1;
			grid-column-end: 1;
			grid-row-start: 6;
			grid-row-end: 6;
		} */

	</style>
	<form>	
		<div class="form-group">
			<headline-label-ce id="headline" title></headline-label-ce>
			<input-number-ce id="input" sb="" placeholder value></input-number-ce>
		</div>
	</form>
`;

class HeadlineInputNumberCE extends HeadlineInputBaseCE {

	constructor() {
		super();
		this.tpl = tpl;
		this.extend();
	}

	static get observedAttributes() {
		return [ 'title', 'placeholder', 'value', 'sb', 'sr'   ];
	}
		
	extendBaseCtrl(that, model, view) {
		//local


		// this.ctrl.priceandcapitalize$ = function(e) {
		// 	const combineLatest$ = function(...streams) {
		// 		return Rx.Observable.combineLatest(streams);
		// 	};

		// 	combineLatest$(myRxmq.channel(e.detail[0]).behaviorobserve(e.detail[1]), myRxmq.channel(e.detail[0]).behaviorobserve('price'), myRxmq.channel('inflation').behaviorobserve('rate'))
		// 	.do(console.log)				
		// 	.map(([e1, e2, e3]) => [Number(e1), Number(e2), Number(e3)])
				
		// 	.subscribe((x) => {
		// 		let year = that.year;
		// 		let numYear = Number(year);
		// 		//let result = x[0] * x[1] * Math.pow((x[2] + 1), numYear);
		// 		let result = x[0] * x[1];

		// 		let roundedResult = parseFloat(Math.round(result * 1000) / 1000).toFixed(3);
		// 		if(h.boolean.isNumber(roundedResult)) {		
		// 			that.value = roundedResult;
		// 			let input = that.shadowRoot.querySelector('#input');
		// 			eventDispatcher(input.eventTarget, 'attributefromparent', {parent: that, attribute: 'value', data: that.value});		
		// 		}	
		// 	})
		// }

	}
	
	extendBaseView(that, model) {

	}

	extendBaseModel(that) {
		
	}	
}

window.customElements.define('headline-input-number-ce', HeadlineInputNumberCE);

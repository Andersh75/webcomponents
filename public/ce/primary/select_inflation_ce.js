import { SelectBaseCE } from '/ce/primary/select_base_ce.js';

const tpl = window.document.createElement("template");
tpl.innerHTML = `

	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">

	<style>
		
	</style>
			<select id="select" class="form-control form-control-sm">
			  <option disabled selected value="">Procent...</option>
			  <option value="0.01">0.01</option>
			  <option value="0.02">0.02</option>
			  <option value="0.03">0.03</option>
			  <option value="0.04">0.04</option>
			  <option value="0.05">0.05</option>
			</select>
`;



	class SelectInflationCE extends SelectBaseCE {

		constructor() {
			super();
			this.tpl = tpl;
			this.extend();
		}
	

		static get observedAttributes() {
			return [ 'selectedindex', 'sb', 'selectedvalue', 'sr'];
		}

		
		extendBaseCtrl(that, model, view) {
			//local

			//stream from element
			// this.ctrl.stream = function() {
			// 	console.log('stream: select_inflation');
			// 	const element$ = function(element) {
			// 		return Rx.Observable.merge(Rx.Observable.of(element), Rx.Observable.fromEvent(element, 'blur').map(x => x.target), Rx.Observable.fromEvent(element, 'click').map(x => x.target), Rx.Observable.fromEvent(element, 'keyup').filter(x => x.keyCode == 13).map(x => x.target));
			// 	};

			// 	element$(that)
				
			// 	.map(element => element.selectedvalue)
			// 	.do(console.log)
				
			// 	.subscribe(myRxmq.channel(that.sbChannel).behaviorsubject(that.sbSubject));
			// };

			// this.ctrl.changedAttribute = function(details) {
			// 	console.log('ChangedAttribute: select_inflation');
			// 	console.log(details);
			// 	if (details.changedAttribute.name === "selectedindex") {
			// 		that.selectedvalue = that.shadowRoot.querySelector('#select').options[details.changedAttribute.newVal].value;
			// 	}

			// 	if (details.changedAttribute.name === "selectedvalue") {
			// 		myRxmq.channel(that.sbChannel).behaviorsubject(that.sbSubject).next(details.changedAttribute.newVal);
			// 	}		
			// };
	
		}
		
		extendBaseView(that, model) {
	
		}
	
		extendBaseModel(that) {
			
		}
	}

	window.customElements.define('select-inflation-ce', SelectInflationCE);

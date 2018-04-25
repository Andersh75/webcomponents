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
		
		//local events initiated by global stream
		this.ctrl.capitalize$ = function(e) {
			const combineLatest$ = function(...streams) {
				return Rx.Observable.combineLatest(streams);
			};
			combineLatest$(myRxmq.channel(e.detail[0]).behaviorobserve(e.detail[1]), myRxmq.channel(e.detail[0]).behaviorobserve('increase'))					
			.map(([e1, e2]) => [Number(e1), Number(e2)])
			.subscribe((x) => {
				let year = that.year;
				let numYear = Number(year);
				let result = x[0] * Math.pow((x[1] + 1), numYear);
				let roundedResult = parseFloat(Math.round(result * 1000) / 1000).toFixed(3);
				that.value = roundedResult;
				let attribute = 'value';
				view.updateView(attribute, that.value);
			})
		}
	}


	extendView(that, model) {
		this.view.renderPlaceholder = function(obj) {
			that.shadowRoot.querySelector('#input').placeholder = obj.toUpperCase();
		};

		this.view.renderValue = function(obj) {
			that.shadowRoot.querySelector('#input').value = obj;
		};

		this.view.updateView = function(attribute, data) {
			switch(attribute) {
				case 'value':
				that.view.renderValue.call(that, data);
				break;
				case 'placeholder':
				that.view.renderPlaceholder.call(that, data);
				break;
			}	
		};
	}
}

window.customElements.define('input-one-ce', InputOneCE);
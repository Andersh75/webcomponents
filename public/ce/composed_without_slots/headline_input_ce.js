
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
			grid-template-rows: 20px auto 20px auto 20px auto 20px;
			background-color: beige
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

	<headline-ce id="headline" title class="h5"></headline-ce>
	<input-one-ce id="input" sb="" placeholder value></input-one-ce>
`;

class HeadlineInputCE extends CustomElement2 {

	constructor() {
		super();
		this.tpl = tpl;
		this.extend();
	}

	static get observedAttributes() {
		return [ 'title', 'placeholder', 'value' ];
	}

	//extends this.ctrl in CustomElement
	extendCtrl(that, model, view) {
		
		//intit
		this.ctrl.run = function() {
			let headline = that.shadowRoot.querySelector('#headline');
			let input = that.shadowRoot.querySelector('#input');
			eventDispatcher(headline.eventTarget, 'attributefromparent', {parent: that, attribute: 'title', data: that.title}); //Makes child component announce from headline component internally. The parent is attached in event e.details.
			eventDispatcher(input.eventTarget, 'attributefromparent', {parent: that, attribute: 'placeholder', data: that.placeholder}); //Makes child component announce from headline component internally. The parent is attached in event e.details.
			eventDispatcher(input.eventTarget, 'attributefromparent', {parent: that, attribute: 'value', data: that.value}); //Makes child component announce from headline component internally. The parent is attached in event e.details.
			eventDispatcher(input.eventTarget, 'attributefromparent', {parent: that, attribute: 'sb', data: that.sb});
		};

		//local events initiated by child


		//local events initiated by global stream

		this.ctrl.capitalize$ = function(e) {
			const combineLatest$ = function(...streams) {
				return Rx.Observable.combineLatest(streams);
			};

			combineLatest$(myRxmq.channel(e.detail[0]).behaviorobserve(e.detail[1]), myRxmq.channel(e.detail[0]).behaviorobserve('increase'))				
			.map(([e1, e2]) => [Number(e1), Number(e2)])
			.do(console.log)	
			.subscribe((x) => {
				let year = that.year;
				let numYear = Number(year);
				let result = x[0] * Math.pow((x[1] + 1), numYear);
				let roundedResult = parseFloat(Math.round(result * 1000) / 1000).toFixed(3);
				if(h.boolean.isNumber(roundedResult)) {		
					that.value = roundedResult;
					let input = that.shadowRoot.querySelector('#input');
					eventDispatcher(input.eventTarget, 'attributefromparent', {parent: that, attribute: 'value', data: that.value});		
				}
				
			})
		}

		this.ctrl.discount$ = function(e) { 
			const combineLatest$ = function(...streams) {
				return Rx.Observable.combineLatest(streams);
			};

			combineLatest$(myRxmq.channel(e.detail[0]).behaviorobserve(e.detail[1]), myRxmq.channel(e.detail[0]).behaviorobserve('discount'))					
			.map(([e1, e2]) => [Number(e1), Number(e2)])
			.subscribe((x) => {
				let year = that.year;
				let numYear = Number(year);
				let result = x[0] / Math.pow((x[1] + 1), numYear);
				let roundedResult = parseFloat(Math.round(result * 1000) / 1000).toFixed(3);
				that.value = roundedResult;
				let input = that.shadowRoot.querySelector('#input');
				eventDispatcher(input.eventTarget, 'attributefromparent', {parent: that, attribute: 'value', data: that.value});
			})
		}

		this.ctrl.discountSum$ = function(e) { 
			const combineLatest$ = function(...streams) {
				return Rx.Observable.combineLatest(streams);
			};

			combineLatest$(myRxmq.channel(e.detail[0]).behaviorobserve('discount-1'), myRxmq.channel(e.detail[0]).behaviorobserve('discount-2'), myRxmq.channel(e.detail[0]).behaviorobserve('discount-3'), myRxmq.channel(e.detail[0]).behaviorobserve('discount-4'))					
			.map(([e1, e2, e3, e4]) => [Number(e1), Number(e2), Number(e3), Number(e4)])
			.subscribe((x) => {
				let result = x.reduce((acc, el) => {
					return acc = acc + el;
				}, 0);
				console.log('result!!');
				console.log(result);

				let roundedResult = parseFloat(Math.round(result * 1000) / 1000).toFixed(3);
				that.value = roundedResult;
				let input = that.shadowRoot.querySelector('#input');
				eventDispatcher(input.eventTarget, 'attributefromparent', {parent: that, attribute: 'value', data: that.value});
			})
		}

		this.ctrl.plain$ = function(e) {
			const combineLatest$ = function(...streams) {
				return Rx.Observable.combineLatest(streams);
			};

			combineLatest$(myRxmq.channel(e.detail[0]).behaviorobserve(e.detail[1]), myRxmq.channel(e.detail[0]).behaviorobserve('increase'))					
			.map(([e1, e2]) => [Number(e1), Number(e2)])
			.subscribe((x) => {
				let year = that.year;
				let numYear = Number(year);
				let result = x[0];
				let roundedResult = parseFloat(Math.round(result * 1000) / 1000).toFixed(3);
				that.value = roundedResult;
				let input = that.shadowRoot.querySelector('#input');
				eventDispatcher(input.eventTarget, 'attributefromparent', {parent: that, attribute: 'value', data: that.value});
			})
		}



		// this.ctrl.updateheadline$ = function(e) {
		// 	myRxmq.channel(e.detail[0]).observe(e.detail[1])
		// 	.switchMap((ev) => Rx.Observable.interval(1000))
		// 	.subscribe(
		// 		(data) => {
		// 			that.title = data;
		// 			let headline = that.shadowRoot.querySelector('#headline');
		// 			eventDispatcher(headline.eventTarget, 'headlinefromparent', that);
		// 		},
		// 		(error) => {
					
		// 		}
		// 	);
		// }
		
		// this.ctrl.updateheadline2$ = function(e) {
		// 	myRxmq.channel(e.detail[0]).observe(e.detail[1])
		// 	.switchMap((ev) => Rx.Observable.interval(1000))
		// 	.map(x => x*2)
		// 	.subscribe(
		// 		(data) => {
		// 			that.title = data;
		// 			let headline = that.shadowRoot.querySelector('#headline');
		// 			eventDispatcher(headline.eventTarget, 'headlinefromparent', that);
		// 		},
		// 		(error) => {
					
		// 		}
		// 	);
		// }
		
		// this.ctrl.updateheadline3$ = function(e) {
		// 	myRxmq.channel(e.detail[0]).observe(e.detail[1])
			
		// 	.map(ev => ev.path[0].value)
		// 	.subscribe(
		// 		(data) => {
		// 			that.title = data;
		// 			let headline = that.shadowRoot.querySelector('#headline');
		// 			eventDispatcher(headline.eventTarget, 'headlinefromparent', that);
		// 		},
		// 		(error) => {
					
		// 		}
		// 	);
		// }
	
				
			
		//local events initiated by parent
		this.ctrl.clearallfromparent = function(e) {
			let input = that.shadowRoot.querySelector('#input');
			eventDispatcher(input.eventTarget, 'clearselffromparent', {parent: that, attribute: 'value', data: ""});
		};
		
		
	}

	//extends this.view in CustomElement
	extendView(that, model) {
	
	}

	//extends this.model from CustomElement
	extendModel(that) {
		
	}
	
	
}

window.customElements.define('headline-input-ce', HeadlineInputCE);

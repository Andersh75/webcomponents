const tpl = window.document.createElement("template");

tpl.innerHTML = `
	<link rel="stylesheet" href="//cdn.jsdelivr.net/chartist.js/latest/chartist.min.css">
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">

	<style>
		:host {
			display: inline-grid;
			grid-template-columns: auto;
			grid-template-rows: 20px auto 20px auto 20px;
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

	</style>

	<headline-base-ce id="headline" title class="h5"></headline-base-ce>
	<input-base-ce id="input" sb="" placeholder value></input-base-ce>
`;

class HeadlineInputBaseCE extends CustomElement2 {

	constructor() {
		super();
		this.tpl = tpl;
		this.parent;
		this.extend();
	}

	static get observedAttributes() {
		return [ 'title', 'placeholder', 'value' ];
	}

	extendBase() {
		this.extendView(this, this.model); //adds new methods to this.view
		this.extendCtrl(this, this.model, this.view); //adds new methods to this.ctrl
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

		//stream from element
		this.ctrl.stream = function() {
			// const element$ = function(element) {
			// 	return Rx.Observable.merge(Rx.Observable.of(element), Rx.Observable.fromEvent(element, 'blur').map(x => x.target), Rx.Observable.fromEvent(element, 'click').map(x => x.target), Rx.Observable.fromEvent(element, 'keyup').filter(x => x.keyCode == 13).map(x => x.target));
			// };

			// element$(that)
			// .map(element => element.value)
			// .subscribe(myRxmq.channel(that.sbChannel).behaviorsubject(that.sbSubject));
		};

		this.ctrl.changedAttribute = function(details) {
			// console.log('DETAILS!');
			// console.log(details.changedAttribute.newVal);
			// myRxmq.channel(that.sbChannel).behaviorsubject(that.sbSubject).next(details.changedAttribute.newVal);
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

		this.ctrl.priceandcapitalize$ = function(e) {
			const combineLatest$ = function(...streams) {
				return Rx.Observable.combineLatest(streams);
			};

			combineLatest$(myRxmq.channel(e.detail[0]).behaviorobserve(e.detail[1]), myRxmq.channel(e.detail[0]).behaviorobserve('price'), myRxmq.channel('inflation').behaviorobserve('rate'))				
			.map(([e1, e2, e3]) => [Number(e1), Number(e2), Number(e3)])
			.do(console.log)	
			.subscribe((x) => {
				let year = that.year;
				let numYear = Number(year);
				let result = x[0] * x[1] * Math.pow((x[2] + 1), numYear);
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

			combineLatest$(myRxmq.channel(e.detail[0]).behaviorobserve(e.detail[1]), myRxmq.channel('discount').behaviorobserve('rate'))					
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
			console.log('e.detail[0');
			console.log(e.detail[0]);

			combineLatest$(myRxmq.channel(e.detail[0]).behaviorobserve('discount-1'), myRxmq.channel(e.detail[0]).behaviorobserve('discount-2'), myRxmq.channel(e.detail[0]).behaviorobserve('discount-3'))					
			.map(([e1, e2, e3]) => [Number(e1), Number(e2), Number(e3)])
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

window.customElements.define('headline-input-base-ce', HeadlineInputBaseCE);

export { HeadlineInputBaseCE };

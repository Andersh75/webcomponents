

const tpl = window.document.createElement("template");
tpl.innerHTML = `
<link rel="stylesheet" href="//cdn.jsdelivr.net/chartist.js/latest/chartist.min.css">
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">

	<style>
			:host {
				display: grid;
				padding: 40px;
				padding-top: 60px;
				background-color: azure;
				grid-template-columns: 100%;
  				grid-template-rows: auto;
				grid-column-gap: 20px;
				grid-row-gap: 20px;
			}


			#anyheadline::slotted(*) {
				color: green;
				grid-column-start: 1;
  				grid-column-end: 1;
  				grid-row-start: 1;
  				grid-row-end: 1;
			}

			#anycontainer::slotted(*) {
				color: green;
				grid-column-start: auto;
  				grid-column-end: auto;
  				grid-row-start: auto;
  				grid-row-end: auto;
			}
			
			
			</style>
		<slot id="anyheadline" name="anyheadline"></slot>
		<slot id="anycontainer" name="anycontainer"></slot>
`;

	class SectionOutputCE extends CustomElement2 {

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

			//global
			this.ctrl.clearsection = function() {
			// 	console.log('CLEARING SECTION');
			// 	let anycontainer = that.shadowRoot.querySelector('#anycontainer');
			// 	//console.log(anycontainer.assignedNodes());
			// 	Array.prototype.slice.call(anycontainer.assignedNodes()).forEach(node => {
			// 		eventDispatcher(node.eventTarget, 'clearfromparent');
			// 		console.log(node);
			// 	})
			}

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
		}

		extendView(that, model) {
			
		}		

		extendModel(that) {
			
		}
	}

	window.customElements.define('section-output-ce', SectionOutputCE);
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

			#select {
				color: green;
				grid-column-start: 1;
  				grid-column-end: 1;
  				grid-row-start: 4;
  				grid-row-end: 4;
			}


			</style>

			<headline-base-ce id="headline" title class="h5"></headline-base-ce>
			<select-base-ce id="select" sb="" selectedindex></select-base-ce>
`;

class HeadlineSelectBaseCE extends CustomElement2 {

	constructor() {
		super();
		this.tpl = tpl;
		this.parent;
		this.extend();
	}
		
	static get observedAttributes() {
		return [ 'title', 'placeholder', 'datatarget', 'selectedindex' ];
	}

	extendBase() {
		this.extendView(this, this.model); //adds new methods to this.view
		this.extendCtrl(this, this.model, this.view); //adds new methods to this.ctrl
	}

	extendCtrl(that, model, view) {
	

		//init
		this.ctrl.run = function() {
			let headline = that.shadowRoot.querySelector('#headline');
			let select = that.shadowRoot.querySelector('#select');
			eventDispatcher(headline.eventTarget, 'attributefromparent', {parent: that, attribute: 'title', data: that.title});
			eventDispatcher(select.eventTarget, 'attributefromparent', {parent: that, attribute: 'selectedindex', data: that.selectedindex});
			eventDispatcher(select.eventTarget, 'attributefromparent', {parent: that, attribute: 'sb', data: that.sb});
		};

		//stream from element
		this.ctrl.stream = function() {
			const element$ = function(element) {
				return Rx.Observable.merge(Rx.Observable.of(element), Rx.Observable.fromEvent(element, 'blur').map(x => x.target), Rx.Observable.fromEvent(element, 'click').map(x => x.target), Rx.Observable.fromEvent(element, 'keyup').filter(x => x.keyCode == 13).map(x => x.target));
			};

			element$(that)
			.map(element => element.value)
			.subscribe(myRxmq.channel(that.sbChannel).behaviorsubject(that.sbSubject));
		};

		this.ctrl.changedAttribute = function(details) {
			// console.log('DETAILS!');
			// console.log(details.changedAttribute.newVal);
			myRxmq.channel(that.sbChannel).behaviorsubject(that.sbSubject).next(details.changedAttribute.newVal);
		};


		//local events initiated by user


		//local events initiated by child

		//local events initiated by global stream

		//local events initiated by parent
		this.ctrl.clearallfromparent = function(e) {
			let select = that.shadowRoot.querySelector('#select');
			eventDispatcher(select.eventTarget, 'clearselffromparent', {parent: that, attribute: 'selectedindex', data: 0});
		};

	}
	
	//View
	extendView(that, model) {

	}
	
	//Model
	extendModel(that) {

	}


}

window.customElements.define('headline-select-base-ce', HeadlineSelectBaseCE);

export { HeadlineSelectBaseCE };
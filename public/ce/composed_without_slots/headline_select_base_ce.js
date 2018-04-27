class HeadlineSelectBaseCE extends CustomElement3 {

	constructor() {
		super();
		//this.parent;		
	}
		
	// static get observedAttributes() {
	// 	return [ 'title', 'placeholder', 'datatarget', 'selectedindex' ];
	// }

	extend() {
		HeadlineSelectBaseCE.extend.call(this);
		this.extendBaseModel(this); //adds new methods to this.model
		this.extendBaseView(this, this.model); //adds new methods to this.view
		this.extendBaseCtrl(this, this.model, this.view); //adds new methods to this.ctrl
	}

	extendCtrl(that, model, view) {
	
		console.log('extending');
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

		this.ctrl.changedAttribute = function(details, that) {
			console.log('DETAILS!!!');
			console.log(details);
			console.log(that);
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
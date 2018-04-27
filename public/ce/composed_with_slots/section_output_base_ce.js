class SectionOutputBaseCE extends CustomElement3 {

	constructor() {
		super();
		//this.parent;
	}

	// static get observedAttributes() {
	// 	return [];
	// }

	extend() {
		SectionOutputBaseCE.extend.call(this);
		this.extendBaseModel(this); //adds new methods to this.model
		this.extendBaseView(this, this.model); //adds new methods to this.view
		this.extendBaseCtrl(this, this.model, this.view); //adds new methods to this.ctrl
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

window.customElements.define('section-output-base-ce', SectionOutputBaseCE);

export { SectionOutputBaseCE };
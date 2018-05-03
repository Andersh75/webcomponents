class ButtonBaseCE extends CustomElement3 {

	constructor() {
		super();
		//this.parent;
	}

		
	// static get observedAttributes() {
	// 	return [ 'toggle', 'value' ];
	// }

	extend() {
		ButtonBaseCE.extend.call(this);
		this.extendBaseModel(this); //adds new methods to this.model
		this.extendBaseView(this, this.model); //adds new methods to this.view
		this.extendBaseCtrl(this, this.model, this.view); //adds new methods to this.ctrl
	}

	extendCtrl(that, model, view) {

		//init
		this.ctrl.run = function() {
			if (!h.boolean.isEmpty(that.value)) {
				let attribute = 'value';
				that.view.updateView(attribute, that.value);
			}
			if (!h.boolean.isEmpty(that.toggle)) {
				let attribute = 'toggle';
				that.view.updateView(attribute, that.toggle);
			}

			// Rx.Observable.fromEvent(that.shadowRoot.querySelector('button'), 'click')
			// .subscribe(myRxmq.channel(that.sbChannel).subject(that.sbSubject));

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


		//local events initiated by parent
		this.ctrl.toggleAttributeFromParent = function(e) {
			parent = e.detail;
			that.toggle = parent.toggle;
			let attribute = 'toggle';
			that.model.updateAttributeAndModel(attribute, that.toggle);
		};


		//local events initiated by user
		// this.ctrl.useraction = function(e) {
		// 	let attribute = e.detail.attribute
		// 	// let data = e.detail.data;
		// 	// that[attribute] = data;
		// 	console.log('TOGGLE');
		// 	console.log(e.detail);
		// 	if(that[attribute] === "on") {
		// 		that[attribute] = "off";
		// 		that.model.updateModelWithAttribute(attribute, that[attribute]);
		// 	} else {
		// 		that[attribute] = "on";
		// 		that.model.updateModelWithAttribute(attribute, that[attribute]);
				
		// 	}
		// };
	}

	extendView(that, model) {
		this.view.renderValue = function(obj) {
			that.shadowRoot.querySelector('button').textContent = obj;
		};

		this.view.updateView = function(attribute, value) {
			switch(attribute) {
				case 'value':
				that.view.renderValue.call(that, value);
				break;
			}
		};
	}

	extendModel(that) {
		let db ={};
		db.toggle;
		db.value;

		this.model.updateModelWithAttribute = function(attribute, newVal, parent) {
			let oldVal;
			that[attribute] = newVal;
			if (parent !== undefined) {
				that.parent = parent;
			}

			switch(attribute) {
				case 'toggle':
					oldVal = db.toggle;
					db.toggle = newVal;
					eventDispatcher(that.eventTarget, 'updatedmodel', {parent: that.parent, child: that, name: 'toggle', oldVal: oldVal, newVal: db.toggle});
					break;
				case 'value':
					oldVal = db.value;
					db.value = newVal;
					eventDispatcher(that.eventTarget, 'updatedmodel', {parent: that.parent, child: that, name: 'value', oldVal: oldVal, newVal: db.value});
					break;
			} 
			
		};

		this.model.get = function(attribute) {
			return db[attribute];
		};
	}
}

window.customElements.define('button-base-ce', ButtonBaseCE);

export { ButtonBaseCE };

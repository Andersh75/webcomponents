class SelectBaseCE extends CustomElement3 {

	constructor() {
		super();
		//this.parent;
	}

	// static get observedAttributes() {
	// 	return [ 'selectedindex', 'sb' ];
	// }

	extend() {
		SelectBaseCE.extend.call(this);
		this.extendBaseModel(this); //adds new methods to this.model
		this.extendBaseView(this, this.model); //adds new methods to this.view
		this.extendBaseCtrl(this, this.model, this.view); //adds new methods to this.ctrl
	}

	
	//Controller
	extendCtrl(that, model, view) {
		
		//intit
		this.ctrl.run = function() {
			if (!h.boolean.isEmpty(that.sb)) {
				that.ctrl.stream();
			}
			if (!h.boolean.isEmpty(that.selectedindex)) {
				let attribute = 'selectedindex';
				view.updateView(attribute, that[attribute]);
			}
		};


		//stream from element
		this.ctrl.stream = function() {
			// console.log('STREAM IN SELECT');
			// const element$ = function(element) {
			// 	return Rx.Observable.merge(Rx.Observable.of(element), Rx.Observable.fromEvent(element, 'change').map(x => x.target), Rx.Observable.fromEvent(element, 'select').map(x => x.target), Rx.Observable.fromEvent(element, 'blur').map(x => x.target), Rx.Observable.fromEvent(element, 'click').map(x => x.target), Rx.Observable.fromEvent(element, 'keyup').filter(x => x.keyCode == 13).map(x => x.target));
			// };

			// element$(that)
			// // .map(element => element.value)
			// // .subscribe(myRxmq.channel(that.sbChannel).behaviorsubject(that.sbSubject));
			// .subscribe(console.log)
		};

		this.ctrl.changedAttribute = function(details) {
			// console.log('DETAILS!');
			// console.log(details.changedAttribute);
			// if (details.changedAttribute.name === "selectedindex") {
			// 	console.log('here');
			// 	console.log(that.shadowRoot.querySelector('#select').options[details.changedAttribute.newVal].value);
			// 	myRxmq.channel(that.sbChannel).behaviorsubject(that.sbSubject).next(that.shadowRoot.querySelector('#select').options[details.changedAttribute.newVal].value);
			// }

			
		};

		this.ctrl.addedUserAction = function(data, attribute) {
			return new Promise((resolve, reject) => {
				console.log('FRIST HERE');
				resolve({data: data, attribute: attribute});
			}
		)};


		//local events initiated by parent


		//local events initiated by model


	}


	//View
	//always passive
	extendView(that, model) {
		this.view.renderSelectedIndex = function(obj) {
			console.log('THEOBJ!');
			console.log(obj);
			Array.prototype.slice.call(that.shadowRoot.querySelector('#select')).forEach(child => {
				child.removeAttribute('selected');
			})
			that.shadowRoot.querySelector('#select').children[obj].setAttribute('selected', 'selected');
		};

		this.view.updateView = function(attribute, item) {
			switch(attribute) {
				case 'selectedindex':
				that.view.renderSelectedIndex.call(that, item);
				break;
			}	
		};

	}
	
	//Model
	extendModel(that) {
		let db ={};
		db.selectedindex = "0";
		db.selectedvalue = "";

		this.model.updateModelWithAttribute = function(attribute, newVal, parent) {
			let oldVal = {};

			if (attribute === 'selectedindex') {
				console.log('!selecteindex');
				console.log('newVal');
				console.log(newVal);
				console.log(newVal.selectedindex);
				that[attribute] = newVal.selectedindex;
				console.log('!selectedvalue');
				console.log(that.shadowRoot.querySelector('#select').children[newVal.selectedindex]);
				that.selectedvalue = that.shadowRoot.querySelector('#select').children[newVal.selectedindex].value;
			} else {
				that[attribute] = newVal;
			}
			
			if (parent !== undefined) {
				that.parent = parent;
			}

			switch(attribute) {
				case 'selectedindex':
					oldVal.selectedindex = db.selectedindex;
					db.selectedindex = newVal.selectedindex;

					oldVal.selectedvalue = db.selectedvalue;
					db.selectedvalue = that.shadowRoot.querySelector('#select').children[newVal.selectedindex].value;
					eventDispatcher(that.eventTarget, 'updatedmodel', {parent: that.parent, child: that, name: 'selectedindex', oldVal: oldVal, newVal: db});
					break;
			} 
		};

		this.model.get = function(attribute) {
			return db[attribute];
		};
	}
}

window.customElements.define('select-base-ce', SelectBaseCE);

export { SelectBaseCE };
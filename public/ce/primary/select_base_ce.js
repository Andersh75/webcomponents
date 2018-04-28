class SelectBaseCE extends CustomElement3 {

	constructor() {
		super();
		//this.parent;
	}

	// static get observedAttributes() {
	// 	return [ 'selectedindex', 'sb', 'sr' ];
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
			if (!h.boolean.isEmpty(that.selectedindex)) {
				that.selectedvalue = that.shadowRoot.querySelector('#select').options[that.selectedindex].value;
				let attribute = 'selectedindex';
				view.updateView(attribute, that[attribute]);

				that.ctrl.stream();				
			}		
		};


		//stream from element
		this.ctrl.stream = function() {
			console.log('stream: select_base');
			if (!h.boolean.isEmpty(that.sb)) {
				myRxmq.channel(that.sbChannel).behaviorsubject(that.sbSubject).next(that.selectedvalue);
			}	
		};

		this.ctrl.changedAttribute = function(details) {
			console.log('ChangedAttribute: select_base');
			console.log(details);
			if (details.changedAttribute.name === "selectedindex") {
				that.selectedvalue = that.shadowRoot.querySelector('#select').options[details.changedAttribute.newVal].value;
			}

			if (details.changedAttribute.name === "selectedvalue") {
				if (!h.boolean.isEmpty(that.sb)) {
					myRxmq.channel(that.sbChannel).behaviorsubject(that.sbSubject).next(details.changedAttribute.newVal);
				}	
			}		
		};

		this.ctrl.addedUserAction = function(data, attribute) {
			return new Promise((resolve, reject) => {
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
				that[attribute] = newVal.selectedindex;
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
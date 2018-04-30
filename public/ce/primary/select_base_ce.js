class SelectBaseCE extends CustomElement3 {

	constructor() {
		super();
		//this.parent;
	}

	// static get observedAttributes() {
	// 	return [ 'selectedindex', 'selectedvalue', 'sb', 'sr'];
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
				console.log('that.selectedvalue');
				console.log(that.selectedvalue);
				that.selectedvalue = that.shadowRoot.querySelector('#select').options[that.selectedindex].value;
				let attribute = 'selectedindex';
				that[attribute] = that.selectedindex;
				// let load = {};
				// load[attribute] = that.selectedindex;
				// load.selectedvalue = that.selectedvalue;
				// that.model.updateModelWithAttribute(attribute, load);

				// that.ctrl.stream(that.selectedvalue);				
			}		
		};

		this.ctrl.changedAttribute = function(details) {
			if (details.changedAttribute.name === "selectedindex") {
				if (h.boolean.isEmpty(that.selectedvalue)) {	
					that.selectedvalue = that.shadowRoot.querySelector('#select').options[that.selectedindex].value;
				}
			}

			let load = {};
			load[details.changedAttribute.name] = details.changedAttribute.newVal;
			model.updateModelWithAttribute(details.changedAttribute.name, load);
			
			if (details.changedAttribute.name === "selectedvalue") {
				console.log('Streaming selectedvalue');
				that.ctrl.stream(that.selectedvalue);
			}
		};

		this.ctrl.addedUserAction = function(data, attribute) {
			return new Promise((resolve, reject) => {
				resolve({data: data, attribute: attribute});
			});
		};


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
		db.sb = "";

		this.model.updateModelWithAttribute = function(attribute, newVal, parent) {
			let oldVal = {};
			
			if (parent !== undefined) {
				that.parent = parent;
			}

			switch(attribute) {
				case 'selectedindex':
					//that[attribute] = newVal.selectedindex;
					//that.selectedvalue = that.shadowRoot.querySelector('#select').children[newVal.selectedindex].value;

					oldVal.selectedindex = db.selectedindex;
					db.selectedindex = newVal.selectedindex;

					//oldVal.selectedvalue = db.selectedvalue;
					//db.selectedvalue = that.shadowRoot.querySelector('#select').children[newVal.selectedindex].value;
					eventDispatcher(that.eventTarget, 'updatedmodel', {parent: that.parent, child: that, name: 'selectedindex', oldVal: oldVal, newVal: db});
					//eventDispatcher(that.eventTarget, 'updatedmodel', {parent: that.parent, child: that, name: 'selectedvalue', oldVal: oldVal, newVal: db});
					break;
				case 'selectedvalue':
					//that[attribute] = newVal.selectedindex;
					//that.selectedvalue = that.shadowRoot.querySelector('#select').children[newVal.selectedindex].value;

					oldVal.selectedvalue = db.selectedvalue;
					db.selectedvalue = newVal.selectedvalue;
					eventDispatcher(that.eventTarget, 'updatedmodel', {parent: that.parent, child: that, name: 'selectedvalue', oldVal: oldVal, newVal: db});
					break;
				case 'sb':
					//that[attribute] = newVal.selectedindex;
					//that.selectedvalue = that.shadowRoot.querySelector('#select').children[newVal.selectedindex].value;

					oldVal.sb = db.sb;
					db.sb = newVal.sb;
					eventDispatcher(that.eventTarget, 'updatedmodel', {parent: that.parent, child: that, name: 'sb', oldVal: oldVal, newVal: db});
					break;
				default:
					//that[attribute] = newVal;
					console.log('WRONG select');
			} 
		};

		this.model.get = function(attribute) {
			return db[attribute];
		};
	}
}

window.customElements.define('select-base-ce', SelectBaseCE);

export { SelectBaseCE };
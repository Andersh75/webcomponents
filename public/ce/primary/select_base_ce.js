class SelectBaseCE extends CustomElement3 {

	constructor() {
		super();
	}

	extend() {
		SelectBaseCE.extend.call(this);
		this.extendBaseModel(this); //adds new methods to this.model
		this.extendBaseView(this, this.model); //adds new methods to this.view
		this.extendBaseCtrl(this, this.model, this.view); //adds new methods to this.ctrl
	}

	
	//Controller
	extendCtrl(model, view) {
		
		//intit
		this.ctrl.run = function() {
			if (!h.boolean.isEmpty(this.selectedindex)) {
				this.selectedvalue = this.shadowRoot.querySelector('#select').options[this.selectedindex].value;
				let attribute = 'selectedindex';
				this[attribute] = this.selectedindex;				
			}		
		};

		this.ctrl.changedAttribute = function(changedAttribute) {
			let attribute = changedAttribute.attribute;

			if (attribute === "selectedindex") {
				if (h.boolean.isEmpty(this.selectedvalue)) {	
					this.selectedvalue = this.shadowRoot.querySelector('#select').options[this.selectedindex].value;
				}

				let newVal = model.get(attribute);
				this.view.updateView.call(this, attribute, newVal);
			}
			
			if (attribute === "selectedvalue") {
				this.ctrl.stream(this.selectedvalue);
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
	extendView(model) {
		this.view.renderSelectedIndex = function(obj) {
			Array.prototype.slice.call(this.shadowRoot.querySelector('#select')).forEach(child => {
				child.removeAttribute('selected');
			})
			this.shadowRoot.querySelector('#select').children[obj].setAttribute('selected', 'selected');
		};

		this.view.updateView = function(attribute, item) {
			switch(attribute) {
				case 'selectedindex':
				this.view.renderSelectedIndex.call(this, item);
				break;
			}	
		};

	}
	
	//Model
	extendModel() {
		this.db.selectedindex = "0";
		this.db.selectedvalue = "";
		this.db.sb = "";
	}
}

window.customElements.define('select-base-ce', SelectBaseCE);

export { SelectBaseCE };
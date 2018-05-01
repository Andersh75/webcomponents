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
	extendCtrl(that, model, view) {
		
		//intit
		this.ctrl.run = function() {
			if (!h.boolean.isEmpty(that.selectedindex)) {
				that.selectedvalue = that.shadowRoot.querySelector('#select').options[that.selectedindex].value;
				let attribute = 'selectedindex';
				that[attribute] = that.selectedindex;				
			}		
		};

		this.ctrl.changedAttribute = function(changedAttribute) {
			if (changedAttribute.attribute === "selectedindex") {
				if (h.boolean.isEmpty(that.selectedvalue)) {	
					that.selectedvalue = that.shadowRoot.querySelector('#select').options[that.selectedindex].value;
				}
			}
			
			if (changedAttribute.attribute === "selectedvalue") {
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
				console.log('THE ITEM');
				console.log(item);
				that.view.renderSelectedIndex.call(that, item);
				break;
			}	
		};

	}
	
	//Model
	extendModel(that) {
		that.db.selectedindex = "0";
		that.db.selectedvalue = "";
		that.db.sb = "";
	}
}

window.customElements.define('select-base-ce', SelectBaseCE);

export { SelectBaseCE };
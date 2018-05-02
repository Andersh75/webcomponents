class TrBaseCE extends CustomElement3 {

	constructor() {
		super();
	}

	extend() {
		TrBaseCE.extend.call(this);
		this.extendBaseModel(this); //adds new methods to this.model
		this.extendBaseView(this, this.model); //adds new methods to this.view
		this.extendBaseCtrl(this, this.model, this.view); //adds new methods to this.ctrl
	}



	extendCtrl(that, model, view) {

		//init
		this.ctrl.run = function() {
			console.log('HERE');
			if (!h.boolean.isEmpty(that.cells)) {
				let attribute = 'cells';
				that[attribute] = that.cells;
			}



			// if (!h.boolean.isEmpty(that.sr)) {
			// 	console.log('THAT SR');
			// 	console.log(that.sr);
			// 	let remoteAndLocal = h.str.stringToArrayUsingSplitter('@', that.sr); //makes an array of [remote, local...] listener
			// 	let channelAndSubject = h.str.stringToArrayUsingSplitter(':', remoteAndLocal[0]); //makes an array of [remote, local...] listener
			// 	let channel = channelAndSubject[0];
			// 	let subject = channelAndSubject[1];
			// 	let local = remoteAndLocal.slice(1)[0];
			// 	that.srChannel = channel;
			// 	that.srSubject = subject;
			// }
		};

		this.ctrl.changedAttribute = function(changedAttribute) {
			let attribute = changedAttribute.attribute;
			
			if (attribute === "cells") {
				
				let newVal = model.get(attribute);
				that.view.updateView(attribute, newVal);

				// if (!h.boolean.isEmpty(that.srdispatch)) {
				// 	let remoteAndLocal = h.str.stringToArrayUsingSplitter('@', that.srdispatch); //makes an array of [remote, local...] listener
				// 	let channelAndSubject = h.str.stringToArrayUsingSplitter(':', remoteAndLocal[0]); //makes an array of [remote, local...] listener
				// 	let channel = channelAndSubject[0];
				// 	let subject = channelAndSubject[1];
				// 	let local = remoteAndLocal.slice(1)[0];
				// 	that.tableData.channel = channel;
				// 	that.tableData.subject = subject;
				// 	that.tableData.local = local;
				// }

			}	
		};

		this.ctrl.addedUserAction = function(data, attribute) {
			return new Promise((resolve, reject) => {
				resolve({data: data, attribute: attribute});
			});
		};


		//local events initiated by parent


		//local events initiated by model


		//local events initiated by global stream
	}

	extendView(that, model) {
		this.view.renderCells = function(obj) {
			let cells = obj;
			for (let i = 0; i < Number(cells); i++) {
				let tableCell = document.createElement('td-one-ce');
				tableCell.setAttribute('slot', 'td');
				that.appendChild(tableCell);
			}
		};

		this.view.updateView = function(attribute, data) {
			switch(attribute) {
				case 'cells':
				that.view.renderCells.call(that, data);
				break;
			}
		};
	}

	extendModel(that) {
		that.db.cells = "";
		that.db.sb = "";
	}
}

window.customElements.define('tr-base-ce', TrBaseCE);

export { TrBaseCE };




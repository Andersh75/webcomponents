class TableBaseCE extends CustomElement3 {

	constructor() {
		super();
	}

	extend() {
		TableBaseCE.extend.call(this);
		this.extendBaseModel(this); //adds new methods to this.model
		this.extendBaseView(this, this.model); //adds new methods to this.view
		this.extendBaseCtrl(this, this.model, this.view); //adds new methods to this.ctrl
	}



	extendCtrl(that, model, view) {

		//init
		this.ctrl.run = function() {
			console.log('HERE');
			if (!h.boolean.isEmpty(that.srdispatch)) {
				let attribute = 'srdispatch';
				that[attribute] = that.srdispatch;
			}

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

			if (attribute === "srdispatch") {
				console.log('that.srdispatch');
				console.log(that.srdispatch);
				let remoteAndLocal = h.str.stringToArrayUsingSplitter('@', that.srdispatch);
				console.log(remoteAndLocal);
				console.log(JSON.parse(remoteAndLocal[0]));
				that.local = remoteAndLocal[1];
				console.log(that.local);
				that.remote = JSON.parse(remoteAndLocal[0]);
				console.log(that.remote);
			}
			
			if (attribute === "cells") {

				console.log('TABLE KIND');
				console.log(that.type);
				
				let newVal = model.get(attribute);
				if (that.type === 'capitalize') {
					that.view.updateViewCapitalize(attribute, newVal);
				}

				if (that.type === 'match') {
					that.view.updateViewMatch(attribute, newVal);
				}
				

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

			// if (attribute === "srdispatch") {
				
			// 	let newVal = model.get(attribute);
			// 	that.view.updateView(attribute, newVal);

			// 	// if (!h.boolean.isEmpty(that.srdispatch)) {
			// 	// 	let remoteAndLocal = h.str.stringToArrayUsingSplitter('@', that.srdispatch); //makes an array of [remote, local...] listener
			// 	// 	let channelAndSubject = h.str.stringToArrayUsingSplitter(':', remoteAndLocal[0]); //makes an array of [remote, local...] listener
			// 	// 	let channel = channelAndSubject[0];
			// 	// 	let subject = channelAndSubject[1];
			// 	// 	let local = remoteAndLocal.slice(1)[0];
			// 	// 	that.tableData.channel = channel;
			// 	// 	that.tableData.subject = subject;
			// 	// 	that.tableData.local = local;
			// 	// }

			// }	
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
		this.view.renderCellsCapitalize = function(obj) {
			let rowsAndCells = h.str.stringToArrayUsingSplitter(':', obj);
			let rows = rowsAndCells[0];
			let cells = rowsAndCells[1];

			let sbChannelAndSubject = h.str.stringToArrayUsingSplitter(':', that.sbdispatch); //makes an array of [remote, local...] listener
			let sbChannel = sbChannelAndSubject[0];
			let sbSubject = sbChannelAndSubject[1];

			let srLocal = that.local;

			let srChannelAndSubject = h.str.stringToArrayUsingSplitter(':', that.remote[0].sr); //makes an array of [remote, local...] listener
			let srChannel = srChannelAndSubject[0];
			let srSubject = srChannelAndSubject[1];
			




			headerRow(cells, 'Kostnadsslag\\År', that);

			normalRow(cells, that, srLocal, rows, sbChannel, sbSubject);






		};

		this.view.renderCellsMatch = function(obj) {
			// console.log('that.srdispatch');
			// console.log(that.srdispatch);
			// console.log(obj);

			let srRemoteAndLocal = h.str.stringToArrayUsingSplitter('@', that.srdispatch); //makes an array of [remote, local...] listener
			let srChannelAndSubject = h.str.stringToArrayUsingSplitter(':', srRemoteAndLocal[0]); //makes an array of [remote, local...] listener
			let srChannel = srChannelAndSubject[0];
			let srSubject = srChannelAndSubject[1];
			let srLocal = srRemoteAndLocal.slice(1)[0];

			let sbChannelAndSubject = h.str.stringToArrayUsingSplitter(':', that.sbdispatch); //makes an array of [remote, local...] listener
			let sbChannel = sbChannelAndSubject[0];
			let sbSubject = sbChannelAndSubject[1];

			let rowsAndCells = h.str.stringToArrayUsingSplitter(':', obj);
			let rows = rowsAndCells[0];
			let cells = rowsAndCells[1];

			for (let i = 1; i <= Number(rows); i++) {
				// console.log('MATCH ROWS');
				// console.log(Number(rows));
				// console.log(i);
				let tableRow = document.createElement('tr');
				for (let j = 1; j <= Number(cells); j++) {
					let tableCell = document.createElement('td');
					let textContent = document.createElement('headline-one-ce');
					textContent.setAttribute('sr', srChannel + ':' + srSubject + "-" + j + '@' + srLocal);
					textContent.setAttribute('year', j);
					textContent.setAttribute('title', "");
					textContent.setAttribute('sb', sbChannel + ":" + sbSubject + "-" + j);
					tableCell.appendChild(textContent);
					tableRow.appendChild(tableCell);
				}
				that.shadowRoot.querySelector('#table').appendChild(tableRow);
			}
		};


		this.view.updateViewCapitalize = function(attribute, data) {
			switch(attribute) {
				case 'cells':
				that.view.renderCellsCapitalize.call(that, data);
				break;
			}
		};

		this.view.updateViewMatch = function(attribute, data) {
			switch(attribute) {
				case 'cells':
				that.view.renderCellsMatch.call(that, data);
				break;
			}
		};
	}

	extendModel(that) {
		that.db.cells = "";
		that.db.sb = "";
		that.db.sr = "";
		that.db.sbdispatch = "";
		that.db.srdispatch = "";
		that.db.kind = "";
	}
}

function headerRow(cells, title, that) {
	let tableRow = document.createElement('tr');
	tableRow.setAttribute('cells', cells);
	tableRow.setAttribute('slot', 'tr');

	let tableCell = document.createElement('th');
	let textContent = document.createElement('headline-one-ce');
	textContent.setAttribute('sr', "");
	textContent.setAttribute('year', "");
	textContent.setAttribute('title', "Kostnadsslag\\År");
	textContent.setAttribute('sb', "");
	tableCell.appendChild(textContent);
	tableRow.appendChild(tableCell);

	for (let j = 1; j <= Number(cells); j++) {
		let tableCell = document.createElement('th');
		tableCell.setAttribute('style', 'width: 9%');
		let textContent = 'År ' + j;
		tableCell.textContent = textContent;
		tableRow.appendChild(tableCell);
	}
	that.shadowRoot.querySelector('#table').appendChild(tableRow);
}


function normalRow(cells, that, srLocal, rows, sbChannel, sbSubject) {
	for (let i = 1; i <= Number(rows); i++) {
		let srChannelAndSubject = h.str.stringToArrayUsingSplitter(':', that.remote[i-1].sr); //makes an array of [remote, local...] listener
		let srChannel = srChannelAndSubject[0];
		let srSubject = srChannelAndSubject[1];
	
		let tableRow = document.createElement('tr');
		tableRow.setAttribute('cells', cells);
		tableRow.setAttribute('slot', 'tr');
	
		let tableCell = document.createElement('th');
		let textContent = document.createElement('headline-one-ce');
		textContent.setAttribute('sr', "");
		textContent.setAttribute('year', "");
		textContent.setAttribute('title', that.remote[i-1].name);
		textContent.setAttribute('sb', "");
		tableCell.appendChild(textContent);
		tableRow.appendChild(tableCell);
		for (let j = 1; j <= Number(cells); j++) {
			let tableCell = document.createElement('td');
			let textContent = document.createElement('headline-one-ce');
			textContent.setAttribute('sr', srChannel + ':' + srSubject + '@' + srLocal);
			textContent.setAttribute('year', j);
			textContent.setAttribute('title', "");
			textContent.setAttribute('sb', sbChannel + ":" + sbSubject + "-" + j);
			tableCell.appendChild(textContent);
			tableRow.appendChild(tableCell);
		}
		that.shadowRoot.querySelector('#table').appendChild(tableRow);
	}
}






window.customElements.define('table-base-ce', TableBaseCE);

export { TableBaseCE };




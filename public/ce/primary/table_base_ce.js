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





	extendCtrl(model, view) {

		//init
		this.ctrl.run = function () {
			if (!h.boolean.isEmpty(this.period)) {
				let attribute = 'period';
				this[attribute] = this.period;
			}
		};


		this.ctrl.addedUserAction = function (data, attribute) {
			return new Promise((resolve, reject) => {
				resolve({
					data: data,
					attribute: attribute
				});
			});
		};


		//local events initiated by parent


		//local events initiated by model


		//local events initiated by global stream
		this.ctrl.period$ = function (e) {
			combineLatest$(myRxmq.channel(e.detail[0]).behaviorobserve(e.detail[1]))
				.map((e) => Number(e))
				.filter((e) => !isNaN(e))
				.subscribe((x) => {
					this.period = x;
				});
		};
	}

	extendView(model) {
		this.view.renderCellsCapitalize = function (obj) {
			while (this.shadowRoot.querySelector('#table').firstChild) {
				this.shadowRoot.querySelector('#table').removeChild(this.shadowRoot.querySelector('#table').firstChild);
			}
			let rowsAndCells = h.str.stringToArrayUsingSplitter(':', obj);
			let rows = rowsAndCells[0];
			//let cells = rowsAndCells[1];
			console.log('this.period');
			console.log(this.period);
			let cells = this.period;

			let sbChannelAndSubject = h.str.stringToArrayUsingSplitter(':', this.sbdispatch); //makes an array of [remote, local...] listener
			let sbChannel = sbChannelAndSubject[0];
			let sbSubject = sbChannelAndSubject[1];

			//let srLocal = this.local;

			let srChannelAndSubject = h.str.stringToArrayUsingSplitter(':', this.srDispatchObj[0].sr); //makes an array of [remote, local...] listener
			let srChannel = srChannelAndSubject[0];
			let srSubject = srChannelAndSubject[1];





			headerRow.call(this, cells, 'Kostnadsslag\\År');

			normalRow.call(this, cells, sbChannel, sbSubject);






		};

		this.view.renderCellsMatch = function (obj) {
			// console.log('this.srdispatch');
			// console.log(this.srdispatch);
			// console.log(obj);


			let srRemoteAndLocal = h.str.stringToArrayUsingSplitter('@', this.srdispatch); //makes an array of [remote, local...] listener
			let srChannelAndSubject = h.str.stringToArrayUsingSplitter(':', srRemoteAndLocal[0]); //makes an array of [remote, local...] listener
			let srChannel = srChannelAndSubject[0];
			let srSubject = srChannelAndSubject[1];
			let srLocal = srRemoteAndLocal.slice(1)[0];

			let sbChannelAndSubject = h.str.stringToArrayUsingSplitter(':', this.sbdispatch); //makes an array of [remote, local...] listener
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
				this.shadowRoot.querySelector('#table').appendChild(tableRow);
			}
		};


		this.view.updateView = function (attribute, data) {
			console.log('in update view - table');
			switch (attribute) {
				case 'period':
					console.log('in update view period - table');
					if (this.type === 'capitalize') {

						this.view.renderCellsCapitalize.call(this, data);
					}
					break;
			}
		};

		this.view.updateViewMatch = function (attribute, data) {
			switch (attribute) {
				case 'cells':
					this.view.renderCellsMatch.call(this, data);
					break;
			}
		};
	}

	extendModel() {

	}
}

const combineLatest$ = function (...streams) {
	return Rx.Observable.combineLatest(streams);
};

function headerRow(cells, title) {

	let tableHead = document.createElement('thead');
	tableHead.setAttribute('class', 'thead-dark');
	let tableRow = document.createElement('tr');
	//tableRow.setAttribute('class', 'table-secondary');
	tableRow.setAttribute('cells', cells);
	tableRow.setAttribute('slot', 'tr');

	let tableCell = document.createElement('th');

	let textContent = document.createElement('headline-one-ce');
	textContent.setAttribute('sr', "");
	textContent.setAttribute('year', "");
	textContent.setAttribute('title', this.title);
	textContent.setAttribute('sb', "");
	tableCell.appendChild(textContent);
	tableRow.appendChild(tableCell);


	for (let j = 0; j <= Number(cells); j++) {
		let tableCell = document.createElement('th');
		tableCell.setAttribute('style', 'width: 9%');
		let textContent = 'År ' + j;
		tableCell.textContent = textContent;
		tableRow.appendChild(tableCell);
	}

	tableHead.appendChild(tableRow);
	this.shadowRoot.querySelector('#table').appendChild(tableHead);
}


function normalRow(cells, sbChannel, sbSubject) {

	let rows = this.srDispatchObj.length;
	let tableBody = document.createElement('tbody');
	for (let i = 1; i <= rows; i++) {
		console.log(i);
		let srChannelAndSubject = h.str.stringToArrayUsingSplitter(':', this.srDispatchObj[i - 1].sr); //makes an array of [remote, local...] listener
		let srChannel = srChannelAndSubject[0];
		let srSubject = srChannelAndSubject[1];
		let srLocal = JSON.stringify(this.srDispatchObj[i - 1]['local']);

		let tableRow = document.createElement('tr');
		tableRow.setAttribute('cells', cells);
		tableRow.setAttribute('slot', 'tr');

		let tableCell = document.createElement('th');
		let textContent = document.createElement('headline-one-ce');
		textContent.setAttribute('sr', "");
		textContent.setAttribute('year', "");
		textContent.setAttribute('title', this.srDispatchObj[i - 1].name);
		textContent.setAttribute('sb', "");
		tableCell.appendChild(textContent);
		tableRow.appendChild(tableCell);


		if (srLocal === 'initial$') {
			let tableCell = document.createElement('td');
			let textContent = document.createElement('headline-one-ce');
			textContent.setAttribute('sr', srChannel + ':' + srSubject + '@' + srLocal);
			textContent.setAttribute('year', 0);
			textContent.setAttribute('title', "");
			textContent.setAttribute('sb', sbChannel + ":" + sbSubject + "-" + 0);
			tableCell.appendChild(textContent);
			tableRow.appendChild(tableCell);
			for (let j = 1; j <= Number(cells); j++) {
				let tableCell = document.createElement('td');
				let textContent = document.createElement('headline-one-ce');
				//textContent.setAttribute('sr', srChannel + ':' + srSubject + '@' + srLocal);
				textContent.setAttribute('year', j);
				textContent.setAttribute('title', "");
				textContent.setAttribute('sb', sbChannel + ":" + sbSubject + "-" + j);
				tableCell.appendChild(textContent);
				tableRow.appendChild(tableCell);
			}
		} else {
			let tableCell = document.createElement('td');
			let textContent = document.createElement('headline-one-ce');
			//textContent.setAttribute('sr', srChannel + ':' + srSubject + '@' + srLocal);
			textContent.setAttribute('year', 0);
			textContent.setAttribute('title', "");
			textContent.setAttribute('sb', sbChannel + ":" + sbSubject + "-" + 0);
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
		}

		tableBody.appendChild(tableRow);
	}
	this.shadowRoot.querySelector('#table').appendChild(tableBody);
}






window.customElements.define('table-base-ce', TableBaseCE);

export {
	TableBaseCE
};
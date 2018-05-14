import { CustomElement3 } from '/js/customelement3.js';

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
		this.ctrl.rendertable$ = function (e) {
			combineLatest$(myRxmq.channel(e.detail[0]).behaviorobserve(e.detail[1]))
				.map((e1) => {
					try {
						return e1[0].data;
					} catch (error) {
						return e1[0];
					}
				})
				.map((e1) => Number(e1))
				.filter((e) => !isNaN(e))
				.subscribe((x) => {
					this.period = x;
				});
		};

		this.ctrl.rendertable2$ = function (e) {
			combineLatest$(myRxmq.channel(e.detail[0]).behaviorobserve(e.detail[1]))

				.map((e1) => {
					try {
						return e1[0].data;
					} catch (error) {
						return e1[0];
					}
				})
				.map(([e1, e2]) => [Number(e1), Number(e2)])
				.filter(([e1, e2]) => !isNaN(e1) && !isNaN(e2))
				.do(console.log('periodandlength'))
				.do(x => console.log('pal: ' + x))
				.subscribe((x) => {
					this.startyear = x[1];
					this.period = x[0];
					//console.log(x);
				});
		};
	}

	extendView(model) {
		this.view.renderCells = function (obj) {
			let rows = this.cellDispatchObj.length;
			let cells = this.period;
			
			while (this.shadowRoot.querySelector('#table').firstChild) {
				this.shadowRoot.querySelector('#table').removeChild(this.shadowRoot.querySelector('#table').firstChild);
			}

			headerRow.call(this, cells, 'Kostnadsslag\\År');
			normalRow.call(this, rows, cells);
		};


		this.view.updateView = function (attribute, data) {
			switch (attribute) {
				case 'period':
					this.view.renderCells.call(this, data);
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
	let headerName = this.title;
	
	let tableHead = document.createElement('thead');
	tableHead.setAttribute('class', 'thead-dark');
	
	let tableRow = document.createElement('tr');
	tableRow.setAttribute('cells', cells);
	tableRow.setAttribute('slot', 'tr');

	let tableCell = document.createElement('th');

	let textContent = document.createElement('headline-one-ce');
	textContent.setAttribute('sr', "");
	textContent.setAttribute('year', "");
	textContent.setAttribute('title', headerName);
	textContent.setAttribute('sb', "");
	tableCell.appendChild(textContent);
	tableRow.appendChild(tableCell);


	for (let j = 0; j <= Number(cells); j++) {
		let tableCell = document.createElement('th');
		tableCell.setAttribute('style', 'width: 9%');
		let textContent = 'År ' + (j + this.startyear);
		tableCell.textContent = textContent;
		tableRow.appendChild(tableCell);
	}

	tableHead.appendChild(tableRow);
	this.shadowRoot.querySelector('#table').appendChild(tableHead);
}


function normalRow(rows, cells) {
	let tableBody = document.createElement('tbody');
	let tableArray = [];
	for (let i = 1; i <= rows; i++) {
		let rowArray = [];

		let cellDispatchObj = this.cellDispatchObj[i - 1];
		
		let srObj = cellDispatchObj.sr;
		let srChannel = cellDispatchObj.sr.channel;
		let srSubject = cellDispatchObj.sr.subject;
		let srLocalObj = cellDispatchObj.sr.local;

		let sbObj = cellDispatchObj.sb;
		let sbChannel = cellDispatchObj.sb.channel;
		let sbSubject = cellDispatchObj.sb.subject;
		let sbElement = cellDispatchObj.sb.element;

		let type = cellDispatchObj.type;
		let rowName = cellDispatchObj.name;

		let tableRow = document.createElement('tr');
		tableRow.setAttribute('cells', cells);
		tableRow.setAttribute('slot', 'tr');

		let tableCell = document.createElement('th');
		
		let textContent = document.createElement('headline-one-ce');
		textContent.setAttribute('sr', '');
		textContent.setAttribute('year', '');
		textContent.setAttribute('title', rowName);
		textContent.setAttribute('sb', '');
		tableCell.appendChild(textContent);
		tableRow.appendChild(tableCell);

		if (type === 'initial') {
			let tableCell = document.createElement('td');
			let textContent = document.createElement('headline-thousand-ce');
			//textContent.setAttribute('sr', JSON.stringify(srObj));
			textContent.setAttribute('year', 0);
			textContent.setAttribute('title', '');
			sbObj.year = 0;
			let channel = h.str.adder(sbObj.channel, '-' + 0);
			let sbObj2 = JSON.parse(JSON.stringify(sbObj));
			sbObj2.channel = channel;
			textContent.setAttribute('sb', JSON.stringify(sbObj2));
			
			srObj.year = 0;
			let srObj2 = JSON.parse(JSON.stringify(srObj));

			if (srObj.extend === 'year') {
				channel = h.str.adder(srObj.channel, '-' + 0);
				srObj2.channel = channel;
			}
			textContent.setAttribute('sr', JSON.stringify(srObj2));
			
			tableCell.appendChild(textContent);
			tableRow.appendChild(tableCell);
			rowArray.push(sbObj2);

			for (let j = 1; j <= Number(cells); j++) {
				let tableCell = document.createElement('td');
				let textContent = document.createElement('headline-thousand-ce');
				textContent.setAttribute('year', j);
				textContent.setAttribute('title', '');
				sbObj.year = j;
				let channel = h.str.adder(sbObj.channel, '-' + j);
				let sbObj2 = JSON.parse(JSON.stringify(sbObj));
				sbObj2.channel = channel;
				textContent.setAttribute('sb', JSON.stringify(sbObj2));


				srObj.year = j;
				let srObj2 = JSON.parse(JSON.stringify(srObj));

				if (srObj.extend === 'year') {
					channel = h.str.adder(srObj.channel, '-' + j);
					srObj2.channel = channel;
				}
				textContent.setAttribute('sr', JSON.stringify(srObj2));

				tableCell.appendChild(textContent);
				tableRow.appendChild(tableCell);

				rowArray.push(sbObj2);
			}
		} else {
			let tableCell = document.createElement('td');
			let textContent = document.createElement('headline-thousand-ce');
			textContent.setAttribute('year', 0);
			textContent.setAttribute('title', '');
			sbObj.year = 0;
			let channel = h.str.adder(sbObj.channel, '-' + 0);
			let sbObj2 = JSON.parse(JSON.stringify(sbObj));
			sbObj2.channel = channel;
			textContent.setAttribute('sb', JSON.stringify(sbObj2));

			srObj.year = 0;
			let srObj2 = JSON.parse(JSON.stringify(srObj));

			if (srObj.extend === 'year') {
				channel = h.str.adder(srObj.channel, '-' + 0);
				srObj2.channel = channel;
			}
			textContent.setAttribute('sr', JSON.stringify(srObj2));


			tableCell.appendChild(textContent);
			tableRow.appendChild(tableCell);
			rowArray.push(sbObj2);

			for (let j = 1; j <= Number(cells); j++) {
				let tableCell = document.createElement('td');
				let textContent = document.createElement('headline-thousand-ce');
				//textContent.setAttribute('sr', JSON.stringify(srObj));
				textContent.setAttribute('year', j);
				textContent.setAttribute('title', '');
				sbObj.year = j;
				let channel = h.str.adder(sbObj.channel, '-' + j);
				let sbObj2 = JSON.parse(JSON.stringify(sbObj));
				sbObj2.channel = channel;
				textContent.setAttribute('sb', JSON.stringify(sbObj2));


				srObj.year = j;
				let srObj2 = JSON.parse(JSON.stringify(srObj));

				if (srObj.extend === 'year') {
					channel = h.str.adder(srObj.channel, '-' + j);
					srObj2.channel = channel;
				}

				textContent.setAttribute('sr', JSON.stringify(srObj2));
				tableCell.appendChild(textContent);
				tableRow.appendChild(tableCell);
				rowArray.push(sbObj2);
			}
		}

		tableBody.appendChild(tableRow);
		tableArray.push(rowArray);
	}
	this.shadowRoot.querySelector('#table').appendChild(tableBody);
	this.ctrl.stream(tableArray);
}






window.customElements.define('table-base-ce', TableBaseCE);

export {
	TableBaseCE
};
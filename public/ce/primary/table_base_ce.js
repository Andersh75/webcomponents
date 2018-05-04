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
			console.log('IN PERIOD LENGTH');
			combineLatest$(myRxmq.channel(e.detail[0]).behaviorobserve(e.detail[1]))
				.do(console.log)
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
					console.log('period');
					console.log(x);
					this.period = x;
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
		let textContent = 'År ' + j;
		tableCell.textContent = textContent;
		tableRow.appendChild(tableCell);
	}

	tableHead.appendChild(tableRow);
	this.shadowRoot.querySelector('#table').appendChild(tableHead);
}


function normalRow(rows, cells) {
	let tableBody = document.createElement('tbody');
	for (let i = 1; i <= rows; i++) {
		
		let srChannelAndSubject = h.str.stringToArrayUsingSplitter(':', this.cellDispatchObj[i - 1].sr); //makes an array of [remote, local...] listener
		let srChannel = srChannelAndSubject[0];
		let srSubject = srChannelAndSubject[1];
		

		console.log('this.cellDispatchObj[i - 1]');
		console.log(this.cellDispatchObj[i - 1]);
		let sbObj = this.cellDispatchObj[i - 1].sb;
		let sbChannel = this.cellDispatchObj[i - 1].sb.channel;
		let sbSubject = this.cellDispatchObj[i - 1].sb.subject;
		let sbElement = this.cellDispatchObj[i - 1].sb.element;

		let type = this.cellDispatchObj[i - 1]['type'];
		let srLocal = JSON.stringify(this.cellDispatchObj[i - 1]['local']);

		let rowName = this.cellDispatchObj[i - 1].name;

		let tableRow = document.createElement('tr');
		tableRow.setAttribute('cells', cells);
		tableRow.setAttribute('slot', 'tr');

		let tableCell = document.createElement('th');
		
		let textContent = document.createElement('headline-one-ce');
		textContent.setAttribute('sr', "");
		textContent.setAttribute('year', "");
		textContent.setAttribute('title', rowName);
		textContent.setAttribute('sb', "");
		tableCell.appendChild(textContent);
		tableRow.appendChild(tableCell);

		if (type === 'initial') {
			let tableCell = document.createElement('td');
			let textContent = document.createElement('headline-one-ce');
			textContent.setAttribute('sr', srChannel + ':' + srSubject + '@' + srLocal);
			textContent.setAttribute('year', 0);
			textContent.setAttribute('title', "");
			sbObj.year = 0;
			textContent.setAttribute('sb', sbElement + ':' + sbSubject + '@' + JSON.stringify(sbObj));
			tableCell.appendChild(textContent);
			tableRow.appendChild(tableCell);
			for (let j = 1; j <= Number(cells); j++) {
				let tableCell = document.createElement('td');
				let textContent = document.createElement('headline-one-ce');
				textContent.setAttribute('year', j);
				textContent.setAttribute('title', "");
				
				sbObj.year = j;
				textContent.setAttribute('sb', JSON.stringify(sbObj));
				tableCell.appendChild(textContent);
				tableRow.appendChild(tableCell);
			}
		} else {
			let tableCell = document.createElement('td');
			let textContent = document.createElement('headline-one-ce');
			textContent.setAttribute('year', 0);
			textContent.setAttribute('title', "");
			sbObj.year = 0;
			textContent.setAttribute('sb', JSON.stringify(sbObj));
			tableCell.appendChild(textContent);
			tableRow.appendChild(tableCell);
			for (let j = 1; j <= Number(cells); j++) {
				let tableCell = document.createElement('td');
				let textContent = document.createElement('headline-one-ce');
				textContent.setAttribute('sr', srChannel + ':' + srSubject + '@' + srLocal);
				textContent.setAttribute('year', j);
				textContent.setAttribute('title', "");
				sbObj.year = j;
				textContent.setAttribute('sb', sbElement + ':' + sbSubject + '@' + JSON.stringify(sbObj));
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
class TableBaseCE extends CustomElement3 {

	constructor() {
		super();
	}

	extend() {
		TableBaseCE.extend.call(this);
		this.extendBaseModel(this); //adds new methods to this.model
		this.extendBaseView(this, this.model); //adds new methods to this.view
		this.extendBaseCtrl(this, this.model, this.view); //adds new methods to this.ctrl
		//this.sortTable = 
	}





	extendCtrl(that, model, view) {

		//init
		this.ctrl.run = function() {
			console.log('HERE');
			if (!h.boolean.isEmpty(that.srdispatch)) {
				let attribute = 'srdispatch';
				that[attribute] = that.srdispatch;
			}

			// if (!h.boolean.isEmpty(that.period)) {
			// 	let attribute = 'period';
			// 	that[attribute] = that.period;
			// }





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

			// if (attribute === "srdispatch") {
			// 	// console.log('that.srdispatch');
			// 	// console.log(that.srdispatch);
			// 	// //let remoteAndLocal = h.str.stringToArrayUsingSplitter('@', that.srdispatch);
			// 	// console.log(remoteAndLocal);
			// 	// console.log(JSON.parse(remoteAndLocal[0]));
			// 	// //that.local = remoteAndLocal[1];
			// 	// console.log(that.local);
			// 	// that.remote = JSON.parse(that.srdispatch);
			// 	// console.log(that.remote);
			// }
			
			if (attribute === "period") {
				that.remote = JSON.parse(that.srdispatch);
				console.log(that.remote);

				console.log('TABLE KIND');
				console.log(that.type);
				
				let newVal = that.cells;
				if (that.type === 'capitalize') {
					console.log('to render');
					console.log(newVal);
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
		this.ctrl.period$ = function(e) {
			myRxmq.channel(e.detail[0]).behaviorobserve(e.detail[1])				
			.map((e) => Number(e))
			.filter((e) => !isNaN(e))
			.do(x => console.log('period: ' + x))	
			.subscribe((x) => {
					that.period = x;
			});
		};
	}

	extendView(that, model) {
		this.view.renderCellsCapitalize = function(obj) {
			while (that.shadowRoot.querySelector('#table').firstChild) {
				that.shadowRoot.querySelector('#table').removeChild(that.shadowRoot.querySelector('#table').firstChild);
			}
			let rowsAndCells = h.str.stringToArrayUsingSplitter(':', obj);
			let rows = rowsAndCells[0];
			//let cells = rowsAndCells[1];
			console.log('that.period');
			console.log(that.period);
			let cells = that.period;

			let sbChannelAndSubject = h.str.stringToArrayUsingSplitter(':', that.sbdispatch); //makes an array of [remote, local...] listener
			let sbChannel = sbChannelAndSubject[0];
			let sbSubject = sbChannelAndSubject[1];

			//let srLocal = that.local;

			let srChannelAndSubject = h.str.stringToArrayUsingSplitter(':', that.remote[0].sr); //makes an array of [remote, local...] listener
			let srChannel = srChannelAndSubject[0];
			let srSubject = srChannelAndSubject[1];
			




			headerRow(cells, 'Kostnadsslag\\År', that);

			normalRow(cells, that, rows, sbChannel, sbSubject);






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
				case 'period':
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
	textContent.setAttribute('title', that.title);
	textContent.setAttribute('sb', "");
	tableCell.appendChild(textContent);
	tableRow.appendChild(tableCell);


	for (let j = 0; j <= Number(cells); j++) {
		let tableCell = document.createElement('th');
		// tableCell.addEventListener('click', function() {
		// 	return sortTable.call(that, 2);
		// });
		tableCell.setAttribute('style', 'width: 9%');
		let textContent = 'År ' + j;
		tableCell.textContent = textContent;
		tableRow.appendChild(tableCell);
	}
	
	tableHead.appendChild(tableRow);
	that.shadowRoot.querySelector('#table').appendChild(tableHead);
}


function normalRow(cells, that, rows, sbChannel, sbSubject) {
	let tableBody = document.createElement('tbody');
	for (let i = 1; i <= Number(rows); i++) {
		let srChannelAndSubject = h.str.stringToArrayUsingSplitter(':', that.remote[i-1].sr); //makes an array of [remote, local...] listener
		let srChannel = srChannelAndSubject[0];
		let srSubject = srChannelAndSubject[1];
		let srLocal = that.remote[i-1]['local'];
	
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
	that.shadowRoot.querySelector('#table').appendChild(tableBody);
}


function sortTable(n) {
	console.log('HEJ');
	var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
	table = this.shadowRoot.querySelector('#table');
	switching = true;
	// Set the sorting direction to ascending:
	dir = "asc"; 
	/* Make a loop that will continue until
	no switching has been done: */
	while (switching) {
	// Start by saying: no switching is done:
	switching = false;
	rows = table.querySelectorAll("tr");
	/* Loop through all table rows (except the
	first, which contains table headers): */
	for (i = 1; i < (rows.length - 1); i++) {
		// Start by saying there should be no switching:
		shouldSwitch = false;
		/* Get the two elements you want to compare,
		one from current row and one from the next: */
		x = rows[i].querySelectorAll("td")[n];
		y = rows[i + 1].querySelectorAll("td")[n];
		/* Check if the two rows should switch place,
		based on the direction, asc or desc: */
		if (dir == "asc") {
		if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
			// If so, mark as a switch and break the loop:
			shouldSwitch= true;
			break;
		}
		} else if (dir == "desc") {
		if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
			// If so, mark as a switch and break the loop:
			shouldSwitch= true;
			break;
		}
		}
	}
	if (shouldSwitch) {
		/* If a switch has been marked, make the switch
		and mark that a switch has been done: */
		rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
		switching = true;
		// Each time a switch is done, increase this count by 1:
		switchcount ++; 
	} else {
		/* If no switching has been done AND the direction is "asc",
		set the direction to "desc" and run the while loop again. */
		if (switchcount == 0 && dir == "asc") {
		dir = "desc";
		switching = true;
		}
	}
	}
}






window.customElements.define('table-base-ce', TableBaseCE);

export { TableBaseCE };




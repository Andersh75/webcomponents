const PI = 3.1415926;

function sum(...args) {
  log('sum', args);
  return args.reduce((num, tot) => tot + num);
}

function mult(...args) {
  log('mult', args);
  return args.reduce((num, tot) => tot * num);
}

// private function
function log(...msg) {
  console.log(...msg);
}
// const tpl = window.document.createElement("template");
// tpl.innerHTML = `
// <link rel="stylesheet" href="//cdn.jsdelivr.net/chartist.js/latest/chartist.min.css">
// <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">


// <div id="wrappper" class="input-group input-group-sm mb-3">
//   <input id="input" type="text" class="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm">
//   </div>
// `;

class Input3CE extends CustomElement2 {
	constructor() {
    super();
    //this.tpl = tpl;
    //this.parent;
    //this.extend();
	}


	static get observedAttributes() {
		return ['value', 'placeholder', 'year', 'sb'];
	};



	extendCtrl(that, model, view) {

		//init
		this.ctrl.run = function() {
			if (!h.boolean.isEmpty(that.value)) {
				let attribute = 'value';
				view.updateView(attribute, that.value);
			}
			if (!h.boolean.isEmpty(that.placeholder)) {
				let attribute = 'placeholder';
				view.updateView(attribute, that.placeholder);
			}
			if (!h.boolean.isEmpty(that.sb)) {
				that.ctrl.stream();
			}	
		};


		//stream from element
		this.ctrl.stream = function() {
			const element$ = function(element) {
				return Rx.Observable.merge(Rx.Observable.of(element), Rx.Observable.fromEvent(element, 'blur').map(x => x.target), Rx.Observable.fromEvent(element, 'click').map(x => x.target), Rx.Observable.fromEvent(element, 'keyup').filter(x => x.keyCode == 13).map(x => x.target));
			};

			element$(that)
			.map(element => element.value)
			.subscribe(myRxmq.channel(that.sbChannel).behaviorsubject(that.sbSubject));
		};

		this.ctrl.changedAttribute = function(details) {
			console.log('DETAILS!');
			console.log(details.changedAttribute.newVal);
			myRxmq.channel(that.sbChannel).behaviorsubject(that.sbSubject).next(details.changedAttribute.newVal);
		};


		//local events initiated by parent


		//local events initiated by model


		//local events initiated by global stream
		this.ctrl.capitalize$ = function(e) {
			const combineLatest$ = function(...streams) {
				return Rx.Observable.combineLatest(streams);
			};
			combineLatest$(myRxmq.channel(e.detail[0]).behaviorobserve(e.detail[1]), myRxmq.channel(e.detail[0]).behaviorobserve('increase'))					
			.map(([e1, e2]) => [Number(e1), Number(e2)])
			.subscribe((x) => {
				let year = that.year;
				let numYear = Number(year);
				let result = x[0] * Math.pow((x[1] + 1), numYear);
				let roundedResult = parseFloat(Math.round(result * 1000) / 1000).toFixed(3);
				that.value = roundedResult;
				let attribute = 'value';
				view.updateView(attribute, that.value);
			})
		}
	}

	extendView(that, model) {
		this.view.renderPlaceholder = function(obj) {
			that.shadowRoot.querySelector('#input').placeholder = obj;
		};

		this.view.renderValue = function(obj) {
			that.shadowRoot.querySelector('#input').value = obj;
		};

		this.view.updateView = function(attribute, data) {
			switch(attribute) {
				case 'value':
				that.view.renderValue.call(that, data);
				break;
				case 'placeholder':
				that.view.renderPlaceholder.call(that, data);
				break;
			}	
		};
	}

	extendModel(that) {
		let db = {};
		db.placeholder = "";
		db.value = "";
		db.sb = "";

		this.model.updateModelWithAttribute = function(attribute, newVal, parent) {
			let oldVal;
			that[attribute] = newVal;
			if (parent !== undefined) {
				that.parent = parent;
			}

			switch(attribute) {
				case 'value':
					oldVal = db.value;
					db.value = newVal;
					eventDispatcher(that.eventTarget, 'updatedmodel', {parent: that.parent, child: that, name: 'value', oldVal: oldVal, newVal: db.value});
					break;
				case 'placeholder':
					oldVal = db.placeholder;
					db.placeholder = newVal;
					eventDispatcher(that.eventTarget, 'updatedmodel', {parent: that.parent, child: that, name: 'placeholder', oldVal: oldVal, newVal: db.placeholder});
					break;
			} 	
		};

		this.model.get = function(attribute) {
			return db[attribute];
		};
	}
}

export { PI, sum, mult, Input3CE };




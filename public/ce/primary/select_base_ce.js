
	// specific:
	// required attributes: select-ce: selectedindex
	
	// General notes:
	// Preferrably query select by id.
	// Set id on tags.
	// All event names initiated by parent to be run by child should end with "FromParent".
	// First line in functions initiated by parent should always start with: "parent = e.detail;"
	// Model and View announce thru local events. Controller calls function in Model and View directly. If present controller announce to parent and child thru the parents and childrens local events.
	// View is always passive.
	// Always let parent in first line of extend ctrl.

	const tpl = window.document.createElement("template");
	tpl.innerHTML = `
	
		<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
	
		<style>
			
		</style>
			<div class="input-group mb-3">
				<select id="select" class="custom-select">
				  <option disabled selected value="">välj...</option>
				  <option value="0.01">1</option>
				  <option value="0.02">2</option>
				  <option value="0.03">3</option>
				  <option value="0.04">5</option>
				  <option value="0.05">5</option>
				</select>
			  </div>
	`;
	
	class SelectBaseCE extends CustomElement2 {

		constructor() {
			super();	
			this.tpl = tpl;
			this.parent;
			this.extend();
		}

		static get observedAttributes() {
			return [ 'selectedindex', 'sb'];
		}

		extendBase() {
			this.extendView(this, this.model); //adds new methods to this.view
			this.extendCtrl(this, this.model, this.view); //adds new methods to this.ctrl
		}

		
		//Controller
		extendCtrl(that, model, view) {
			
			//intit
			this.ctrl.run = function() {
				if (!h.boolean.isEmpty(that.sb)) {
					that.ctrl.stream();
				}
				if (!h.boolean.isEmpty(that.selectedindex)) {
					let attribute = 'selectedindex';
					view.updateView(attribute, that[attribute]);
				}
			};


			//stream from element
			this.ctrl.stream = function() {
				// console.log('STREAM IN SELECT');
				// const element$ = function(element) {
				// 	return Rx.Observable.merge(Rx.Observable.of(element), Rx.Observable.fromEvent(element, 'change').map(x => x.target), Rx.Observable.fromEvent(element, 'select').map(x => x.target), Rx.Observable.fromEvent(element, 'blur').map(x => x.target), Rx.Observable.fromEvent(element, 'click').map(x => x.target), Rx.Observable.fromEvent(element, 'keyup').filter(x => x.keyCode == 13).map(x => x.target));
				// };

				// element$(that)
				// // .map(element => element.value)
				// // .subscribe(myRxmq.channel(that.sbChannel).behaviorsubject(that.sbSubject));
				// .subscribe(console.log)
			};

			this.ctrl.changedAttribute = function(details) {
				// console.log('DETAILS!');
				// console.log(details.changedAttribute);
				// if (details.changedAttribute.name === "selectedindex") {
				// 	console.log('here');
				// 	console.log(that.shadowRoot.querySelector('#select').options[details.changedAttribute.newVal].value);
				// 	myRxmq.channel(that.sbChannel).behaviorsubject(that.sbSubject).next(that.shadowRoot.querySelector('#select').options[details.changedAttribute.newVal].value);
				// }

				
			};

			this.ctrl.addedUserAction = function(data, attribute) {
				return new Promise((resolve, reject) => {
					console.log('FRIST HERE');
					resolve({data: data, attribute: attribute});
				}
			)};


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

			this.model.updateModelWithAttribute = function(attribute, newVal, parent) {
				let oldVal;
				that[attribute] = newVal;
				if (parent !== undefined) {
					that.parent = parent;
				}

				switch(attribute) {
					case 'selectedindex':
						oldVal = db.selectedindex;
						db.selectedindex = newVal;
						eventDispatcher(that.eventTarget, 'updatedmodel', {parent: that.parent, child: that, name: 'selectedindex', oldVal: oldVal, newVal: db.selectedindex});
						break;
				} 
			};

			this.model.get = function(attribute) {
				return db[attribute];
			};
		}
	}

window.customElements.define('select-base-ce', SelectBaseCE);

export { SelectBaseCE };
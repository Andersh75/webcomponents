// Event bubbling and capturing are two ways of event propagation in the HTML DOM API, when an event occurs in an element inside another element, and both elements have registered a handle for that event. The event propagation mode determines in which order the elements receive the event.

// With bubbling, the event is first captured and handled by the innermost element and then propagated to outer elements.

// With capturing, the event is first captured by the outermost element and propagated to the inner elements.

// Almost all events bubble.
// The key word in this phrase is “almost”.

// For instance, a focus event does not bubble. There are other examples too, we’ll meet them. But still it’s an exception, rather than a rule, most events do bubble.


class CustomElement3 extends HTMLElement {

	constructor() {
		super();	
		this.attachShadow({ mode: 'open' }); //activates shadow dom.
		this.parent = undefined;
		this.db = {};
		this.model = Model(this); //Model() returns an object with own this and with dispatch and eval methods.
		this.view = View(this, this.model); //View() returns an object with own this and with eval method.
		this.ctrl = Ctrl(this, this.model, this.view); //Ctrl() returns an object with own this and with eval method.
		this.eventTarget = this.model.eval("eventTarget"); //creates a pointer to the const eventTarget, a DOM element that is outside this model but within its scope.
		this.acc = {};
		this.local = undefined;
		this.remote = undefined;
	}

	//-----------
	
	//will be run from each custom component constructor.

	static extend() {
		this.template = this.tpl.content; //creates a pointer at the content of the template of the custom component.
		this.shadowRoot.appendChild(this.template.cloneNode(true)); //clones this.template and appends it as child to shadowRoot. 
		this.extendModel.call(this); //adds new methods to this.model
		this.extendView.call(this, this.model); //adds new methods to this.view
		this.extendCtrl.call(this, this.model, this.view); //adds new methods to this.ctrl


		//gets keys from this.ctrl and puts them in an array. Removes first element, the eval method.
		//for every key it maps an eventlistener on the eventTarget which listens to the event with the same name as the key and runs its method.
		Object.keys(this.ctrl).slice(1).map(key => { 
			this.eventTarget.addEventListener(h.str.toLowerCase(key), this.ctrl[key].bind(this));
		});

		//Adds proper eventlistener to the user-input elements-----

		//select
		if (this.shadowRoot.querySelector('select') !== null) { 
			this.shadowRoot.querySelector('select').addEventListener('change', e => {
			e.stopPropagation; //prevents from bubbling and capturing
			e.preventDefault; //prevent browser specific default actions for elements.
			let data = {};
			data.selectedindex = e.composedPath()[0].selectedIndex;
			data.selectedvalue = e.composedPath()[0].value;
			
			let attribute = 'selectedindex';
			eventDispatcher(this.eventTarget, 'useraction', {userevent: e, data: data, attribute: attribute, who: this}); //this.eventTarget dispatches a new customEvent named useraction and attaches original event to its details.
			});

			//button
		} else if (this.shadowRoot.querySelector('button') !== null) {
			this.shadowRoot.querySelector('button').addEventListener('click', e => {
				e.stopPropagation;
				e.preventDefault;
				let data = false;
				let attribute = 'toggle';
				eventDispatcher(this.eventTarget, 'useraction', {userevent: e, data: data, attribute: attribute, who: this}); 
			});

			//input
		} else if (this.shadowRoot.querySelector('input') !== null) {
			this.shadowRoot.querySelector('input').addEventListener('keyup', e => {
				e.stopPropagation;
				e.preventDefault;
				if (e.keyCode === 32 || e.keyCode === 13) {
					let data = {};
					data.value = e.composedPath()[0].value;
					let attribute = 'value';
					eventDispatcher(this.eventTarget, 'useraction', {userevent: e, data: data, attribute: attribute, who: this});
					document.activeElement.blur();
				}
			});
			this.shadowRoot.querySelector('input').addEventListener('blur', e => {
				e.stopPropagation;
				e.preventDefault;
				let data = {};
				data.value = e.composedPath()[0].value;
				let attribute = 'value';
				eventDispatcher(this.eventTarget, 'useraction', {userevent: e, data: data, attribute: attribute, who: this});
			});
		} else {
			
			//keydown and click to components without own user-iput elements
			this.addEventListener('keydown', e => {
				e.stopPropagation;
				e.preventDefault;
				let el = e.composedPath()[0];
				
				if (e.keyCode === 32 || e.keyCode === 13) {
					el.dispatchEvent(new MouseEvent('click', {bubbles: true, cancelable: true, composed: true}));
				}
			});

			this.addEventListener('click', e => {
				e.stopPropagation;
				e.preventDefault;
				eventDispatcher(this.eventTarget, 'useraction', {userevent: e, data: undefined, attribute: undefined, who: this});
			});
		}	
	}


	//each time an observed attribute changes it will run this function. Name, old value, new value of attribute will be passed.
	//Returns an object called details
	//Notice! this = customComponent
	attributeChangedCallback(attribute, oldVal, newVal) {
		if (!(attribute in this.acc)) {
			this.acc[attribute] = true;
		} else {
			let changedAttribute = {};
			changedAttribute.attribute = attribute;
			changedAttribute.newVal = newVal;
			this.model.updateModelWithAttribute(changedAttribute);
			//this.ctrl.changedAttribute(changedAttribute);

			let details = {};
			details.changedAttribute = changedAttribute;
			eventDispatcher(this, this.dispatch, details); //the customComponent dispatches a remote event and adds the changed attribute in detail object. This remote event is listened to by the document object in setComponentDispatcher function.
		}	
	}

	//
	//Create setters and getters for all attributes
	connectedCallback() {
		for (let i = 0; i < this.attributes.length; i++) {
			let attribute = this.attributes.item(i).name;
			if (!this.hasOwnProperty(attribute)) {
				Object.defineProperty(this, attribute, {
					get: function() {
						return this.getAttribute(attribute);
					},
					set: function(newString) {
						return this.setAttribute(attribute, newString);
					}
				});
			}
			
		}

		setComponentSrdispatch.call(this);

		//makes component fire local events when remote event fires. Remote event is attached in each local event.
		setComponentListener.call(this, this.model); //this.model is an object with dispatch and eval functions
		setComponentDispatcher(this.dispatch); //this.dispatch is name of remote event that get published from component

		//TODO: Go through these two
		setComponentObserver.call(this, this.model); //this.model is an object with dispatch and eval functions
		setComponentObservable.call(this);

		

		//Activates components specific run functions upon connected callback
		this.ctrl.run.call(this);	
	}  
} //Class ends here!






/**
 * Model has responsibility for calculations etc
 */
function Model(that) {

	const eventTarget = document.createElement('event-target');

	return {
		//dispatches custom event with eventName witch contains remoteEvent
		dispatch: function(eventName, e) { //eventName is name of localEvent. e is remoteEvent
			return eventTarget.dispatchEvent(new CustomEvent(eventName, {detail: e}));
		},
		eval: function(name) {
			return eval(name) 
		},
		updateModelWithAttribute: function(changedAttribute) {
			let oldVal = "";
			let attribute = changedAttribute.attribute;
			let newVal = changedAttribute.newVal;
			oldVal = that.db[attribute];
			that.db[attribute] = newVal;
			eventDispatcher(that.eventTarget, 'updatedmodel', {parent: that.parent, child: that, attribute: attribute, oldVal: oldVal, newVal: newVal});
		},
		get: function(attribute) {
			return that.db[attribute];
		}
	};
}

function View(that, model) {

	return {
		eval: function(name) {
			return eval(name); 
		}
	}; 
}



function Ctrl(that, model, view, ctrl) {

	return {
		eval: function(name) {
			return eval(name); 
		},
		userAction: function(e) { //local events initiated by users
			let attribute = e.detail.attribute;
			let data;
			if (attribute !== undefined) {
				try {
					if (attribute === 'selectedindex') {
						data = {};
						data.selectedindex = e.detail.data.selectedindex;
						data.selectedvalue = e.detail.data.selectedvalue;
						that.ctrl.addedUserAction(data, attribute)
						.then((result) => {
							that.selectedvalue = result.data.selectedvalue;
							that[attribute] = result.data.selectedindex;
						});
					} else if (attribute === 'value'){
						data = {};
						data[attribute] = e.detail.data[attribute];
						that.ctrl.addedUserAction(data, attribute)
						.then((result) => {
							that.value = result.data.value;
						})
						.catch(() => {
							throw 'Not a number - else if';
						});
					}
					
					else {
						alert('What userAction is this?');
						// data = e.detail.data;
						// that.ctrl.addedUserAction(data, attribute)
						// .then((result) => {
						// 	data = result.data;
						// 	attribute = result.attribute;
						// 	let changedAttribute = {};
						// 	changedAttribute.attribute = result.attribute;
						// 	changedAttribute.newVal = result.data;
						// 	model.updateModelWithAttribute(changedAttribute);
						// })
						// .catch(() => {
						// 	throw 'Not a number - else';
						// });
					}
				}
				catch (error) {
					console.error(error);
				}
			}		
		},
		clearSelfFromParent: function(e) { //local events initiated by users
			that.parent = e.detail.parent;
			let attribute = e.detail.attribute;
			let newVal = e.detail.newVal;
			if (attribute !== undefined) {
				that[attribute] = newVal;
			}		
		},
		attributeFromParent: function(e) {
			that.parent = e.detail.parent;
			let attribute = e.detail.attribute;
			let newVal = e.detail.newVal;
			if (attribute !== undefined) {
				that[attribute] = newVal;
			}	
		},
		updatedModel: function(e) { //local events initiated by users
			let parent = e.detail.parent;
			let attribute = e.detail.attribute;
			let newVal = e.detail.newVal;
			let oldVal = e.detail.oldVal;
			let child = e.detail.child;
			
			if (attribute !== undefined) {
				if (parent !== undefined) {
					eventDispatcher(parent.eventTarget, 'updatedattributefromchild', {parent: parent, child: child, attribute: attribute, oldVal: oldVal, newVal: newVal});
				} else {
					//console.log('No parent...');
				}

				let changedAttribute = {};
				changedAttribute.attribute = attribute;
				changedAttribute.newVal = newVal;
				that.ctrl.changedAttribute.call(that, changedAttribute);
			}
		},
		updatedAttributeFromChild: function(e) {
			let parent = e.detail.parent;
			let attribute = e.detail.attribute;
			let newVal = e.detail.newVal;
			parent[attribute] = newVal;
		},
		changedAttribute: function(changedAttribute) {
			let attribute = changedAttribute.attribute;

			if (attribute === that.stream) {
				that.ctrl.stream(that[that.stream]);	
			}

			let newVal = model.get(attribute);
			that.view.updateView.call(that, attribute, newVal);
		},

		stream: function(value) {
			if (!h.boolean.isEmpty(that.sb)) {
				console.log('that.sb');
				console.log(that.sb);
				console.log('that.sbChannel');
				console.log(that.sbChannel);
				console.log('that.sbSubject');
				console.log(that.sbSubject);
				console.log('value');
				console.log(value);
				let obj = {};
				obj.data = value;
				console.log('streaming!');
				myRxmq.channel(that.sbChannel).behaviorsubject(that.sbSubject).next(obj);
			}	
		}
	};
}














//Pub/sub communication station with subscribers and publishers
var events = (function () {
	var topics = {};
	var hOP = topics.hasOwnProperty;

	return {
		subscribe: function (topic, listener) {
			// Create the topic's object if not yet created
			if (!hOP.call(topics, topic)) 
				topics[topic] = [];
			
			// Add the listener to queue
			var index = topics[topic].push(listener) - 1;

			// Provide handle back for removal of topic
			return {
				remove: function () {
					delete topics[topic][index];
				}
			};
		},
		publish: function (topic, info) {
			// If the topic doesn't exist, or there's no listeners in queue, just leave
			if (!hOP.call(topics, topic)) 
				return;
			
			// Cycle through topics queue, fire!
			topics[topic].forEach(function (item) {
				item(
					info != undefined
						? info
						: {}
				);
			});
		}
	};
})();


/**
 * setComponentListener set subscribers to Pub/sub
 * @param {*} model is an object with dispatch and eval functions
 */
function setComponentListener(model) {
	let listener = this.listener; //string from attribute listener

	if (h.boolean.isString(listener)) {
		let listeners = h.str.stringToArrayUsingSplitter(' ', listener); //makes an array of all remote@local listeners from the string
		listeners.forEach(listener => {
			let listeners = h.str.stringToArrayUsingSplitter('@', listener); //makes an array of [remote, local...] listener
			let remoteEvent = listeners[0];
			let localEvents = listeners.slice(1); //array of local events

			localEvents.forEach(localEvent => {
				events.subscribe(remoteEvent, function(e) { //tells events(pub/sub) name of remoteEvent to subscribe to.
				model.dispatch(localEvent, e);	//fires local event with attached remote event each time remote event fires
				});
			});
		});
	}	
}


/**
 * setComponentDispatcher sets eventlistener in document with eventName (makes listender global)
 * @param {string} eventName event name to communicate with other components
 */
function setComponentDispatcher(eventName) {
	/**
	 * publishEvent publishes to pub/sub the event
	 * @param {*} e the event
	 */
	function publishEvent(e) {
		return events.publish(eventName, e); //events(pub/sub) publishes event with name of this.dispatch.
	}

	document.addEventListener(eventName, publishEvent); 
}

function setComponentObserver(model) {
	let sr = this.sr; //string from attribute listener
	// console.log('this.sr');
	// console.log(this.sr);

	if (h.boolean.isString(sr)) {
		let remoteAndLocal = h.str.stringToArrayUsingSplitter('@', sr); //makes an array of [remote, local...] listener
		let channelAndSubject = h.str.stringToArrayUsingSplitter(':', remoteAndLocal[0]); //makes an array of [remote, local...] listener
		let channel = channelAndSubject[0];
		let subject = channelAndSubject[1];
		let local = remoteAndLocal.slice(1)[0];
		console.log('local');
		console.log(local);
		let localFn;
		let localObj;

		if (local !== undefined) {
			localObj = JSON.parse(local);
			console.log(localObj);
			localFn = localObj.function;

			this.eventTarget.dispatchEvent(new CustomEvent(localFn, {detail: [channel, subject, localObj]}));
		}

		//this.srChannel = channel;
		//this.srSubject = subject;
		// console.log(channel);
		// console.log(subject);
		// console.log(local);

		
	}	
}

function setComponentObservable() {
	let sb = this.sb; //string from attribute listener

	if (h.boolean.isString(sb)) {
		let sbAndDetail = h.str.stringToArrayUsingSplitter('@', sb);
		let channelAndSubject = h.str.stringToArrayUsingSplitter(':', sbAndDetail[0]); //makes an array of [remote, local...] listener
		
		this.sbChannel = channelAndSubject[0];
		console.log('this.sbChannel');
		console.log(this.sbChannel);
		this.sbSubject = channelAndSubject[1];
		console.log('this.sbSubject');
		console.log(this.sbSubject);
		this.sbDetail = sbAndDetail[1];	
		console.log('this.sbDetail');
		console.log(this.sbDetail);
	}
}

function setComponentSrdispatch() {
	let srdispatch = this.srdispatch;

	if (h.boolean.isString(srdispatch)) {
		console.log(this.srdispatch);
		this.srDispatchObj = JSON.parse(this.srdispatch);	
	}
}


function eventDispatcher(element, eventName, details) {
	element.dispatchEvent(new CustomEvent(eventName, {
		bubbles: true,
		cancelable: true,
		composed: true,
		detail: details
	}));
}









class CustomElement extends HTMLElement {

	constructor() {
		super(); 
		this.attachShadow({ mode: 'open' }); //activates shadow dom.
		this.model = Model(); //Model() returns an object with own this and with dispatch and eval methods.
		this.view = View(this.model); //View() returns an object with own this and with eval method.
		this.ctrl = Ctrl(this.model, this.view); //Ctrl() returns an object with own this and with eval method.
	}

	//getters and setters for communication attributes -----

	get dispatch() {
		return this.getAttribute('dispatch');
	}

	set dispatch(newDispatch) {
		return this.setAttribute('dispatch', newDispatch);
	}

	get listener() {
		return this.getAttribute('listener');
	}

	set listener(newListener) {
		return this.setAttribute('listener', newListener);
	}

	get sr() {
		return this.getAttribute('sr');
	}

	set sr(newSr) {
		return this.setAttribute('sr', newSr);
	}

	get sb() {
		return this.getAttribute('sb');
	}

	set sb(newSb) {
		return this.setAttribute('sb', newSb);
	}

	get sbChannel() {
		return this._sbChannel;
	}

	set sbChannel(newSbChannel) {
		this._sbChannel = newSbChannel;
	}

	get sbSubject() {
		return this._sbSubject;
	}

	set sbSubject(newSbSubject) {
		this._sbSubject = newSbSubject;
	}


	//-----------
	
	//will be run from each custom component constructor.
	extend() {
		this.eventTarget = this.model.eval("eventTarget"); //creates a pointer to the const eventTarget, a DOM element that is outside this model but within its scope.
		this.template = this.thisDoc.querySelector( 'template' ).content; //creates a pointer at the content of the template of the custom component.
		this.shadowRoot.appendChild(this.template.cloneNode(true)); //clones this.template and appends it as child to shadowRoot. 
		this.extendModel(this); //adds new methods to this.model
		this.extendCtrl(this); //adds new methods to this.ctrl
		this.extendView(this); //adds new methods to this.view

		//gets keys from this.ctrl and puts them in an array. Removes first element, the eval method.
		//for every key it maps an eventlistener on the eventTarget which listens to the event with the same name as the key and runs its method.
		Object.keys(this.ctrl).slice(1).map(key => { 
			this.eventTarget.addEventListener(h.str.toLowerCase(key), this.ctrl[key]);
		});


		// Event bubbling and capturing are two ways of event propagation in the HTML DOM API, when an event occurs in an element inside another element, and both elements have registered a handle for that event. The event propagation mode determines in which order the elements receive the event.

		// With bubbling, the event is first captured and handled by the innermost element and then propagated to outer elements.
		
		// With capturing, the event is first captured by the outermost element and propagated to the inner elements.

		// Almost all events bubble.
		// The key word in this phrase is “almost”.

		// For instance, a focus event does not bubble. There are other examples too, we’ll meet them. But still it’s an exception, rather than a rule, most events do bubble.
	   

		//Adds proper eventlistener to the user-input elements-----

		//select
		if (this.shadowRoot.querySelector('select') !== null) { 
			this.shadowRoot.querySelector('select').addEventListener('change', e => {
			e.stopPropagation; //prevents from bubbling and capturing
			e.preventDefault; //prevent browser specific default actions for elements.
			eventDispatcher(this.eventTarget, 'useraction', e); //this.eventTarget dispatches a new customEvent named useraction and attaches original event to its details.
			});

			//button
		} else if (this.shadowRoot.querySelector('button') !== null) {
			this.shadowRoot.querySelector('button').addEventListener('click', e => {
				e.stopPropagation;
				e.preventDefault;
				eventDispatcher(this.eventTarget, 'useraction', e); 
			});

			//input
		} else if (this.shadowRoot.querySelector('input') !== null) {
			this.shadowRoot.querySelector('input').addEventListener('keydown', e => {
				e.stopPropagation;
				e.preventDefault;
				if (e.keyCode === 32 || e.keyCode === 13) {
					eventDispatcher(this.eventTarget, 'useraction', e);
				}
			});
			this.shadowRoot.querySelector('input').addEventListener('blur', e => {
				e.stopPropagation;
				e.preventDefault;
				eventDispatcher(this.eventTarget, 'useraction', e);
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
				eventDispatcher(this.eventTarget, 'useraction', e);
				
			});


		}

		
	}



	//each time an observed attribute changes it will run this function. Name, old value, new value of attribute will be passed.
	//Returns an object called details
	//Notice! this = customComponent
	attributeChangedCallback(name, oldVal, newVal) {
		let details = {};
		details.changedAttribute = {};
		details.changedAttribute.name = name;
		details.changedAttribute.oldVal = oldVal;
		details.changedAttribute.newVal = newVal;
		eventDispatcher(this, this.dispatch, details); //the customComponent dispatches a remote event and adds the changed attribute in detail object. This remote event is listened to by the document object in setComponentDispatcher function.
	}

	//
	connectedCallback() {
		//makes component fire local events when remote event fires. Remote event is attached in each local event.
		setComponentListener.call(this, this.model); //this.model is an object with dispatch and eval functions

		setComponentDispatcher(this.dispatch); //this.dispatch is name of remote event that get published from component


		setComponentObserver.call(this, this.model); //this.model is an object with dispatch and eval functions
		setComponentObservable.call(this);
		//Activates components specific run functions upon connected callback
		this.ctrl.run();
	}  
} //Class ends here!


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

	if (h.boolean.isString(sr)) {
		let remoteAndLocal = h.str.stringToArrayUsingSplitter('@', sr); //makes an array of [remote, local...] listener
		let channelAndSubject = h.str.stringToArrayUsingSplitter(':', remoteAndLocal[0]); //makes an array of [remote, local...] listener
		let channel = channelAndSubject[0];
		let subject = channelAndSubject[1];
		let local = remoteAndLocal.slice(1)[0];

		this.eventTarget.dispatchEvent(new CustomEvent(local, {detail: [channel, subject]}));
	}	
}

function setComponentObservable() {
	let sb = this.sb; //string from attribute listener
	console.log('here...');

	if (h.boolean.isString(sb)) {
		let channelAndSubject = h.str.stringToArrayUsingSplitter(':', sb); //makes an array of [remote, local...] listener
		
		this.sbChannel = channelAndSubject[0];
		this.sbSubject = channelAndSubject[1];
		console.log('this.sbChannel');
		console.log(this.sbChannel);
		
	}	
}


/**
 * Model has responsibility for calculations etc
 */
function Model() {
	let that = this;
	
	const eventTarget = document.createElement('event-target');

	return {
		//dispatches custom event with eventName witch contains remoteEvent
		dispatch: function(eventName, e) { //eventName is name of localEvent. e is remoteEvent
			return eventTarget.dispatchEvent(new CustomEvent(eventName, {detail: e}));
		},
		eval: function(name) {
			return eval(name) 
		}
	};
}

function View(model) {
	let that = this;

	return {
		eval: function(name) {
			return eval(name); 
		}
	}; 
}

function Ctrl(model, view) {
	let that = this;

	return {
		eval: function(name) {
			return eval(name); 
		}
	};
}

function eventDispatcher(element, eventName, details) {
	element.dispatchEvent(new CustomEvent(eventName, {
		bubbles: true,
		cancelable: true,
		composed: true,
		detail: details
	}));
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










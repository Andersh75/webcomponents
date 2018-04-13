class CustomElement extends HTMLElement {

	constructor() {
		super(); 
		this.attachShadow({ mode: 'open' });
		this.model = Model(); //Model() returns an object with own this.
		this.view = View(this.model); //View() returns an object with own this.
		this.ctrl = Ctrl(this.model, this.view); //Ctrl() returns an object with own this.
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
	
	extend() {
		this.eventTarget = this.model.eval("eventTarget");
		this.template = this.thisDoc.querySelector( 'template' ).content;
		this.shadowRoot.appendChild(this.template.cloneNode(true));
		this.extendModel(this);
		this.extendCtrl(this);
		this.extendView(this);


		Object.keys(this.ctrl).slice(1).map(key => {
			this.eventTarget.addEventListener(h.str.toLowerCase(key), this.ctrl[key]);
		});



	   

		if (this.shadowRoot.querySelector('select') !== null) {
			this.shadowRoot.querySelector('select').addEventListener('change', e => {
			e.stopPropagation;
			eventDispatcher(this.eventTarget, 'useraction', e);
			});
		} else if (this.shadowRoot.querySelector('button') !== null) {
			this.shadowRoot.querySelector('button').addEventListener('click', e => {
				e.stopPropagation;
				eventDispatcher(this.eventTarget, 'useraction', e);
			});
		} else if (this.shadowRoot.querySelector('input') !== null) {
			this.shadowRoot.querySelector('input').addEventListener('keydown', e => {
				e.stopPropagation;
				if (e.keyCode === 32 || e.keyCode === 13) {
					eventDispatcher(this.eventTarget, 'useraction', e);
				}
			});
			this.shadowRoot.querySelector('input').addEventListener('blur', e => {
				e.stopPropagation;
				eventDispatcher(this.eventTarget, 'useraction', e);
			});
		} else {



			this.addEventListener('keydown', e => {
				let el = e.composedPath()[0];
				
				if (e.keyCode === 32 || e.keyCode === 13) {
					
					el.dispatchEvent(new MouseEvent('click', {bubbles: true, cancelable: true, composed: true}));
				}
			});

			this.addEventListener('click', e => {
				e.stopPropagation;
				eventDispatcher(this.eventTarget, 'useraction', e);
				
			});


		}

		
	}

	attributeChangedCallback(name, oldVal, newVal) {
		let details = {};
		details.changedAttribute = {};
		details.changedAttribute.name = name;
		details.changedAttribute.oldVal = oldVal;
		details.changedAttribute.newVal = newVal;
		eventDispatcher(this, this.dispatch, details);
		
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
}

/**
 * setComponentListener
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
				events.subscribe(remoteEvent, function(e) { //tells events name of remoteEvent to subscribe to.
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
		return events.publish(eventName, e);
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










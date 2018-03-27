class CustomElement extends HTMLElement {

	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
		this.model = Model();
		this.view = View(this.model);
		this.ctrl = Ctrl(this.model, this.view); 
	}

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

	connectedCallbackFn() {
		console.log('here');
		setConnectedCallback.call(this);  
	}
	
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
		} else {
			this.addEventListener('keydown', e => {
				let el = e.composedPath()[0];
				
				if (e.keyCode === 32 || e.keyCode === 13) {
					el.dispatchEvent(
						new MouseEvent('click', {bubbles: true, cancelable: true, composed: true}));
				}
			});

			this.addEventListener('click', e => {
				e.stopPropagation;
				eventDispatcher(this.eventTarget, 'useraction', e);
				
			});
		}
		
		

		//this.connectedCallback();
		
	}


	
	attributeChangedCallback(name, oldVal, newVal) {
		let details = {};
		details.changedAttribute = {}
		details.changedAttribute.name = name;
		details.changedAttribute.oldVal = oldVal;
		details.changedAttribute.newVal = newVal;
		eventDispatcher(this, this.dispatch, details);
	}

	connectedCallback() {
		this.connectedCallbackFn();
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

function setComponentListener(model) {
	let listener = this.listener;

	if (h.boolean.isString(listener)) {
		let listeners = h.str.stringToArrayUsingSplitter(' ', listener);
		listeners.forEach(listener => {
			let listeners = h.str.stringToArrayUsingSplitter('@', listener);
			let remoteEvent = listeners[0];
			let localEvents = listeners.slice(1);

			localEvents.forEach(localEvent => {
				events.subscribe(remoteEvent, function(e) {
				model.dispatch(localEvent, e);	
				});
			});
		});
	}
	
}

function setComponentDispatcher() {
	eventPublisher(this.dispatch);
}

function eventPublisherMaker() {
	let eventNames = [];

	return function eventPublisher(eventName) {

		if (eventNames.indexOf(eventName) == -1) {
			eventNames.push(eventName);

			function publishEvent(e) {
				return events.publish(eventName, e);
			}

			document.addEventListener(eventName, publishEvent);
		}
	};
}

let eventPublisher = eventPublisherMaker();


function setConnectedCallback() {
	setComponentListener.call(this, this.model);
	setComponentDispatcher.call(this);
	console.log(this.eventTarget);
	this.eventTarget.dispatchEvent(new CustomEvent('run'));
}


function Model() {
	let that = this;
	
	const eventTarget = document.createElement('event-target');

	return {
		dispatch: function(eventName, e) {
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

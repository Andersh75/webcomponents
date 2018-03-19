(function() {
	const template = document.createElement('template');

	template.innerHTML = `
	<style>
		.progress-bar {
		width: 50%;
		height: 30px;
		background-color: #EDF2F4;
		border-radius: 5px;
		color: #FFF;
		}
		.progress-bar-inner {
		height: 100%;
		line-height: 30px;
		background: #2B2D42;
		text-align: center;
		border-radius: 5px;
		transition: width 0.25s;
		}
		h1 {
			color: black;
		}
	</style>
	<div class="progress-bar">
		<div class="progress-bar-inner">${this.complete}%</div>
		<slot id=s1 name=slot1></slot>

		<h1>Hej</h1>


	</div>
	`;

class ProgressBar extends HTMLElement {

	constructor() {
	  super();
  
	  this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
	  this._complete = 0;
	}

	get value() {
		return this.getAttribute('value');
	  }
	
	set value(newValue) {
		return this.setAttribute('value', newValue);
	}
  
	get complete() {
	  return this._complete;
	}
	
	set complete(val) {
	  return this.setAttribute('complete', val);
	}
  
	static get observedAttributes() {
	  return [ 'complete', 'value' ];
	}
  
	attributeChangedCallback(name, oldVal, newVal) {
	  var innerBar = this.shadowRoot.querySelector('.progress-bar-inner');
  
	  switch(name) {
		case 'complete':
		  this._complete = parseInt(newVal, 10) || 0;
		  this.value = Number(this.value) + 1;
  
		  innerBar.style.width = this.complete + '%';
		  innerBar.innerHTML = this.complete + '%';
	  }
	}
  
	connectedCallback() {

  
	  this.value = "3";
	}
  
  }
  
  window.customElements.define('progress-bar', ProgressBar);

})();
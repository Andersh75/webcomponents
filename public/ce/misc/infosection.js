(function(){

	var template = document.createElement('template');

	template.innerHTML = `
	<style>
		.info-section {
			display: flex;
  			justify-content: center;
  			flex-direction: column;
			text-align: center;
			width: 200px;
			height: auto;
			margin: 5px;

		background-color: lightblue;
		border-radius: 5px;
		color: #000;
		}
		.info-section-inner {

		}
	</style>
	<div class="info-section">
		<slot name="my-test"></slot>
		<div class="info-section-inner"></div>
		<slot name="my-text"></slot>
	</div>
	`;


	class InfoSection extends HTMLElement {

		constructor() {
		  super();
	  
		  this.attachShadow({ mode: 'open' });
		  this.shadowRoot.appendChild(template.content.cloneNode(true));
		  //this._name = "";
		}
	
		get name() {
			return this.getAttribute('name');
		  }
		
		set name(newName) {
			return this.setAttribute('name', newName);
		}
	  
			  
		static get observedAttributes() {
		  return [ 'name'];
		}
	  
		attributeChangedCallback(name, oldVal, newVal) {
	  
		  switch(name) {
			case 'name':
			var infoSectionInnerEl = this.shadowRoot.querySelector('.info-section-inner');
			infoSectionInnerEl.innerHTML = newVal;
		  }
		}
	  
		connectedCallback() {
			var infoSectionInnerEl = this.shadowRoot.querySelector('.info-section-inner');
			//infoSectionInnerEl.innerHTML = this.name;
		}
	  
	  }
	  
	  window.customElements.define('info-section', InfoSection);


})();
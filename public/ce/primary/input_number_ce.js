import { InputBaseCE } from '/ce/primary/input_base_ce.js';

const tpl = window.document.createElement("template");
tpl.innerHTML = `
	<link rel="stylesheet" href="//cdn.jsdelivr.net/chartist.js/latest/chartist.min.css">
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">


	<div id="wrapper" class="input-group input-group-sm mb-3">
		<input id="input" type="text" class="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm">
	</div>
`;


		
class InputNumberCE extends InputBaseCE {
	constructor() {
		super();
		this.tpl = tpl;
		this.extend();
	}

	static get observedAttributes() {
		return ['value', 'placeholder', 'year', 'sb'];
	};

	extendBaseCtrl(that, model, view) {
		//local
		console.log('extend Base');

		this.ctrl.addedUserAction = function(data, attribute) {
			return new Promise((resolve, reject) => {
				console.log('ADDED USER ACTION');
				console.log(data);
				console.log(attribute);
				console.log(Number(data));
				if (data === "") {
					console.log('empty string');

					resolve({data: data, attribute: attribute});
				} else {
					let stringToNumber = Number(data);
					console.log('string to number!');
					console.log(stringToNumber);

					if (!isNaN(stringToNumber)) {
						if (Number.isInteger(stringToNumber)){
							resolve({data: data, attribute: attribute});
						} else {
							resolve({data: "", attribute: attribute});
						}
					} else {
						console.log('NOT A NUMBER')
						resolve({data: "", attribute: attribute});
					}
				}


			}
		)};
	}
	
	extendBaseView(that, model) {

	}

	extendBaseModel(that) {
		
	}	
}

window.customElements.define('input-number-ce', InputNumberCE);
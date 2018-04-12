




document.addEventListener('DOMContentLoaded', function () {
var db = "hej";

console.log('tja');

// Rx.Observable.fromEvent(document, 'click')
// .map((ev) => Rx.Observable.interval(1000))
// //.map((ev) => 'hej')
// .mergeAll()
// .subscribe(x => console.log(x));

const Money = function (currency, val) {
	return {
		value: function() {
			return val;
		},
		currency: function() {
			return currency;
		},
		toString: function() {
			return this.currency() + ' ' + this.value();
		}
	}
}

const newRandomNumber = () => Math.floor(Math.random() * 100);

// Rx.Observable.interval(1000)
// 	.skip(1)
// 	.take(5)
// 	.map(num => new Money('USD', newRandomNumber()))
// 	.subscribe(price => {
// 		console.log(price.value());
// 	});

// Rx.Observable.interval(1000)
// 	.timeInterval()
// 	.subscribe(console.log);


let api1 = 'https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,se&units=metric&APPID=d4bf7922db1fa7f4d48e3fc22ecbf0a6';
let api2 = 'https://api.openweathermap.org/data/2.5/forecast?q=Oslo,no&units=metric&APPID=d4bf7922db1fa7f4d48e3fc22ecbf0a6';

function fetchData(api) {
	return fetch(api)
	.then(data => data.json());
	// .then(data => console.log(data));
}

function fetchDataInterval(api) {
	return Rx.Observable.interval(2000)
		.mergeMap(() => Rx.Observable.fromPromise(fetchData(api)));
}

// function fetchDataInterval(api) {
// 	return Rx.Observable.of('one', 'two').mergeMap(() => Rx.Observable.interval(2000)
// 		.mergeMap(() => Rx.Observable.fromPromise(fetchData(api))));
// }

//fetchDataInterval(api1).subscribe(console.log);

var oslo = Rx.Observable.of({city: 'oslo', url: api2})
	.mergeMap(x => Rx.Observable.interval(1000)
						.mergeMap(i => Rx.Observable.fromPromise(fetchData(x.url))
											.map(result => {
												return {city: x.city, temp: result.list[0].main.temp};
											})
						)
	);

var stockholm = Rx.Observable.of({city: 'stockholm', url: api1})
	.mergeMap(x => Rx.Observable.interval(1000)
						.mergeMap(i => Rx.Observable.fromPromise(fetchData(x.url))
											.map(result => {
												return {city: x.city, temp: result.list[0].main.humidity};
											})
						)
	);


Rx.Observable.merge(stockholm, oslo)
	//.subscribe(x => console.log(x.city + ' har ' + x.temp + ' grader'));
	.subscribe(x => document.querySelector('#' + x.city).textContent = x.city + ' har ' + x.temp + ' grader');

const panel = document.querySelector("#dragtarget");

Rx.Observable.fromEvent(panel, 'mousedown')
.concatMap(() => Rx.Observable.fromEvent(document, 'mousemove').takeUntil(Rx.Observable.fromEvent(document, 'mouseup')))
.subscribe(event => {
	console.log(event.clientX);
	// panel.style.left = event.clientX + 'px';
	// panel.style.top = event.clientY + 'px';
});


// const currentWeather$ = Rx.Observable.fromPromise(fetchData());

// const twoSecond$ = Rx.Observable.interval(2000);

// Rx.Observable.interval(2000)
// 	.mergeMap(() => Rx.Observable.fromPromise(fetchData(api1)).map((x) => x))
// 	.subscribe(console.log);



 });
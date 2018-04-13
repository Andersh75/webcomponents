// class EndlessReplaySubject extends Rx.ReplaySubject {

//   complete() {}
//   error(error) {
//     this.error = error;
//     this.observers.forEach(os => {
//       os.error(error);
//       os.isStopped = false;
//     });
//   }
// }

// class EndlessSubject extends Rx.Subject {

//   complete() {}
//   error(error) {
//     this.thrownError = error;
//     this.observers.forEach(os => {
//       os.destination._error.call(os.destination._context, error);
//     });
//   }
// }

// class Channel {

//   constructor() {
//     this.subjects = [];
//     this.channelBus = new EndlessReplaySubject();
//     this.channelStream = this.channelBus.publish().refCount();
//   }

//   subject(name, {Subject = EndlessSubject} = {}) {
//     let s = this.findSubjectByName(this.subjects, name);
//     if (!s) {
//       s = new Subject();
//       s.name = name;
//       this.subjects.push(s);
//       this.channelBus.next(s);
//     }
//     return s;
//   }

//   observe(name) {
// 	return this.subject(name);
//   }

//   findSubjectByName(subjects, name) {
// 	const res = subjects.filter(s => s.name === name);
// 	if (!res || res.length < 1) {
// 	  return undefined;
// 	}
// 	return res[0];
//   }
// }

// class Rxmq {

//   constructor() {
//     this.channels = {};
//   }

//   channel(name = 'defaultRxmqChannel') {
//     if (!this.channels[name]) {
//       this.channels[name] = new Channel();
//     }

//     return this.channels[name];
//   } 
// }




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

// const myRxmq = new Rxmq();

// const subscription = myRxmq.channel('posts').observe('post.add')
// 	//.take(2)
//     .subscribe(
//         // following methods are same as for Rx.Observable.subscribe
//         (data) => {
// 			console.log(data);
//             // handle new data ...
//         },
//         (error) => {
//             // handle error ...
//         }
// 	);

let clearbutton = document.querySelector('#clearbutton');
let click = Rx.Observable.fromEvent(clearbutton, 'click');

// let intervalFromClick = click.switchMap((ev) => Rx.Observable.interval(1000));
				
click.subscribe(myRxmq.channel('posts').subject('hej'));

// intervalFromClick
// .subscribe(console.log);

// myRxmq.channel('posts').observe('hej')
// //.take(2)
// .subscribe(
// 	// following methods are same as for Rx.Observable.subscribe
// 	(data) => {
// 		console.log(data);
// 		// that.value = data;
// 		// eventDispatcher(input.eventTarget, 'valuefromparent', that);
// 	},
// 	(error) => {
// 		// handle error ...
// 	}
// );




// myRxmq.channel('posts').subject('post.add').next({
// 	title: 'Woo-hoo, first post!',
// 	text: 'My lengthy post here'
// });
// myRxmq.channel('posts').subject('post.add').next({
// 	title: 'Woo-hoo, second post!',
// 	text: 'My lengthy post here'
// });
// myRxmq.channel('posts').subject('post.add').next({
// 	title: 'Woo-hoo, third post!',
// 	text: 'My lengthy post here'
// });



 });
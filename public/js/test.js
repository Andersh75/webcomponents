// import { sum } from './inputce.js';

//console.log( sum(1,2,3,4) ); // 10

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
	myRxmq.channel('owntable-year-10').behaviorsubject('*')
		.subscribe(x => {
			console.log('from stream: ' + x);
			console.log(x);
		});



	// myRxmq.channel('inflation').behaviorobserve('rate')
	// .subscribe(x => alert(x));

	// let testel = document.querySelector('#testfn');

	// console.log('testel');
	// console.log(testel);
	// console.log(testel.testfn());
	// console.warn('HEJ');
	// mytestfn();
	// console.warn('HOPP');
	// console.log('test.js');
	// myRxmq.channel('heat').behaviorsubject('discount-1').subscribe(x => console.log('test.js: ' + x));
	// myRxmq.channel('heat').behaviorsubject('discount-2').subscribe(x => console.log('test.js: ' + x));
	// myRxmq.channel('repair').behaviorsubject('increase').subscribe(x => console.log('R&I: ' + x));

	// let button = document.querySelector("#knappen");

	// let buttonbox = document.querySelector("#buttonbox");

	// const click$ = Rx.Observable.fromEvent(buttonbox, 'click');

	// const doubleClick$ = click$
	// 						.bufferWhen(() => click$.debounceTime(250))
	// 						.filter((x) => x.length >= 2)
	// 						.map(([e1, e2]) => e1.target.id === e2.target.id);


	// doubleClick$
	// .subscribe(totalClicks => {
	// 	console.log(totalClicks);
	// });






	//const ticker$ = Rx.Observable.interval(1000);
	//ticker$.subscribe(e => receiver.value = e);

	// sender1Subject.subscribe(e => console.log(e));



	// 	.subscribe(sender1Subject);


	// let sender1Subject = new Rx.BehaviorSubject();
	// Rx.Observable.of(sender1.value);
	// Rx.Observable.fromEvent(sender1, 'blur');
	// const merged$ = Rx.Observable.merge(Rx.Observable.of(sender1.value), Rx.Observable.fromEvent(sender1, 'blur').map(x => x.target.value));

	// merged$.subscribe(sender1Subject);
	// // sender1Subject.subscribe(console.log);
	// // sender1Subject.subscribe(x => receiver.value = x);


	// let receiver = document.querySelector('#receiver');
	// let sender1 = document.querySelector('#sender1');
	// let sender2 = document.querySelector('#sender2');
	// let sender3 = document.querySelector('#sender3');
	// let sender4 = document.querySelector('#sender4');
	// let sender5 = document.querySelector('#sender5');
	// let sender6 = document.querySelector('#sender6');


	//Functions
	// const valueFromElement$ = function(element) {
	// 	return Rx.Observable.merge(Rx.Observable.of(element.value), Rx.Observable.fromEvent(element, 'blur').map(x => x.target.value), Rx.Observable.fromEvent(element, 'click').map(x => x.target.value), Rx.Observable.fromEvent(element, 'keyup').filter(x => x.keyCode == 13).map(x => x.target.value));
	// };



	// let row1 = document.querySelector('#row1');
	// let row2 = document.querySelector('#row2');
	// let row3 = document.querySelector('#row3');

	// let row1Senders = row1.querySelectorAll('.sender');
	// let row2Senders = row2.querySelectorAll('.sender');
	// let row3Sender1 = row3.querySelector('.sender1');
	// let row3Sender2 = row3.querySelector('.sender2');

	// let row1Receiver = row1.querySelector('.receiver');
	// let row2Receiver = row2.querySelector('.receiver');

	// let row3Receiver1 = row3.querySelector('[year="1"]');
	// let row3Receiver2 = row3.querySelector('[year="2"]');
	// let row3Receiver3 = row3.querySelector('[year="3"]');
	// let row3Receiver4 = row3.querySelector('[year="4"]');


	// let sendersAndReceivers = [{senders: row1Senders, receiver: row1Receiver}, {senders: row2Senders, receiver: row2Receiver}];

	// console.log(row1Senders);

	// const combineLatest$ = function(...streams) {
	// 	return Rx.Observable.combineLatest(streams);
	// };

	// const element$ = function(element) {
	// 	return Rx.Observable.merge(Rx.Observable.of(element), Rx.Observable.fromEvent(element, 'blur').map(x => x.target), Rx.Observable.fromEvent(element, 'click').map(x => x.target), Rx.Observable.fromEvent(element, 'keyup').filter(x => x.keyCode == 13).map(x => x.target));
	// };

	// let elementsToElements$ = function(...elements) {
	// 	return elements.map(element => element$(element));
	// };


	// sendersAndReceivers.forEach(obj => {
	// 	excel(obj.senders, obj.receiver, sum);
	// });


	// function sum(acc, num) {
	// 	return acc + num;
	// }



	// function excel(senders, receiver, method) {
	// 	let elements$ = elementsToElements$.apply(null, senders);

	// 	Rx.Observable.combineLatest(elements$)
	// 	.map(x => x.map(y => {
	// 		return {year: Number(y.getAttribute('year')), value: Number(y.value)};
	// 	}))
	// 	.map(x => x.map(y => y.year * y.value))
	// 	.map(x => x.reduce((acc, num) => method(acc, num)))
	// 	//.subscribe(console.log);
	// 	.subscribe(result => receiver.value = result);
	// }

	// const sender1$ = element$(row3Sender1);
	// const sender2$ = element$(row3Sender2);
	// const combinedSender$ = Rx.Observable.combineLatest(sender1$, sender2$);
	// const subject = new Rx.Subject();


	// const row3ReceiverFn = function(el) {
	// 	return function(x) {
	// 		let year = el.getAttribute("year");
	// 		let numYear = Number(year);
	// 		let result = x[0] * Math.pow((x[1] + 1), numYear);
	// 		let roundedResult = parseFloat(Math.round(result * 1000) / 1000).toFixed(3);
	// 		return el.value = roundedResult;
	// 	};
	// };

	// const observer1 = row3ReceiverFn(row3Receiver1);

	// const observer2 = row3ReceiverFn(row3Receiver2);

	// const observer3 = row3ReceiverFn(row3Receiver3);

	// const observer4 = row3ReceiverFn(row3Receiver4);



	// subject
	// .subscribe(observer1);

	// subject.subscribe(observer2);
	// subject.subscribe(observer3);
	// subject.subscribe(observer4);

	// combinedSender$
	// .map(([e1, e2]) => [e1.value, e2.value])
	// .map(([e1, e2]) => [Number(e1), Number(e2)])
	// .subscribe(subject);



	// myRxmq.channel('water').behaviorobserve('cost')
	// .subscribe(x => console.log(x));

	// myRxmq.channel('water').behaviorobserve('increase')
	// .subscribe(x => console.log(x));


	// combineLatest$(myRxmq.channel('water').behaviorobserve('cost'), myRxmq.channel('water').behaviorobserve('increase'))
	// .subscribe(x => console.log(x));

	// combineLatest$(myRxmq.channel('water').behaviorobserve('cost'), myRxmq.channel('water').behaviorobserve('increase'))
	// .subscribe(x => console.log(x));

	// Rx.Observable.of(row3Sender)
	// .subscribe(x => console.log(x));

	// Rx.Observable.of(row3Sender)
	// .subscribe(function testfunction(x) {
	// 	return console.log(x);
	// });


	// Rx.Observable.of(row3Sender)
	// .subscribe(testfunction);



	// valueFromElement$(sender1);

	// valueFromElement$(sender2);

	// let valueFromSenders$ = function(...elements) {
	// 	return elements.map(element => valueFromElement$(element));
	// };

	// Rx.Observable.combineLatest([valueFromElement$(sender1), valueFromElement$(sender2), valueFromElement$(sender3)])
	// .subscribe(console.log);

	// Rx.Observable.combineLatest([sender1, sender2].map(element => valueFromElement$(element)))
	// .subscribe(console.log);

	// Rx.Observable.combineLatest(valueFromSenders$.apply(null, [sender1, sender2, sender3, sender4, sender5, sender6]))
	// .map(x => x.map(y => Number(y)))
	// .map(x => x.filter(y => !isNaN(y)))
	// .map(x => x.reduce((acc, num) => acc + num))
	// .subscribe(result => receiver.value = result);






	// .map(x => x.filter(y => !isNaN(y)))




	// let values = valueFromSenders$([sender1, sender2, sender3]);

	// Rx.Observable.combineLatest(values)
	// .subscribe(console.log);


	// Rx.Observable.combineLatest(Rx.Observable.of(sender1)
	// .map(element => valueFromElement$(element)), 
	// Rx.Observable.of(sender2)
	// .map(element => valueFromElement$(element)))
	// .subscribe(console.log);



	// const valueFromSender1$ = valueFromElement$(sender1);
	// const valueFromSender2$ = valueFromElement$(sender2);


	// const combinedValuesFromSenders$ = combineLatest$(valueFromSenders$([sender1, sender2, sender3, sender4, sender5, sender6]));


	// Rx.Observable.mergeMap(valueFromSenders$([sender1, sender2, sender3, sender4, sender5, sender6]))
	// .subscribe(console.log);


	// const combinedNumbersFromSenders$ = combinedValuesFromSenders$
	// 	.map(([...values]) => {
	// 		return values.reduce((acc, item) => {
	// 			return acc + Number(item)
	// 		}, 0);
	// 	});



	// combinedNumbersFromSenders$
	// .subscribe(result => receiver.value = result);



	// let sender2Subject = new Rx.BehaviorSubject();
	// Rx.Observable.of(sender1.value);
	// Rx.Observable.fromEvent(sender1, 'blur');
	// const merged2$ = Rx.Observable.merge(Rx.Observable.of(sender2.value), Rx.Observable.fromEvent(sender2, 'blur').map(x => x.target.value));

	// merged2$.subscribe(sender2Subject);
	// // sender2Subject.subscribe(console.log);
	// // sender2Subject.subscribe(x => receiver.value = x);




	// combineLatest$(sender1Subject, sender2Subject)
	// .map(([s1, s2]) => Number(s1) + Number(s2))
	// .subscribe(console.log);

	// combinedSenderStream.subscribe(([s1, s2]) => receiver.value = Number(s1) + Number(s2));


	// const senderStream1 = 
	// .map(e => e.target.value);
	// senderStream1.subscribe(sender1Subject);

	// const sender2Subject = new Rx.Subject();
	// const senderStream2 = Rx.Observable.fromEvent(sender2, 'blur');
	// //senderStream2.subscribe(e => receiver.value = e.target.value);

	// const combinedSenderStream = Rx.Observable.combineLatest(senderStream1, senderStream2);













	// var db = "hej";

	// console.log('tja');
	// Rx.Observable.fromEvent(document, 'click')
	// .map((ev) => Rx.Observable.interval(1000))
	// //.map((ev) => 'hej')
	// .mergeAll()
	// .subscribe(x => console.log(x));

	// const Money = function (currency, val) {
	// 	return {
	// 		value: function() {
	// 			return val;
	// 		},
	// 		currency: function() {
	// 			return currency;
	// 		},
	// 		toString: function() {
	// 			return this.currency() + ' ' + this.value();
	// 		}
	// 	}
	// }

	// const newRandomNumber = () => Math.floor(Math.random() * 100);

	// // Rx.Observable.interval(1000)
	// // 	.skip(1)
	// // 	.take(5)
	// // 	.map(num => new Money('USD', newRandomNumber()))
	// // 	.subscribe(price => {
	// // 		console.log(price.value());
	// // 	});

	// // Rx.Observable.interval(1000)
	// // 	.timeInterval()
	// // 	.subscribe(console.log);


	// let api1 = 'https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,se&units=metric&APPID=d4bf7922db1fa7f4d48e3fc22ecbf0a6';
	// let api2 = 'https://api.openweathermap.org/data/2.5/forecast?q=Oslo,no&units=metric&APPID=d4bf7922db1fa7f4d48e3fc22ecbf0a6';

	// function fetchData(api) {
	// 	return fetch(api)
	// 	.then(data => data.json());
	// 	// .then(data => console.log(data));
	// }

	// function fetchDataInterval(api) {
	// 	return Rx.Observable.interval(2000)
	// 		.mergeMap(() => Rx.Observable.fromPromise(fetchData(api)));
	// }

	// // function fetchDataInterval(api) {
	// // 	return Rx.Observable.of('one', 'two').mergeMap(() => Rx.Observable.interval(2000)
	// // 		.mergeMap(() => Rx.Observable.fromPromise(fetchData(api))));
	// // }

	// //fetchDataInterval(api1).subscribe(console.log);

	// var oslo = Rx.Observable.of({city: 'oslo', url: api2})
	// 	.mergeMap(x => Rx.Observable.interval(1000)
	// 						.mergeMap(i => Rx.Observable.fromPromise(fetchData(x.url))
	// 											.map(result => {
	// 												return {city: x.city, temp: result.list[0].main.temp};
	// 											})
	// 						)
	// 	);

	// var stockholm = Rx.Observable.of({city: 'stockholm', url: api1})
	// 	.mergeMap(x => Rx.Observable.interval(1000)
	// 						.mergeMap(i => Rx.Observable.fromPromise(fetchData(x.url))
	// 											.map(result => {
	// 												return {city: x.city, temp: result.list[0].main.humidity};
	// 											})
	// 						)
	// 	);


	// Rx.Observable.merge(stockholm, oslo)
	// 	//.subscribe(x => console.log(x.city + ' har ' + x.temp + ' grader'));
	// 	.subscribe(x => document.querySelector('#' + x.city).textContent = x.city + ' har ' + x.temp + ' grader');

	// const panel = document.querySelector("#dragtarget");

	// Rx.Observable.fromEvent(panel, 'mousedown')
	// .concatMap(() => Rx.Observable.fromEvent(document, 'mousemove').takeUntil(Rx.Observable.fromEvent(document, 'mouseup')))
	// .subscribe(event => {
	// 	console.log(event.clientX);
	// 	// panel.style.left = event.clientX + 'px';
	// 	// panel.style.top = event.clientY + 'px';
	// });




	// let msft = Rx.Observable.interval(3000)
	// 	.switchMap(i => Rx.Observable.fromPromise(fetchData('https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=MSFT&outputsize=compact&apikey=WZVV3KUCJVSFO1KR')))
	// 	.map(x => x[Object.keys(x)[1]])
	// 	.map(x => x[Object.keys(x)[0]])
	// 	.map(x => x[Object.keys(x)[0]]);

	// let aapl = Rx.Observable.interval(3000)
	// 	.switchMap(i => Rx.Observable.fromPromise(fetchData('https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=AAPL&outputsize=compact&apikey=WZVV3KUCJVSFO1KR')))
	// 	.map(x => x[Object.keys(x)[1]])
	// 	.map(x => x[Object.keys(x)[0]])
	// 	.map(x => x[Object.keys(x)[0]]);

	// Rx.Observable.fromEvent(document, 'click')
	// .switchMap(x => Rx.Observable.merge(msft, aapl))
	// .subscribe(console.log);



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

	// let clearbutton = document.querySelector('#clearbutton');
	// let click = Rx.Observable.fromEvent(clearbutton, 'click');

	// // let intervalFromClick = click.switchMap((ev) => Rx.Observable.interval(1000));

	// click.subscribe(myRxmq.channel('clearbutton1').subject('click'));

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
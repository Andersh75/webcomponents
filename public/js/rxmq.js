class EndlessSubject extends Rx.Subject {
  
	complete() {}
	error(error) {
		this.thrownError = error;
		this.observers.forEach(os => {
		os.destination._error.call(os.destination._context, error);
		});
	}
}

class EndlessBehaviorSubject extends Rx.BehaviorSubject {
  
	complete() {}
	error(error) {
		this.thrownError = error;
		this.observers.forEach(os => {
		os.destination._error.call(os.destination._context, error);
		});
	}
}
  
  class Channel {
  
		constructor() {
			this.subjects = [];
		}
		
		subject(name, {Subject = EndlessSubject} = {}) {
			let s = this.findSubjectByName(this.subjects, name);
			if (!s) {
			s = new Subject();
			s.name = name;
			this.subjects.push(s);
			}
			return s;
		}

		behaviorsubject(name, {Subject = EndlessBehaviorSubject} = {}) {
			let s = this.findSubjectByName(this.subjects, name);
			if (!s) {
			s = new Subject();
			s.name = name;
			this.subjects.push(s);
			}

			return s;
		}
		
		observe(name) {
			return this.subject(name);
		}

		behaviorobserve(name) {
			return this.behaviorsubject(name);
		}
		
		findSubjectByName(subjects, name) {
			let res; 
			if (name === '*') {
				 res = subjects.filter(s => true);
			} else {
				res = subjects.filter(s => s.name === name);
			}
			
			if (!res || res.length < 1) {
			return undefined;
			}

			if (res.length > 1) {
				return Rx.Observable.combineLatest(res);
			}
			return res[0];
		}
  }
  
  class Rxmq {
  
		constructor() {
			this.channels = {};
		}
		
		channel(name = 'defaultRxmqChannel') {
			if (!this.channels[name]) {
			this.channels[name] = new Channel();
			}
		
			return this.channels[name];
		} 
  }

  var myRxmq = new Rxmq();
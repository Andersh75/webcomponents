
class EndlessReplaySubject extends Rx.ReplaySubject {

	complete() {}
	error(error) {
	  this.error = error;
	  this.observers.forEach(os => {
		os.error(error);
		os.isStopped = false;
	  });
	}
  }
  
  class EndlessSubject extends Rx.Subject {
  
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
	  this.channelBus = new EndlessReplaySubject();
	  this.channelStream = this.channelBus.publish().refCount();
	}
  
	subject(name, {Subject = EndlessSubject} = {}) {
	  let s = this.findSubjectByName(this.subjects, name);
	  if (!s) {
		s = new Subject();
		s.name = name;
		this.subjects.push(s);
		this.channelBus.next(s);
	  }
	  return s;
	}
  
	observe(name) {
	  return this.subject(name);
	}
  
	findSubjectByName(subjects, name) {
	  const res = subjects.filter(s => s.name === name);
	  if (!res || res.length < 1) {
		return undefined;
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
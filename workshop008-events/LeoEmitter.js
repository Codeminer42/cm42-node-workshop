const { EventEmitter } = require('events');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
class LeoEmitter {

  constructor () {
    this.listeners = {}
  }

  on (label, callback) {
    const listenersForLabel = this.listeners[label] || [];
    listenersForLabel.push(callback);
    this.listeners[label] = listenersForLabel;
  }

  off (label, callback) {
    if (!(label in this.listeners)) return;

    const listenersForLabel = this.listeners[label];
    this.listeners[label] = listenersForLabel.filter(listener => listener !== callback);
  }

  emit (label, params) {
    const listenersForLabel = this.listeners[label] || [];

    listenersForLabel.forEach(listener => {
      listener(params);
    });
  }
}

const eventListener = new LeoEmitter();

eventListener.on('connection', (name) => {
  console.log(name, '1')
});

const connection2 = () => { console.log('connection 2')}
eventListener.on('connection', connection2)

const fn = () => {
  console.log('another bites the dust');
}

eventListener.on('another', fn)

const question = () => {
  rl.question('test ?', function (name) {
    if (name === 'exit') {
      console.log('\nBYE BYE !!!');
      process.exit(0);
    }

    if (name === 'stop') {
      eventListener.off('another', fn);
      eventListener.off('connection', connection2);
    }

    eventListener.emit('connection', name);
    eventListener.emit('another');
    question();
  });
}

question();
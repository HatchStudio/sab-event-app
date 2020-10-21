import Ember from 'ember';
import Customers from '../spf-winners-data';

export default Ember.Controller.extend({
  welcome: true,
  summary: false,
  animate: false,
  show: false,
  business: '',
  prize: '',
  owner: '',
  stp: 12345,
  panel1: 0,
  panel2: 0,
  panel3: 0,
  panel4: 0,
  panel5: 0,
  init: function() {
    this._super();

    const context = this;
    const socket = this.get('websockets').socketFor('ws://167.99.254.204:5001');

    socket.on('open', this.myOpenHandler, this);
    socket.on('message', this.myMessageHandler, this);
    socket.on('close', function(event) { console.log('closed'); }, this);

    setInterval(function() {
      if (context.animate) {
        const random1 = Math.floor(Math.random() * 10);
        const random2 = Math.floor(Math.random() * 10);
        const random3 = Math.floor(Math.random() * 10);
        const random4 = Math.floor(Math.random() * 10);
        const random5 = Math.floor(Math.random() * 10);
        const random6 = Math.floor(Math.random() * 10);

        context.set('panel1', random1);
        context.set('panel2', random2);
        context.set('panel3', random3);
        context.set('panel4', random4);
        context.set('panel5', random5);
        context.set('panel6', random6);
      } else {
        if (context.stp==0) {
          context.set('panel1', 0);
          context.set('panel2', 0);
          context.set('panel3', 0);
          context.set('panel4', 0);
          context.set('panel5', 0);
          context.set('panel6', 0);
        } else {
          const stpString = context.stp+'';

          context.set('panel1', stpString.charAt(0));
          context.set('panel2', stpString.charAt(1));
          context.set('panel3', stpString.charAt(2));
          context.set('panel4', stpString.charAt(3));
          context.set('panel5', stpString.charAt(4));
          context.set('panel6', stpString.charAt(5));
        }
      }
    }, 100);
  },
  myOpenHandler: function(event) {
    console.log('On open event has been called: ' + event);
  },
  myMessageHandler: function(event) {
    const message = event.data.split(';');
    const action = message[0];
    const context = this;

    switch (action) {
      case "summary":
        context.set('summary', true);
        context.set('animate', false);
        context.set('welcome', false);
        context.set('show', false);
        break;
      case "welcome":
        context.set('summary', false);
        context.set('animate', false);
        context.set('welcome', true);
        context.set('show', false);
        break;
      case "animate":
        context.set('summary', false);
        context.set('prize', message[1]);
        context.set('animate', true);
        context.set('welcome', false);
        context.set('show', false);
        break;
      case "show":
        context.set('summary', false);
        context.set('prize', message[1]);
        context.set('owner', message[2]);
        context.set('stp', message[3]);
        context.set('business', message[4]);
        context.set('animate', false);
        context.set('welcome', false);
        context.set('show', true);
        break;
    }
  },
});

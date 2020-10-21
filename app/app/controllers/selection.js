import Ember from 'ember';
import LocalCustomers from '../spf-winners-data';

export default Ember.Controller.extend({
  busy: false,
  actions: {
    summary() {
      const socket = this.get('websockets').socketFor('ws://167.99.254.204:5001');
      const message = 'summary;none';

      socket.send(message);
    },
    welcome() {
      const socket = this.get('websockets').socketFor('ws://167.99.254.204:5001');
      const message = 'welcome;none';

      socket.send(message);
    },
    animate(prize) {
      const socket = this.get('websockets').socketFor('ws://167.99.254.204:5001');
      const message = 'animate;'+prize.data.prize;

      socket.send(message);
    },
    reset(prize) {
      this.store.findRecord('prize', prize.id).then(function(p) {
        p.set('stp', 0);
        p.set('business', '');
        p.set('owner', '');
        p.set('contact', '');
        p.set('area', '');
        p.set('team', '');
        p.set('points', 0);
        p.set('depot', '');
        p.set('device', '');

        p.save();
      });
    },
    draw(prize) {
      const context = this;

      context.toggleProperty('busy');

      // Finds all the people in Firebase
      context.store.findAll('customer').then(function(c) {

        // Create an array of all the guys that have signed in
        const customersFromFirebase = c.content.map((c, _) => {
          return c.__data;
        });

        // Dedupe the local entries and only keep the people that have signed in
        // We check against the Firebase store for this
        const customers = LocalCustomers.filter((customer) => {
          let thisCustomerHasSignedIn = false;

          customersFromFirebase.map((c, _) => {

            if (c.stp == parseInt(customer[0])) {
              thisCustomerHasSignedIn = true;
            }
          });

          return thisCustomerHasSignedIn;
        });

        context.store.findAll('prize').then(function(p) {
          const prizes = p.content;
          const max = customers.length;
          const random = Math.random() * max;

          // Get a random number
          let randomFloored = Math.floor(random);

          // If it's the upper limit
          if (randomFloored == max) { randomFloored = 0; }

          // Get a random pick from the local customers (that have signed in)
          const randomLocalCustomer = customers[randomFloored];

          // Get the customer object from the Firebase store
          const randomFirebaseCustomer = customersFromFirebase.filter((customer) => {
              return customer.stp == randomLocalCustomer[0];
            })[0];

          // Pick random customer
          context.store.findRecord('prize', prize.id).then(function(p) {
            p.set('stp', randomFirebaseCustomer.stp);
            p.set('business', randomFirebaseCustomer.business);
            p.set('owner', randomFirebaseCustomer.owner);
            p.set('contact', randomFirebaseCustomer.contact);
            p.set('area', randomFirebaseCustomer.area);
            p.set('team', randomFirebaseCustomer.team);
            p.set('points', randomFirebaseCustomer.points);
            p.set('depot', randomFirebaseCustomer.depot);
            p.set('device', randomFirebaseCustomer.device);

            p.save();
          });

          // Tell the user done
          context.toggleProperty('busy');
        });
      });
    },
    show(prize) {
      const socket = this.get('websockets').socketFor('ws://167.99.254.204:5001');
      const message = 'show;'+prize.data.prize+';'+prize.data.owner+';'+prize.data.stp+';'+prize.data.business;

      socket.send(message);
    }
  },
  init: function() {
    this._super();

    var socket = this.get('websockets').socketFor('ws://167.99.254.204:5001');

    socket.on('open', this.myOpenHandler, this);
    socket.on('message', this.myMessageHandler, this);
    socket.on('close', function(event) {
      console.log('closed');
    }, this);
  },
  myOpenHandler: function(event) {
    console.log('On open event has been called: ' + event);
  },
  myMessageHandler: function(event) {
    console.log('Message received: ' + event.data);
  },
});

import Ember from 'ember';
import Customers from '../spf-winners-data';

export default Ember.Controller.extend({
  signedIn: false,
  busySaving: false,
  stp: '',
  business: '',
  owner: '',
  contact: '',
  area: '',
  team: '',
  points: '',
  depot: '',
  device: '',
  search: '000000',
  init: function() {
    this._super();
  },
  actions: {
    enter() {
      const context = this;

      context.toggleProperty('busySaving');

      var newCustomer = this.store.createRecord('customer', {
        stp: this.stp,
        business: this.business,
        owner: this.owner,
        contact: this.contact,
        area: this.area,
        team: this.team,
        points: this.points,
        depot: this.depot,
        device: this.device,
      });

      // Save the new customer & reset
      newCustomer.save().then(function(data) {
        context.set('stp', '');
        context.set('business', '');
        context.set('owner', '');
        context.set('contact', '');
        context.set('area', '');
        context.set('team', '');
        context.set('points', '');
        context.set('depot', '');
        context.set('device', '');

        context.toggleProperty('busySaving');
        context.toggleProperty('signedIn');
      });
    },
    search() {
      const context = this;
      const findCustomer = Customers.filter(function(customer) {
        const s = context.search.toUpperCase();

        return (s === customer[0] || customer[1].toUpperCase().indexOf(s) !== -1 || customer[2].toUpperCase().indexOf(s) !== -1);
      });

      if (findCustomer.length == 0) {
        alert('Sorry, we can\'t find this person');
      } else {
        const foundCustomer = findCustomer[0];

        // Ge the STP number
        const stp = foundCustomer[0];

        // Update the UI
        context.toggleProperty('busySaving');

        context.store.findAll('customer').then(function(customers) {
          const searchedForCustomers = customers.content.filter(function(obj) {
            return obj.__data.stp == stp;
          });

          if (searchedForCustomers.length!=0) {
            alert("Sorry, this person is already entered.");

            context.toggleProperty('busySaving');
          } else {
            // Now that we know the guy hasn't been entered yet
            const entrant = Customers.filter(function(customer) {
              return (stp === customer[0]);
            });

            // If there is more than 1, it will take the first
            if (entrant.length != 0) {
              context.set('stp', entrant[0][0]);
              context.set('business', entrant[0][1]);
              context.set('owner', entrant[0][2]);
              context.set('contact', entrant[0][3]);
              context.set('area', entrant[0][4]);
              context.set('team', entrant[0][5]);
              context.set('points', entrant[0][6]);
              context.set('depot', entrant[0][7]);
              context.set('device', '');

              context.toggleProperty('signedIn');
            } else {
              alert("Sorry, this entrant is not found!");
            }

            context.toggleProperty('busySaving');
          }
        });
      }
    }
  }
});

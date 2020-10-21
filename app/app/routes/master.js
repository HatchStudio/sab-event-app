import Ember from 'ember';
import Customers from '../spf-winners-data';

export default Ember.Route.extend({
  model() {
    return Customers;
  },
});

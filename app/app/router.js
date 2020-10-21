import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('landing');
  this.route('signin');
  this.route('selection');
  this.route('display');
  this.route('customers');
  this.route('master');
});

export default Router;

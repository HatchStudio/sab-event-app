import DS from 'ember-data';

export default DS.Model.extend({
  prize: DS.attr('string'),
  stp: DS.attr('number'),
  business: DS.attr('string'),
  owner: DS.attr('string'),
  contact: DS.attr('string'),
  area: DS.attr('string'),
  team: DS.attr('string'),
  points: DS.attr('number'),
  depot: DS.attr('string'),
  device: DS.attr('string'),
});

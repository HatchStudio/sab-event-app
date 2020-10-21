import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    import() {
      const context = this;
      const prizes = [
        "Panasonic 34l Microwave",
        "40cm Pedestal Fan",
        "Salton 15kg Ice Maker",
        "Samsung Galaxy J5 Prime Gold",
        "Casio Cash Register",
        "Weber 47cm Compact Kettle Braai",
        "Terrace Leisure Box Patio Set",
        "Defy Chest Freezer",
        "Pallet of beer",
        "Panasonic 34l Microwave",
        "40cm Pedestal Fan",
        "Salton 15kg Ice Maker",
        "Samsung Galaxy J5 Prime Gold",
        "Casio Cash Register",
        "Weber 47cm Compact Kettle Braai",
        "Terrace Leisure Box Patio Set",
        "Defy Chest Freezer",
        "Pallet of beer"
      ];

      prizes.map(function(prize) {
        var newPrize = context.store.createRecord('prize', {
          prize: prize,
          stp: 0,
          business: '',
          owner: '',
          contact: '',
          area: '',
          team: '',
          points: 0,
          depot: '',
          device: ''
        });

        newPrize.save();
      });


    }
  }
});

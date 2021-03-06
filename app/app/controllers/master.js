import Ember from 'ember';
import Customers from '../spf-winners-data';

export default Ember.Controller.extend({
  customers: multiDimensionalUnique(Customers)
});

function multiDimensionalUnique(arr) {
    var uniques = [];
    var itemsFound = {};
    for(var i = 0, l = arr.length; i < l; i++) {
        var stringified = JSON.stringify(arr[i]);
        if(itemsFound[stringified]) { continue; }
        uniques.push(arr[i]);
        itemsFound[stringified] = true;
    }
    return uniques;
}

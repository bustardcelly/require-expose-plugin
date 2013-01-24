define(function() {

  return {
    device: 'oven',
    bake: function(pizza) {
      return 'Baking a ' + 
              pizza.size + ', ' + 
              pizza.doughType + ' pizza with ' + 
              pizza.ingredients.join(', ') + 'in a(n) ' +
              this.device +
              '... Gimme like 5 minutes!';
    }
  };

});
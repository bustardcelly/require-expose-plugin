define(function() {

  return {
    bake: function(pizza) {
      return 'Baking a ' + 
              pizza.size + ', ' + 
              pizza.doughType + ' pizza with ' + 
              pizza.ingredients.join(', ') + 
              '... Gimme like 5 minutes!';
    }
  };

});
define(['src/pizza-factory', 'src/pizza-baker'], function(pizzaFactory, pizzaBaker) {
  
  return {
    getCheese: function(size) {
      return pizzaBaker.bake(pizzaFactory.createCheese(size));
    }
  };

});
define(['src/pizza'], function(pizza) {
  
  var factoryDoughType = 'flatbread';

  return {
    createCheese: function(size) {
      var cheesePizza = Object.create(pizza);
      cheesePizza.doughType = factoryDoughType;
      cheesePizza.size = size || cheesePizza.size;
      cheesePizza.ingredients = ['mozerella', 'parmesan', 'tomato sauce'];
      return cheesePizza;
    }
  };

});
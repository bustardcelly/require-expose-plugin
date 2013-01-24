define(['src/pizza'], function(pizza) {
  
  return {
    doughType:'flatbread',
    createCheese: function(size) {
      var cheesePizza = Object.create(pizza);
      cheesePizza.doughType = this.doughType;
      cheesePizza.size = size || cheesePizza.size;
      cheesePizza.ingredients = ['mozzarella', 'parmesan', 'tomato sauce'];
      return cheesePizza;
    }
  };

});
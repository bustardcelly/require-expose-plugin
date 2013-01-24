define(['expose!src/pizza-builder', 'expose!src/pizza-factory', 
        'expose!src/pizza-baker', 'expose!src/pizza',
        'expose!src/pizza-store-context-sicilian'], 
        function(builder, factory, baker, pizza, context) {
  
  describe('RequireJS Expose Plugin', function() {

    it('should provide module loaded with expose! with usage as expected', function() {
      expect(builder.getCheese()).toEqual(jasmine.any(String));
    });

    it('should provide a map of dependencies through require_exposed_dependencies on the loaded module', function() {
      var dependencies = builder.require_exposed_dependencies;

      expect(dependencies).not.toBeUndefined();
      expect(Object.keys(dependencies).length).toEqual(2);
    });

    it('should provide access to dependencies through exact source path defined in module', function() {
      var dependencies = builder.require_exposed_dependencies,
          factoryPath = 'src/pizza-factory',
          module;

      module = dependencies[factoryPath];
      expect(module).not.toBeUndefined();
    });

    it('should provide dependencies found by expose! unharmed', function() {
       var dependencies = builder.require_exposed_dependencies,
          factoryPath = 'src/pizza-factory',
          module, 
          pizza,
          pizzaSize = 'small';

      module = dependencies[factoryPath];
      pizza = module.createCheese(pizzaSize);
      expect(pizza.size).toEqual(pizzaSize);
    });

    it('should allow for stubbing on found dependencies', function() {
      var dependencies = builder.require_exposed_dependencies,
          factoryPath = 'src/pizza-factory',
          bakerPath = 'src/pizza-baker',
          factory = dependencies[factoryPath],
          baker = dependencies[bakerPath],
          pizzaSize = 'small',
          fakedReturn = 'Uh-oh. It\'s gonna be a while...';

      spyOn(factory, 'createCheese');
      spyOn(baker, 'bake').andReturn(fakedReturn);

      expect(builder.getCheese(pizzaSize)).toEqual(fakedReturn);
      expect(factory.createCheese).toHaveBeenCalledWith(pizzaSize);
    });

    it('should not attach require_exposed_dependencies to module without dependencies in define()', function() {
      expect(pizza.hasOwnProperty('require_exposed_dependencies')).toEqual(false);
    });

    it('should properly parse dependencies defined on new lines', function() {
      var dependencies = context.require_exposed_dependencies;
      expect(Object.keys(dependencies).length).toEqual(4);
    });

  });

});
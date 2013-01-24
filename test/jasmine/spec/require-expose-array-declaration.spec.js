define(['expose!src/pizza-factory'], function(pizzaFactory) {
  
  describe('Dependency Declaration', function() {

    var expectation = 'If you are seeing green, that means that an exception was not thrown in ' +
                      'parsing and eval\'ing the dependency list from a module that also ' +
                      'contains a literal array declaration';

    it('should properly match only dependencies defined in module which also declares array literals', function() {
      expect(expectation).toEqual(jasmine.any(String));
    });

  });

});
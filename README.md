# require-expose-plugin

require-expose-plugin is a [RequireJS](http://requirejs.org/ 'RequireJS') loader plugin to expose of dependency module references for stubbing/mocking/spying purposes in unit tests. It provides a means to access the loaded dependecies for a target module by prepending the module path with 'expose!'.

  define(['expose!src/my-module'], function(myModule)) {
    describe('My Module', function() {
      var dependency = myModule.require_exposed_dependencies['src/my-dependency'];
      
      spyOn(dependency, 'bar');
      myModule.foo('hello', 'world');
      expect(dependency).toHaveBeenCalledWith('hello, world');
    });
  });

### Caveats
It utilizes Array.prototype.indexOf and XMLHttpRequest, so all modern browsers and IE9+.
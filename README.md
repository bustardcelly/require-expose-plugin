# require-expose-plugin

require-expose-plugin is a [RequireJS](http://requirejs.org/ 'RequireJS') loader plugin to expose dependency module references for stubbing/mocking/spying purposes in unit tests. It provides a means to access the loaded dependecies for a target module by prepending the module path with 'expose!'.

_src/my-dependency.js_
    define(function() {
      return {
        bar: function(greeting) {
          console.log(greeting);
        }
      };
    });

_src/my-module.js_
    define(['src/my-dependency'], function(dependency) {
      return {
        foo: function(salutation, name) {
          dependency.bar(salutation + ', ' + name);
        }
      };
    });

_spec/my-module.spec.js_
    define(['expose!src/my-module'], function(myModule)) {
    
      describe('My Module', function() {
        var dependency = myModule.require_exposed_dependencies['src/my-dependency'];
        
        spyOn(dependency, 'bar');
        myModule.foo('hello', 'world');
        expect(dependency).toHaveBeenCalledWith('hello, world');
      });
      
    });

## How It Works

The require-expose-plugin first loads the target module file as a plain text file, then runs a RegEx to grab the associated dependencies, require()'s those dependencies and builds a reference map using the resource path as the key. That map is then added as a new property to the target module: _require_exposed_dependencies_.

Using the resource path, you can access that dependency just as if you had declared it as a dependency for the current module.

From the example above, you have access to the _'src/my-dependency'_ module without declaring it within the _define()_ dependencies of the my-module.spec:

    var dependency = myModule.require_exposed_dependencies['src/my-dependency'];

The example utilizes [Jasmine](http://pivotal.github.com/jasmine/), but you can choose whichever unit testing framework you like. require-expose-plugin does not utilize any specific unit testing framework; it simply exposes dependency references.

### Caveats
require-expose-plugin utilizes _Array.prototype.indexOf_ and _XMLHttpRequest_. As such, it is only supported in all modern browsers and IE9+.
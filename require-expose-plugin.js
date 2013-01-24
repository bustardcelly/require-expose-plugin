define(function() {

  // Match anything between [] - presumably and hopefully the dependency listing of a module.
  var dependencyArrayRegex = /\[([^\]]+)\]/;

  function resolvePath(resource, pathMap) {
    var rootDirIndex = resource.indexOf('/'),
        baseLocation = (rootDirIndex > -1) ? resource.substr(0, rootDirIndex) : undefined,
        configurationPath, 
        resolvedPath;

    if(baseLocation && pathMap.hasOwnProperty(baseLocation)) {
      configurationPath = pathMap[baseLocation];
      resolvedPath = configurationPath + (resource.substr(rootDirIndex, resource.length) + '.js');
    }
    return resolvedPath;
  }
  
  function loadAsText(path, successDelegate, errorDelegate) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', path, true);
    xhr.onreadystatechange = function(event) {
      if(xhr.readyState === 4) {
        if(xhr.status >= 399) {
          errorDelegate.call('Could not load ' + path + '. HTTP Status: ' + xhr.status + '.');
        }
        else {
          var text = xhr.responseText,
              dependencyMatch = dependencyArrayRegex.exec(text),
              dependencyList;

          if(dependencyMatch && dependencyMatch.length > 0) {
            // i know eval() is evil, 
            // but the regex to determine developers' style of dependency declaration - including breaks - is too crazy.
            dependencyList = eval(dependencyMatch[0]);
            require(dependencyList, function() {
              var map = {},
                  i, 
                  length = arguments.length;
              for( i = 0; i < length; i++ ) {
                map[dependencyList[i]] = arguments[i];
              }
              successDelegate.call(null, map);
            });
          }
          else {
            errorDelegate('Could not properly parse dependencies for require-expose-plugin.');
          }
        }
      }
    };
    xhr.send();
  }

  return {
    load: function(resourceName, req, loadDelegate, configuration) {
      var resolvedResourcePath = resolvePath(resourceName, configuration.paths);
      if(resolvedResourcePath) {
        loadAsText(resolvedResourcePath, 
                    // success
                    function(dependencies) {
                      req([resourceName], function(module) {
                        module.require_exposed_dependencies = dependencies;
                        loadDelegate(module);
                      });
                    }, 
                    // fail
                    function(errorMessage) {
                      console.log('error: ' + errorMessage);
                      req([resourceName], function(module) {
                        loadDelegate(module);
                    });
                  });
      }
      else {
        loadDelegate.error('Could not resolve path for ' + resourceName);
      }
    }
  };

});
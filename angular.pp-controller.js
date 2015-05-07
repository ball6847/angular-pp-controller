'use_strict';

angular
  .module('pp.controller', [])
  .directive('ppController', ['$q', '$injector', '$controller', function($q, $injector, $controller) {
    return {
      scope: true,
      link: function(scope, elem, attr) {
        var resolvers, promises = {}, locals = {$scope: scope};

        resolvers = $injector.get(attr.ppResolver);

        // run all resolvers, and collect promises from them
        angular.forEach(resolvers, function(resolver, name) {
          promises[name] = $injector.invoke(resolver);
        }); 

        // invoke controller when all promise is resolved
        $q.all(promises).then(function(results) {
          angular.extend(locals, results);
          $controller(attr.ppController, locals);
        });
      }
    };
  }]);

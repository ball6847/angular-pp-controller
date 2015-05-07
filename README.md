# Angular PP Controller

Angular controller is so powerful when combining with `resolve` of angular router which allowed us to wait for somethings before executing the controller.
But we can't do this without routing, if you use the inline `ng-controller`, the `resolve` will become impossible. This directive will make that happend.

## Usage

1. Include javascript file in your project somewhere after the angularjs file.

```html

<script src="js/angular.min.js"></script>
<script src="js/angular.pp-controller.js"></script>

<script src="js/app.js"></script>
```

2. Add `pp.controller` to your app's dependencies list.


```javascript

angular.module('app', ['ui.router', 'pp.controller']);

```

In your template, notice the `pp-controller` and `pp-controller`.

```html
<div pp-controller="MyController" pp-resolver="MyResolver">
  <ul>
    <li ng-repeat="item in items">
      {{ item.name }}
    </li>
  </ul>
</div>

```

In your controller file, just create a resolver using a factory and write controller like you would normally do.


```javascript

angular
  .module('app');
  .factory('MyResolver', [function() {
    return {
      collection: ['$http', function($http) {
        return $http.get('api/collection/123');
      }
    };
  }])
  .controller('MyController', ['$scope', 'collection', function($scope, collection) {
    $scope.items = collection.data;
  }]);

```

That's it!

PS. Use it on your own risk.

Thanks,
Porawit Poboonma

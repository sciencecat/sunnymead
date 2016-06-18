(function () {
  
  angular
    .module('app')
    .factory('TypesRepository', TypesRepository);
    
  TypesRepository.$inject = ['$http', '$q'];
  
  function TypesRepository($http, Promise) {
    var types = null;
    
    function fetch() {
      return $http.get('src/data/types.yaml').then(function (result) {
        try {
          types = jsyaml.safeLoad(result.data);
          return Promise.resolve(types);
        } catch (e) {
          return Promise.reject(e);
        }
      });
    }
    
    function get() {
      if (types) {
        return Promise.resolve(types)
      }
      
      return fetch();
    }
    
    function getByType(type) {
      return get()
        .then(function (types) {
          var item = types.filter(function (item) {
            return item.type === Number(type);
          })[0];
          
          return Promise.resolve(item);
        });
    }
    
    return {
      get: get,
      getByType: getByType
    };
    
  }
  
})();
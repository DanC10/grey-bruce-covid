greyBruceCovidTracker.factory('dataFac', ['$http, $sce', function ($http, $sce) {
 
     var getCOVID19Data = function () {
 
         var url = `https://data.ontario.ca/api/3/action/datastore_search?callback=foo`
         return $http.jsonp($sce.trustAsResourceUrl(url)).then(function (data) {
             console.log(data)
             return data;
         }); 
     };
 
     return {
        getCOVID19Data: getCOVID19Data
     }
 
 }]);
greyBruceCovidTracker.factory('dataFac', ['$http', "$sce", function ($http, $sce) {

  var getCOVID19Data = function () {

    //Declare url and make request to get list of confirmed cases of COVID-19 in grey bruce.
    var url = `https://data.ontario.ca/api/3/action/datastore_search?q=grey+bruce&resource_id=455fd63b-603d-4608-8216-7d8647f43350`
    return $http.jsonp($sce.trustAsResourceUrl(url)).then(function (data) {
      //Declare variables
      let cases = [];
      let totalCases = 0;
      //Sort result by dates in ascending order
      data.data.result.records.sort(function (a, b) {
        return new Date(a.ACCURATE_EPISODE_DATE) - new Date(b.ACCURATE_EPISODE_DATE);
      });
      //Add all dates between March 6th (first known infection) and now.
      for (i = 0; i < (moment().diff(moment("2020-03-06"), "days")); i++) {
        cases.push({ date: moment("2020-03-06").add(i, "days").format("YYYY-MM-DD"), formattedDate: moment("2020-03-06").add(i, "days").format("MMMM Do")})
      }
      //For every date, count the number of confirmed cases, and add the total to the corresponding cases object.
      for (i = 0; i < cases.length; i++) {
        for (j = 0; j < data.data.result.records.length; j++) {
          if (cases[i].date == (data.data.result.records[j].ACCURATE_EPISODE_DATE).split("T")[0]) {
            totalCases++;
          }
        }
        cases[i].total = totalCases
      }
      
      //Return the cases object
      return cases;
    });
  };

  return {
    getCOVID19Data: getCOVID19Data
  }

}]);
greyBruceCovidTracker.factory('dataFac', ['$http', "$sce", function ($http, $sce) {

  /**
   * @function getCOVID19Data return the number of cases in grey bruce by date.
   */
  var getCOVID19Data = function () {

    //Declare url and make JSONP request to get list of confirmed cases of COVID-19 in grey bruce.
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
        cases.push({ date: moment("2020-03-06").add(i, "days").format("YYYY-MM-DD"), formattedDate: moment("2020-03-06").add(i, "days").format("MMMM Do") })
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
      return { cases: cases, totalInfections: data.data.result.total };
    });
  };

  /**
   * @function getStats return outcomes of cases, as well as acquisition info;
   */
  var getStats = function () {
    //Declare variables
    let percentMale = 0, percentFemale = 0, percentResolved = 0, percentTravel = 0, percentContact = 0, percentPending = 0, percentNeither = 0, totalMale = 0, totalFemale = 0, totalResolved = 0, totalTravel = 0, totalContact = 0, totalPending = 0, totalNeither = 0;
    //Declare url and make JSONP request to get list of confirmed cases of COVID-19 in grey bruce.
    var url = `https://data.ontario.ca/api/3/action/datastore_search?q=grey+bruce&resource_id=455fd63b-603d-4608-8216-7d8647f43350`
    return $http.jsonp($sce.trustAsResourceUrl(url)).then(function (data) {
      data.data.result.records.forEach(row => {
        //Calculate total male and female cases
        switch (row.CLIENT_GENDER) {
          case "MALE":
            totalMale += 1;
            break;
          case "FEMALE":
            totalFemale += 1;
            break;
        }
        //Calculate total resolved cases
        switch (row.OUTCOME1) {
          case "Resolved":
            totalResolved += 1;
            break;
        }
        //Calculate total acquisition of cases
        switch (row.CASE_ACQUISITIONINFO) {
          case "Travel-Related":
            totalTravel += 1;
            break;
            case "Contact of a confirmed case":
            totalContact += 1;
            break;
            case "Neither":
            totalNeither += 1;
            break;
            case "Information pending":
            totalPending += 1;
            break;
        }
      })
      //Calculate percentages
      percentMale = Math.round((totalMale / data.data.result.total) * 100);
      percentFemale = Math.round((totalFemale / data.data.result.total) * 100);
      percentResolved = Math.round((totalResolved / data.data.result.total) * 100);
      percentTravel = Math.round((totalTravel / data.data.result.total) * 100);
      percentContact = Math.round((totalContact / data.data.result.total) * 100);
      percentNeither = Math.round((totalNeither / data.data.result.total) * 100);
      percentPending = Math.round((totalPending / data.data.result.total) * 100)
      //Return stats
      return {percentMale: percentMale, percentFemale: percentFemale, percentResolved, percentResolved, percentTravel: percentTravel, percentPending: percentPending, percentContact: percentContact, percentNeither: percentNeither};
    })
  };

  return {
    getCOVID19Data: getCOVID19Data,
    getStats: getStats
  }

}]);
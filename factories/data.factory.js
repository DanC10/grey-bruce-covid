greyBruceCovidTracker.factory('dataFac', ['$http', "$sce", function ($http, $sce) {

  /**
   * @function getCOVID19Data return the number of cases in grey bruce by date.
   */
  var getCOVID19Data = function () {
   
    //Declare url and make JSONP request to get list of confirmed cases of COVID-19 in grey bruce.
    var url = `https://data.ontario.ca/api/3/action/datastore_search?q=grey+bruce&resource_id=455fd63b-603d-4608-8216-7d8647f43350&limit=500`
    return $http.jsonp($sce.trustAsResourceUrl(url)).then((data) => {
      //Declare variables
   let cases = [];
      let totalCases = 0;
      //Sort result by dates in ascending order
      data.data.result.records.sort(function (a, b) {
        return new Date(a.Accurate_Episode_Date) - new Date(b.Accurate_Episode_Date);
      });
      //Add all dates between March 6th (first known infection) and now.
      for (i = 0; i < (moment().diff(moment("2020-03-06"), "days")); i++) {
        cases.push({ date: moment("2020-03-06").add(i, "days").format("YYYY-MM-DD"), formattedDate: moment("2020-03-06").add(i, "days").format("MMMM Do") })
      }
      console.log(data)
      //For every date, count the number of confirmed cases, and add the total to the corresponding cases object.
      for (i = 0; i < cases.length; i++) {
        for (j = 0; j < data.data.result.records.length; j++) {
          if (cases[i].date == (data.data.result.records[j].Accurate_Episode_Date).split("T")[0]) {
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
    let percentMale = 0, percentFemale = 0, percentUnspecified = 0, percentResolved = 0, percentTravel = 0, percentContact = 0, percentPending = 0, percentNeither = 0, percentOutbreak = 0, percentOther = 0, totalMale = 0, totalFemale = 0, totalResolved = 0, totalTravel = 0, totalContact = 0, totalNoInfo = 0, totalEpi = 0, totalOther = 0, totalOutbreak = 0, totalUnspecified = 0;
    //Declare url and make JSONP request to get list of confirmed cases of COVID-19 in grey bruce.
    var url = `https://data.ontario.ca/api/3/action/datastore_search?q=grey+bruce&resource_id=455fd63b-603d-4608-8216-7d8647f43350&limit=500`
    return $http.jsonp($sce.trustAsResourceUrl(url)).then(function (data) {
      console.log(data)
      data.data.result.records.forEach(row => {
        console.log(row.Client_Gender)
        //Calculate total male and female cases
        switch (row.Client_Gender) {
          case "MALE":
            totalMale += 1;
            break;
          case "FEMALE":
            totalFemale += 1;
            break;
            case "UNSPECIFIED":
            totalUnspecified += 1;
            break;
        }
        //Calculate total resolved cases
        switch (row.Outcome1) {
          case "Resolved":
            totalResolved += 1;
            break;
        }
        //Calculate total acquisition of cases
        switch (row.Case_AcquisitionInfo) {
          case "Travel":
            totalTravel += 1;
            break;
          case "CC":
            totalContact += 1;
            break;
          case "OB":
            totalOutbreak += 1;
            break;
          case "Missing Information":
            totalNoInfo += 1;
            break;
          case "No known epi link":
            totalEpi += 1;
            break;
            default:
              totalOther += 1;
              break
        }
      })
      //Calculate percentages
      percentMale = Math.round((totalMale / data.data.result.total) * 100);
      percentFemale = Math.round((totalFemale / data.data.result.total) * 100);
      percentResolved = Math.round((totalResolved / data.data.result.total) * 100);
      percentTravel = Math.round((totalTravel / data.data.result.total) * 100);
      percentContact = Math.round((totalContact / data.data.result.total) * 100);
      percentOutbreak = Math.round((totalOutbreak / data.data.result.total) * 100);
      percentNoInfo = Math.round((totalNoInfo / data.data.result.total) * 100);
      percentEpi = Math.round((totalEpi / data.data.result.total) * 100);
      percentUnspecified = Math.round((totalUnspecified / data.data.result.total) * 100);
      //Return stats
      return { percentMale: percentMale, percentFemale: percentFemale, percentResolved, percentResolved, percentTravel: percentTravel, percentContact: percentContact, percentNeither: percentNeither, percentOutbreak: percentOutbreak, percentUnspecified: percentUnspecified, percentEpi: percentEpi };
    })
  };

  return {
    getCOVID19Data: getCOVID19Data,
    getStats: getStats
  }

}]);
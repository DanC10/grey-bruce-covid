greyBruceCovidTracker.controller('homeCtrl', function(dataFac) {
this.$onInit = () => {
dataFac.getCOVID19Data().then((res) => {})

    let data = [];

    let chart = am4core.create("chartdiv", am4charts.XYChart);

    var categoryAxis = chart.xAxes.push(new am4charts.DateAxis());
  //  categoryAxis.dataFields.category = "ACCURATE_EPISODE_DATE";
    categoryAxis.title.text = "Date"
    var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.title.text = "Total Infections"

    //Define line series
    series = chart.series.push(new am4charts.LineSeries());
    series.strokeOpacity = 0;
    series.name = "Infections";
    series.dataFields.valueY = "ACCURATE_EPISODE_DATE";
    series.dataFields.valueX = "ROW_ID";

    chart.data = data;
}
});
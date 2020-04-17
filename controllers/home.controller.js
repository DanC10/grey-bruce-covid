greyBruceCovidTracker.controller('homeCtrl', function (dataFac, $sce, $scope) {

  this.$onInit = () => {
//Declare Chart
 this.chart = am4core.create("chartdiv", am4charts.XYChart);
//Declare axes
var categoryAxis = this.chart.xAxes.push(new am4charts.DateAxis());
categoryAxis.dataFields.category = "date";
categoryAxis.title.text = "Accurate Episode Date"
categoryAxis.renderer.labels.template.location = 0.0001;
var valueAxis = this.chart.yAxes.push(new am4charts.ValueAxis());
valueAxis.title.text = "Total Infections"

//Define line series
series = this.chart.series.push(new am4charts.LineSeries());
series.name = "Infections";
//Set Data Fields
series.dataFields.valueY = "total";
series.dataFields.dateX = "date";
//Define bullets
let bullet = series.bullets.push(new am4charts.CircleBullet());
bullet.tooltipHTML = `Total Infections: <b>{total}</b><br>Date: <b>{formattedDate}</b>`
//Define chart cursor
this.chart.cursor = new am4charts.XYCursor();
    //Get chart data from factory
    dataFac.getCOVID19Data().then((res) => {
      this.chart.data = res;
      this.total = res.length;
    })
  }

  $scope.$on("$destroy", () => {
    //Dispose of chart when users switches page
    this.chart.dispose();
});


});
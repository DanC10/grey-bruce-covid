greyBruceCovidTracker.component('homePage', {
  controllerAs: "$ctrl",
  templateUrl: "templates/home.tmpl.html",
  bindings: {},
  controller: function (dataFac, $sce, $scope, $rootScope) {

    this.chart = am4core.create("chartdiv", am4charts.XYChart);
  this.$onInit = () => {
//Declare Chart
 
//Declare axes
this.categoryAxis = this.chart.xAxes.push(new am4charts.DateAxis());
this.categoryAxis.dataFields.category = "date";
this.categoryAxis.title.text = "Accurate Episode Date"
this.categoryAxis.renderer.labels.template.location = 0.0001;
this.valueAxis = this.chart.yAxes.push(new am4charts.ValueAxis());
this.valueAxis.title.text = "Total Infections"
//Define line series
this.series = this.chart.series.push(new am4charts.LineSeries());
this.series.name = "Infections";
//Set Data Fields
this.series.dataFields.valueY = "total";
this.series.dataFields.dateX = "date";
//Define bullets
this.bullet = this.series.bullets.push(new am4charts.CircleBullet());
this.bullet.tooltipHTML = `Total Infections: <b>{total}</b><br>Date: <b>{formattedDate}</b>`
//Define chart cursor
this.chart.cursor = new am4charts.XYCursor();
this.chart.cursor.lineY.disabled = true;
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


}});
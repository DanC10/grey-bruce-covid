greyBruceCovidTracker.component('aboutPage',{
controllerAs: "$ctrl",
templateUrl: "templates/about.tmpl.html",
bindings: {},
 controller: function(dataFac) {
     this.male = 0, this.female = 0, this.resolved = 0;
     this.$onInit = () =>{
         //Get stats
         dataFac.getStats().then((res) => {
            this.male = res.percentMale;
            this.female = res.percentFemale;
            this.resolved = res.percentResolved;
            this.outbreak = res.percentOutbreak;
            this.unspecified = res.percentUnspecified;
            this.travel = res.percentTravel;
            this.contact = res.percentContact;
            this.noInfo = res.percentNoInfo;
            this.epi = res.percentEpi;
         })
     }
}});
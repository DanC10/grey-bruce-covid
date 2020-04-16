greyBruceCovidTracker.config(function($stateProvider, $urlRouterProvider) {
  
    //States
    $stateProvider.state('/home', {
      url : '/home',
          templateUrl : 'templates/home.tmpl.html',
          controller : 'homeCtrl',
          controllerAs: "$ctrl"
      })
      .state('/about',{
        url:'/about',
        templateUrl: 'templates/about.tmpl.html',
        controller: 'aboutCtrl',
        controllerAs: '$ctrl'
      });

      //If no valid state, redirect to home
      $urlRouterProvider.otherwise("/home");
});
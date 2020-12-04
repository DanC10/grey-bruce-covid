greyBruceCovidTracker.config(function($stateProvider, $urlRouterProvider) {
  
    //States
    $stateProvider.state('/home', {
      url : '/home',
          template: "<home-page></home-page>",
          resolve: {
            $title: function () {
              return 'Home';
            }
          }
      })
      .state('/about',{
        url:'/about',
        template: "<about-page></about-page>",
        resolve: {
          $title: function () {
            return 'About';
          }
        }
      });

      //If no valid state, redirect to home
      $urlRouterProvider.otherwise("/home");
});
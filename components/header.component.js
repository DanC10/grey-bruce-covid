greyBruceCovidTracker.component('pageHeader',{
    controllerAs: "$ctrl",
    templateUrl: "templates/header.tmpl.html",
    bindings: {},
    controller: function($state){
        
    //Define States
    this.pages = [{name: "Home", state: "/home"}, {name: "About", state: "/about"}]

    /**
     * @function goToPage go to selected state and change page title.
     */
    this.goToPage = (page) => {
        
        this.selPage = page.name
        $state.go(page.state)
        this.title = $state.$current.self.resolve.$title()
    
    }

    this.$onInit = () => {
        this.title = $state.$current.self.resolve.$title()
    }
}});
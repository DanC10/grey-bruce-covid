greyBruceCovidTracker.controller('headerCtrl', function($state) {

    //Define States
    this.pages = [{name: "Home", state: "/home"}, {name: "About", state: "/about"}]

    /**
     * @function goToPage go to selected state.
     */
    this.goToPage = (page) => {
        $state.go(page)
    }
});
app.controller("landingController", ['$scope', function($scope){
    'use strict';
    $scope.slides = [
        {
            image: 'http://www.herveybayit.com.au/images/business.jpg',
            quote: '"Palladient didn\'t just improve things, it changed everything"',
            attribution: "Microsoft.com",
            textStyle: 'text-visible-inverse',
            textPosition: {top: '20px', left: '20px', width: '60%'}
        },
        {
            image: 'https://cdn.pbrd.co/images/2CjG2YFl.png',
            quote: '"We used to have to think.  Now, computers think for us."',
            attribution: 'United Nations',
            textStyle: 'text-visible',
            textPosition: {bottom: '20px', width: '100%'}
        }
    ];
}]);

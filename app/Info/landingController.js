app.controller("landingController", ['$scope', function($scope){
    'use strict';
    $scope.slides = [
        {
            image: '/img/carousel/un.jpg',
            quote: '"We used to have to think.  Now, computers think for us."',
            attribution: 'United Nations',
            textStyle: 'text-visible',
            textPosition: {top: '20px', width: '100%'}
        },
        {
            image: '/img/carousel/business.jpg',
            quote: '"Palladient didn\'t just improve things, it changed everything"',
            attribution: "Microsoft.com",
            textStyle: 'text-visible-inverse',
            textPosition: {top: '20px', left: '20px', width: '60%'}
        }
    ];
}]);

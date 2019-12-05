"use strict";

let app = angular.module('myApp', []);

let hegyek = [];

app.controller('myCtrl', ['$scope', '$http', function($scope, $http) {
    $http.get('hegyekMo.txt')
        .then(function(response) {
            $scope.szummaMagassag = 0;
            $scope.legmagasabbHegyNev = "";
            $scope.legmagasabbHegyseg = "";
            $scope.legmagasabbHegyMagassag = 0;
            $scope.adatok = response.data;
            $scope.tomb = $scope.adatok.split('\n');
            for (let i = 1; i < $scope.tomb.length; i++) {
                hegyek.push({
                    'hegycsucs' : $scope.tomb[i].split(';')[0],
                    'hegyseg' : $scope.tomb[i].split(';')[1],
                    'magassag' : $scope.tomb[i].split(';')[2],
                });
                $scope.szummaMagassag += Number($scope.tomb[i].split(';')[2]);
                let magassag = Number($scope.tomb[i].split(';')[2]);
                if ($scope.legmagasabbHegyMagassag < magassag) {
                    $scope.legmagasabbHegyMagassag = magassag;
                    $scope.legmagasabbHegyNev = $scope.tomb[i].split(';')[0];
                    $scope.legmagasabbHegyseg = $scope.tomb[i].split(';')[1];
                }
            }
            $scope.darabSzam = hegyek.length;
            $scope.atlagMagassag = $scope.szummaMagassag / $scope.darabSzam;
        });
}]);

app.controller('myControl', ['$scope', function($scope) {
    $scope.leker() = function() {
        let magassag = document.getElementById('magassag').nodeValue;
        let vanE = false;
        for (let i = 0; i < hegyek.length; i++) {
            if (hegyek.hegy == 'Börzsöny' && Number(hegyek[i].magassag) > magassag) {
                vanE = true;
                break;
            }
        }
        $scope.kiir = (vanE ? `Van ${magassag} méternél magasabb hegycsúcs a Börzsönyben!` : `Nincs ${magassag} méternél magasabb hegycsúcs a Börzsönyben!`);
    };
}]);
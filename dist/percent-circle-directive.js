(function() {
	var pcApp = angular.module('percentCircle', []);

	pcApp.directive('percentCircle', function($timeout) {
		return {
			restrict: 'E',
			replace: true,
			template: 	'<div class="pc-container">' +
							'<div id="pcBorder" class="pc-border" ng-style="setBorderImg">' + 
								'<div class="pc-circle">' + 
									'<span id="pcPercent" class="pc-percent">{{curPercent}}%</span>' +
								'</div>' +
							'</div>' +
						'</div>',
			scope: {percent : '='},
			link: function($scope, element, attrs) {
				$scope.curPercent = 0;
				$scope.setBorderImg;
				var animateTimeout;

				console.log(element[0].querySelector('.pc-percent'));

				// function setStyling() {

				// }

				function setBorderImg(deg) {
					if(deg <= 180) {
				        $scope.setBorderImg = {'background-image' : 'linear-gradient(' + (90+deg) + 'deg, transparent 50%, #A2ECFB 50%),linear-gradient(90deg, #A2ECFB 50%, transparent 50%)'};
				    }
				    else {
				        $scope.setBorderImg = {'background-image' : 'linear-gradient(' + (deg-90) + 'deg, transparent 50%, #39B4CC 50%),linear-gradient(90deg, #A2ECFB 50%, transparent 50%)'};
				    }
				}

				function animateBorderImg(fromVal, toVal) {
					if(fromVal != toVal) {
						$scope.curPercent = (fromVal < toVal) ? fromVal + 1 : fromVal - 1;
						var deg = ($scope.curPercent/100) * 360;

						setBorderImg(deg);

						animateTimeout = $timeout(function() {
							animateBorderImg($scope.curPercent, toVal);
						}, 12);

					}
				}

				$scope.$watch('percent', function(newVal, oldVal) {
					newVal = Math.round(newVal);
					if(newVal > 100) newVal = 100;
					if(newVal < 0) newVal = 0;

					var startVal = (oldVal !== $scope.curPercent) ? $scope.curPercent : oldVal;
					
					$timeout.cancel(animateTimeout);
					animateBorderImg(startVal, newVal);
				})
			}
		};
	});
})();





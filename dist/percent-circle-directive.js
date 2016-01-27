(function() {
	var pcApp = angular.module('percentCircle-directive', []);

	pcApp.directive('percentCircle', function($timeout) {
		return {
			restrict: 'E',
			replace: true,
			template: 	'<div class="pc-container">' +
							'<div class="pc-border" ng-style="setBorderImg">' + 
								'<div class="pc-circle">' + 
									'<span class="pc-percent">{{curPercent}}%</span>' +
								'</div>' +
							'</div>' +
						'</div>',
			scope: {
				percent : '=',
				colors  : '=?',
				speed   : '=?'
			},
			link: function($scope, element, attrs) {
				if(!$scope.speed) $scope.speed = 10;
				$scope.curPercent = 0;
				$scope.setBorderImg;
				var animateTimeout,
					colors = {};

				// build colors object with either user inputs or default value
				function buildColorObj() {
					if(!$scope.colors) $scope.colors = {};
					colors.center    = (!$scope.colors.center)    ? '#F5FBFC' : $scope.colors.center;
					colors.highlight = (!$scope.colors.highlight) ? '#2BCBED' : $scope.colors.highlight;
					colors.remaining = (!$scope.colors.remaining) ? '#C8E0E8' : $scope.colors.remaining;
				}

				// Styles DOM elements with corresponding colors
				function setColors() {
					buildColorObj();

					element[0].querySelector('.pc-border').style.backgroundColor = colors.highlight;
					element[0].querySelector('.pc-circle').style.backgroundColor = colors.center;
					
					setBorderImg($scope.curPercent);
				}
				setColors();

				// adjusts the percentage arch based on the provided degrees
				function setBorderImg(deg) {
					if(deg <= 180) {
				        $scope.setBorderImg = {'background-image' : 'linear-gradient(' + (90+deg) + 'deg, transparent 50%,' + colors.remaining + ' 50%),linear-gradient(90deg,' + colors.remaining + ' 50%, transparent 50%)'};
				    }
				    else {
				        $scope.setBorderImg = {'background-image' : 'linear-gradient(' + (deg-90) + 'deg, transparent 50%,' + colors.highlight + ' 50%),linear-gradient(90deg,' + colors.remaining + ' 50%, transparent 50%)'};
				    }
				}

				// Loop from one value to another to animate the movement of the percentage arch in DOM
				function animateBorderImg(fromVal, toVal) {
					if(fromVal != toVal) {
						$scope.curPercent = (fromVal < toVal) ? fromVal + 1 : fromVal - 1;
						var deg = ($scope.curPercent/100) * 360;

						setBorderImg(deg);

						animateTimeout = $timeout(function() {
							animateBorderImg($scope.curPercent, toVal);
						}, $scope.speed);

					}
				}

				// if percent changes on scope, animate the percentage arch in DOM to reflect the change
				$scope.$watch('percent', function(newVal, oldVal) {
					if(!isNaN(newVal)) {
						newVal = Math.round(newVal);

						if(newVal > 100) newVal = 100;
						if(newVal < 0) newVal = 0;

						var startVal = (oldVal !== $scope.curPercent) ? $scope.curPercent : oldVal;
						
						$timeout.cancel(animateTimeout);
						animateBorderImg(startVal, newVal);
					}
				});

				// if colors change on scope, update DOM to reflect changes
				$scope.$watchCollection('colors', function(newVal, oldVal) {
					setColors();
				});
			}
		};
	});
})();





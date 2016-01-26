(function() {
	var pcApp = angular.module('percentCircle', []);

	pcApp.directive('percentCircle', function() {
		return {
			restrict: 'E',
			template: 	'<div class="pc-container">' +
							'<div id="pcBorder" class="pc-border">' + 
								'<div class="pc-circle">' + 
									'<span id="pcPercent" class="pc-percent">0%</span>' +
								'</div>' +
							'</div>' +
						'</div>'
		};
	});
})();
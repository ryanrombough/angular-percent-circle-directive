(function() {
	var pcApp = angular.module('percentCircle', []);

	pcApp.directive('percentCircle', function() {
		return {
			restrict: 'E',
			template: 'Hello World!'
		};
	});
})();
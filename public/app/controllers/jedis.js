app.controller('jedisController', function($scope, $http, API_URL) {
	$http.get(API_URL + 'jedis')
		.success(function(response){
			$scope.jedis = response;
		})
});

$scope.toggle = function(modalstate, id) {
	$scope.modalstate = modalstate;
	switch(modalstate) {
		case 'add':
			$scope.form_title = "Add New Jedi";
			break;
		case 'edit':
			$scope.form_title = "Jedi Detail";
			$scope.id = id;
			$http.get(API_URL + "jedis/" +id);
					.success(function(response){
						console.log(response);
						$scope.jedi = response
					});
			break;
		default:
			break;
	}

	console.log(id);

	$("#myModal").modal('show');

};

$scope.save = function(modalstate, id){
	var url = "jedis";

	if (modalstate === 'edit') {
		url += "/" + id;
		$http({
			method: 'POST',
			url: url,
			data: $.param($scope.jedi),
			headers: {'Content-Type', 'application/x-www-form-urlencoded'}
		}).success(function(response){
			console.log(response);
			location.reload();
		}).error(function(response){
			console.log(response);
			alert("Pedimos desculpas, ocorreu um erro, entre em contato com o suporte.");
		});
	}
}
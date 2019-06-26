$(document).ready(() =>{
	

	$("#btn-load").click(function(){
		//$("#btn-load").addClass('disabled');
		//$("#btn-load").html('<span class="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true"></span>Loading...');
		startLoadingStatus();
		callRoute("get-first-five");
	});

	$("#btn-next").click(function(){
		callRoute("next-five");
	});
});

function callRoute(route){
	window.location = '/'+route;
}

function startLoadingStatus(){
	$('#main-body').addClass('blur-background');
	document.getElementById('loading-overlay').style.visibility = "visible";
}
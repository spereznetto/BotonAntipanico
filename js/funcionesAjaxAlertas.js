/**
 * Funciones de la vista de filtro de alertas 
 */

$("#filtro-alertas").on("submit",function(event){
	event.preventDefault();

	var fecha1 = $("#FiltroAlertasForm_desde").val() ;
	var fecha2 = $("#FiltroAlertasForm_hasta").val();
	
	if (fecha1=="") {
		alert("El campo Fecha Desde no puede estar vacio! ");
		return;
	}
	if (fecha2=="") {
		alert("El campo Fecha Hasta no puede estar vacio! ");
		return;
	}
	if((Date.parse(fecha1)) > (Date.parse(fecha2))){
		alert("La fecha inicial no puede ser mayor que la fecha final");
		return;
	}
	//Si tiene el checkbox de descarga de excel tildado, verifica si hay registros y realiza la descarga.
	if ($("#descargaExcel").prop("checked")) {
		
		$("#grillaAlertas").addClass("cargando");
		
		var datosForm = $(this).serialize();
		
		$.ajax({
			  url: "index.php?r=alertas/verificaregistros",
			  type:'GET', 
			  data: datosForm,
			  context: document.body,
			  success: function (data) {
				  
				  if(data==""){
					  alert("No se encontraron registros entre el rango de fechas seleccionada");
					  return;
				  }
				  else{
					  window.location.href = "index.php?r=alertas/descargarexcel&"+datosForm;
				  }
			  }
			}).done(function(){
				$("#grillaAlertas").removeClass("cargando");
			});
	}
	//Sino, completa la grilla normalmente
	else{

	$("#grillaAlertas").addClass("cargando");
		
	$.ajax({
		  url: "index.php?r=alertas/filtrar",
		  type:'POST', 
		  data:$(this).serialize(),
		  context: document.body,
		  success: function (data) {
			   $.notify("Actualizado correctamente!", "success");  
		       var result = $('<div />').append(data).html();
		       $('#grillaAlertas').html(result);
		  }
		}).done(function(){
				$("#grillaAlertas").removeClass("cargando");
		});		
	}
	return false;
});




/* Listener que abre el popup con la posicion del movil que fue seleccionado en la grilla */
$('#informes-grid a.ver').live('click',function() {
	var url = $(this).attr('href');
	window.open(url, "", "width=700, height=450");
	return false;	
});


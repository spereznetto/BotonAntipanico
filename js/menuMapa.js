$(document).ready(function(){

	var pos = $.getJSON("index.php?r=flota/menudeusuario", function(datos) {
		
		for (var i = 0; i < datos.length; i++) {
								
			$("#listado-mapa").append("<li id='"+datos[i].Disp_ID+"' alt='"+datos[i].Movil_Dominio+"'><div style='width:55%;float:left;'>"+datos[i].Movil_Nombre+" ("+datos[i].Movil_Dominio+")"+(datos[i].Conductor_Nombre!==null?" ["+datos[i].Conductor_Nombre+" "+datos[i].Conductor_Apellido+"]":"")+"</div>"+
									  "<a id='"+datos[i].Disp_ID+"' href='javascript:void(0);' onclick='visualizaVehiculo(this.id)' title='' data-toggle='tooltip' data-original-title='Ver movil en el mapa'><img src='images/iconosMap/Gps-mini.png' alt='Ver posicion'></a>"+
				 					  "<a id='"+datos[i].Disp_ID+"' href='javascript:void(0);' onclick='sumarVehiculo(this.id)' title='' data-toggle='tooltip' data-original-title='Sumar movil'><img src='images/iconosMap/GpsMas-mini.png'></a>"+
				 					  "<a id='"+datos[i].Disp_ID+"' href='javascript:void(0);' onclick='menuVisualizaRecorrido(this.id)' title='' data-toggle='tooltip' data-original-title='Visualizar recorrido'><img src='images/iconosMap/recorrido.png'></a>"+
				 					  "<a id='"+datos[i].Disp_ID+"' href='javascript:void(0);' onclick='menuDescargaRecorrido(this.id);' title='' data-toggle='tooltip' data-original-title='Descargar recorrido'><img src='images/iconosMap/download-icon.png'></a>"+
				 					  "<a id='"+datos[i].Movil_Dominio+"' href='javascript:void(0);' onclick='verificarUltimasAlertas(this.id);' title='' data-toggle='tooltip' data-original-title='Ver ultimas alertas del movil'><img src='images/iconosMap/alertas.png'></a>"+
									  "<a id='"+datos[i].IdMovil+"' href='javascript:void(0);' onclick='modificarAlias("+datos[i].IdMovil+", \""+datos[i].Movil_Dominio+"\");' title='' data-toggle='tooltip' data-original-title='Modificar Alias'><span class='fa fa-pencil-square-o fa-lg'></span></a>"+
				 					  "</li>");
		}	
	});
	
	setTimeout(function(){
		$('[data-toggle=popover]').popover();
		$('[data-toggle=tooltip]').tooltip();
	}, 1000);

});



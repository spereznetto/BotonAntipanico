/**
 * Funciones de la vista de filtro de informes 
 */
$("#filtro-rus").on("submit", function (event) {
    event.preventDefault();
    var fecha1 = $("#FiltroInformesForm_desde3").val();
    var fecha2 = $("#FiltroInformesForm_hasta3").val();

    if (fecha1 == "" && $("#FiltroInformesForm_rangoFechas3").val() == "") {
        alert("El campo Fecha Desde no puede estar vacío");
        return;
    }
    if (fecha2 == "" && $("#FiltroInformesForm_rangoFechas3").val() == "") {
        alert("El campo Fecha Hasta no puede estar vacío");
        return;
    }
    if ($("#FiltroInformesForm_movil2").val() == "") {
        alert("Debe seleccionar un móvil");
        return;
    }
    //if ($("#FiltroInformesForm_eventoRus").val()=="") {
    //alert("Debe seleccionar un evento.");
    //return;
    //}
    if ((Date.parse(fecha1)) > (Date.parse(fecha2))) {
        alert("La fecha inicial no puede ser mayor que la fecha final");
        return;
    }
    /*if($("#opciones_3").prop("checked")){
     console.log("ok");
     }else{*/
    var date1 = new Date(fecha1.substring(0, 10));
    var date2 = new Date(fecha2.substring(0, 10));
    var diffDays = parseInt((date2 - date1) / (1000 * 60 * 60 * 24));
    if (diffDays > 31) {
        alert("EL MAXIMO DE DIAS PARA EL INFORME ES DE 31");
        return;
    }
    $('#grillaRus').show();
    $('#map-canvas').hide();
    $('#grillaInformes').hide();
    $('#grillaEstadisticas').hide();

    $("#grillaRus").addClass("cargando");
    $.ajax({
        url: "index.php?r=informes/informerus",
        type: 'POST',
        data: $(this).serialize(),
        context: document.body,
        success: function (data) {

            if (data.length == 0) {
                alert("No se encontraron registros en la fecha seleccionada");
                return;
            }


            $("#panelResultadoInformes").show();
            var result = $('<div/>').append(data).html();
            $('#grillaRus').html(result);
        }
    }).done(function () {
        $("#grillaInformes").removeClass("cargando");
        $("#grillaRus").removeClass("cargando");
        $("#grillaEstadisticas").removeClass("cargando");
    }).error(function (e) {
        console.log("Se produjo un error.");
        $("#grillaInformes").removeClass("cargando");
        $("#grillaRus").removeClass("cargando");
        $("#grillaEstadisticas").removeClass("cargando");
    });
    return false;
});
$("#filtro-estadistico").on("submit", function (event) {
    event.preventDefault();
    var fecha1 = $("#FiltroInformesForm_desde2").val();
    var fecha2 = $("#FiltroInformesForm_hasta2").val();

    if (fecha1 == "" && $("#FiltroInformesForm_rangoFechas2").val() == "") {
        alert("El campo Fecha Desde no puede estar vacío");
        return;
    }
    if (fecha2 == "" && $("#FiltroInformesForm_rangoFechas2").val() == "") {
        alert("El campo Fecha Hasta no puede estar vacío");
        return;
    }
    /*if ($("#FiltroInformesForm_movil").val()=="" && $("#FiltroInformesForm_conductor").val()=="") {
     alert("Debe seleccionar un movil o un conductor.");
     return;
     }*/
    if ((Date.parse(fecha1)) > (Date.parse(fecha2))) {
        alert("La fecha inicial no puede ser mayor que la fecha final");
        return;
    }
    /*if($("#opciones_3").prop("checked")){
     console.log("ok");
     }else{*/
    var date1 = new Date(fecha1.substring(0, 10));
    var date2 = new Date(fecha2.substring(0, 10));
    var diffDays = parseInt((date2 - date1) / (1000 * 60 * 60 * 24));
    if (diffDays > 31) {
        alert("EL MAXIMO DE DIAS PARA EL INFORME ES DE 31");
        return;
    }
    //}
    //alert($("#FiltroInformesForm_desde2").val());
    //return false;
    if ($('input[name="moviles[]"]:checked').length < 1) {
        alert("Debe elegir al menos un móvil");
        return false;
    }
    $('#grillaEstadisticas').show();
    $('#map-canvas').hide();
    $('#grillaInformes').hide();
    $('#grillaRus').hide();

    $("#grillaEstadisticas").addClass("cargando");
    $.ajax({
        url: "index.php?r=informes/estadistico",
        type: 'POST',
        data: $(this).serialize(),
        context: document.body,
        success: function (data) {

            if (data.length == 0) {
                alert("No se encontraron registros en la fecha seleccionada");
                return;
            }

            $("#panelResultadoInformes").show();
            var result = $('<div/>').append(data).html();
            $('#grillaEstadisticas').html(result);
        }
    }).done(function () {
        $("#grillaInformes").removeClass("cargando");
        $("#grillaEstadisticas").removeClass("cargando");
        $("#grillaRus").removeClass("cargando");
    }).error(function (e) {
        console.log("Se produjo un error.");
        $("#grillaInformes").removeClass("cargando");
        $("#grillaEstadisticas").removeClass("cargando");
        $("#grillaRus").removeClass("cargando");
    });
    return false;
});
$("#estadisticoExcel").on("click", function (event) {
    var fecha1 = $("#FiltroInformesForm_desde2").val();
    var fecha2 = $("#FiltroInformesForm_hasta2").val();

    if (fecha1 == "" && $("#FiltroInformesForm_rangoFechas2").val() == "") {
        alert("El campo Fecha Desde no puede estar vacío");
        return;
    }
    if (fecha2 == "" && $("#FiltroInformesForm_rangoFechas2").val() == "") {
        alert("El campo Fecha Hasta no puede estar vacío");
        return;
    }

    if ((Date.parse(fecha1)) > (Date.parse(fecha2))) {
        alert("La fecha inicial no puede ser mayor que la fecha final");
        return;
    }

    var date1 = new Date(fecha1.substring(0, 10));
    var date2 = new Date(fecha2.substring(0, 10));
    var diffDays = parseInt((date2 - date1) / (1000 * 60 * 60 * 24));
    if (diffDays > 31) {
        alert("EL MAXIMO DE DIAS PARA EL INFORME ES DE 31");
        return;
    }

    if ($('input[name="moviles[]"]:checked').length < 1) {
        alert("Debe elegir al menos un movil");
        return false;
    }
    $('#grillaEstadisticas').show();
    $('#map-canvas').hide();
    $('#grillaInformes').hide();
    $('#grillaRus').hide();

    $("#grillaEstadisticas").addClass("cargando");
    var datosForm = $('#filtro-estadistico [value!=""]').serialize();
    $.ajax({
        url: "index.php?r=informes/estadisticoExcel",
        dataType: "html", //html
        contentType: "application/x-www-form-urlencoded", //application/x-www-form-urlencoded
        type: 'POST',
        data: datosForm,
        context: document.body,
        success: function (data) {

            if (data.length == 0) {
                alert("No se encontraron registros en la fecha seleccionada");
                return;
            }

            var opResult = JSON.parse(data);
            var $a = $("<a>");
            alert(opResult);
            $a.attr("href", opResult.data);
            $("body").append($a);
            alert($a);
            $a.attr("download", "Informe Estadístico.xls");
            $a[0].click();
            $a.remove();
        }
    }).done(function () {
        $("#grillaInformes").removeClass("cargando");
        $("#grillaEstadisticas").removeClass("cargando");
        $("#grillaRus").removeClass("cargando");
    }).error(function (e) {
        console.log("Se produjo un error.");
        $("#grillaInformes").removeClass("cargando");
        $("#grillaEstadisticas").removeClass("cargando");
        $("#grillaRus").removeClass("cargando");
    });
    $("#grillaEstadisticas").removeClass("cargando");
    return false;
});

$("#filtro-informes").on("submit", function (event) {
    event.preventDefault();

    var fecha1 = $("#FiltroInformesForm_desde").val();
    var fecha2 = $("#FiltroInformesForm_hasta").val();

    if (fecha1 == "" && $("#FiltroInformesForm_rangoFechas").val() == "") {
        alert("El campo Fecha Desde no puede estar vacío");
        return;
    }
    if (fecha2 == "" && $("#FiltroInformesForm_rangoFechas").val() == "") {
        alert("El campo Fecha Hasta no puede estar vacío");
        return;
    }
    if ($("#FiltroInformesForm_movil").val() == "" && $("#FiltroInformesForm_conductor").val() == "") {
        alert("Debe seleccionar un móvil o un conductor.");
        return;
    }
    if ((Date.parse(fecha1)) > (Date.parse(fecha2))) {
        alert("La fecha inicial no puede ser mayor que la fecha final");
        return;
    }
    if ($("#opciones_3").prop("checked")) {
        console.log("ok");
    } else {
        var date1 = new Date(fecha1.substring(0, 10));
        var date2 = new Date(fecha2.substring(0, 10));
        var diffDays = parseInt((date2 - date1) / (1000 * 60 * 60 * 24));
        if (diffDays > 15) {
            alert("DEBE ELEGIR UN RANGO DE FECHAS MENOR O IGUAL A 15 DIAS");
            return;
        }
    }
    //alert(diffDays )
    //return;
    //$('#map-canvas').hide();
    //$("#grillaInformes").addClass("cargando");
    //$("#estadisticas").addClass("cargando");
    $('#map-canvas').hide();
    $('#grillaInformes').show();
    $('#grillaEstadisticas').hide();
    $('#grillaRus').hide();
    $("#grillaInformes").addClass("cargando");
    //Resumen de eventos (muestra la grilla completa)
    if ($("#opciones_0").prop("checked")) {
        $.ajax({
            url: "index.php?r=informes/grilla",
            type: 'POST',
            data: $(this).serialize(),
            context: document.body,
            success: function (data) {

                if (data.length == 0) {
                    alert("No se encontraron registros en la fecha seleccionada");
                    return;
                }

                $("#panelResultadoInformes").show();
                var result = $('<div/>').append(data).html();
                $('#grillaInformes').html(result);
            }
        }).done(function () {
            $("#grillaInformes").removeClass("cargando");
            $("#grillaEstadisticas").removeClass("cargando");
            $("#grillaRus").removeClass("cargando");
        }).error(function (e) {
            console.log("Se produjo un error.");
            $("#grillaInformes").removeClass("cargando");
            $("#grillaEstadisticas").removeClass("cargando");
            $("#grillaRus").removeClass("cargando");
        });
        return false;
    }
    //detalle de eventos
    if ($("#opciones_4").prop("checked")) {
        $.ajax({
            url: "index.php?r=informes/detalle",
            type: 'POST',
            data: $(this).serialize(),
            context: document.body,
            success: function (data) {

                if (data.length == 0) {
                    alert("No se encontraron registros en la fecha seleccionada");
                    return;
                }

                var result = $('<div/>').append(data).html();
                $('#grillaInformes').html(result);
            }
        }).done(function () {
            $("#grillaInformes").removeClass("cargando");
            $("#grillaEstadisticas").removeClass("cargando");
            $("#grillaRus").removeClass("cargando");
        }).error(function (e) {
            console.log("Se produjo un error.");
            $("#grillaInformes").removeClass("cargando");
            $("#grillaEstadisticas").removeClass("cargando");
            $("#grillaRus").removeClass("cargando");
        });
        return false;
    }
    //Graficar el recorrido
    if ($("#opciones_1").prop("checked")) {
        $('#map-canvas').show();
        $.ajax({
            url: "index.php?r=informes/recorrido",
            type: 'POST',
            data: $(this).serialize(),
            context: document.body,
            success: function (data) {
                if (data.length == 0) {
                    alert("No se encontraron registros en la fecha seleccionada");
                    return;
                }
                //$('#map-canvas').show();

                $("#panelResultadoInformes").show();
                $('#grillaEstadisticas').hide();
                $('#grillaRus').hide();
                $('#grillaInformes').hide();
                $('#grillaInformes').empty(); //vaciamos cualquier contenido previo en la grilla.  
                visualizaRecorrido(data); //llama a la funcion que visualiza el recorrido, que se encuentra en funcionesGmap.js
                //google.maps.event.trigger(map, "resize"); //Agrego el evento de resize debido a que el mapa se ve cortado al redimensionar.
            }
        }).done(function () {
            $("#grillaInformes").removeClass("cargando");
            $("#grillaEstadisticas").removeClass("cargando");
            $("#grillaRus").removeClass("cargando");
        }).error(function (e) {
            console.log("Se produjo un error.");
            $("#estadisticas").removeClass("cargando");
            $("#grillaEstadisticas").removeClass("cargando");
            $("#grillaRus").removeClass("cargando");
        });
        return false;
    }

    //Tiempo de actividad
    /*if($("#opciones_2").prop("checked")){
     
     $.ajax({
     url: "index.php?r=informes/tiempouso",
     type:'POST', 
     data:$(this).serialize(),
     context: document.body,
     success: function (data) {
     
     $("#estadisticas").hide();
     $("#map-canvas").hide();
     $('#grillaInformes').empty(); //vaciamos cualquier contenido previo en la grilla.  
     
     var contenido = data;
     $('#grillaInformes').append("<br><h3>El tiempo de uso estimado es de: "+contenido+"</h3>");
     $('#grillaInformes').show();
     }
     }).done(function(){
     $("#grillaInformes").removeClass("cargando");
     $("#estadisticas").removeClass("cargando");
     }).error(function(e) {
     console.log("Se produjo un error.");
     }); 
     return false;
     }*/

    //Informe estadistico
    /*if($("#opciones_3").prop("checked")){
     $.ajax({
     url: "index.php?r=informes/estadistico",
     type:'POST', 
     data:$(this).serialize(),
     context: document.body,
     success: function (data) {
     
     if(data.length == 0){
     alert("No se encontraron registros en la fecha seleccionada");
     return;
     }
     $('#map-canvas').hide();
     $('#grillaInformes').empty();
     
     $("#estadisticoNombreMovil").empty();
     $("#estadisticoDominioMovil").empty();
     $("#estadisticoDesde").empty();
     $("#estadisticoHasta").empty();
     $("#estadisticoVelocidadMaxima").empty();
     $("#estadisticoVelocidadPromedio").empty();
     $("#estadisticoDistanciaRecorrida").empty();
     $("#estadisticoTiempoUso").empty();
     $("#estadisticoCantidadReportes").empty();	
     
     $("#estadisticoNombreMovil").html(data.nombreMovil);
     $("#estadisticoDominioMovil").html(data.dominioMovil);
     $("#estadisticoDesde").html(data.fechaDesde);
     $("#estadisticoHasta").html(data.fechaHasta);
     $("#estadisticoVelocidadMaxima").html(data.velocidadMaxima);
     $("#estadisticoVelocidadPromedio").html(data.velocidadPromedio);
     $("#estadisticoDistanciaRecorrida").html(data.kmRecorridos);
     $("#estadisticoTiempoUso").html(data.tiempoUso);				
     $("#estadisticoCantidadReportes").html(data.cantidadEventos);
     
     $('#estadisticas').show();
     }
     }).done(function(){
     $("#grillaInformes").removeClass("cargando");
     $("#estadisticas").removeClass("cargando");
     }).error(function(e) {
     console.log("Se produjo un error.");
     $("#grillaInformes").removeClass("cargando");
     $("#estadisticas").removeClass("cargando");
     });
     return false;
     }*/

    //Descarga el recorrido para ver en google earth
    if ($("#opciones_2").prop("checked")) {
        //alert('prueba');
        var datosForm = $(this).serialize();
        desde = $("#FiltroInformesForm_desde").val();
        hasta = $("#FiltroInformesForm_hasta").val();
        movil = $("#FiltroInformesForm_movil").val();
        conductor = $("#FiltroInformesForm_conductor").val();
        rangoFechas = $("#FiltroInformesForm_rangoFechas").val();
        $.ajax({
            url: "index.php?r=informes/descargarecorrido",
            type: 'POST',
            data: datosForm,
            dataType: "text",
            //context: document.body,
            success: function (data) {

                if (data.length == 0) {
                    alert("No se encontraron registros en la fecha seleccionada");
                    return;
                }
            }
        }).done(function (data) {

            $("#grillaInformes").removeClass("cargando");
            $("#grillaEstadisticas").removeClass("cargando");
            $("#grillaRus").removeClass("cargando");

            window.location.assign("index.php?r=informes/descargarecorrido&recorridoHistorico%5Bdesde%5D=" + desde + "&recorridoHistorico%5Bhasta%5D=" + hasta + "&recorridoHistorico%5Bmovil%5D=" + movil + "&recorridoHistorico%5BrangoFechas%5D=" + rangoFechas + "&recorridoHistorico%5Bconductor%5D=" + conductor);
        }).error(function (e) {
            console.log("Se produjo un error");
            $("#grillaInformes").removeClass("cargando");
            $("#grillaEstadisticas").removeClass("cargando");
            $("#grillaRus").removeClass("cargando");
        });
        return false;

    }
    //descargar en exel
    if ($("#opciones_3").prop("checked")) {

        var datosForm = $(this).serialize();

        $.ajax({
            url: "index.php?r=informes/recorrido",
            type: 'POST',
            data: datosForm,
            context: document.body,
            success: function (data) {

                if (data.length == 0) {
                    alert("No se encontraron registros en la fecha seleccionada");
                    return;
                } else {
                    window.location.href = "index.php?r=informes/recorridoexcel&" + datosForm;
                }
            }
        }).done(function () {
            $("#grillaInformes").removeClass("cargando");
            $("#grillaEstadisticas").removeClass("cargando");
            $("#grillaRus").removeClass("cargando");
        }).error(function (e) {
            console.log("Se produjo un error.");
            $("#grillaInformes").removeClass("cargando");
            $("#grillaEstadisticas").removeClass("cargando");
            $("#grillaRus").removeClass("cargando");
        });
        return false;
    }
});
/* Funciones para el informe de mensajes */

$("#filtro-mensajes").on("submit", function (event) {
    event.preventDefault();

    var fecha1 = $("#FiltroInformesForm_desde").val();
    var fecha2 = $("#FiltroInformesForm_hasta").val();

    if (fecha1 == "") {
        alert("El campo Fecha Desde no puede estar vacio! ");
        return;
    }
    if (fecha2 == "") {
        alert("El campo Fecha Hasta no puede estar vacio! ");
        return;
    }

    if ((Date.parse(fecha1)) > (Date.parse(fecha2))) {
        alert("La fecha inicial no puede ser mayor que la fecha final");
        return;
    }
    $("#grillaInformes").addClass("cargando");
    $("#estadisticas").addClass("cargando");

    //Resumen de eventos (muestra la grilla completa)
    if ($("#opciones_0").prop("checked")) {
        $.ajax({
            url: "index.php?r=informes/grillamensajes",
            type: 'POST',
            data: $(this).serialize(),
            context: document.body,
            success: function (data) {

                if (data.length == 0) {
                    alert("No se encontraron registros en la fecha seleccionada");
                    return;
                }
                $('#map-canvas').hide();
                $("#estadisticas").hide();
                var result = $('<div/>').append(data).html();
                $('#grillaInformes').html(result);
            }
        }).done(function () {
            $("#grillaInformes").removeClass("cargando");
            $("#estadisticas").removeClass("cargando");
        }).error(function (e) {
            console.log("Se produjo un error.");
            $("#grillaInformes").removeClass("cargando");
            $("#estadisticas").removeClass("cargando");
        });
        return false;
    }




});
//Resuman para infomre de alertas

$("#filtro-alertas").on("submit", function (event) {
    event.preventDefault();

    var fecha1 = $("#FiltroInformesForm_desde").val();
    var fecha2 = $("#FiltroInformesForm_hasta").val();

    if (fecha1 == "") {
        alert("El campo Fecha Desde no puede estar vacio! ");
        return;
    }
    if (fecha2 == "") {
        alert("El campo Fecha Hasta no puede estar vacio! ");
        return;
    }

    if ((Date.parse(fecha1)) > (Date.parse(fecha2))) {
        alert("La fecha inicial no puede ser mayor que la fecha final");
        return;
    }
    $("#grillaAlertas").addClass("cargando");
    $("#estadisticas").addClass("cargando");

    //Resumen de eventos (muestra la grilla completa)
    if ($("#opciones_0").prop("checked")) {
        $.ajax({
            url: "index.php?r=informes/grillaalertas",
            type: 'POST',
            data: $(this).serialize(),
            context: document.body,
            success: function (data) {

                if (data.length == 0) {
                    alert("No se encontraron registros en la fecha seleccionada");
                    return;
                }
                $('#map-canvas').hide();
                $("#estadisticas").hide();
                var result = $('<div/>').append(data).html();
                $('#grillaAlertas').html(result);
            }
        }).done(function () {
            $("#grillaAlertas").removeClass("cargando");
            $("#estadisticas").removeClass("cargando");
        }).error(function (e) {
            console.log("Se produjo un error.");
            $("#grillaAlertas").removeClass("cargando");
            $("#estadisticas").removeClass("cargando");
        });
        return false;
    }




});

/* fin funciones del informe de mensajes */

/* Listener que abre el popup con la posicion del movil que fue seleccionado en la grilla */
$('#informes-grid a.ver').on('click', function () {
    var url = $(this).attr('href');
    window.open(url, "", "width=700, height=450");
    return false;
});


function crearPDF(div) {
    var pdf = new jsPDF('p', 'pt', 'letter');
    source = $('#' + div)[0];
    specialElementHandlers = {
        '#editor': function (element, renderer) { // element with id of "bypass" - jQuery style selector
            return true // true = "handled elsewhere, bypass text extraction"
        }
    };
    margins = {
        top: 80,
        bottom: 60,
        left: 40,
        width: 522
    };
    pdf.fromHTML(
            source, // HTML string or DOM elem ref.
            margins.left, // x coord
            margins.top, {// y coord
                'width': margins.width, // max width of content on PDF
                'elementHandlers': specialElementHandlers
            },
            function (dispose) {
                pdf.save('informe.pdf');
            }
    , margins);
}

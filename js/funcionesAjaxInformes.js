/**
 * Funciones de la vista de filtro de informes 
 */
/*
 * Informe de Puntos
 */
function generarInformesPuntos(tipo) {
    //event.preventDefault();
    var fecha1 = $("#FiltroInformesForm_desde5").val();
    var fecha2 = $("#FiltroInformesForm_hasta5").val();

    if (fecha1 == "" && $("#FiltroInformesForm_rangoFechas5").val() == "") {
        alert("El campo Fecha Desde no puede estar vacío");
        return;
    }
    if (fecha2 == "" && $("#FiltroInformesForm_rangoFechas5").val() == "") {
        alert("El campo Fecha Hasta no puede estar vacío");
        return;
    }
    if ($("#FiltroInformesForm_movil4").val() == "") {
        alert("Debe seleccionar un móvil");
        return;
    }
    /*if ($("#FiltroInformesForm_mtspuntos").val() == "") {
     alert("Debe colocar los metros");
     return;
     }*/
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
    $('#grillaBehavior').hide();
    $('#grillaRus').hide();
    $('#map-canvas').hide();
    $('#grillaInformes').hide();
    $('#grillaEstadisticas').hide();
    $("#panelResultadoInformes").hide();
    $("#grillaPuntos").show();

    $("#divCargando").addClass("cargando");
    var datosForm = $('#filtro-puntos [value!=""]').serialize();
    if (tipo == 1) {
        $.ajax({
            url: "index.php?r=informes/informepuntos",
            type: 'POST',
            data: datosForm,
            context: document.body,
            success: function (data) {

                if (data.length == 0) {
                    alert("No se encontraron registros en la fecha seleccionada");
                    return;
                }

                var result = $('<div/>').append(data).html();
                $('#grillaPuntos').html(result);
            }
        }).done(function () {
            $("#panelResultadoInformes").show();
            $("#divCargando").removeClass("cargando");
        }).error(function (e) {
            console.log("Se produjo un error.");
            $("#divCargando").removeClass("cargando");
        });
    } else if (tipo === 2) { //generar excel
        //alert('puche');
        $("#filtro-puntos").attr("action", "index.php?r=informes/informepuntos&excel=1");
        $("#filtro-puntos").submit();

        $("#panelResultadoInformes").show();
        $('#grillaPuntos').html("<h2 style='text-align: center;'>Se está generando el archivo, por favor espere.</h2>");
        $("#divCargando").removeClass("cargando");
    } else if (tipo === 3) { //generar PDF
        $("#filtro-puntos").attr("action", "index.php?r=informes/informepuntos&pdf=1");
        $("#filtro-puntos").submit();

        $("#panelResultadoInformes").show();
        $('#grillaPuntos').html("<h2 style='text-align: center;'>Se está generando el archivo, por favor espere.</h2>");
        $("#divCargando").removeClass("cargando");
    }
    return false;
}
/*Filtro Behavior*/
function generarInformeConductor(tipo) {
    event.preventDefault();
    var fecha1 = $("#FiltroInformesForm_desde4").val();
    var fecha2 = $("#FiltroInformesForm_hasta4").val();

    if (fecha1 == "" && $("#FiltroInformesForm_rangoFechas4").val() == "") {
        alert("El campo Fecha Desde no puede estar vacío");
        return;
    }
    if (fecha2 == "" && $("#FiltroInformesForm_rangoFechas4").val() == "") {
        alert("El campo Fecha Hasta no puede estar vacío");
        return;
    }
    if ($("#FiltroInformesForm_movil3").val() == "") {
        alert("Debe seleccionar un móvil");
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
    $('#grillaBehavior').show();
    $('#grillaRus').hide();
    $('#map-canvas').hide();
    $('#grillaInformes').hide();
    $('#grillaEstadisticas').hide();
    $("#panelResultadoInformes").hide();
    $("#grillaPuntos").hide();
    var datosForm = $('#filtro-behavior [value!=""]').serialize();
    $("#divCargando").addClass("cargando");
    if (tipo === 1) {
        $.ajax({
            url: "index.php?r=informes/behavior",
            type: 'POST',
            data: datosForm,
            context: document.body,
            success: function (data) {
    
                if (data.length == 0) {
                    alert("No se encontraron registros en la fecha seleccionada");
                    return;
                }
    
                var result = $('<div/>').append(data).html();
                $('#grillaBehavior').html(result);
            }
        }).done(function () {
            $("#panelResultadoInformes").show();
            $("#divCargando").removeClass("cargando");
        }).error(function (e) {
            console.log("Se produjo un error.");
            $("#divCargando").removeClass("cargando");
        });
    
    } else if (tipo === 2) {
        $("#filtro-behavior").attr("action", "index.php?r=informes/behavior&excel=1");
        $("#filtro-behavior").submit();

        $("#panelResultadoInformes").show();
        $('#grillaBehavior').html("<h2 style='text-align: center;'>Se está generando el archivo, por favor espere.</h2>");
        $("#divCargando").removeClass("cargando");
    } else if (tipo === 3) {
        $("#filtro-behavior").attr("action", "index.php?r=informes/behavior&pdf=1");
        $("#filtro-behavior").submit();

        $("#panelResultadoInformes").show();
        $('#grillaBehavior').html("<h2 style='text-align: center;'>Se está generando el archivo, por favor espere.</h2>");
        $("#divCargando").removeClass("cargando");
    }


    return false;
}
/* Filtro RUS ////COMNETO TOOA ESTA FUNCION YA QUE ESTA DUPLICADA . FACU PACHECO.
$("#filtro-behavior").on("submit", function (event) {
    event.preventDefault();
    var fecha1 = $("#FiltroInformesForm_desde4").val();
    var fecha2 = $("#FiltroInformesForm_hasta4").val();

    if (fecha1 == "" && $("#FiltroInformesForm_rangoFechas4").val() == "") {
        alert("El campo Fecha Desde no puede estar vacío");
        return;
    }
    if (fecha2 == "" && $("#FiltroInformesForm_rangoFechas4").val() == "") {
        alert("El campo Fecha Hasta no puede estar vacío");
        return;
    }
    if ($("#FiltroInformesForm_movil3").val() == "") {
        alert("Debe seleccionar un móvil");
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
    $('#grillaBehavior').show();
    $('#grillaRus').show();
    $('#map-canvas').hide();
    $('#grillaInformes').hide();
    $('#grillaEstadisticas').hide();
    $("#panelResultadoInformes").hide();
    $("#grillaPuntos").hide();

    $("#divCargando").addClass("cargando");
    $.ajax({
        url: "index.php?r=informes/informebehavior",
        type: 'POST',
        data: $(this).serialize(),
        context: document.body,
        success: function (data) {

            if (data.length == 0) {
                alert("No se encontraron registros en la fecha seleccionada");
                return;
            }

            var result = $('<div/>').append(data).html();
            $('#grillaBehavior').html(result);
        }
    }).done(function () {
        $("#panelResultadoInformes").show();
        $("#divCargando").removeClass("cargando");
    }).error(function (e) {
        console.log("Se produjo un error.");
        $("#divCargando").removeClass("cargando");
    });
    return false;
});
/* Fin de Filtro RUS */

/* Filtro RUS */
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
    $('#grillaRus').show();
    $('#grillaBehavior').hide();
    $('#map-canvas').hide();
    $('#grillaInformes').hide();
    $('#grillaEstadisticas').hide();
    $("#panelResultadoInformes").hide();
    $("#grillaPuntos").hide();

    $("#divCargando").addClass("cargando");
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

            var result = $('<div/>').append(data).html();
            $('#grillaRus').html(result);
        }
    }).done(function () {
        $("#panelResultadoInformes").show();
        $("#divCargando").removeClass("cargando");
    }).error(function (e) {
        console.log("Se produjo un error.");
        $("#divCargando").removeClass("cargando");
    });
    return false;
});
/* Fin de Filtro RUS */

/* Filtro Estadístico*/
function generarEstadistico(tipo) { // tipo 1 = pantalla, tipo 2 = excel
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

    if ($('input[name="moviles[]"]:checked').length < 1 && $('input[name="conductores[]"]:checked').length < 1) {
        alert("Debe seleccionar al menos un móvil o un conductor");
        return false;
    }

    /*if ($('input[name="moviles[]"]:checked').length >= 15 && diffDays > 5) {
     alert("EL MÁXIMO DE DÍAS PARA SU BÚSQUEDA ES DE 5");
     return false;
     }
     
     if ($('input[name="conductores[]"]:checked').length >= 10 && diffDays > 5) {
     alert("EL MÁXIMO DE DÍAS PARA SU BÚSQUEDA ES DE 5");
     return false;
     }
     
     if ($('input[name="moviles[]"]:checked').length >= 12 && diffDays > 7) {
     alert("EL MÁXIMO DE DÍAS PARA SU BÚSQUEDA ES DE 7");
     return false;
     }
     
     if ($('input[name="conductores[]"]:checked').length >= 8 && diffDays > 7) {
     alert("EL MÁXIMO DE DÍAS PARA SU BÚSQUEDA ES DE 7");
     return false;
     }
     
     if ($('input[name="moviles[]"]:checked').length >= 8 && diffDays > 10) {
     alert("EL MÁXIMO DE DÍAS PARA SU BÚSQUEDA ES DE 10");
     return false;
     }
     
     if ($('input[name="conductores[]"]:checked').length >= 4 && diffDays > 10) {
     alert("EL MÁXIMO DE DÍAS PARA SU BÚSQUEDA ES DE 10");
     return false;
     }*/

    /*if ($('input[name="moviles[]"]:checked').length >= 10) {
     alert("EL MÁXIMO DE MÓVILES ES DE 10");
     return false;
     }
     
     if ($('input[name="conductores[]"]:checked').length >= 5) {
     alert("EL MÁXIMO DE CONDUCTORES ES DE 5");
     return false;
     }*/

    if (diffDays > 31) {
        alert("EL MÁXIMO DE DÍAS PARA EL INFORME ES DE UN MES");
        return false;
    }

    $('#grillaEstadisticas').show();
    $('#grillaBehavior').hide();
    $('#map-canvas').hide();
    $('#grillaInformes').hide();
    $('#grillaRus').hide();
    $("#panelResultadoInformes").hide();
    $("#grillaPuntos").hide();

    $("#divCargando").addClass("cargando");
    var datosForm = $('#filtro-estadistico [value!=""]').serialize();
    if (tipo === 1) {
        $.ajax({
            url: "index.php?r=informes/estadistico",
            type: 'POST',
            data: datosForm,
            context: document.body,
            success: function (data) {
                if (data.length == 0) {
                    alert("No se encontraron registros en la fecha seleccionada");
                    return;
                }

                var result = $('<div/>').append(data).html();
                $('#grillaEstadisticas').html(result);
            }
        }).done(function () {
            $("#divCargando").removeClass("cargando");
            $("#panelResultadoInformes").show();
        }).error(function (e) {
            console.log("Se produjo un error.");
            $("#divCargando").removeClass("cargando");
        });
    } else if (tipo === 2) {
        $("#filtro-estadistico").attr("action", "index.php?r=informes/estadistico&excel=1");
        $("#filtro-estadistico").submit();

        $("#panelResultadoInformes").show();
        $('#grillaEstadisticas').html("<h2 style='text-align: center;'>Se está generando el archivo, por favor espere.</h2>");
        $("#divCargando").removeClass("cargando");
    } else if (tipo === 3) {
        $("#filtro-estadistico").attr("action", "index.php?r=informes/estadistico&pdf=1");
        $("#filtro-estadistico").submit();

        $("#panelResultadoInformes").show();
        $('#grillaEstadisticas').html("<h2 style='text-align: center;'>Se está generando el archivo, por favor espere.</h2>");
        $("#divCargando").removeClass("cargando");
    }
    return false;
}
/* Fin de Filtro Estadístico*/

/* Filtro Informes*/
function generarInformes(tipo) {
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

    if ($('#FiltroInformesForm_movil').val() === 'todos' && ($("#FiltroInformesForm_evento").val().trim().length === 0 &&
            $("#FiltroInformesForm_detenido").val().trim().length === 0 && $("#FiltroInformesForm_detenido").val().trim().length === 0 &&
            $("#FiltroInformesForm_eventoRus").val().trim().length === 0 && $("#FiltroInformesForm_velocidad").val().trim().length === 0)) {
        alert("Especifica un filtro para seleccionar todos los móviles");
        opcionSeleccionada.select2("val", "");
        return false;
    }


    var date1 = new Date(fecha1.substring(0, 10));
    var date2 = new Date(fecha2.substring(0, 10));
    var diffDays = parseInt((date2 - date1) / (1000 * 60 * 60 * 24));
    if (diffDays > 31) {
        alert("DEBE ELEGIR UN RANGO DE FECHAS MENOR O IGUAL A 31 DIAS");
        return;
    }

    $('#map-canvas').hide();
    $('#grillaBehavior').hide();
    $('#grillaInformes').show();
    $('#grillaEstadisticas').hide();
    $('#grillaRus').hide();
    $("#panelResultadoInformes").hide();
    $("#grillaPuntos").hide();
    $("#divCargando").addClass("cargando");

    var datosForm = $('#filtro-informes [value!=""]').serialize();

    if ($("#opciones_0").prop("checked")) {
        if (tipo === 1) { //mostrar en pantalla
            $.ajax({
                url: "index.php?r=informes/grilla",
                type: 'POST',
                data: datosForm,
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
                $("#divCargando").removeClass("cargando");
                $("#panelResultadoInformes").show();
            }).error(function (e) {
                console.log("Se produjo un error.");
                $("#divCargando").removeClass("cargando");
            });
        } else if (tipo === 2) { //generar excel
            $("#filtro-informes").attr("action", "index.php?r=informes/grilla&excel=1");
            $("#filtro-informes").submit();

            $("#panelResultadoInformes").show();
            $('#grillaInformes').html("<h2 style='text-align: center;'>Se está generando el archivo, por favor espere.</h2>");
            $("#divCargando").removeClass("cargando");
        } else if (tipo === 3) { //generar PDF
            $("#filtro-informes").attr("action", "index.php?r=informes/grilla&pdf=1");
            $("#filtro-informes").submit();

            $("#panelResultadoInformes").show();
            $('#grillaInformes').html("<h2 style='text-align: center;'>Se está generando el archivo, por favor espere.</h2>");
            $("#divCargando").removeClass("cargando");
        }
        return false;
    }

    //detalle de eventos
    if ($("#opciones_2").prop("checked")) {
        if (tipo === 1) {
            $.ajax({
                url: "index.php?r=informes/detalle",
                type: 'POST',
                data: datosForm,
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
                $("#divCargando").removeClass("cargando");
            }).error(function (e) {
                console.log("Se produjo un error.");
                $("#divCargando").removeClass("cargando");
            });
        } else if (tipo === 2) {
            $("#filtro-informes").attr("action", "index.php?r=informes/detalle&excel=1");
            $("#filtro-informes").submit();

            $("#panelResultadoInformes").show();
            $('#grillaInformes').html("<h2 style='text-align: center;'>Se está generando el archivo, por favor espere.</h2>");
            $("#divCargando").removeClass("cargando");
        } else if (tipo === 3) {
            $("#filtro-informes").attr("action", "index.php?r=informes/detalle&pdf=1");
            $("#filtro-informes").submit();

            $("#panelResultadoInformes").show();
            $('#grillaInformes').html("<h2 style='text-align: center;'>Se está generando el archivo, por favor espere.</h2>");
            $("#divCargando").removeClass("cargando");
        }
        return false;
    }

    //Graficar el recorrido
    if ($("#opciones_1").prop("checked")) {
        if (tipo === 1) { //mostrar en PANTALLA
            $('#map-canvas').show();
            $.ajax({
                url: "index.php?r=informes/recorrido",
                type: 'POST',
                data: datosForm,
                context: document.body,
                success: function (data) {
                    if (data.length == 0) {
                        alert("No se encontraron registros en la fecha seleccionada");
                        return;
                    }

                    $("#panelResultadoInformes").show();
                    $('#grillaEstadisticas').hide();
                    $('#grillaRus').hide();
                    $('#grillaInformes').hide();
                    $('#grillaInformes').empty(); //vaciamos cualquier contenido previo en la grilla.  
                    visualizaRecorrido(data); //llama a la funcion que visualiza el recorrido, que se encuentra en funcionesGmap.js
                }
            }).done(function () {
                $("#divCargando").removeClass("cargando");
            }).error(function (e) {
                console.log("Se produjo un error.");
                $("#divCargando").removeClass("cargando");
            });
            return false;
        } else if (tipo === 2) { //generar EXCEL
            $("#filtro-informes").attr("action", "index.php?r=informes/recorrido&kml=1");
            $("#filtro-informes").submit();

            $("#panelResultadoInformes").show();
            $('#grillaInformes').html("<h2 style='text-align: center;'>Se está generando el archivo, por favor espere.</h2>");
            $("#divCargando").removeClass("cargando");
            return false;
        }
    }
}
/* Fin de Filtro Informes*/

/* Filtro Informes Ibutton*/
function generarInformesI(tipo) {
    var fecha1 = $("#FiltroInformesForm_desdei").val();
    var fecha2 = $("#FiltroInformesForm_hastai").val();

    if (fecha1 == "" && $("#FiltroInformesForm_rangoFechasi").val() == "") {
        alert("El campo Fecha Desde no puede estar vacío");
        return;
    }
    if (fecha2 == "" && $("#FiltroInformesForm_rangoFechasi").val() == "") {
        alert("El campo Fecha Hasta no puede estar vacío");
        return;
    }
    if ($("#FiltroInformesForm_conductori").val() == "") {
        alert("Debe seleccionar un conductor.");
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
        alert("DEBE ELEGIR UN RANGO DE FECHAS MENOR O IGUAL A 31 DIAS");
        return;
    }

    $('#map-canvas').hide();
    $('#grillaBehavior').hide();
    $('#grillaInformes').show();
    $('#grillaEstadisticas').hide();
    $('#grillaRus').hide();
    $("#panelResultadoInformes").hide();
    $("#grillaPuntos").hide();
    $("#divCargando").addClass("cargando");

    var datosForm = $('#filtro-ibutton [value!=""]').serialize();

    if (tipo === 1) { //mostrar en pantalla
        $.ajax({
            url: "index.php?r=informes/informeIbutton",
            type: 'POST',
            data: datosForm,
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
            $("#divCargando").removeClass("cargando");
            $("#panelResultadoInformes").show();
        }).error(function (e) {
            console.log("Se produjo un error.");
            $("#divCargando").removeClass("cargando");
        });
    } else if (tipo === 2) { //generar excel
        $("#filtro-ibutton").attr("action", "index.php?r=informes/informeIbutton&excel=1");
        $("#filtro-ibutton").submit();

        $("#panelResultadoInformes").show();
        $('#grillaInformes').html("<h2 style='text-align: center;'>Se está generando el archivo, por favor espere.</h2>");
        $("#divCargando").removeClass("cargando");
    } else if (tipo === 3) { //generar PDF
        $("#filtro-ibutton").attr("action", "index.php?r=informes/informeIbutton&pdf=1");
        $("#filtro-ibutton").submit();

        $("#panelResultadoInformes").show();
        $('#grillaInformes').html("<h2 style='text-align: center;'>Se está generando el archivo, por favor espere.</h2>");
        $("#divCargando").removeClass("cargando");
    }
    return false;
}
/* Fin de Filtro InformesI*/

/* Funciones para el informe de mensajes */
$("#filtro-mensajes").on("submit", function (event) { //FUNCION OBSOLETA, NO SE USA
    event.preventDefault();

    var fecha1 = $("#FiltroMensajesForm_desde").val();
    var fecha2 = $("#FiltroMensajesForm_hasta").val();

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
    //if ($("#opciones_0").prop("checked")) {
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
            //$('#map-canvas').hide();
            //$("#estadisticas").hide();
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
    //}




});

//Resuman para infomre de alertas
function generarInformeAlertas(tipo) {

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
    $("#divCargando").addClass("cargando");

    if (tipo === 1) { //generar PANTALLA
        $.ajax({
            url: "index.php?r=informes/grillaalertas",
            type: 'POST',
            data: $("#filtro-alertas").serialize(),
            context: document.body,
            success: function (data) {

                if (data.length == 0) {
                    alert("No se encontraron registros en la fecha seleccionada");
                    return;
                }
                $('#map-canvas').hide();
                $("#estadisticas").hide();
                $("#panelResultadoInformes").show();
                var result = $('<div/>').append(data).html();
                $('#grillaAlertas').html(result);
            }
        }).done(function () {
            $("#divCargando").removeClass("cargando");
        }).error(function (e) {
            console.log("Se produjo un error.");
            $("#divCargando").removeClass("cargando");
        });
        return false;
    } else if (tipo === 2) { //generar EXCEL
        $("#filtro-alertas").attr("action", "index.php?r=informes/grillaalertas&excel=1");
        $("#filtro-alertas").submit();

        $("#panelResultadoInformes").show();
        $('#grillaAlertas').html("<h2 style='text-align: center;'>Se está generando el archivo, por favor espere.</h2>");
        $("#divCargando").removeClass("cargando");
        return false;
    } else if (tipo === 3) { //generar PDF
        $("#filtro-alertas").attr("action", "index.php?r=informes/grillaalertas&pdf=1");
        $("#filtro-alertas").submit();

        $("#panelResultadoInformes").show();
        $('#grillaAlertas').html("<h2 style='text-align: center;'>Se está generando el archivo, por favor espere.</h2>");
        $("#divCargando").removeClass("cargando");
        return false;
    }
}
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

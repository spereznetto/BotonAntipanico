function inicializar_notificaciones() {
    $("#boton-buscar-notificaciones").on("click", function () {
        var btnActualizar = $(this);
        btnActualizar.prop("disabled", true);
        btnActualizar.addClass("activado");

        var onComplete = function () {
            btnActualizar.prop("disabled", false);
            btnActualizar.removeClass("activado");
        }

        actualizarPanelNotificaciones(onComplete);
    });

    $("#boton-notificaciones").on("click", function () {
        if ($("#panel-notificaciones").hasClass("cerrado")) {
            abrirPanelNotificaciones();
        } else {
            cerrarPanelNotificaciones();
        }
    });

    $("#panel-notificaciones").on("blur", function () {
        cerrarPanelNotificaciones();
    });
}

var flag_primera_carga = true;

function abrirPanelNotificaciones() {
    $("#panel-notificaciones").removeClass("cerrado");
    $("#panel-notificaciones").addClass("abierto");
    $("#boton-buscar-notificaciones").trigger("click");
}

function cerrarPanelNotificaciones() {
    $("#panel-notificaciones").removeClass("abierto");
    $("#panel-notificaciones").addClass("cerrado");
}

function actualizarPanelNotificaciones(onCompleteCallBack) {
    $.ajax({
        url: "index.php?r=mensaje/getMensajes",
        dataType: "JSON",
        data: {},
        type: "POST",
        success: function (respuesta) {
            if (respuesta.estado === 1) {
                var listado_notificaciones = $("#panel-notificaciones").find("#notificaciones-listado");

                listado_notificaciones.css("opacity", 0);
                listado_notificaciones.empty();

                $.each(respuesta.notificaciones, function (index, notificacion) {
                    var notificacionContent = $('li[name="notificacion_for_clone"]').clone();
                    notificacionContent.attr("name", "notificacion_" + notificacion.id);

                    notificacionContent.find('div[name="titulo"]').text(notificacion.titulo);
                    notificacionContent.find('div[name="mensaje"]').text(notificacion.mensaje);

                    var iconoParent = notificacionContent.find('div[name="icono-parent"]');
                    var icono = notificacionContent.find('i[name="icono"]');

                    icono.prop("title", notificacion.tipo);

                    switch (notificacion.tipo) {
                        case "INFORMACION":
                            icono.css("color", "white");
                            break;
                        case "AVISO":
                            icono.css("color", "#1a44bd");
                            break;
                        case "ADVERTENCIA":
                            icono.css("color", "orange");
                            break;
                        case "URGENTE":
                            icono.css("color", "red");
                            break;
                    }

                    notificacionContent.css("display", "flex");
                    listado_notificaciones.prepend(notificacionContent);

                    inicializar_tooltip('.tooltip_notificacion_mensaje', 200, 350, 0);
                });

                listado_notificaciones.css({
                    "display": "flex",
                    "opacity": 1
                });

                if (respuesta.notificaciones.length === 0) {
                    listado_notificaciones.append('<li class="sin-notificaciones">Sin notificaciones</li>');
                }

                $('#boton-notificaciones i[name="notificaciones_si"]').css("display", "none");
                $('#boton-notificaciones i[name="notificaciones_no"]').css("display", "flex");
            } else {
                mensaje(respuesta.mensaje);
            }
        },
        error: function () {
            mensaje("ERROR: NO SE PUDO CARGAR LOS MENSAJES", 10000);
        },
        complete: function () {
            $("#panel-notificaciones").find(".loadingSVG").remove();
            if (typeof onCompleteCallBack !== 'undefined') {
                onCompleteCallBack();
            }
        }
    });
}
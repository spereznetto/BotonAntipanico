var CRONO_TIME_LOOP_TIME = 30;
var crono_time; // tiempo actual del cronometro

function inicializar_crono() {
    // boton actualizar
    $('div[name="crono-container"] .crono-button--actualizar').on("click", function () {
        crono_time = 1;

        // si esta en pausa activamos por un menos de un segundo para ejecutar las tareas
        if (!flag_crono_time_running) {
            $('div[name="crono-container"] .crono-button--play').trigger("click");
            setTimeout(function () {
                $('div[name="crono-container"] .crono-button--play').trigger("click");
            }, 500);
        }
    });

    // boton play/pause
    $('div[name="crono-container"] .crono-button--play').on("click", function () {
        if (flag_crono_time_running) {
            // cambiar el icono del boton
            $('div[name="crono-container"] #crono_icono_play').css("display", "flex");
            $('div[name="crono-container"] #crono_icono_pause').css("display", "none");

            // efecto al boton
            $('div[name="crono-container"] #crono_reloj_numero').addClass("animate-flicker");

            // pausar
            crono_time_stop();
        } else {
            // cambiar el icono del boton
            $('div[name="crono-container"] #crono_icono_play').css("display", "none");
            $('div[name="crono-container"] #crono_icono_pause').css("display", "flex");

            // remover efecto
            $('div[name="crono-container"] #crono_reloj_numero').removeClass("animate-flicker");

            // continuar
            crono_time_continuar();
        }
    });

    // buscar si hay notificaciones
    taskNotificacionesActualizar();

    // mensajes de ayuda para el usuario
    inicializar_tooltip('.tooltip_notificaciones', 200, 1200, 0);
}

var crono_time_tick_loop = function () {
    // check si tengo que salir del loop
    if (!flag_crono_time_running) {
        return;
    }

    // actualizamos el numero del reloj
    crono_time = (crono_time - 1) >= 0 ? crono_time - 1 : CRONO_TIME_LOOP_TIME;
    $('div[name="crono-container"] #crono_reloj_numero').text(pad(crono_time, 2));

    // cuando el reloj llega a cero
    if (crono_time === 0) {
        // frenamos el reloj
        crono_time_stop();

        // mostramos el loading gif
        $('div[name="crono-container"] #crono_reloj_numero').text("");
        $('div[name="crono-container"] #crono_gif_loading').css("display", "flex");

        // desactivamos los botones
        $('div[name="crono-container"] .crono-button--play').prop("disabled", true);
        $('div[name="crono-container"] .crono-button--actualizar').prop("disabled", true);
        setTimeout(function () {
            // ejecutar las tareas
            ejecutarTareas();

            // reactivar botones
            $('div[name="crono-container"] .crono-button--play').prop("disabled", false);
            $('div[name="crono-container"] .crono-button--actualizar').prop("disabled", false);

            // ocultar el loading gif
            $('div[name="crono-container"] #crono_gif_loading').css("display", "none");

            // el reloj vuelve a entrar en loop
            crono_time_start();
        }, 350);
    } else {
        setTimeout(crono_time_tick_loop, 1000);
    }
};

// true si el reloj esta corriendo o false si esta pausado
var flag_crono_time_running;

function crono_time_start() {
    crono_time = CRONO_TIME_LOOP_TIME;
    flag_crono_time_running = true;
    crono_time_tick_loop();
}

function crono_time_stop() {
    flag_crono_time_running = false;
}

function crono_time_continuar() {
    flag_crono_time_running = true;
    crono_time_tick_loop();
}

// tareas cuando el crono llega a cero
function ejecutarTareas() {
    try {
        switch (modulo) {
            case "logistica":
                taskRecorridosInformeActualizar();
                taskRecorridosTiempoActualizar();
                taskMovilUbicacionActualizar();
                break;
        }
        taskNotificacionesActualizar();
        taskAlertasSinLeer(true);
    } catch (err) {
        mensaje("ERROR: CRONO TASK", 10000);
    }
}

/* ------------------------- */
/* FUNCIONES PARA LAS TAREAS */
/* ------------------------- */

// actualizar los informes de recorridos que se estan mostrando
function taskRecorridosInformeActualizar() {
    $.each($('ul#listado-recorridos input[name="chk_trigger_actualizar_recorrido_informe"]:checked'), function () {
        $(this).closest('li').find('button[name^="recorrido_boton_buscar_"]').trigger('click');
    });
}

// buscar notificaciones del usuario
function taskNotificacionesActualizar() {
    $.ajax({
        url: "index.php?r=mensaje/taskMensajes",
        dataType: "JSON",
        type: "POST",
        success: function (respuesta) {
            if (respuesta.estado === 1) {
                // cambiar el icono si hay notificaciones nuevas
                if (respuesta.pendientes) {
                    $('#boton-notificaciones i[name="notificaciones_no"]').css("display", "none");
                    $('#boton-notificaciones i[name="notificaciones_si"]').css("display", "flex");
                }
            }
        },
        error: function () {
            mensaje("ERROR: NO SE PUDO ACTUALIZAR LAS NOTIFICACIONES", 10000);
        }
    });
}


// acutlizar informacion de los recorridos en pantalla
function taskRecorridosTiempoActualizar() {
    // actualizar los timers
    var listado_items = [];
    $.each($("#listado-recorridos li"), function (index, item) {
        var id = $(item).attr("data-item");
        if ($.isNumeric(id)) {
            listado_items.push(id);
        }
    });

    $.ajax({
        url: "index.php?r=recorrido/taskEstados",
        data: {
            items: listado_items
        },
        dataType: "JSON",
        type: "POST",
        success: function (respuesta) {
            if (respuesta.estado === 1) {
                // actualizamos los items que continuan dibujados en el DOM
                $.each(respuesta.items, function (index, item) {
                    var objEstado = $('div[name="estado"]>i[name="recorrido_estado_' + item.id + '"]');
                    objEstado.removeClass();
                    objEstado.addClass('material-icons ' + item.RecorridoEstado.estado);
                    objEstado.attr('data-recorrido-estado', item.RecorridoEstado.estado);
                });
            } else {
                mensaje(respuesta.mensaje, 10000);
            }
        },
        error: function () {
            mensaje("ERROR: RECORRIDO ESTADOS", 10000);
        },
        complete: function () {

        }
    });
}

// actualizar la posicion de los moviles dibujados en el mapa
function taskMovilUbicacionActualizar() {
    // para cada dispositivo dibujado
    $.each($("#listado-moviles input[type='checkbox'][name='chk_agregar_al_mapa']:checked"), function () {
        // traer el dispositivo
        var dispositivo = $(this).val();

        // cuando llega la posicion actualizamos el icono del movil
        var onSuccess = function (posicion) {
            var dispositivo_en_mapa = getDispositivoEnMapa(dispositivo);

            // si al recibir la posicion por ajax, el dispositivo continua en el mapa
            if (dispositivo_en_mapa) {
                var iconoActualizado = getDispositivoIcono("movil", posicion);
                dispositivo_en_mapa.setIcon(iconoActualizado);
                dispositivo_en_mapa.setRotationAngle(posicion.Reporte_Rumbo);
                dispositivo_en_mapa.setLatLng(new L.LatLng(posicion.Reporte_Latitud, posicion.Reporte_Longitud));
            }
        };

        var onError = function (errorMsj) {};

        var onComplete = function () {};

        getDispositivoUbicacion(dispositivo, onSuccess, onError, onComplete);
    });
}

/* /FUNCIONES PARA LAS TAREAS */
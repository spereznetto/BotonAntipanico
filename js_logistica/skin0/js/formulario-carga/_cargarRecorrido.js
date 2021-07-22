// inicializar formulario
function inicializar_logistica_cargar_recorrido() {
    // inicializar inputs
    init_inpt_formulario_cargar_recorrido();

    // listener on remove formulario
    $('form[id="' + formulario_carga_formulario_id + '"]').on("remove", function () {
        $("#recorrido-cargar-fecha-desde-fecha-menu").remove();
        $("#recorrido-cargar-fecha-hasta-fecha-menu").remove();
        $("#recorrido-cargar-fecha-desde-hora-menu").remove();
        $("#recorrido-cargar-fecha-hasta-hora-menu").remove();
    });
}


/* ----------------------------------- */
/* FUNCIONES PARA CARGAR EL FORMULARIO */
/* ----------------------------------- */

// validar formulario de logistica de cargar un recorrido
function formulario_validar_logistica_recorrido() {
    // validamos que haya al menos un movil seleccionado
    if ($('#slc-movil').multipleSelect('getSelects', 'text').length === 0) {
        $("#slc-movil-helptext").css("aria-hidden", "false");
        $("#slc-movil-helptext").css("opacity", 1);

        return false;
    } else {
        $("#slc-movil-helptext").css("aria-hidden", "true");
        $("#slc-movil-helptext").css("opacity", 0);
    }

    // validamos que haya una ruta seleccionada
    if ($('#slc-ruta').multipleSelect('getSelects', 'text').length === 0) {
        $("#slc-ruta-helptext").css("aria-hidden", "false");
        $("#slc-ruta-helptext").css("opacity", 1);

        return false;
    } else {
        $("#slc-ruta-helptext").css("aria-hidden", "true");
        $("#slc-ruta-helptext").css("opacity", 0);
    }

    return true;
}

// enviar formulario de carga de un recorrido
function formulario_enviar_logistica_recorrido() {
    var parametros = {};
    parametros.recorrido = $("#recorrido").val();
    parametros.descripcion = $("#descripcion").val();
    parametros.fechaDesde = $("#fecha-desde-fecha").val();
    parametros.fechaHasta = $("#fecha-hasta-fecha").val();
    parametros.horaDesde = $("#fecha-desde-hora").val();
    parametros.horaHasta = $("#fecha-hasta-hora").val();
    parametros.moviles = $("#slc-movil").multipleSelect("getSelects");
    parametros.rutas = $("#slc-ruta").multipleSelect("getSelects");
    parametros.repeticion = $("#checkbox-repeticion").prop("checked");

    if (parametros.repeticion) {
        parametros.repeticion_caracteristicas = {};

        parametros.repeticion_caracteristicas.Lunes = $('#panel-repeticion > div.panel-secundario-body .btn-dia[data-texto="Lunes"]').hasClass("mdc-button--dia");
        parametros.repeticion_caracteristicas.Martes = $('#panel-repeticion > div.panel-secundario-body .btn-dia[data-texto="Martes"]').hasClass("mdc-button--dia");
        parametros.repeticion_caracteristicas.Miercoles = $('#panel-repeticion > div.panel-secundario-body .btn-dia[data-texto="Miercoles"]').hasClass("mdc-button--dia");
        parametros.repeticion_caracteristicas.Jueves = $('#panel-repeticion > div.panel-secundario-body .btn-dia[data-texto="Jueves"]').hasClass("mdc-button--dia");
        parametros.repeticion_caracteristicas.Viernes = $('#panel-repeticion > div.panel-secundario-body .btn-dia[data-texto="Viernes"]').hasClass("mdc-button--dia");
        parametros.repeticion_caracteristicas.Sabado = $('#panel-repeticion > div.panel-secundario-body .btn-dia[data-texto="Sabado"]').hasClass("mdc-button--dia");
        parametros.repeticion_caracteristicas.Domingo = $('#panel-repeticion > div.panel-secundario-body .btn-dia[data-texto="Domingo"]').hasClass("mdc-button--dia");

        var horarios = sldHorario.noUiSlider.get();
        parametros.repeticion_caracteristicas.HorarioDesde = horarios[0];
        parametros.repeticion_caracteristicas.HorarioHasta = horarios[1].replace("Dia sig.", "");
    }

    formulario_de_carga_guardar(parametros);
}

/* /FUNCIONES PARA CARGAR EL FORMULARIO */

/* ------------------------- */
/* FUNCIONES PARA LOS INPUTS */
/* ------------------------- */

// inicializar inputs del formulario
function init_inpt_formulario_cargar_recorrido() {
    // Inputs del formulario para inicializar
}

// habilita los inputs para elegir la hora
function formulario_recorrido_hora_habilitar() {
    $("#fecha-desde-hora").prop("disabled", false);
    $("#fecha-hasta-hora").prop("disabled", false);
}

// deshabilita los inputs para elegir la hora
function formulario_recorrido_hora_deshabilitar() {
    $("#fecha-desde-hora").prop("disabled", true);
    $("#fecha-hasta-hora").prop("disabled", true);
}

/* /FUNCIONES PARA LOS INPUTS */
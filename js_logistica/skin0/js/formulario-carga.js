/* ------------------------------------------------- */
/* FUNCIONES GENERALES PARA LOS FORMULARIOS DE CARGA */
/* ------------------------------------------------- */

var formulario_carga_panel_id;
var formulario_carga_controlador;
var formulario_carga_listado_id;
var formulario_carga_formulario_id;

// animacion para mostrar el formulario
function animacion_on_show() {
    $('form[id="' + formulario_carga_formulario_id + '"]').animate({
        opacity: 1
    }, 400);

    // trigger evento de formulario cargado
    $('form[id="' + formulario_carga_formulario_id + '"]').trigger("formulario_cargado");
}

// inicializa todas las funciones basicas de un formulario de carga
function inicializar_formulario(panel_idCaller, controladorCaller, listado_idCaller, formulario_idCaller) {
    // variables generales de todo formulario de carga
    formulario_carga_panel_id = panel_idCaller;
    formulario_carga_controlador = controladorCaller;
    formulario_carga_listado_id = listado_idCaller;
    formulario_carga_formulario_id = formulario_idCaller;

    // dialog si hay que eliminar el item
    init_formulario_dialog_eliminar();

    // inicializar ripples
    init_formulario_efectos_ripple();

    // inicializar tooltips
    init_formulario_tooltips();

    // on submit formulario
    $('form[id="' + formulario_carga_formulario_id + '"]').submit(function (event) {
        event.preventDefault(event);
        if (formulario_validar()) {
            formulario_enviar();
        }
    });

    // inicializar inputs de los formularios de carga
    init_formulario_carga_inputs();

    // inicializar funciones callbacks
    _dialog_eliminar_on_success = 'undefined';
    _dialog_cargar_on_success = 'undefined';
}

var dialogEliminar;

// dialog para eliminar el item
function init_formulario_dialog_eliminar() {
    dialogEliminar = new mdc.dialog.MDCDialog(document.querySelector('#mdc-dialog-eliminar'));

    // boton aceptar
    dialogEliminar.listen('MDCDialog:accept', function () {
        $.ajax({
            url: 'index.php?r=' + formulario_carga_controlador + '/eliminar',
            data: {
                item: $('#' + formulario_carga_controlador).val()
            },
            dataType: 'JSON',
            type: 'POST',
            success: function (respuesta) {
                if (respuesta.estado === 1) {
                    mensaje('ELIMINADO DEL SISTEMA');

                    // cerrar formulario
                    cerrarPanel(formulario_carga_panel_id);

                    // actualizar grilla
                    eliminarItemLista('#' + formulario_carga_listado_id, formulario_carga_controlador + '_' + respuesta.id);

                    if (typeof _dialog_eliminar_on_success !== 'undefined') {
                        if ($.isFunction(_dialog_eliminar_on_success)) {
                            _dialog_eliminar_on_success();
                        }
                    }
                } else {
                    mensaje(respuesta.mensaje, 10000);

                    // cerrar formulario
                    cerrarPanel(formulario_carga_panel_id);
                }
            },
            error: function () {
                mensaje('ERROR: AL ELIMINAR', 10000);

                // cerrar formulario
                cerrarPanel(formulario_carga_panel_id);
            },
            complete: function () {

            }
        });
    });

    // boton cancelar
    dialogEliminar.listen('MDCDialog:cancel', function () {
        // quitar loadingGif
        $('#' + formulario_carga_panel_id + ' .panel-content-body .loadingGif').remove();
    });

    // abrir el panel
    $('form[id="' + formulario_carga_formulario_id + '"] button.btn-eliminar').on('click', function (event) {
        event.preventDefault();

        // agregar un loadingGif
        $('#' + formulario_carga_panel_id + ' .panel-content-body').append($('.loadingGif:first').clone());
        dialogEliminar.show();
    });
}

// inicializar los ripples cuyos elementos del formulario los tengan
function init_formulario_efectos_ripple() {
    $.each($('form[id="' + formulario_carga_formulario_id + '"] .btn-con-ripple'), function () {
        mdc.ripple.MDCRipple.attachTo($(this)["0"]);
    });
}

// inicializar los tooltips que estan dentro del formulario
function init_formulario_tooltips() {
    inicializar_tooltip('form[id="' + formulario_carga_formulario_id + '"] .tooltip_carga', 200, 350, 0);
}

/* /FUNCIONES GENERALES PARA LOS FORMULARIOS DE CARGA */

/* ------------------------------------------ */
/* FUNCIONES DEL DIALOG PARA ELIMINAR UN ITEM */
/* ------------------------------------------ */

var _dialog_eliminar_on_success;

function formulario_dialog_eliminar_set_on_success(onSuccessCallBack) {
    _dialog_eliminar_on_success = onSuccessCallBack;
}

/* /FUNCIONES DEL DIALOG PARA ELIMINAR UN ITEM */

/* ----------------------------------------- */
/* FUNCIONES PARA GUARDAR LOS DATOS CARGADOS */
/* ----------------------------------------- */

var _dialog_cargar_on_success;

function formulario_dialog_cargar_set_on_success(onSuccessCallBack) {
    _dialog_cargar_on_success = onSuccessCallBack;
}


// recibe los datos cargados del item y los envia para guardar
function formulario_de_carga_guardar(item_datos) {
    // mostrar un loading gif
    $("#" + formulario_carga_panel_id + " .panel-content-body").append($(".loadingGif:first").clone());

    // guardar datos cargados
    $.ajax({
        url: 'index.php?r=' + formulario_carga_controlador + '/cargar',
        data: item_datos,
        dataType: 'JSON',
        type: 'POST',
        success: function (respuesta) {
            if (respuesta.estado === 1) {
                mensaje('ITEM CARGADO');

                // actualizar grilla
                if ($('#' + formulario_carga_controlador).val().length === 0) {
                    agregarItemLista('#' + formulario_carga_listado_id, formulario_carga_controlador, respuesta.id);
                } else {
                    modificarItemLista('#' + formulario_carga_listado_id, formulario_carga_controlador, respuesta.id);
                }

                // cerrar formulario
                cerrarPanel(formulario_carga_panel_id);

                if (typeof _dialog_cargar_on_success !== 'undefined') {
                    if ($.isFunction(_dialog_cargar_on_success)) {
                        _dialog_cargar_on_success();
                    }
                }
            } else {
                mensaje(respuesta.mensaje, 10000);

                // cerrar formulario
                cerrarPanel(formulario_carga_panel_id);
            }
        },
        error: function () {
            mensaje('ERROR: AL CARGAR', 10000);

            // cerrar formulario
            cerrarPanel(formulario_carga_panel_id);
        },
        complete: function () {

        }
    });
}

/* /FUNCIONES PARA GUARDAR LOS DATOS CARGADOS */

/* ---------------------------------- */
/* FUNCIONES PARA VALIDAR FORMULARIOS */
/* ---------------------------------- */

function formulario_validar() {
    switch (modulo) {
        case "logistica":
            switch (formulario_carga_controlador) {
                case "categoria":
                    return formulario_validar_logistica_categoria();
                case "punto":
                    return formulario_validar_logistica_punto();
                case "ruta":
                    return formulario_validar_logistica_ruta();
                case "recorrido":
                    return formulario_validar_logistica_recorrido();
            }
            break;
    }

    return false;
}

/* /FUNCIONES PARA VALIDAR FORMULARIOS */

/* --------------------------------- */
/* FUNCIONES PARA ENVIAR FORMULARIOS */
/* --------------------------------- */

function formulario_enviar() {
    switch (modulo) {
        case "logistica":
            switch (formulario_carga_controlador) {
                case "categoria":
                    return formulario_enviar_logistica_categoria();
                case "punto":
                    return formulario_enviar_logistica_punto();
                case "ruta":
                    return formulario_enviar_logistica_ruta();
                case "recorrido":
                    return formulario_enviar_logistica_recorrido();
            }
            break;
    }

    return false;
}

/* /FUNCIONES PARA ENVIAR FORMULARIOS */

/* ------------------------- */
/* FUNCIONES PARA LOS INPUTS */
/* ------------------------- */

function init_formulario_carga_inputs() {
    // init boton de submit
    init_frm_carga_inpt_submit();

    // inputs tipo texto
    init_frm_carga_inpt_texto();

    // inputs tipo radio del plugin multiselect con aplicacion mdc
    init_frm_carga_inpt_radio_select();

    // input checkbox habilitar panel secundario
    init_frm_carga_inpt_chk_panel_secundario();
}

// inicializar boton de submit de un formulario de carga
function init_frm_carga_inpt_submit() {
    $.each($('form button[type="submit"].boton-cargar'), function (index, item) {
        var btnSubmit = $(item);

        // listener boton apagar
        btnSubmit.on('apagar', function () {
            var btnCaller = $(this);

            btnCaller.prop("disabled", true);
            btnCaller.addClass("apagado");
        });

        // listener boton prender
        btnSubmit.on('prender', function () {
            var btnCaller = $(this);

            btnCaller.prop("disabled", false);
            btnCaller.removeClass("apagado");
        });
    });
}

// inicializar inputs tipo texto
function init_frm_carga_inpt_texto() {
    var frm_tipo_texto = document.querySelectorAll('form[id="' + formulario_carga_formulario_id + '"] .formulario-carga-input-mdc-texto');
    for (var i = 0, input_texto; input_texto = frm_tipo_texto[i]; i++) {
        mdc.textfield.MDCTextfield.attachTo(input_texto);
    }
}

// inicializar inputs tipo radio select
function init_frm_carga_inpt_radio_select() {
    $.each($('.radio-select-mdc-multiselect'), function (index, item) {
        var listado = $(item);
        var texto_placeholder = listado.attr("data-placeholder");
        var ninguno_seleccionado = listado.attr("data-ninguno-seleccionado");

        listado.multipleSelect({
            selectAll: false,
            filter: true,
            single: true,
            minimumCountSelected: 4,
            countSelected: "Seleccionados # de %",
            allSelected: false,
            placeholder: texto_placeholder
        });

        if (ninguno_seleccionado) {
            listado.multipleSelect("setSelects", []);
        }
    });
}

// inicializar checkbox que habilita el panel secundario
function init_frm_carga_inpt_chk_panel_secundario() {
    // para cada checkbox de este tipo
    $.each($('.chk-habilitar-panel-secundario'), function (index, item) {
        var checkbox = $(item);

        // listener de change
        checkbox.on("change", function () {
            var chkCaller = $(this);
            var estado = chkCaller.prop('checked');
            var container = chkCaller.attr('data-container');
            var parent = chkCaller.attr('data-parent');
            var panel_secundario_id = chkCaller.attr('data-panel-secundario-id');
            var titulo = chkCaller.attr('data-titulo');
            var controlador = chkCaller.attr('data-controlador');
            var metodo = chkCaller.attr('data-metodo');
            var item = chkCaller.attr('data-item');
            var on_activado = chkCaller.attr('data-on-activado');
            var on_desactivado = chkCaller.attr('data-on-desactivado');

            if (estado) {
                // si el container tiene submit debemos apagarlo            
                var onComplete;
                var btnSubmit = $('#' + parent).find('button[type="submit"].boton-cargar');
                if (btnSubmit.length > 0) {
                    btnSubmit.trigger('apagar');

                    // luego de cargar la info del panel secundario
                    onComplete = function () {
                        btnSubmit.trigger('prender');
                    };
                }

                // si esta tildado habilitamos el panel secundario
                mostrarPanelSecundario(
                    '#' + container + ' .panel-shadow',
                    '#' + panel_secundario_id,
                    titulo,
                    controlador,
                    metodo,
                    item,
                    onComplete);

                // al activar el checkbox
                if (typeof window[on_activado] === 'function') {
                    window[on_activado].call();
                }
            } else {
                // si no, cerramos el panel secundario
                panelSecundarioCerrar('#' + panel_secundario_id);

                // al desactivar el checkbox
                if (typeof window[on_desactivado] === 'function') {
                    window[on_desactivado].call();
                }
            }
        });

        // si esta habilitado al momento de inicializarlo
        checkbox.ready(function () {
            var habilitado = checkbox.attr("data-habilitado");
            if (habilitado == 1) {
                checkbox.click();
            }
        });
    });
}

/* /FUNCIONES PARA LOS INPUTS */
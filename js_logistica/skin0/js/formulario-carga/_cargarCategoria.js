// inicializar formulario
function inicializar_logistica_cargar_categoria() {
    // inicializar inputs
    init_inpt_formulario_cargar_categoria();
}

/* ----------------------------------- */
/* FUNCIONES PARA CARGAR EL FORMULARIO */
/* ----------------------------------- */

// validar formulario de logistica de cargar una categoria
function formulario_validar_logistica_categoria() {
    if ($("#slc-icono li[name='categoria-icono'][aria-selected='true']").length === 0) {
        $("#slc-icono-helptext").css("aria-hidden", "false");
        $("#slc-icono-helptext").css("opacity", 1);

        return false;
    } else {
        $("#slc-icono-helptext").css("aria-hidden", "true");
        $("#slc-icono-helptext").css("opacity", 0);
    }

    return true;
}

// enviar formulario de carga de una categoria
function formulario_enviar_logistica_categoria() {
    // crear icono de la categoria (si no existe) y luego guardar
    logistica_categoria_crear_icono();
}

// crear un icono de las categorias de logistica
function logistica_categoria_crear_icono() {
    var icono = $("#slc-icono li[name='categoria-icono'][aria-selected='true'] > i")["0"].textContent;
    var color = $("#slc-color li[name='categoria-color'][aria-selected='true'] > div").attr("data-color");

    $.ajax({
        url: "index.php?r=categoria/getIconoSvg",
        data: {
            icono: icono,
            color: color
        },
        dataType: "JSON",
        type: "POST",
        success: function (respuesta) {
            if (respuesta.estado === 1) {
                var svgText = respuesta.icono_svg;
                var canvas = document.getElementById("canvas");
                var ctxt = canvas.getContext("2d");

                drawInlineSVG(ctxt, svgText, function () {
                    // png
                    var imagenBase64 = canvas.toDataURL();
                    logistica_categoria_guardar_icono(imagenBase64, icono, color);
                });
            } else {
                mensaje(respuesta.mensaje, 10000);

                // cerrar formulario
                cerrarPanel(formulario_carga_panel_id);
            }
        },
        error: function () {
            mensaje("ERROR: AL CREAR ICONO", 10000);

            // cerrar formulario
            cerrarPanel(formulario_carga_panel_id);
        }
    });
}


// dibujar el svg con el icono
function drawInlineSVG(ctx, rawSVG, callback) {
    var svg = new Blob([rawSVG], {
            type: "image/svg+xml;charset=utf-8"
        }),
        domURL = self.URL || self.webkitURL || self,
        url = domURL.createObjectURL(svg),
        img = new Image();

    img.onload = function () {
        ctx.drawImage(this, 0, 0);
        domURL.revokeObjectURL(url);
        callback(this);
    };

    img.src = url;
}

// guardar el icono de forma permanente
function logistica_categoria_guardar_icono(imagen, nombre, color) {
    $.ajax({
        url: "index.php?r=categoria/guardarIcono",
        data: {
            imagen: imagen,
            nombre: nombre,
            color: color
        },
        dataType: "JSON",
        type: "POST",
        success: function (respuesta) {
            if (respuesta.estado === 1) {
                logistica_categoria_guardar_formulario();
            } else {
                mensaje(respuesta.mensaje, 10000);

                // cerrar formulario
                cerrarPanel(formulario_carga_panel_id);
            }
        },
        error: function () {
            mensaje("ERROR: AL CREAR ICONO", 10000);

            // cerrar formulario
            cerrarPanel(formulario_carga_panel_id);
        }
    });
}

function logistica_categoria_guardar_formulario() {
    // cargar formulario
    var parametros = {};
    parametros.categoria = $("#categoria").val();
    parametros.descripcion = $("#descripcion").val();
    parametros.icono = $("#slc-icono li[name='categoria-icono'][aria-selected='true'] > i")["0"].textContent;
    parametros.color = $("#slc-color li[name='categoria-color'][aria-selected='true'] > div").attr("data-color");

    formulario_de_carga_guardar(parametros);
}

/* /FUNCIONES PARA CARGAR EL FORMULARIO */

/* ------------------------- */
/* FUNCIONES PARA LOS INPUTS */
/* ------------------------- */

// inicializar inputs del formulario de carga de categoria de logistica
function init_inpt_formulario_cargar_categoria() {
    // input para el icono
    init_inpt_formulario_cargar_categoria_icono();

    // input para el color
    init_inpt_formulario_cargar_categoria_color();
}

// inicializar input del icono de la categoria
function init_inpt_formulario_cargar_categoria_icono() {
    var selectIcono = mdc.select.MDCSelect.attachTo(document.querySelector('#slc-icono'));

    selectIcono.listen('MDCSelect:change', () => {
        $("#slc-icono .mdc-select__selected-text").css("display", "none");
        $("#slc-icono .mdc-select__selected-text").empty();

        var indexOfChild = selectIcono.foundation_.selectedIndex_ + 1;
        var liSelected = $("#slc-icono li[name='categoria-icono']:nth-child(" + indexOfChild + ")");
        var icono = liSelected.find("i:first")[0];
        var newIcono = $(icono).clone();

        newIcono.css("color", $("#slc-color").css("background-color"));
        newIcono.appendTo("#slc-icono .mdc-select__selected-text");

        $("#slc-icono .mdc-select__selected-text").css("display", "block");
    });

    // icono seleccionado
    var icono_seleccionado = $('#slc-icono').attr('data-icono');
    var iIconoSelected = $("#slc-icono i[name='" + icono_seleccionado + "']");
    iIconoSelected.closest("li").attr('aria-selected', 'true');
    selectIcono.foundation_.selectedIndex_ = parseInt(iIconoSelected.attr("data-index"));
    selectIcono.foundation_.adapter_.notifyChange();
}

// inicializar input dle color de la categoria
function init_inpt_formulario_cargar_categoria_color() {
    var selectColor = mdc.select.MDCSelect.attachTo(document.querySelector('#slc-color'));

    selectColor.listen('MDCSelect:change', () => {
        var indexOfChild = selectColor.foundation_.selectedIndex_ + 1;
        var liSelected = $("#slc-color li[name='categoria-color']:nth-child(" + indexOfChild + ")");
        var divColor = liSelected.find("div:first")[0];
        var color = $(divColor).attr("data-color");

        $('#slc-color').find('li').attr('aria-selected', 'false');
        liSelected.attr('aria-selected', 'true');

        $("#slc-color").css("background-color", color);
        $("#slc-icono .mdc-select__selected-text i").css("color", color);
    });

    // color seleccionado
    var color_seleccionado = $('#slc-color').attr('data-color');
    var divColorSelected = $('#slc-color div[data-color="' + color_seleccionado + '"]');
    divColorSelected.closest("li").attr('aria-selected', 'true');
    selectColor.foundation_.selectedIndex_ = parseInt(divColorSelected.attr("data-index"));
    selectColor.foundation_.adapter_.notifyChange();
}

/* /FUNCIONES PARA LOS INPUTS */
function inicializar_dialogs() {
    init_dialog_skin();
    init_dialog_sugerencia();
}

var skinDialog;
var dialogSugerencia;

function init_dialog_skin() {
    skinDialog = mdc.dialog.MDCDialog.attachTo(document.querySelector('#skin-color-mdc-dialog'));

    var old_primary = document.documentElement.style.getPropertyValue("--color-primario");
    var old_secondary = document.documentElement.style.getPropertyValue("--color-secundario");
    var old_accent = document.documentElement.style.getPropertyValue("--color-acentuado");
    skinDialog.listen('MDCDialog:accept', function () {
        old_primary = $("#color-picker-primary .color-picker-cell.active").attr("data-bg");
        old_secondary = $("#color-picker-secondary .color-picker-cell.active").attr("data-bg");
        old_accent = $("#color-picker-accent .color-picker-cell.active").attr("data-bg");
        var color_texto1,
            color_texto2;

        color_texto1 = $("input#color-texto1").val();
        color_texto2 = $("input#color-texto2").val();

        document.documentElement.style.setProperty("--color-texto1", color_texto1);
        document.documentElement.style.setProperty("--color-texto2", color_texto2);

        var propiedades = [
            "color_texto1",
            "color_texto2",
            "color_primario",
            "color_secundario",
            "color_acentuado"
        ];

        var valores = [
            color_texto1,
            color_texto2,
            old_primary,
            old_secondary,
            old_accent
        ];

        var onSuccess = function () {
            mensaje("SKIN GUARDADO", 2500);
        };

        guardarPropiedadCSS(propiedades, valores, onSuccess);
    });

    skinDialog.listen('MDCDialog:cancel', function () {
        document.documentElement.style.setProperty("--color-primario", old_primary);
        document.documentElement.style.setProperty("--color-secundario", old_secondary);
        document.documentElement.style.setProperty("--color-acentuado", old_accent);
    });

    $(".color-picker-cell").on("click", function () {
        var target = $(this).attr("data-target"); // picker target
        var color = $(this).attr("data-bg");
        var variable = $(this).attr("data-variable");

        $(target + " .color-picker-cell").removeClass("active");
        $(target).next("span.color-picker-previa").css("background-color", color);
        document.documentElement.style.setProperty(variable, color); // para cambiar las propiedades en directo

        $(this).addClass("active");
    });

    $(".color-picker-texto--opcion").on("click", function () {
        var divSelected = $(this);

        if (divSelected.hasClass("negro")) {
            $("input#color-texto1").val("#000000");
            $("input#color-texto2").val("#FFFFFF");
            pickersTitleTextColorCambiar("#000000");
        }

        if (divSelected.hasClass("blanco")) {
            $("input#color-texto1").val("#FFFFFF");
            $("input#color-texto2").val("#000000");
            pickersTitleTextColorCambiar("#FFFFFF");
        }
    });
}

function clearSkinDialog() {
    var colorPrimary = document.documentElement.style.getPropertyValue("--color-primario");
    var colorSecondary = document.documentElement.style.getPropertyValue("--color-secundario");
    var colorAccent = document.documentElement.style.getPropertyValue("--color-acentuado");

    $("#color-picker-primary .color-picker-cell.active").removeClass("active");
    $("#color-picker-primary").next("span.color-picker-previa").css("background-color", colorPrimary);
    $.each($("#color-picker-primary .color-picker-cell"), function () {
        if ($(this).attr("data-bg") === colorPrimary) {
            $(this).addClass("active");
        }
    });

    $("#color-picker-secondary .color-picker-cell.active").removeClass("active");
    $("#color-picker-secondary").next("span.color-picker-previa").css("background-color", colorSecondary);
    $.each($("#color-picker-secondary .color-picker-cell"), function () {
        if ($(this).attr("data-bg") === colorSecondary) {
            $(this).addClass("active");
        }
    });

    $("#color-picker-accent .color-picker-cell.active").removeClass("active");
    $("#color-picker-accent").next("span.color-picker-previa").css("background-color", colorAccent);
    $.each($("#color-picker-accent .color-picker-cell"), function () {
        if ($(this).attr("data-bg") === colorAccent) {
            $(this).addClass("active");
        }
    });
}

function pickersTitleTextColorCambiar(color) {
    $.each($(".color-picker-titulo-text"), function () {
        $(this).css("color", color);
    });
}

function init_dialog_sugerencia() {
    var tfsSug = document.querySelectorAll("#mdc-dialog-sugerencia .mdc-textfield");
    for (var i = 0, tf; tf = tfsSug[i]; i++) {
        mdc.textfield.MDCTextfield.attachTo(tf);
    }

    dialogSugerencia = new mdc.dialog.MDCDialog(document.querySelector('#mdc-dialog-sugerencia'));

    dialogSugerencia.listen('MDCDialog:accept', function () {
        $.ajax({
            url: "index.php?r=sugerencia/cargar",
            data: {
                apellido: $("#SugApellido").val(),
                nombre: $("#SugNombre").val(),
                descripcion: $("#SugDescripcion").val()
            },
            dataType: "JSON",
            type: "POST",
            success: function (respuesta) {
                if (respuesta.estado === 1) {
                    mensaje("GRACIAS POR AYUDARNOS A MEJORAR", 3000);
                } else {
                    mensaje(respuesta.mensaje, 10000);
                }
            },
            error: function () {
                mensaje("ERROR: AL ENVIAR SUGERENCIA", 10000);
            },
            complete: function () {
                clearSugerenciaDialog();
            }
        });
    });

    dialogSugerencia.listen('MDCDialog:cancel', function () {
        clearSugerenciaDialog();
    });
}

function clearSugerenciaDialog() {
    $("#SugApellido").val("").blur();
    $("#SugNombre").val("").blur();
    $("#SugDescripcion").val("").blur();

    $("#SugApellido").closest("div").removeClass("mdc-textfield--focused");
    $("#SugNombre").closest("div").removeClass("mdc-textfield--focused");
    $("#SugDescripcion").closest("div").removeClass("mdc-textfield--focused");

    $("#SugApellido").next().removeClass("mdc-textfield__label--float-above");
    $("#SugNombre").next().removeClass("mdc-textfield__label--float-above");
    $("#SugDescripcion").next().removeClass("mdc-textfield__label--float-above");
}
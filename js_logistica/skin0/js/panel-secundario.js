function mostrarPanelSecundario(container, panelID, titulo, controlador, metodo, item, onCompleteCallBack) {
    if ($(panelID).length > 0) {
        $(panelID).remove();
    }

    var divSecundarioHTML = '';
    divSecundarioHTML += '      <div id="' + panelID.replace("#", "") + '" class="panel-secundario mdc-elevation--z3" data-cargado="false" data-toggle="true">';
    divSecundarioHTML += '        <div class="panel-secundario-header">';
    divSecundarioHTML += '          <h1 class="mdc-typography--headline">' + titulo + '</h1>';

    divSecundarioHTML += '          <button name="btn-ocultar" type="button" class="panel-btn-ocultar tcon tcon-menu--arrow tcon-menu--arrowleft" aria-label="toggle menu" title="Mostrar/Ocultar panel">';
    divSecundarioHTML += '            <span class="tcon-menu__lines" aria-hidden="true"></span>';
    divSecundarioHTML += '            <span class="tcon-visuallyhidden">toggle menu</span>';
    divSecundarioHTML += '          </button>';

    divSecundarioHTML += '        </div>';
    divSecundarioHTML += '        <div class="panel-secundario-body">';
    divSecundarioHTML += '        </div>';
    divSecundarioHTML += '      </div>';

    $(container).append(divSecundarioHTML);

    transformicons.add(panelID + ' button[name="btn-ocultar"]');
    transformicons.toggle(panelID + ' button[name="btn-ocultar"]');

    $(panelID + " .panel-btn-ocultar").on("click", function () {
        panelSecundarioToggle(panelID);
    });

    inicializar_tooltip('.panel-btn-ocultar', 200, 1250, 0);

    $(panelID).css("top", $(".panel-content-header").height() + 26);
    $(panelID).css("height", $(".panel-content-body").height() - $(".panel-content-header").height());
    $(panelID + " .panel-secundario-body").css("height", $(panelID).height() - $(".panel-secundario-header").height());

    // loading gif
    $(panelID + " .panel-secundario-body").append($(".loadingGif:first").clone());

    $(panelID).attr("data-cargado", true);

    // traer el contenido del panel
    $.ajax({
        url: "index.php?r=" + controlador + "/" + metodo,
        data: {
            item: item
        },
        dataType: "HTML",
        type: "POST",
        success: function (formularioDeCarga) {
            $(panelID + " .panel-secundario-body").empty().append(formularioDeCarga);

            // panel visible
            panelSecundarioVisible(panelID);

            // mensajes de ayuda para el usuario
            inicializar_tooltip('.panel-secundario-content .tooltip_carga', 200, 350, 0);
        },
        error: function () {
            // panel visible
            panelSecundarioVisible(panelID);

            var divErrorHTML = '';
            divErrorHTML += '<div class="panel-content-error" style="position:absolute; top:calc(50% - 14px); left:calc(50% - 70px);">';
            divErrorHTML += ' <h2 class="mdc-typography--subheading2" style="color:red;">OCURRIO UN ERROR</h2>';
            divErrorHTML += '</div>';

            $(panelID + " .panel-secundario-body").empty();
            $(panelID + " .panel-secundario-body").append(divErrorHTML);
        },
        complete: function () {
            if (typeof onCompleteCallBack !== 'undefined' && $.isFunction(onCompleteCallBack)) {
                onCompleteCallBack();
            }
        }
    });
}

// hacer que el panel secundario sea visible
function panelSecundarioVisible(panelID) {
    $(panelID).animate({
        right: -($(panelID).width() - 10)
    }, 350);
}

// hacer que el panel secundario este oculto
function panelSecundarioOcultar(panelID) {
    $(panelID).animate({
        right: -50
    }, 200);
}

// toggle entre mostrar y ocultar el panel secundario
function panelSecundarioToggle(panelID) {
    var estado = $(panelID).attr("data-toggle") === "true";
    if (estado) {
        panelSecundarioOcultar(panelID);
    } else {
        panelSecundarioVisible(panelID);
    }

    $(panelID).attr("data-toggle", !estado);
}

// cerrar el panel secundario (sera removido)
function panelSecundarioCerrar(panelID) {
    $(panelID).animate({
        right: 10
    }, 200, "linear", function () {
        $(panelID).remove();
    });
}
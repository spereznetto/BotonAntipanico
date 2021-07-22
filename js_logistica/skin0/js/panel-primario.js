function mostrarPanel(panelID, panelTitulo, panelParent, panelControlador, panelMetodo, panelItem, panelAgregadoAlDOM) {
    // dimenciones del panel
    var left = "0";
    var top = $("#" + panelParent).position().top + "px";
    var width = "100%";
    var height = $("#" + panelParent).height() + "px";

    // html del panel
    var divHTML = '';
    divHTML += '<div id="' + panelID + '">';
    divHTML += '  <div class="panel-shadow" style="top:' + top + '; left:' + left + '; width:' + width + '; height:' + height + ';">';
    divHTML += '    <div name="panel-primario--parent" class="panel-primario-content mdc-elevation--z9">';
    divHTML += '      <div name="panel-primario" class="panel-content-header mdc-elevation--z2">';
    divHTML += '        <h2 class="mdc-typography--headline">' + panelTitulo + '</h2>';
    divHTML += '        <button class="mdc-button panel-btn-close" style="opacity:0;"><i class="material-icons" style="width:24px; height:24px;">close</i></button>';
    divHTML += '      </div>';
    divHTML += '      <div class="panel-content-body">';
    divHTML += '      </div>';
    divHTML += '    </div>';
    divHTML += '  </div>';
    divHTML += '</div>';

    $("#" + panelParent).append(divHTML);

    // luego de agregar el panel y antes de pegarle la info: trigger "pre load event"
    if (typeof panelAgregadoAlDOM == 'function') {
        panelAgregadoAlDOM();
    }

    // loading gif mientras buscamos el contenido
    var loadingGifHTML = '';
    loadingGifHTML += '<div class="loading-panel-principal">';
    loadingGifHTML += ' <svg xmlns="http://www.w3.org/2000/svg" width="60px" height="60px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" class="lds-eclipse">';
    loadingGifHTML += '   <path stroke="none" d="M10 50A40 40 0 0 0 90 50A40 44 0 0 1 10 50" fill="var(--color-acentuado)" transform="rotate(59.6335 50 52)">';
    loadingGifHTML += '     <animateTransform attributeName="transform" type="rotate" calcMode="linear" values="0 50 52;360 50 52" keyTimes="0;1" dur="1s" begin="0s" repeatCount="indefinite"/>';
    loadingGifHTML += '   </path>';
    loadingGifHTML += ' </svg>';
    loadingGifHTML += '</div>';

    $("#" + panelID + " .panel-content-body").append(loadingGifHTML);

    // en caso de que el contenido sea los datos de un item, verificamos que aun exista en la base de datos
    if (panelItem !== "") {
        // validar item
        $.ajax({
            url: "index.php?r=" + panelControlador + "/validar",
            data: {
                item: panelItem
            },
            dataType: "JSON",
            type: "POST",
            success: function (validar_item) {
                if (validar_item.existe) {
                    traerContenido(panelID, panelTitulo, panelParent, panelControlador, panelMetodo, panelItem);
                } else {
                    var divErrorHTML = '';
                    divErrorHTML += '<div class="panel-content-error" style="position:absolute; top:50%; left:50%; transform:translate(-50%, -50%);">';
                    divErrorHTML += ' <h2 class="mdc-typography--subheading2" style="color:red;">EL ITEM QUE BUSCA YA NO EXISTE EN LA BASE DE DATOS</h2>';
                    divErrorHTML += '</div>';

                    $("#" + panelID + " .panel-content-body").empty();
                    $("#" + panelID + " .panel-content-body").append(divErrorHTML);
                }
            },
            error: function () {
                var divErrorHTML = '';
                divErrorHTML += '<div class="panel-content-error" style="position:absolute; top:50%; left:50%; transform:translate(-50%, -50%);">';
                divErrorHTML += ' <h2 class="mdc-typography--subheading2" style="color:red;">OCURRIO UN ERROR</h2>';
                divErrorHTML += '</div>';

                $("#" + panelID + " .panel-content-body").empty();
                $("#" + panelID + " .panel-content-body").append(divErrorHTML);
            },
            complete: function () {
                $("#" + panelID + " .panel-btn-close").on("click", function () {
                    $("#" + panelID).remove();
                }).animate({
                    opacity: 1
                }, 350);
            }
        });
    } else {
        traerContenido(panelID, panelTitulo, panelParent, panelControlador, panelMetodo, panelItem);
    }
}

// buscar el contenido para mostrar en el panel
function traerContenido(panelID, panelTitulo, panelParent, panelControlador, panelMetodo, panelItem) {
    $.ajax({
        url: "index.php?r=" + panelControlador + "/" + panelMetodo,
        data: {
            item: panelItem
        },
        dataType: "HTML",
        type: "POST",
        success: function (formularioDeCarga) {
            $("#" + panelID + " .panel-content-body").empty();
            $("#" + panelID + " .panel-content-body").append(formularioDeCarga);

            // ajustar las dimensiones del panel segun el contenido cargado
            $("#" + panelID + " .panel-primario-content").css("max-height", $(window).height() - $(".panel-primario-content").offset().top - 20);
            $("#" + panelID + " .panel-content-body").css("max-height", $("#" + panelID + " .panel-primario-content").height() - $("#" + panelID + " .panel-content-header").height());
        },
        error: function () {
            var divErrorHTML = '';
            divErrorHTML += '<div class="panel-content-error" style="position:absolute; top:50%; left:50%; transform:translate(-50%, -50%);">';
            divErrorHTML += ' <h2 class="mdc-typography--subheading2" style="color:red;">OCURRIO UN ERROR</h2>';
            divErrorHTML += '</div>';

            $("#" + panelID + " .panel-content-body").empty();
            $("#" + panelID + " .panel-content-body").append(divErrorHTML);
        },
        complete: function () {
            $("#" + panelID + " .panel-btn-close").on("click", function () {
                $("#" + panelID).remove();
            }).animate({
                opacity: 1
            }, 350);
        }
    });
}

// cerrar el panel primario que se recibe por parametro
function cerrarPanel(panel) {
    var parentPanelID = panel;
    $("#" + parentPanelID + " .panel-btn-close").click();
}
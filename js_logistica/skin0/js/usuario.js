function guardarPropiedadCSS(propiedad, valor, successFunction, onErrorCallBack, onCompleteCallBack) {
    var parametros = {};
    parametros.propiedad = propiedad;
    parametros.valor = valor;

    $.ajax({
        url: "index.php?r=skin/setValor",
        data: parametros,
        dataType: "JSON",
        type: "POST",
        success: function (respuesta) {
            if (typeof successFunction !== 'undefined') {
                if ($.isFunction(successFunction)) {
                    successFunction();
                }
            }
        },
        error: function () {
            if (typeof onErrorCallBack !== 'undefined') {
                if ($.isFunction(onErrorCallBack)) {
                    onErrorCallBack();
                }
            }
        },
        complete: function () {
            if (typeof onCompleteCallBack !== 'undefined') {
                if ($.isFunction(onCompleteCallBack)) {
                    onCompleteCallBack();
                }
            }
        }
    });

    return false;
}

function userMapaAgregarItem(mapa, tipo, item, onSuccessCallBack, onErrorCallBack, onCompleteCallBack) {
    $.ajax({
        url: "index.php?r=skin/mapaAgregarItem",
        data: {
            mapa: mapa,
            tipo: tipo,
            item: item
        },
        dataType: "JSON",
        type: "POST",
        success: function (respuesta) {
            if (respuesta.estado === 1) {
                if (typeof onSuccessCallBack !== 'undefined') {
                    if ($.isFunction(onSuccessCallBack)) {
                        onSuccessCallBack();
                    }
                }
            } else if (typeof onErrorCallBack !== 'undefined') {
                if ($.isFunction(onErrorCallBack)) {
                    onErrorCallBack();
                }
            }
        },
        error: function () {
            if (typeof onErrorCallBack !== 'undefined') {
                if ($.isFunction(onErrorCallBack)) {
                    onErrorCallBack();
                }
            }
        },
        complete: function () {
            if (typeof onCompleteCallBack !== 'undefined') {
                if ($.isFunction(onCompleteCallBack)) {
                    onCompleteCallBack();
                }
            }
        }
    });
}

function userMapaQuitarItem(mapa, tipo, item, onSuccessCallBack, onErrorCallBack, onCompleteCallBack, flag_guardar) {
    if (flag_guardar) {
        $.ajax({
            url: "index.php?r=skin/mapaQuitarItem",
            data: {
                mapa: mapa,
                tipo: tipo,
                item: (isNaN(item) ? JSON.parse(item).id : item)
            },
            dataType: "JSON",
            type: "POST",
            success: function (respuesta) {
                if (respuesta.estado === 1) {
                    if (typeof onSuccessCallBack !== 'undefined') {
                        if ($.isFunction(onSuccessCallBack)) {
                            onSuccessCallBack();
                        }
                    }
                }
            },
            error: function () {
                if (typeof onErrorCallBack !== 'undefined') {
                    if ($.isFunction(onErrorCallBack)) {
                        onErrorCallBack();
                    }
                }
            },
            complete: function () {
                if (typeof onCompleteCallBack !== 'undefined') {
                    if ($.isFunction(onCompleteCallBack)) {
                        onCompleteCallBack();
                    }
                }
            }
        });
    } else {
        if (typeof onSuccessCallBack !== 'undefined') {
            if ($.isFunction(onSuccessCallBack)) {
                onSuccessCallBack();
            }
        }
        if (typeof onCompleteCallBack !== 'undefined') {
            if ($.isFunction(onCompleteCallBack)) {
                onCompleteCallBack();
            }
        }
    }
}

function userListadoQuitarItem(modulo, listado, item, onSuccessCallBack, onErrorCallBack, onCompleteCallBack) {
    $.ajax({
        url: "index.php?r=skin/listadoQuitarItem",
        data: {
            modulo: modulo,
            listado: listado,
            item: item
        },
        dataType: "JSON",
        type: "POST",
        success: function (respuesta) {
            if (respuesta.estado === 1) {
                if (typeof onSuccessCallBack !== 'undefined') {
                    if ($.isFunction(onSuccessCallBack)) {
                        onSuccessCallBack();
                    }
                }
            } else if (typeof onErrorCallBack !== 'undefined') {
                if ($.isFunction(onErrorCallBack)) {
                    onErrorCallBack();
                }
            }
        },
        error: function () {
            if (typeof onErrorCallBack !== 'undefined') {
                if ($.isFunction(onErrorCallBack)) {
                    onErrorCallBack();
                }
            }
        },
        complete: function () {
            if (typeof onCompleteCallBack !== 'undefined') {
                if ($.isFunction(onCompleteCallBack)) {
                    onCompleteCallBack();
                }
            }
        }
    });
}

function userListadoReinsertarItem(modulo, listado, item, onSuccessCallBack, onErrorCallBack, onCompleteCallBack) {
    $.ajax({
        url: "index.php?r=skin/listadoReinsertarItem",
        data: {
            modulo: modulo,
            listado: listado,
            item: item
        },
        dataType: "JSON",
        type: "POST",
        success: function (respuesta) {
            if (respuesta.estado === 1) {
                if (typeof onSuccessCallBack !== 'undefined') {
                    if ($.isFunction(onSuccessCallBack)) {
                        onSuccessCallBack();
                    }
                }
            } else if (typeof onErrorCallBack !== 'undefined') {
                if ($.isFunction(onErrorCallBack)) {
                    onErrorCallBack();
                }
            }
        },
        error: function () {
            if (typeof onErrorCallBack !== 'undefined') {
                if ($.isFunction(onErrorCallBack)) {
                    onErrorCallBack();
                }
            }
        },
        complete: function () {
            if (typeof onCompleteCallBack !== 'undefined') {
                if ($.isFunction(onCompleteCallBack)) {
                    onCompleteCallBack();
                }
            }
        }
    });
}
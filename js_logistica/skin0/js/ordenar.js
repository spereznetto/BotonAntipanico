/* ----------------------------------- */
/* FUNCIONES PARA ORDENAR LOS LISTADOS */
/* ----------------------------------- */

// contiene los menu para ordenar los listados
var menuOrdenarArray = {};

function inicializar_ordenar() {
    // inicializar el menu de mdc 
    $.each($('div[name="menu-ordenar-listado"]'), function (index, menu) {
        var listado = $(menu).attr("data-listado");
        menuOrdenarArray[listado] = {
            menu: new mdc.menu.MDCSimpleMenu(menu),
            ordenado_columna: "",
            ordenado_direccion: true
        };

        // escuchar opcion elegida para ordenar
        menuOrdenarArray[listado].menu.listen('MDCSimpleMenu:selected', function (option) {
            var target_menu = $(option.target);
            // guardamos de que tipo de items es el listado
            var listado_de = target_menu.attr("data-listado");
            // recordamos el id del listado
            var listado_id = 'listado-' + listado_de;
            // obtenemos el item del menu de ordenar
            var item = $(option.detail.item).attr("data-index");
            // obtenemos el sub selector por si el item para ordenar esta contenido en un tag interior de la columna seleccionada
            var sub_selector = $(option.detail.item).attr("data-sub-selector");
            // obtenemos los items del listado que seran ordenados
            var items = $('#' + listado_id + ' > li').get();

            // si ya estaba ordenado por la opcion elegida
            if (menuOrdenarArray[listado_de].ordenado_columna === item) {
                // invertimos el orden
                menuOrdenarArray[listado_de].ordenado_direccion = !menuOrdenarArray[listado_de].ordenado_direccion;
            } else {
                // si no estaba ordenado por la opcion elegida, lo ordenamos ascendente (true)
                menuOrdenarArray[listado_de].ordenado_direccion = true;
            }

            // ordenamos segun la eleccion del usuario
            switch (item) {
                case "columna_0":
                    sort_columna_0(items, menuOrdenarArray[listado_de].ordenado_direccion, sub_selector);
                    break;
                case "columna_1":
                    sort_columna_1(items, menuOrdenarArray[listado_de].ordenado_direccion, sub_selector);
                    break;
                case "columna_2":
                    sort_columna_2(items, menuOrdenarArray[listado_de].ordenado_direccion, sub_selector);
                    break;
                case "custom":
                    sort_custom(
                        items,
                        menuOrdenarArray[listado_de].ordenado_direccion,
                        $(option.detail.item).attr("data-selector"),
                        $(option.detail.item).attr("data-ordenar-por"));
                    break;
                default:
                    break;
            }

            // ordenar el listado
            var listado = $('#' + listado_id);
            $.each(items, function (i, li) {
                listado.append(li);
            });

            // recordar la columna por la que esta actualmente ordenado
            menuOrdenarArray[listado_de].ordenado_columna = item;
        });
    });

    // escuchar mostrar/ocultar un menu
    $('.filtros-btn-ordenar').on("click", function () {
        var listado = $(this).attr("data-listado");
        menuOrdenarArray[listado].menu.open = !menuOrdenarArray[listado].menu.open;
    });
}

// ordenar listado por la columna 0
function sort_columna_0(items, direccion, sub_selector) {
    items.sort(function (a, b) {
        var keyA = $(a).find('div[name="valor_0"] ' + sub_selector).text();
        var keyB = $(b).find('div[name="valor_0"] ' + sub_selector).text();

        if (direccion) {
            if (keyA < keyB) return -1;
            if (keyA > keyB) return 1;
        } else {
            if (keyA > keyB) return -1;
            if (keyA < keyB) return 1;
        }

        return 0;
    });
}

// ordenar listado por la columna 1
function sort_columna_1(items, direccion, sub_selector) {
    items.sort(function (a, b) {
        var keyA = $(a).find('div[name="valor_1"] ' + sub_selector).text();
        var keyB = $(b).find('div[name="valor_1"] ' + sub_selector).text();

        if (direccion) {
            if (keyA < keyB) return -1;
            if (keyA > keyB) return 1;
        } else {
            if (keyA > keyB) return -1;
            if (keyA < keyB) return 1;
        }

        return 0;
    });
}

// ordenar listado por la columna 2
function sort_columna_2(items, direccion, sub_selector) {
    items.sort(function (a, b) {
        var keyA = $(a).find('div[name="valor_2"] ' + sub_selector).text();
        var keyB = $(b).find('div[name="valor_2"] ' + sub_selector).text();

        if (direccion) {
            if (keyA < keyB) return -1;
            if (keyA > keyB) return 1;
        } else {
            if (keyA > keyB) return -1;
            if (keyA < keyB) return 1;
        }

        return 0;
    });
}

// ordenar listado por un selector custom
function sort_custom(items, direccion, selector, ordenar_por) {
    items.sort(function (a, b) {
        var keyA, keyB;
        switch (ordenar_por) {
            case "clase":
                keyA = $(a).find(selector)[0].className;
                keyB = $(b).find(selector)[0].className;
                break;
            case "texto":
                keyA = $(a).find(selector)[0].textContent;
                keyB = $(b).find(selector)[0].textContent;
                break;
        }

        if (direccion) {
            if (keyA < keyB) return -1;
            if (keyA > keyB) return 1;
        } else {
            if (keyA > keyB) return -1;
            if (keyA < keyB) return 1;
        }

        return 0;
    });
}

/* /FUNCIONES PARA ORDENAR LOS LISTADOS */
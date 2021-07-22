function inicializar_menu() {
    var menuIconos = document.querySelectorAll('.mdc-icon-toggle');
    for (var i = 0, node; node = menuIconos[i]; i++) {
        mdc.iconToggle.MDCIconToggle.attachTo(node);
    }

    var menu = new mdc.menu.MDCSimpleMenu(document.querySelector('.mdc-simple-menu'));
    document.querySelector('#menu-derecho-button').addEventListener('click', () => menu.open = !menu.open);

    menu.listen('MDCSimpleMenu:selected', function (opcion) {
        var item = $(opcion.detail.item).attr("data-index");
        switch (item) {
            case "manual":
                menu_manual();
                break;
            case "skin":
                menu_skin();
                break;
            case "sugerencia":
                menu_sugerencia();
                break;
            case "ticket":
                menu_ticket();
                break;
            case "salir":
                menu_salir();
                break;
            default:
                break;
        }
    });
}

function menu_ticket() {
    PopupCenter("https://gps.divisiongps.com.ar/tickets/user/index.php?id=" + usuario, "", 900, 600);
}

function menu_manual() {
    window.location.href = "index.php?r=flota/descargarManual";
}

function menu_salir() {
    window.location.href = "index.php?r=web/logout";
}

function menu_sugerencia() {
    dialogSugerencia.show();
}

function menu_skin() {
    clearSkinDialog();
    skinDialog.show();
}

function PopupCenter(url, title, w, h) {
    var dualScreenLeft = window.screenLeft != undefined ? window.screenLeft : screen.left;
    var dualScreenTop = window.screenTop != undefined ? window.screenTop : screen.top;

    var width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
    var height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;

    var left = ((width / 2) - (w / 2)) + dualScreenLeft;
    var top = ((height / 2) - (h / 2)) + dualScreenTop;
    var newWindow = window.open(url, title, 'scrollbars=yes, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);

    if (window.focus) {
        newWindow.focus();
    }
}
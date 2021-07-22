function inicializar_checkbox() {
    $('body').on("click", 'label[name="label-para-mdc-checkbox-trigger-click"]', function () {
        var label = $(this);
        var checkbox;

        if (label.attr('target-name')) {
            // si tiene un target entonces el label activa el target           
            checkbox = label.prev('input[name="' + label.attr('target-name') + '"]');
        } else {
            // si no tiene un target, usamos el target por default
            checkbox = label.prev('div.mdc-checkbox').find('input[type="checkbox"]');
        }

        if (checkbox) {
            checkbox.click();
        }
    });
}
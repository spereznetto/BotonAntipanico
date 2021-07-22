<style>
    .form-group {
        color: #fff;
    }
    .btn-restablecer {
        background-color: #fae100;
        font-weight: 700;
        width: 100%;
        border: 0px;
    }
</style>
<?php
if (!empty($error)) {
    ?>
    <div class="container">
        <div class="row">
            <div class=" col-lg-4 col-md-4 col-sm-2 col-xs-0">

            </div>
            <div class=" col-lg-4 col-md-4 col-sm-8 col-xs-12" style="padding-top: 10vh; text-align: center">
                <span class="glyphicon glyphicon-exclamation-sign" style="color: #fff; font-size: 40px"></span>
                <br>
                <h4 style="color:#fff"><?= $error ?></h4>
            </div>
            <div class=" col-lg-4 col-md-4 col-sm-2 col-xs-0">

            </div>
        </div>
    </div>
    <?php
} else {
    ?>
    <div class="container">
        <div class="row">
            <div class=" col-lg-4 col-md-4 col-sm-2 col-xs-0">

            </div>
            <div class=" col-lg-4 col-md-4 col-sm-8 col-xs-12">
                <div class="form-group">
                    <label for="exampleInputPassword1">Nueva Contraseña</label>
                    <input type="password" class="form-control" id="password" name="password">
                </div>
                <div class="form-group">
                    <label for="exampleInputFile">Reingrese su nueva Contraseña</label>
                    <input type="password" class="form-control" id="password2" name="password2">
                </div>
                <div class="form-group">
                    <input type="hidden" name="user" id="user" value="<?= $user ?>" style="color: #000" />
                    <input type="hidden" name="servicio" id="servicio" value="<?= $servicio ?>" style="color: #000" />
                    <button type="button" class="btn btn-default btn-restablecer">Restablecer</button>
                </div>

            </div>
            <div class=" col-lg-4 col-md-4 col-sm-2 col-xs-0">

            </div>
        </div>
    </div>
    <?php
}
?>
<script src="js/MD5-Hash-String/jquery.md5.min.js"></script>
<script>
    $('.btn-restablecer').click(function () {
        var pass1 = $('#password').val();
        var pass2 = $('#password2').val();
        var servicio = $('#servicio').val();
        var user = $('#user').val();
        if (pass1 == '' || pass2 == '') {
            alert("DEBE COMPLETAR LOS CAMPOS");
            return false;
        }
        if (pass1 != pass2) {
            alert("LAS CONTRASEÑAS NO COINCIDEN");
            return false;
        }
        pass1 = $.MD5(pass1);
        var data = {"user": user, "servicio": servicio, "password": pass1};
        $.ajax({
            url: 'index.php?r=api/modificarPassword',
            type: 'POST',
            data: JSON.stringify(data),
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            success: function (respuesta) {
                if (respuesta.estado != 1) {
                    alert(respuesta.mensaje.informacion);
                } else {
                    //alert("CONTRASEÑA RESTABLECIDA CORRECTAMENTE");
                    window.location = 'index.php?r=web/recuperarPasswordMobileOk';
                }
            },
            error: function (p1, p2, p3) {
                if (p1 && p1.responseJSON && p1.responseJSON.info) {
                    alert(p1.responseJSON.info)
                } else {
                    alert("ERROR DE COMUNICACION");
                }
            },
        });
    });
</script>

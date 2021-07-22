<?php
echo 'Usuario suspendido, no es posible ingresar.<br>';
echo '<a href="index.php?r=web/login">Volver al login</a>';
Yii::app()->user->logout();
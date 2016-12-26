<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.0-rc.2/jquery-ui.css" />
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.0.0-rc1/jquery.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.0-rc.2/jquery-ui.js"></script>

<link type="text/css" rel="stylesheet" href="<?php echo CSS_USERS_PATH ?>users.css">

<div class="recovery">
    <form id="recovery_password" name="recovery_password" class="form_recovery_password">
        <h2 class="form-contact-heading">¿Has olvidado la contraseña?</h2><br>
        <br>

        <h3>Por favor introduce tu nueva contraseña</h3>
        <input type="password" id="password" name="password" class="email">

        <button type="button" name="request" id="request" value="Actualizar">ACTUALIZAR</button>
    </form>
</div>

<div class="message">
  <h3>Su nueva contraseña ha sido guardada correctamente</h3>
</div>

<script type="text/javascript" src="<?php echo JS_USERS_PATH ?>request_password.js" ></script>

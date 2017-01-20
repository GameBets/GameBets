<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.0-rc.2/jquery-ui.css" />
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.0.0-rc1/jquery.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.0-rc.2/jquery-ui.js"></script>

<link type="text/css" rel="stylesheet" href="<?php echo CSS_USERS_PATH ?>users.css">

<div class="recovery">
    <form id="recovery_password" name="recovery_password" class="form_recovery_password">
        <h2 class="form-contact-heading">¿Has olvidado la contraseña?</h2><br>
        <br>

        <h3>Por favor introduce tu email</h3>
        <input type="email" id="email" name="email" class="email">

        <button type="button" name="recovery" id="recovery" value="Enviar">ENVIAR</button>
    </form>
</div>

<div class="message">
  <h3>En breve recibirás un correo con un enlace para cambiar tu contraseña</h3>
</div>

<script type="text/javascript" src="<?php echo JS_USERS_PATH ?>recovery_password.js" ></script>

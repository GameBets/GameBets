<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.0-rc.2/jquery-ui.css" />
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.0.0-rc1/jquery.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.0-rc.2/jquery-ui.js"></script>

<link rel="stylesheet" href="<?php echo CSS_USERS_PATH ?>users.css" type="text/css">
  <div class="signin_modal">
    <form class="signin" name="signin" id="signin">
      <h2 id="title" style="text-align: center;">LOGIN</h2>
      <br>
      <h3 style="font-weight: bold;">Email</h3>
      <input type='email' id='email' name='email' autocomplete='off'>

      <h3 style="font-weight: bold;">Password</h3>
      <input type='password' id='password' name='password'>

      <div class="align_right">
        <button type='button' id='login' name='login'>SIGN IN</button>
      </div>
    </form>

    <div class="vertical_separator"></div>

    <div class="social_signin">
      <a href="#"><div id="facebook"><h3>Facebook</h3></div></a>
      <a href="#"><div id="twitter"><h3>Twitter</h3></div></a>
      <a href="#"><div id="google-plus"><h3>Google+</h3></div></a>
    </div>

    <div class="contact_signin">
      <p>¿Aun no te has registrado? <a href="<?php amigable('?module=users&function=signup'); ?>" id="linkReg">Regístrate ahora</a></p>
      <p>¿Has olvidado tu contraseña? <a href="https://projects-alumnes-yomogan.c9users.io/proj_final_login/JoinElderly/user/recuperar/" id="linkRest">Recupéra tu contraseña</a></p>
    </div>
  </div>
<script type="text/javascript" src="<?php echo JS_USERS_PATH ?>facebook.js" ></script>
<script type="text/javascript" src="<?php echo JS_USERS_PATH ?>signin.js" ></script>

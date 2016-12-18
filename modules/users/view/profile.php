<!-- JQUERY datepicker -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.0-rc.2/jquery-ui.css" />
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.0.0-rc1/jquery.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.0-rc.2/jquery-ui.js"></script>
<!-- JQUERY dropzone -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.form/3.51/jquery.form.js"></script>
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/dropzone/4.0.1/min/dropzone.min.js"></script>
<link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/dropzone/4.0.1/dropzone.css">
<link rel="stylesheet" href="<?php echo CSS_USERS_PATH ?>profile.css" type="text/css">
<script type="text/javascript" src="<?php echo JS_USERS_PATH ?>profile.js" ></script>

<form name="form_users" id="form_users">
<div id="left">
  <section>
    <h3>Correo electronico</h3>
    <input type="email" name="email" id="email" value="">
  </section>

  <section>
    <h3>Contraseña</h3>
    <input type="password" name="password" id="password" value="">
  </section>

  <section>
    <h3>Repetir contraseña</h3>
    <input type="password" name="repeat_password" id="repeat_password" value="">
  </section>

  <section>
    <h3>Telefono</h3>
    <input type="text" name="phone" id="phone" value="">
  </section>
</div>

<div id="mid">
  <section>
    <h3>Nombre de usuario</h3>
    <input type="text" name="name_user" id="name_user" value="">
  </section>

  <section>
    <h3>Avatar</h3>
    <div id="progress">
        <div id="bar"></div>
        <div id="percent">0%</div >
    </div>
    <div class="msg"></div>
    <div id="dropzone" class="dropzone"></div>
  </section>
</br>
  <button type="button" class="submit" name="submit_users" id="submit_users" value="Confirmar">Confirmar</button>


</div>

<div id="right">
  <section>
    <h3>Nombre</h3>
    <input type="text" name="name" id="name" value="">
  </section>

  <section>
    <h3>Apellidos</h3>
    <input type="text" name="surname" id="surname" value="">
  </section>

  <section>
    <h3>Fecha de nacimiento</h3>
    <input type="text" name="date_birthday" id="date_birthday" value="">
  </section>

  <section>
    <h3>Pais</h3>
    <select name="pais" id="pais"></select>
  </section>

  <section>
    <h3>Provincia</h3>
    <select name="provincia" id="provincia"></select>
  </section>

  <section>
    <h3>Población</h3>
    <select name="ciudad" id="ciudad"></select>
  </section>
</br>
</div>
	<!-- Submit -->
	</form>

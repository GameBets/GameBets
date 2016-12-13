<br /> <br />
<!--- Lateral Izquierdo --->
<form id="profile_form" name="profile_form" class="form-perfil">
    <br />
    <div id="contenido" class="row">
        <div class="izq">
            <div class="control-group">
                <label class="nombre pefil">Nombre:</label>
                <p>
                    <input type="text" id="name" name="name" placeholder="Nombre" class="form-control" dir="auto" maxlength="100">
                </p>
            </div>
            <div class="control-group">
                <label class="pefil">Apellidos:</label>
                <p>
                    <input type="text" id="surname" name="surname" placeholder="Apellidos" class="form-control" dir="auto" maxlength="100">
                </p>
            </div>
            <div class="control-group">
                <label class="pefil">Fecha de Nacimiento:</label>
                <p>
                    <input type="text" id="date_birthday" name="date_birthday" class="form-control" dir="auto" maxlength="100">
                </p>
            </div>
            <div class="control-group">
                <label class="pefil">Contraseña:</label>
                <p>
                    <input type="password" id="password" name="password" placeholder="Contraseña" class="form-control" dir="auto" maxlength="100">
                </p>
            </div>

            <div class="control-group">
                <label class="pefil">Repeat Password</label>
                <p>
                    <input type="text" id="repeat_password" name="repeat_password" class="form-control" dir="auto" maxlength="100">
                </p>
            </div>

        </div>
        <!--- Centro --->
        <div class="center">
            <br>
            <h1 class="form-profile-heading" id="name_user">UserName</h1>
            <img id="avatar_user" src="" />

            <span id="e_avatar" class="styerror" style="color:#FF0000"></span>
            <div id="progress">
                <div id="bar"></div>
                <div id="percent"></div >
            </div>
            <div class="msg"></div>
            <br/>
            <div id="dropzone" class="dropzone"></div>

            <br />
            <p>
                <input class="submit_user" type="button" name="submit" id="submitBtn_user" value="Guardar" />
            </p>
        </div>
        <!--- Lateral Derecho --->
        <div class=" der">
            <label class="email pefil">Email:</label>
            <p>
                <input type="text" id="email" name="email" placeholder="Email" class="form-control" maxlength="100">
            </p>
            <label class="pefil">Telephone:</label>
            <p>
                <input type="text" id="phone" name="phone" placeholder="Phone" class="form-control" dir="auto" maxlength="100">
            </p>
            <div class="control-group">
                <label class="pefil">Pais:</label>
                <p>
                    <select id="country" name="country"></select>

                </p>
            </div>
            <div class="control-group">
                <label class="pefil">Provincia:</label>
                <p>
                    <select id="province" name="province"></select>

                </p>
            </div>
            <div class="control-group">
                <label class="pefil">Poblacion:</label>
                <p>
                    <select id="town" name="town"></select>
                </p>
            </div>
        </div>
    </div>
</form>
<script src="<?php echo JS_USERS_PATH . "profile.js" ?>"></script>
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/dropzone/4.0.1/min/dropzone.min.js"></script>
<link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/dropzone/4.0.1/dropzone.css" />

<link rel="stylesheet" href="<?php echo JS_CHAT_PATH ?>jScrollPane/jScrollPane.css" >
<link rel="stylesheet" href="<?php echo CSS_CHAT_PATH ?>page.css">
<link rel="stylesheet" href="<?php echo CSS_CHAT_PATH ?>chat.css">
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
<script src="<?php echo JS_CHAT_PATH ?>jScrollPane/jquery.mousewheel.js"></script>
<script src="<?php echo JS_CHAT_PATH ?>jScrollPane/jScrollPane.min.js"></script>
<script src="<?php echo JS_CHAT_PATH ?>script.js"></script>

<div id="chatContainer">

    <div id="chatTopBar" class="rounded"></div>
    <div id="chatLineHolder"></div>

    <div id="chatUsers" class="rounded"></div>
    <div id="chatBottomBar" class="rounded">
    	<div class="tip"></div>

        <form id="loginForm" method="post" action="">
            <input id="name" name="name" class="rounded" maxlength="16" />
            <input id="email" name="email" class="rounded" />
            <input type="submit" class="blueButton" value="Login" />
        </form>

        <form id="submitForm" method="post" action="">
            <input id="chatText" name="chatText" class="rounded" maxlength="255" />
            <input type="submit" class="blueButton" value="Submit" />
        </form>

    </div>

</div>

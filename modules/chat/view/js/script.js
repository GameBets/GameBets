$(document).ready(function() {

    // Run the init method on document ready:
    // chat.init();
    chat.checkLogin();
    $('#enviarmsg').click(function() {
        chat.sendMessage();
    });
    $("#chatText").keypress(function(e) {
        if (e.which == 13) {
          e.preventDefault();
            chat.sendMessage();
        }
    });
});

var chat = {
    // data holds variables for use in the class:

    data: {
        lastID: 0,
        noActivity: 0,
        lastIDmsg1: 0,
        lastIDmsg2: 0,
        usersonline:[],
        nonline:0
    },

    // The login method hides displays the
    // user's login data and shows the submit form

    login: function(name, gravatar) {

        chat.data.name = name;
        chat.data.gravatar = gravatar;
        console.log(chat.data);
        $('#chatTopBar').html(chat.render('loginTopBar', chat.data));

        $('#loginForm').fadeOut(function() {
            $('#submitForm').fadeIn();
            $('#chatText').focus();
        });

    },

    // The addChatLine method ads a chat entry to the page

    addChatLine: function(params) {
        // All times are displayed in the user's timezone
        // console.log(params);
        var d = new Date();
        //El numero 4 es el tiempo transformado a la hora actual pasado por php
        // Viene dado en un objeto que tiene horas y minutos
        if (params[4]) {
            // PHP returns the time in UTC (GMT). We use it to feed the date
            // object and later output it in the user's timezone. JavaScript
            // internally converts it for us.

            d.setUTCHours(params[4].hours, params[4].minutes);
        }

        params[4] = (d.getHours() < 10 ? '0' : '') + d.getHours() + ':' +
            (d.getMinutes() < 10 ? '0' : '') + d.getMinutes();
        //
        var markup = chat.render('chatLine', params),
            //params[0] es el id de la linea del chat
            exists = $('#chatLineHolder .chat-' + params[0]);

        // If this isn't a temporary chat:
        if (params[0].toString().charAt(0) != 't') {
            var previous = $('#chatLineHolder .chat-' + (+params[0] - 1));
            if (previous.length) {
                previous.after(markup);
            } else chat.data.jspAPI.getContentPane().append(markup);
        } else chat.data.jspAPI.getContentPane().append(markup);

        // As we added new content, we need to
        // reinitialise the jScrollPane plugin:

        chat.data.jspAPI.reinitialise();
        chat.data.jspAPI.scrollToBottom(true);

    },
    //Esto es en el caso en el que el usuario ha escrito algo nuevo
    agregarlineanueva: function(parametros) {
        // All times are displayed in the user's timezone

        var d = new Date();

        parametros.time = (d.getHours() < 10 ? '0' : '') + d.getHours() + ':' +
            (d.getMinutes() < 10 ? '0' : '') + d.getMinutes();

        var markup = chat.render('chatLine2', parametros),
            exists = $('#chatLineHolder .chat-' + parametros.id);
        //////////////////////////////
        console.log(chat.data.lastIDmsg2);

        chat.data.lastIDmsg2 = parseInt(chat.data.lastIDmsg2) + 1;
        console.log(chat.data.lastIDmsg2);
        //////////////////////////////
        if (exists.length) {
            exists.remove();
        }

        if (!chat.data.lastID) {
            // If this is the first chat, remove the
            // paragraph saying there aren't any:

            $('#chatLineHolder p').remove();
        }

        // If this isn't a temporary chat:
        if (parametros.id.toString().charAt(0) != 't') {
            var previous = $('#chatLineHolder .chat-' + (+parametros.id - 1));
            if (previous.length) {
                previous.after(markup);
            } else chat.data.jspAPI.getContentPane().append(markup);
        } else chat.data.jspAPI.getContentPane().append(markup);

        // As we added new content, we need to
        // reinitialise the jScrollPane plugin:

        chat.data.jspAPI.reinitialise();
        chat.data.jspAPI.scrollToBottom(true);

    },

    // This method requests the latest chats
    // (since lastID), and adds them to the page.

    getChats: function(callback) {
        $.ajax({
            url: amigable("?module=chat&function=getChats"),
            success: function(result) {
                // console.log(result);
                var json = JSON.parse(result);
                var array = [];
                var chats = [];
                // console.log(json);
                // console.log(json.chats.author.length);
                for (var i = 0; i < json.chats.author.length; i++) {
                    // console.log(".chat chat-"+json.chats.id[i]+" rounded");
                    array = [];
                    // console.log("id n1");
                    // console.log(chat.data.lastIDmsg1);
                    // console.log("id n2");
                    // console.log(chat.data.lastIDmsg2);
                    // console.log("id nchat");
                    // console.log(json.chats.id[i]);
                    if (json.chats.id[i] > chat.data.lastIDmsg2) {
                        array.push(json.chats.id[i]);
                        array.push(json.chats.author[i]);
                        array.push(json.chats.gravatar[i]);
                        array.push(json.chats.text[i]);
                        array.push(json.chats.time[i]);
                        array.push(json.chats.ts[i]);
                        chat.addChatLine(array);
                    }

                    // console.log(json.chats.id[i]);
                    chat.data.lastIDmsg1 = json.chats.id[i];
                }
                chat.data.lastIDmsg2 = chat.data.lastIDmsg1;
                // console.log(chat.data.lastIDmsg2);
                // console.log($('#chatLineHolder').last());

                if (!json.chats) {
                    chat.data.jspAPI.getContentPane().html('<p class="noChats">No chats yet</p>');
                }
                // function(){$('.chat').remove(); callback;}
                setTimeout(callback, 20000);
            }
        });
    },

    // Requesting a list with all the users.

    getUsers: function(callback) {
        $.ajax({
            url: amigable("?module=chat&function=getUsers"),
            success: function(result) {
                // console.log(data);
                var json = JSON.parse(result);
                var array = [];
                // console.log(json.users);
                var usuaris = [];
                for (var i = 0; i < json.users.name.length; i++) {
                    var j = 0;
                    // usuaris = [];
                    if (json.users.name[i]) {
                        // console.log(usuaris);
                        usuaris[j] = json.users.name[i];
                        // console.log(json.users.name[i]);
                        j++;
                        usuaris[j] = json.users.gravatar[i];
                        usuaris.push(chat.render('user', usuaris));
                    }
                }

                var message = '';
                if (json.total[0].cnt < 1) {
                    message = 'No one is online';
                } else {
                    message = json.total[0].cnt + ' ' + (json.total[0].cnt == 1 ? 'person' : 'people') + ' online';
                }
                //
                usuaris.splice(0,2);
                usuaris.push('<p class="count">'+message+'</p>');

                $('#chatUsers').html(usuaris.join(''));
                // $('#chatUsers').append('<p class="count">' + message + '</p>');
                setTimeout(callback, 15000);
            }
        });
    },

    // The render method generates the HTML markup
    // that is needed by the other methods:

    render: function(template, params) {

        var arr = [];
        switch (template) {
            case 'loginTopBar':
                // console.log(params);
                arr = [
                    '<span><img src="', params.gravatar, '" width="23" height="23" />',
                    '<span class="name">', params.name
                ];
                break;

            case 'chatLine':
                arr = [
                    '<div class="chat chat-', params[0], ' rounded" id="', params[0], '"><span class="gravatar"><img src="', params[2],
                    '" width="23" height="23" onload="this.style.visibility=\'visible\'" />', '</span><span class="author">', params[1],
                    ':</span><span class="text">', params[3], '</span><span class="time">', params[4], '</span></div>'
                ];
                $('#chatLineHolder').append(arr.join(''));
                break;

            case 'user':
                // console.log(params);
                arr = [
                    '<div class="user" title="', params[0], '"><img src="',
                    params[1], '" width="30" height="30" onload="this.style.visibility=\'visible\'" /></div>'
                ];
                $('#chatUsers').append(arr.join(''));
                break;
            case 'chatLine2':
                arr = [
                    '<div class="chat chat-', params.id, ' rounded"><span class="gravatar"><img src="', params.gravatar,
                    '" width="23" height="23" onload="this.style.visibility=\'visible\'" />', '</span><span class="author">', params.author,
                    ':</span><span class="text">', params.text, '</span><span class="time">', params.time, '</span></div>'
                ];
                break;
        }

        // A single array join is faster than
        // multiple concatenations

        return arr.join('');

    },

    checkLogin: function() {
        // var user = Tools.createCookie("user", "angel", 10);
        var user = Tools.readCookie("user");
        chat.init_jspAPI();
        if (user) {
            user = user.split("|");
            // console.log(user);

            $.post(amigable("?module=chat&function=checkLogged"), {
                'user': user[1]
            }, function(data, status) {
                // console.log(data);
                var json = JSON.parse(data);
                // console.log(json);
                var logged = json.logged;
                if (json.logged) {
                    var user = json.loggedAs.name;
                    var gravatar = json.loggedAs.gravatar;
                    // console.log(gravatar);
                    //pintarchat?
                    // InitChat(user,gravatar);

                    chat.login(user, gravatar);
                    chat.getUsers();
                    // chat.getChats();
                } else {
                    //pintar vista error o redirigir a sign up
                    window.location.href = json.redirect;
                }


            }).fail(function(xhr) {
                // console.log("holahola");
                $("#chatContainer").load(amigable("?module=chat&function=view_error_true"), {
                    'view_error': true
                });
            });
        }

        // Self executing timeout functions

        (function getChatsTimeoutFunction() {
            chat.getChats(getChatsTimeoutFunction);
        })();

        (function getUsersTimeoutFunction() {
            chat.getUsers(getUsersTimeoutFunction);
        })();
    },

    init_jspAPI: function() {

        chat.data.jspAPI = $('#chatLineHolder').jScrollPane({
            verticalDragMinHeight: 12,
            verticalDragMaxHeight: 12
        }).data('jsp');
    },

    sendMessage: function() {

        var text = $('#chatText').val();

        // Assigning a temporary ID to the chat:
        var tempID = 't' + Math.round(Math.random() * 1000000),
            parametros = {
                id: tempID,
                author: chat.data.name,
                gravatar: chat.data.gravatar,
                text: text.replace(/</g, '&lt;').replace(/>/g, '&gt;')
            };

        var user = Tools.readCookie("user");

        console.log(parametros);
        if (user) {
            user = user.split("|");
            if ($('#chatText').val() != "") {
                // console.log("holaa324");

                $.post(amigable("?module=chat&function=submitMessage"), {
                    'user': user[1],
                    'text': $('#chatText').val()
                }, function(data, status) {
                    if (status == "success") {
                        // Using our addChatLine method to add the chat
                        // to the screen immediately, without waiting for
                        // the AJAX request to complete:

                        chat.agregarlineanueva($.extend({}, parametros));
                        $('#chatText').val("");
                    }
                }).fail(function(xhr) {
                    console.log(xhr);
                    $("#chatContainer").load(amigable("?module=chat&function=view_error_true"), {
                        'view_error': true
                    });
                });
            } //fi if valor input
        }
    }
};

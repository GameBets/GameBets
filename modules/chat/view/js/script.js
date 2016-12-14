$(document).ready(function() {

    // Run the init method on document ready:
    // chat.init();
    checkLogin();
});

var chat = {
    // data holds variables for use in the class:

    data: {
        lastID: 0,
        noActivity: 0
    },

    // Init binds event listeners and sets up timers:

    init: function() {

        // Using the defaultText jQuery plugin, included at the bottom:
        // $('#name').defaultText('Nickname');
        // $('#email').defaultText('Email (Gravatars are Enabled)');
        // console.log("hola");
        // Converting the #chatLineHolder div into a jScrollPane,
        // and saving the plugin's API in chat.data:

        chat.data.jspAPI = $('#chatLineHolder').jScrollPane({
            verticalDragMinHeight: 12,
            verticalDragMaxHeight: 12
        }).data('jsp');

        // We use the working variable to prevent
        // multiple form submissions:

        var working = false;

        // Logging a person in the chat:
        //
        // $('#loginForm').submit(function() {

        if (working) return false;
        working = true;

        // Using our tzPOST wrapper function
        // (defined in the bottom):
        console.log($(this).serialize());
        $.post("../../chat/login/", $(this).serialize(), function(data) {
            // $.tzPOST('login', $(this).serialize(), function(r) {
            working = false;

            if (data.error) {
                chat.displayError(data.error);
            } else chat.login(data.name, data.gravatar);
        });
        //
        //     return false;
        // });

        // Submitting a new chat entry:

        $('#submitForm').submit(function() {

            var text = $('#chatText').val();

            if (text.length == 0) {
                return false;
            }

            if (working) return false;
            working = true;

            // Assigning a temporary ID to the chat:
            var tempID = 't' + Math.round(Math.random() * 1000000),
                params = {
                    id: tempID,
                    author: chat.data.name,
                    gravatar: chat.data.gravatar,
                    text: text.replace(/</g, '&lt;').replace(/>/g, '&gt;')
                };

            // Using our addChatLine method to add the chat
            // to the screen immediately, without waiting for
            // the AJAX request to complete:

            chat.addChatLine($.extend({}, params));

            // Using our tzPOST wrapper method to send the chat
            // via a POST AJAX request:

            $.tzPOST('submitChat', $(this).serialize(), function(r) {
                working = false;

                $('#chatText').val('');
                $('div.chat-' + tempID).remove();

                params['id'] = r.insertID;
                chat.addChatLine($.extend({}, params));
            });

            return false;
        });

        // Logging the user out:

        $('a.logoutButton').live('click', function() {

            $('#chatTopBar > span').fadeOut(function() {
                $(this).remove();
            });

            $('#submitForm').fadeOut(function() {
                $('#loginForm').fadeIn();
            });

            $.tzPOST('logout');

            return false;
        });

        // Checking whether the user is already logged (browser refresh)

        $.tzGET('checkLogged', function(r) {
            if (r.logged) {
                chat.login(r.loggedAs.name, r.loggedAs.gravatar);
            }
        });

        // Self executing timeout functions

        (function getChatsTimeoutFunction() {
            chat.getChats(getChatsTimeoutFunction);
        })();

        (function getUsersTimeoutFunction() {
            chat.getUsers(getUsersTimeoutFunction);
        })();

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

        var d = new Date();
        if (params.time) {

            // PHP returns the time in UTC (GMT). We use it to feed the date
            // object and later output it in the user's timezone. JavaScript
            // internally converts it for us.

            d.setUTCHours(params.time.hours, params.time.minutes);
        }

        params.time = (d.getHours() < 10 ? '0' : '') + d.getHours() + ':' +
            (d.getMinutes() < 10 ? '0' : '') + d.getMinutes();

        var markup = chat.render('chatLine', params),
            exists = $('#chatLineHolder .chat-' + params.id);

        if (exists.length) {
            exists.remove();
        }

        if (!chat.data.lastID) {
            // If this is the first chat, remove the
            // paragraph saying there aren't any:

            $('#chatLineHolder p').remove();
        }

        // If this isn't a temporary chat:
        if (params.id.toString().charAt(0) != 't') {
            var previous = $('#chatLineHolder .chat-' + (+params.id - 1));
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

        $.tzGET('getChats', {lastID: chat.data.lastID}, function(r) {

            for (var i = 0; i < r.chats.length; i++) {
                chat.addChatLine(r.chats[i]);
            }

            if (r.chats.length) {
                chat.data.noActivity = 0;
                chat.data.lastID = r.chats[i - 1].id;
            } else {
                // If no chats were received, increment
                // the noActivity counter.

                chat.data.noActivity++;
            }

            if (!chat.data.lastID) {
                chat.data.jspAPI.getContentPane().html('<p class="noChats">No chats yet</p>');
            }

            // Setting a timeout for the next request,
            // depending on the chat activity:

            var nextRequest = 1000;

            // 2 seconds
            if (chat.data.noActivity > 3) {
                nextRequest = 2000;
            }

            if (chat.data.noActivity > 10) {
                nextRequest = 5000;
            }

            // 15 seconds
            if (chat.data.noActivity > 20) {
                nextRequest = 15000;
            }

            setTimeout(callback, nextRequest);
        });
    },

    // Requesting a list with all the users.

    getUsers: function(callback) {
        $.post("../../chat/getUsers/", function(data, status) {
            // console.log(data);
            var json = JSON.parse(data);
            var array = [];
            console.log(json.users);
            var usuaris = [];
            for (var i = 0; i < json.users.name.length; i++) {
                var j = 0;
                // usuaris = [];
                if (json.users.name[i]) {
                    // console.log(usuaris);
                    usuaris[j] = json.users.name[i];
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

            $('#chatUsers').append('<p class="count">' + message + '</p>');
            setTimeout(callback, 15000);
        }).fail(function(xhr) {
            $("#chatContainer").load("../../chat/view_error_true/", {
                'view_error': true
            });
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
                    '<span class="name">', params.name,
                    '</span><a href="" class="logoutButton rounded">Logout</a></span>'
                ];
                break;

            case 'chatLine':
                arr = [
                    '<div class="chat chat-', params.id, ' rounded"><span class="gravatar"><img src="', params.gravatar,
                    '" width="23" height="23" onload="this.style.visibility=\'visible\'" />', '</span><span class="author">', params.author,
                    ':</span><span class="text">', params.text, '</span><span class="time">', params.time, '</span></div>'
                ];
                break;

            case 'user':
                // console.log(params);
                arr = [
                    '<div class="user" title="', params[0], '"><img src="',
                    params[1], '" width="30" height="30" onload="this.style.visibility=\'visible\'" /></div>'
                ];
                $('#chatUsers').append(arr.join(''));
                break;
        }

        // A single array join is faster than
        // multiple concatenations

        return arr.join('');

    },

    // This method displays an error message on the top of the page:

    displayError: function(msg) {
        var elem = $('<div>', {
            id: 'chatErrorMessage',
            html: msg
        });

        elem.click(function() {
            $(this).fadeOut(function() {
                $(this).remove();
            });
        });

        setTimeout(function() {
            elem.click();
        }, 5000);

        elem.hide().appendTo('body').slideDown();
    }
};

// Custom GET & POST wrappers:
// $.tzPOST('login', $(this).serialize(), function(r) {

// $.tzPOST = function(action, data, callback) {
//     $.post('php/ajax.php?action=' + action, data, callback, 'json');
// }
//
// $.tzGET = function(action, data, callback) {
//     $.get('php/ajax.php?action=' + action, data, callback, 'json');
// }

// A custom jQuery method for placeholder text:

// $.fn.defaultText = function(value) {
//
//     var element = this.eq(0);
//     element.data('defaultText', value);
//
//     element.focus(function() {
//         if (element.val() == value) {
//             element.val('').removeClass('defaultText');
//         }
//     }).blur(function() {
//         if (element.val() == '' || element.val() == value) {
//             element.addClass('defaultText').val(value);
//         }
//     });
//
//     return element.blur();
// };


function checkLogin() {
    var user = Tools.createCookie("user", "angel", 10);
    var user = Tools.readCookie("user");
    if (user) {
        $.post("../../chat/checkLogged/", {
            'user': user
        }, function(data, status) {
            console.log(data);
            var json = JSON.parse(data);
            console.log(json);
            var logged = json.logged;
            if (json.logged) {
                var user = json.loggedAs.name;
                var gravatar = json.loggedAs.gravatar;
                console.log(gravatar);
                //pintarchat?
                // InitChat(user,gravatar);
                chat.login(user, gravatar);
                chat.getUsers();
            } else {
                //pintar vista error o redirigir a sign up
                window.location.href = json.redirect;
            }


        }).fail(function(xhr) {
            // console.log("holahola");
            $("#chatContainer").load("../../chat/view_error_true/", {
                'view_error': true
            });
        });
    } else {
        // console.log("hola");
        // window.location.href ="<?php amigable('?module=users&function=form_users'); ?>";
        //la cookie no existe
        //redirigir a sign up
    }
}
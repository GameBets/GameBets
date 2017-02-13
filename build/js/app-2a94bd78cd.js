/**
 * GameBets - GameBets Project Generated from HotTowel Angular
 * @authors 
 * @version v0.0.0
 * @link 
 * @license 
 */
!function(){"use strict";angular.module("app",["app.core","app.widgets","app.admin","app.dashboard","app.home","app.layout","app.contact","app.chat","app.login","app.profile"])}(),function(){"use strict";angular.module("app.admin",["app.core","app.widgets"])}(),function(){"use strict";angular.module("blocks.exception",["blocks.logger"])}(),function(){"use strict";angular.module("blocks.logger",[])}(),function(){"use strict";angular.module("blocks.router",["ui.router","blocks.logger"])}(),function(){"use strict";angular.module("app.chat",["app.core","app.widgets"])}(),function(){"use strict";angular.module("app.contact",["app.core","app.widgets"])}(),function(){"use strict";angular.module("app.core",["ngAnimate","ngSanitize","blocks.exception","blocks.logger","blocks.router","ui.router","ngplus","ui.bootstrap","ngCookies","cookiesService","headerService"])}(),function(){"use strict";angular.module("app.dashboard",["app.core","app.widgets"])}(),function(){"use strict";angular.module("app.home",["app.core","app.widgets","app.login"])}(),function(){"use strict";angular.module("app.layout",["app.core","ui.bootstrap.collapse"])}(),function(){"use strict";angular.module("cookiesService",[])}(),function(){"use strict";angular.module("headerService",[])}(),function(){"use strict";angular.module("app.login",["app.core","app.widgets","ngAnimate","ui.bootstrap"])}(),function(){"use strict";angular.module("app.profile",["app.core","app.widgets"])}(),function(){"use strict";angular.module("app.widgets",[])}(),function(){"use strict";function e(e){function t(){e.info("Activated Admin View")}var i=this;i.title="Admin",t()}angular.module("app.admin").controller("AdminController",e),e.$inject=["logger"]}(),function(){"use strict";function e(e){e.configureStates(t())}function t(){return[{state:"admin",config:{url:"/admin",templateUrl:"app/admin/admin.html",controller:"AdminController",controllerAs:"vm",title:"Admin",settings:{nav:5,content:'<i class="fa fa-lock"></i> Admin'}}}]}angular.module("app.admin").run(e),e.$inject=["routerHelper"]}(),function(){"use strict";function e(){this.config={appErrorPrefix:void 0},this.configure=function(e){this.config.appErrorPrefix=e},this.$get=function(){return{config:this.config}}}function t(e){e.decorator("$exceptionHandler",i)}function i(e,t,i){return function(a,n){var o=t.config.appErrorPrefix||"",s={exception:a,cause:n};a.message=o+a.message,e(a,n),i.error(a.message,s)}}angular.module("blocks.exception").provider("exceptionHandler",e).config(t),t.$inject=["$provide"],i.$inject=["$delegate","exceptionHandler","logger"]}(),function(){"use strict";function e(e,t){function i(i){return function(a){var n,o;return a.data&&a.data.description&&(n="\n"+a.data.description,o=i+n),a.data.description=o,t.error(o),e.reject(a)}}var a={catcher:i};return a}e.$inject=["$q","logger"],angular.module("blocks.exception").factory("exception",e)}(),function(){"use strict";function e(e,t){function i(i,a,n){t.error(i,n),e.error("Error: "+i,a)}function a(i,a,n){t.info(i,n),e.info("Info: "+i,a)}function n(i,a,n){t.success(i,n),e.info("Success: "+i,a)}function o(i,a,n){t.warning(i,n),e.warn("Warning: "+i,a)}var s={showToasts:!0,error:i,info:a,success:n,warning:o,log:e.log};return s}angular.module("blocks.logger").factory("logger",e),e.$inject=["$log","toastr"]}(),function(){"use strict";function e(e,t,i){function a(e,a,o,s){function r(e,a){e.forEach(function(e){e.config.resolve=angular.extend(e.config.resolve||{},n.resolveAlways),t.state(e.state,e.config)}),a&&!g&&(g=!0,i.otherwise(a))}function l(){a.$on("$stateChangeError",function(t,i,a,n,o,r){if(!p){m.errors++,p=!0;var l=i&&(i.title||i.name||i.loadedTemplateUrl)||"unknown target",c="Error routing to "+l+". "+(r.data||"")+". <br/>"+(r.statusText||"")+": "+(r.status||"");s.warning(c,[i]),e.path("/")}})}function c(){l(),d()}function u(){return o.get()}function d(){a.$on("$stateChangeSuccess",function(e,t,i,o,s){m.changes++,p=!1;var r=n.docTitle+" "+(t.title||"");a.title=r})}var p=!1,g=!1,m={errors:0,changes:0},f={configureStates:r,getStates:u,stateCounts:m};return c(),f}var n={docTitle:void 0,resolveAlways:{}};window.history&&window.history.pushState||(window.location.hash="/"),e.html5Mode(!0),this.configure=function(e){angular.extend(n,e)},this.$get=a,a.$inject=["$location","$rootScope","$state","logger"]}angular.module("blocks.router").provider("routerHelper",e),e.$inject=["$locationProvider","$stateProvider","$urlRouterProvider"]}(),function(){"use strict";function e(e,t,i,a){function n(){"undefined"!=typeof window.Notification&&window.Notification.requestPermission(function(e){var t=o();if("granted"===e&&t&&t.username){var i=new window.Notification(t.username+" says:",{body:t.message});i.onclick=function(){window.focus()},i.onclose=function(){p.off()};var a=setInterval(function(){i.close(),window.clearInterval(a)},1e4)}})}function o(){return d.messages[d.messages.length-1]}function s(t){i.chatGetMessages().then(function(i){d.messages=[],angular.forEach(i.result,function(e){d.messages.push(e)});var a=o(),n=a&&a.id;e.lastMessageId!==n&&r(t),e.lastMessageId=n})}function r(t){e.lastMessageId&&!t&&(u(),p.on("New message"),n()),c(),window.addEventListener("focus",function(){p.off()})}function l(){s()}function c(){var e;e=window.setInterval(function(){$(".direct-chat-messages").scrollTop(.001*window.Number.MAX_SAFE_INTEGER),window.clearInterval(e)},100)}function u(){e.beep.play()}var d=this;e.pidMessages=null,e.pidPingServer=null,e.beep=new Audio("audio/beep.ogg"),d.messages=[],d.online=null,e.lastMessageId=null,e.historyFromId=null,d.me={username:"User_"+Math.round(1e4*Math.random()),message:null};var p={vars:{originalTitle:window.document.title,interval:null,status:0},on:function(e,t){var i=this;i.vars.status||(i.vars.interval=window.setInterval(function(){window.document.title=i.vars.originalTitle===window.document.title?e:i.vars.originalTitle},t||500),i.vars.status=1)},off:function(){window.clearInterval(this.vars.interval),window.document.title=this.vars.originalTitle,this.vars.status=0}};a.on("remit-message",function(e){s()}),d.saveMessage=function(e,t){""!==d.me.message&&null!==d.me.message&&(i.chatInsertMessage(d.me).then(function(e){d.me.message="",s(!0)}),a.emit("new-message",{text:!0}))},l()}angular.module("app.chat").controller("ChatController",e),e.$inject=["$scope","$http","dataservice","socketFactory"]}(),function(){"use strict";function e(){function e(){return function(e,t,i){t.bind("keydown keypress",function(t){13===t.which&&(e.$apply(function(){e.$eval(i.ngEnter)}),t.preventDefault())})}}var t={ngEnter:e,restrict:"EA"};return t}angular.module("app.chat").directive("chatDirective",e)}(),function(){"use strict";function e(e){e.configureStates(t())}function t(){return[{state:"chat",config:{url:"/chat",templateUrl:"app/chat/chat.html",controller:"ChatController",controllerAs:"vm",title:"Chat",settings:{nav:2,content:'<i class="fa fa-lock"></i> Chat'}}}]}angular.module("app.chat").run(e),e.$inject=["routerHelper"]}(),function(){"use strict";function e(e,t,i){function a(){var t={name:n.inputName,from:n.inputEmail,to:"",subject:n.inputSubject,text:n.inputMessage,type:"admin"};e.sendEmail(t).then(function(a){a?(t.type="user",e.sendEmail(t).then(function(e){e?(n.resultMessageOk="Email sended correctly",i(function(){n.resultMessageOk=""},3e3)):(n.resultMessageFail="Error, Try later",i(function(){n.resultMessageFail=""},3e3))})):(n.resultMessageFail="Error, Try later",i(function(){n.resultMessageFail=""},3e3))})}var n=this;n.title="Contact",n.inputName="",n.inputEmail="",n.inputSubject="",n.inputMessage="",n.SubmitContact=a}angular.module("app.contact").controller("ContactController",e),e.$inject=["dataservice","$state","$timeout"]}(),function(){"use strict";function e(e){e.configureStates(t())}function t(){return[{state:"contact",config:{url:"/contact",templateUrl:"app/contact/contact.html",controller:"ContactController",controllerAs:"vm",title:"Contact",settings:{nav:3,content:'<i class="fa fa-lock"></i> Contact'}}}]}angular.module("app.contact").run(e),e.$inject=["routerHelper"]}(),function(){"use strict";function e(e){e.options.timeOut=4e3,e.options.positionClass="toast-bottom-right"}function t(e,t,i){e.debugEnabled&&e.debugEnabled(!0),i.configure(a.appErrorPrefix),t.configure({docTitle:a.appTitle+": "})}var i=angular.module("app.core");i.config(e),e.$inject=["toastr"];var a={appErrorPrefix:"[GameBets Error] ",appTitle:"GameBets"};i.value("config",a),i.config(t),t.$inject=["$logProvider","routerHelperProvider","exceptionHandlerProvider"]}(),function(){"use strict";angular.module("app.core").constant("toastr",toastr).constant("moment",moment)}(),function(){"use strict";function e(e){var i="/404";e.configureStates(t(),i)}function t(){return[{state:"404",config:{url:"/404",templateUrl:"app/core/404.html",title:"404"}}]}e.$inject=["routerHelper"],angular.module("app.core").run(e)}(),function(){"use strict";function e(e,t,i,a,n,o,s){function r(){return o.when(72)}function l(i){function a(e){return e.data}function n(e){return t.catcher("XHR Failed for sign up")(e)}return e.post("/api/users_signin",i).then(a)["catch"](n)}function c(i){function a(e){return e.data}function n(e){return t.catcher("XHR Failed for sign up")(e)}return e.post("/api/users_signup",i).then(a)["catch"](n)}function u(){function i(e){return e.data}function a(e){return t.catcher("XHR Failed for getPeople")(e)}return e.get("/api/people").then(i)["catch"](a)}function d(t){function i(){return!0}function a(){return!1}return e.post("/api/sendmail",t).then(i)["catch"](a)}function p(i){function a(e){return e.data}function n(e){return t.catcher("XHR Failed for insertMessage")(e)}return e.post("/api/chat_insertMessage",i).then(a)["catch"](n)}function g(){function i(e){return e.data}function a(e){return t.catcher("XHR Failed for insertMessage")(e)}return e.get("/api/chat_getMessages").then(i)["catch"](a)}function m(){function i(e){return e}function a(e){return t.catcher("XHR Failed for socialSignin")(e)}return e.get("/auth/success").then(i)["catch"](a)}var f={sendEmail:d,getPeople:u,getMessageCount:r,chatInsertMessage:p,chatGetMessages:g,signup:c,ControllerSocialLogin:m,localSignIn:l};return f}angular.module("app.core").factory("dataservice",e),e.$inject=["$http","exception","logger","$state","$location","$q","$rootScope"]}(),function(){"use strict";function e(e){function t(){n=io.connect("http://localhost:8081")}function i(t,i){n.on(t,function(){var t=arguments;e.$apply(function(){i.apply(n,t)})})}function a(t,i,a){n.emit(t,i,function(){var t=arguments;e.$apply(function(){a&&a.apply(n,t)})})}var n,o={on:i,emit:a,init:t};return o}angular.module("app.core").factory("socketFactory",e),e.$inject=["$rootScope"]}(),function(){"use strict";function e(e,t,i){function a(){var t=[n(),o()];return e.all(t).then(function(){i.info("Activated Dashboard View")})}function n(){return t.getMessageCount().then(function(e){return s.messageCount=e,s.messageCount})}function o(){return t.getPeople().then(function(e){return s.people=e,s.people})}var s=this;s.news={title:"GameBets",description:"Hot Towel Angular is a SPA template for Angular developers."},s.messageCount=0,s.people=[],s.title="Dashboard",a()}angular.module("app.dashboard").controller("DashboardController",e),e.$inject=["$q","dataservice","logger"]}(),function(){"use strict";function e(e){e.configureStates(t())}function t(){return[{state:"dashboard",config:{url:"/dashboard",templateUrl:"app/dashboard/dashboard.html",controller:"DashboardController",controllerAs:"vm",title:"dashboard",settings:{nav:4,content:'<i class="fa fa-dashboard"></i> Dashboard'}}}]}angular.module("app.dashboard").run(e),e.$inject=["routerHelper"]}(),function(){"use strict";function e(e,t,i,a){function n(){i.info("Activated Home View")}n()}angular.module("app.home").controller("HomeController",e),e.$inject=["$q","dataservice","logger","$scope"]}(),function(){"use strict";function e(e){e.configureStates(t())}function t(){return[{state:"home",config:{url:"/",templateUrl:"app/home/home.html",controller:"HomeController",controllerAs:"vm",title:"Home",settings:{nav:1,content:'<i class="fa fa-dashboard"></i> Home'}}}]}angular.module("app.home").run(e),e.$inject=["routerHelper"]}(),function(){"use strict";function e(){function e(e,t,i){function a(t){var i="dropy";t.preventDefault(),o.hasClass(i)?o.hasClass(i)&&(o.removeClass(i),n.slideUp(350,e.whenDoneAnimating)):(n.slideDown(350,e.whenDoneAnimating),o.addClass(i))}var n=t.find(".sidebar-inner"),o=t.find(".sidebar-dropdown a");t.addClass("sidebar"),o.click(a)}var t={link:e,restrict:"EA",scope:{whenDoneAnimating:"&?"}};return t}angular.module("app.layout").directive("htSidebar",e)}(),function(){"use strict";function e(){function e(e){e.isCollapsed=!0}var t={bindToController:!0,controller:e,controllerAs:"vm",restrict:"EA",scope:{navline:"="},templateUrl:"app/layout/ht-top-nav.html"};return e.$inject=["$scope"],t}angular.module("app.layout").directive("htTopNav",e)}(),function(){"use strict";function e(e,t,i,a,n){function o(){n.init(),a.success(i.appTitle+" loaded!",null),s()}function s(){t(function(){e.showSplash=!1},1e3)}var r=this;r.busyMessage="Please wait ...",r.isBusy=!0,e.showSplash=!0,o()}angular.module("app.layout").controller("ShellController",e),e.$inject=["$rootScope","$timeout","config","logger","socketFactory"]}(),function(){"use strict";function e(e,t,i,a){function n(){o(),a.login()}function o(){c.navRoutes=u.filter(function(e){return e.settings&&e.settings.nav}).sort(function(e,t){return e.settings.nav-t.settings.nav})}function s(t){if(!t.title||!e.current||!e.current.title)return"";var i=t.title;return e.current.title.substr(0,i.length)===i?"current":""}function r(){i.open({animation:"true",templateUrl:"app/login/login.html",controller:"LoginController",controllerAs:"vm",size:"lg"})}function l(){a.logout()}var c=this,u=t.getStates();c.isCurrent=s,c.showSignInModal=r,c.logout=l,n()}angular.module("app.layout").controller("SidebarController",e),e.$inject=["$state","routerHelper","$uibModal","headerService"]}(),function(){"use strict";function e(e,t,i,a,n){function o(){e.ControllerSocialLogin().then(function(e){n.SetCredentials(e.data),a.success("Usuario autentificado"),t.go("home")})}o()}angular.module("app.login").controller("ControllerSocial",e),e.$inject=["dataservice","$state","$timeout","logger","cookiesService"]}(),function(){"use strict";function e(e){function t(t){var i=s(t.username),a=s(t.email);e.putObject("session",{user:i,picture:t.picture,email:a,displayName:t.displayName},{expires:new Date((new Date).getTime()+864e5)})}function i(){e.remove("session")}function a(){var t=e.getObject("session");return t&&(t=o()),t}function n(e){var t=s(e.user),i=s(e.email);return{user:t,picture:e.picture,email:i,displayName:e.displayName}}function o(){var t=r(e.getObject("session").user),i=r(e.getObject("session").email);return{user:t,picture:e.getObject("session").picture,email:i,displayName:e.getObject("session").displayName}}function s(e){var t,i,a,n,o,s="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",r="",l="",c="",u=0;try{do t=e.charCodeAt(u++),i=e.charCodeAt(u++),l=e.charCodeAt(u++),a=t>>2,n=(3&t)<<4|i>>4,o=(15&i)<<2|l>>6,c=63&l,isNaN(i)?o=c=64:isNaN(l)&&(c=64),r=r+s.charAt(a)+s.charAt(n)+s.charAt(o)+s.charAt(c),t=i=l="",a=n=o=c="";while(u<e.length)}catch(d){console.log("error char")}return r}function r(e){var t,i,a,n,o,s="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",r="",l="",c="",u=0,d=/[^A-Za-z0-9\+\/\=]/g;d.exec(e)&&window.alert('There were invalid base64 characters in the input text.\nValid base64 characters are A-Z, a-z, 0-9, "+", "/",and "="\nExpect errors in decoding.'),e=e.replace(/[^A-Za-z0-9\+\/\=]/g,"");do a=s.indexOf(e.charAt(u++)),n=s.indexOf(e.charAt(u++)),o=s.indexOf(e.charAt(u++)),c=s.indexOf(e.charAt(u++)),t=a<<2|n>>4,i=(15&n)<<4|o>>2,l=(3&o)<<6|c,r+=String.fromCharCode(t),64!==o&&(r+=String.fromCharCode(i)),64!==c&&(r+=String.fromCharCode(l)),t=i=l="",a=n=o=c="";while(u<e.length);return r}return{SetCredentials:t,ClearCredentials:i,GetCredentials:a,Base64_encode:s,Base64_decode:r,GetCredentials_decode:o,GetCredentials_encode:n}}angular.module("cookiesService").factory("cookiesService",e),e.$inject=["$cookies"]}(),function(){"use strict";function e(e,t,i,a){function n(){var a=e.GetCredentials();a?(t.ProfilePersonal=!0,t.loginG=!1,t.profileG=!0,t.logoutG=!0,t.signUpG=!1,t.profile=a.email,t.user=a.user,t.displayName=a.displayName,t.generalG=!0,t.socialNetwork=!0,t.picture=a.picture,i.go("home")):(t.socialNetwork=!1,t.loginG=!0,t.profileG=!1,t.ProfilePersonal=!1,t.signUpG=!0,t.profile="",t.user="",t.displayName="",t.logoutG=!1,t.generalG=!1,t.picture="")}function o(){e.ClearCredentials(),t.socialNetwork=!1,t.loginG=!0,t.profileG=!1,t.signUpG=!0,t.profile="",t.displayName="",t.user="",t.picture="",t.ProfilePersonal=!1,t.logoutG=!1,t.generalG=!1,i.go("home")}return{login:n,logout:o}}angular.module("headerService").factory("headerService",e),e.$inject=["cookiesService","$rootScope","$state","$uibModal"]}(),function(){"use strict";function e(e,t,i,a,n,o,s,r){function l(){}function c(){var i=JSON.stringify(u.datos);e.localSignIn(i).then(function(e){"Email incorrecto"===e?n.error(e):"Password incorrecto"===e?n.error(e):e.email===u.datos.email?(o.dismiss("cancel"),s.SetCredentials(e),n.success("Usuario autentificado"),r.login(),t.go("home")):n.error(e)})}var u=this;u.datos={email:"",passwd:""},u.SubmitLogin=c,u.CloseModal=l}angular.module("app.login").controller("LoginController",e),e.$inject=["dataservice","$state","$timeout","$uibModal","logger","$uibModalInstance","cookiesService","headerService"]}(),function(){"use strict";function e(e){e.configureStates(t())}function t(){return[{state:"login",config:{url:"/login",templateUrl:"app/login/login.html",controller:"LoginController",controllerAs:"vm",title:"login"}},{state:"socialsignin",config:{url:"/socialsignin",controller:"ControllerSocial"}}]}angular.module("app.login").run(e),e.$inject=["routerHelper"]}(),function(){"use strict";function e(e,t,i,a,n,o){function s(){d.datos.user="",d.datos.email="",d.datos.password="",d.datos.password2=""}function r(){"password"===d.inputType?(d.inputType="text",d.imgSrc="../../images/hide.png"):(d.inputType="password",d.imgSrc="../../images/view.png")}function l(){"password"===d.inputType2?(d.inputType2="text",d.imgSrc2="../../images/hide.png"):(d.inputType2="password",d.imgSrc2="../../images/view.png")}function c(){return d.datos.password===d.datos.password2}function u(){var s=JSON.stringify(d.datos);i.signupform.$valid?e.signup(s).then(function(e){"Usuario ya existe"===e?t.error(e):e.email===d.datos.email?(n.SetCredentials(e),t.success("Usuario registrado con exito"),o.login(),a.go("home")):t.error(e)}):t.success("Datos incorrectos")}var d=this;d.inputType="password",d.inputType2="password",d.imgSrc="../../images/view.png",d.imgSrc2="../../images/view.png",d.datos={user:"",email:"",password:"",password2:""},d.signup=u,d.checkPasswd=c,d.showHidePasswd=r,d.showHidePasswd2=l,d.limpiarCampos=s,$(".home-form").find("input, textarea").on("keyup blur focus",function(e){var t=$(this),i=t.prev("label");"keyup"===e.type?""===t.val()?i.show():i.hide():"blur"===e.type?""===t.val()?i.removeClass("active highlight"):i.removeClass("highlight"):"focus"===e.type&&(""===t.val()?i.removeClass("highlight"):""!==t.val()&&i.addClass("highlight"))}),$(".tab a").on("click",function(e){e.preventDefault(),$(this).parent().addClass("active"),$(this).parent().siblings().removeClass("active");var t=$(this).attr("href");$(".tab-content > div").not(t).hide(),$(t).hide()})}angular.module("app.login").controller("SignUpController",e),e.$inject=["dataservice","logger","$scope","$state","cookiesService","headerService"]}(),function(){"use strict";function e(e){function t(){e.info("Activated Profile View")}var i=this;i.title="Profile",t()}angular.module("app.profile").controller("ProfileController",e),e.$inject=["logger"]}(),function(){"use strict";function e(e,i){e.configureStates(t(i))}function t(e){return[{state:"profile",config:{url:"/profile",templateUrl:"app/profile/profile.html",controller:"ProfileController",controllerAs:"vm",title:"Profile"}}]}angular.module("app.profile").run(e),e.$inject=["routerHelper","dataservice"]}(),function(){"use strict";function e(e){function t(e,t,n){n.$observe("htImgPerson",function(e){e=i+(e||a),n.$set("src",e)})}var i=e.imageBasePath,a=e.unknownPersonImageSource,n={link:t,restrict:"A"};return n}angular.module("app.widgets").directive("htImgPerson",e),e.$inject=["config"]}(),function(){"use strict";function e(){function e(e,t,i){e.toggleContent=function(){if("true"===e.allowCollapse){var i=angular.element(t).siblings(".widget-content");i.toggle()}}}var t={scope:{title:"@",subtitle:"@",rightText:"@",allowCollapse:"@"},templateUrl:"app/widgets/widget-header.html",restrict:"EA",link:e};return t}angular.module("app.widgets").directive("htWidgetHeader",e)}(),angular.module("app.core").run(["$templateCache",function(e){e.put("app/admin/admin.html",'<section class=mainbar><section class=matter><div class=container><div class=row><div class="widget wviolet"><div ht-widget-header title={{vm.title}}></div><div class="widget-content user"><h3>TODO: Implement Your Features</h3></div><div class=widget-foot><div class=clearfix></div></div></div></div></div></section></section>'),e.put("app/chat/chat.html",'<div class=chat><div class=container><div class="box box-warning direct-chat direct-chat-warning"><div class=box-body><div class=direct-chat-messages><div class=direct-chat-msg ng-repeat="message in vm.messages" ng-if="historyFromId < message.id" ng-class="{\'right\':message.username !== vm.me.username}"><div class="direct-chat-info clearfix"><span class=direct-chat-name ng-class="{\'pull-left\':message.username === vm.me.username, \'pull-right\':message.username !== vm.me.username}">{{ message.username }}</span> <span class=direct-chat-timestamp ng-class="{\'pull-left\':message.username !== vm.me.username, \'pull-right\':message.username === vm.me.username}">{{ message.date }}</span></div><img class=direct-chat-img ng-src=http://upload.wikimedia.org/wikipedia/en/e/ee/Unknown-person.gif alt><div class="direct-chat-text right"><span>{{ message.message }}</span></div></div></div><div class=box-footer><form ng-submit=vm.saveMessage()><div class=input-group><input type=text placeholder="Type message..." autofocus class=form-control ng-model=vm.me.message ng-enter=vm.saveMessage()> <span class=input-group-btn><button type=submit class="btn btn-warning btn-flat">Send</button></span></div></form><div class=clearfix><span class="badge pull-left">Online users: {{ vm.online || \'1\' }}</span></div></div></div></div></div></div>'),e.put("app/contact/contact.html",'<div class=contact><div class=contorno><form id=contact_form name=contact_form class=details-holder novalidate><h1 id=h1-contact>CONTACT</h1><hr class=style-four><br><div><input required ng-model=vm.inputName id=inputName class="input input-contact" type=text name=inputName placeholder=Name><p class=msg_error ng-show="contact_form.inputName.$error.required && (contact_form.inputName.$dirty || contact_form.inputName.$touched)">El campo es obligatorio</p></div><br><div><input required ng-model=vm.inputEmail id=inputEmail class="input input-contact" type=email name=inputEmail placeholder="Email *"><p class=msg_error ng-show="contact_form.inputEmail.$error.required && (contact_form.inputEmail.$dirty || contact_form.inputEmail.$touched)">El campo es obligatorio</p><p class=msg_error ng-show="contact_form.inputEmail.$error.email && (contact_form.inputEmail.$dirty || contact_form.inputEmail.$touched)">Email not valid</p></div><br><div><label class=subject for=sel1></label><select required ng-model=vm.inputSubject class="select input-contact" id=inputSubject name=inputSubject title="Choose subject"><option value=compra>Informacion relativa a tu compra</option><option value=apuesta>Comentanos sobre tu apuesta</option><option value=contacta>Contactanos</option><option value=trabaja>Trabaja con nosotros</option><option value=proyectos>Propon proyectos</option><option value=sugerencias>Haznos sugerencias</option><option value=reclamaciones>Atendemos tus reclamaciones</option><option value=info>Informacion relativa de Gamebets</option><option value=sociales>Proyectos sociales</option><option value=novedades>Te avisamos de nuestras novedades</option><option value=distinto>Algo distinto</option></select><p class=msg_error ng-show="contact_form.inputSubject.$error.required && (contact_form.inputSubject.$dirty || contact_form.inputSubject.$touched)">El campo es obligatorio</p></div><br><div><textarea required ng-model=vm.inputMessage id=inputMessage class="input input-contact" type=text rows=4 name=inputMessage placeholder="Message *" style="max-width: 100%;"></textarea><p class=msg_error ng-show="contact_form.inputMessage.$error.required && (contact_form.inputMessage.$dirty || contact_form.inputMessage.$touched)">El campo es obligatorio</p></div><br><input class=btn-read-more type=submit name=submit id=submitBtn value=SEND ng-click=vm.SubmitContact()><div id=resultMessageOk class=alert-success>{{vm.resultMessageOk}}</div><div id=resultMessageFail class=alert-danger>{{vm.resultMessageFail}}</div></form></div><div class=support><h1 id=h1-supp>SUPPORT</h1><hr class=style-two><div><input class=btn-tech type=submit name=submit id=btnSupp value="TECHNICAL SUPPORT" ng-click=vm.SubmitSupp()></div><div><input class=btn-supp type=submit name=submit id=btnDocument value=DOCUMENTATION ng-click=vm.SubmitDoc()></div></div></div>'),e.put("app/core/404.html",'<section id=dashboard-view class=mainbar><section class=matter><div class=container><div class=row><div class=col-md-12><ul class=today-datas><li class=bred><div class=pull-left><i class="fa fa-warning"></i></div><div class="datas-text pull-right"><a><span class=bold>404</span></a>Page Not Found</div><div class=clearfix></div></li></ul></div></div><div class=row><div class="widget wblue"><div ht-widget-header title="Page Not Found" allow-collapse=true></div><div class="widget-content text-center text-info"><div class=container>No soup for you!</div></div><div class=widget-foot><div class=clearfix></div></div></div></div></div></section></section>'),e.put("app/dashboard/dashboard.html",'<section id=dashboard-view class=mainbar><section class=matter><div class=container><div class=row><div class=col-md-12><ul class=today-datas><li class=blightblue><div class=pull-left><i class="fa fa-plane"></i></div><div class="datas-text pull-right"><span class=bold>May 18 - 19, 2015</span> Castle Resort, Neverland</div><div class=clearfix></div></li><li class=borange><div class=pull-left><i class="fa fa-envelope"></i></div><div class="datas-text pull-right"><span class=bold>{{vm.messageCount}}</span> Messages</div><div class=clearfix></div></li></ul></div></div><div class=row><div class=col-md-6><div class="widget wviolet"><div ht-widget-header title=People allow-collapse=true></div><div class="widget-content text-center text-info"><table class="table table-condensed table-striped"><thead><tr><th>First Name</th><th>Last Name</th><th>Age</th><th>Location</th></tr></thead><tbody><tr ng-repeat="p in vm.people"><td>{{p.firstName}}</td><td>{{p.lastName}}</td><td>{{p.age}}</td><td>{{p.location}}</td></tr></tbody></table></div><div class=widget-foot><div class=clearfix></div></div></div></div><div class=col-md-6><div class="widget wgreen"><div ht-widget-header title={{vm.news.title}} allow-collapse=true></div><div class="widget-content text-center text-info"><small>{{vm.news.description}}</small></div><div class=widget-foot><div class=clearfix></div></div></div></div></div></div></section></section>'),e.put("app/home/home.html",'<ul class=slideshow><li><span>Image 01</span></li><li><span>Image 02</span></li><li><span>Image 03</span></li></ul><div class=home-slogan><span>JOIN, PLAY,</span><br><span>WIN</span></div><div ng-show=$root.generalG style="min-height: 80vh"></div><div ng-hide=$root.generalG class=home-form ng-controller="SignUpController as vm" style="min-height: 80vh"><ul class=home-tab-group><li class="tab active"><a class=home-a href=#signup>GAMEBETS</a></li></ul><div class=home-tab-content><h1 class=home-h1></h1><form name=signupform novalidate method=POST id=formulario_signup ng-submit=vm.signup()><div class=home-top-row><div class=form-group><div class=home-field-wrap><label class=home-label>Usuario<span class=req>*</span></label> <input class=home-input required ng-model=vm.datos.user id=user name=user type=text ng-maxlength=15 ng-minlength=5 ng-pattern="/^[a-zA-Z0-9]*$/" autocomplete=off> <span class=help-block ng-show="signupform.user.$error.required && (signupform.user.$dirty || signupform.user.$touched)">El campo es obligatorio</span> <span class=help-block ng-show="signupform.user.$error.pattern && signupform.user.$touched">El nombre de usuario debe tener solo letras y numeros.</span> <span class=help-block ng-show="signupform.user.$error.maxlength && signupform.user.$touched">El nombre de usuario debe tener menos de 15 caracteres.</span> <span class=help-block ng-show="signupform.user.$error.minlength && signupform.user.$touched">El nombre de usuario debe tener mas de 5 caracteres.</span></div></div><div class=form-group><div class=home-field-wrap><label class=home-label>Email<span class=req>*</span></label> <input class="home-input home-input-special" required ng-model=vm.datos.email id=email name=email type=email autocomplete=off></div><span style="position:relative; top:-35px;" class=help-block ng-show="signupform.email.$error.required && (signupform.email.$dirty || signupform.email.$touched)">El campo es obligatorio.</span> <span style="position:relative; top:-35px;" class=help-block ng-show="signupform.email.$error.email && signupform.email.$touched">El email no es valido.</span></div></div><div class=home-field-wrap><label class=home-label>Contraseña<span class=req>*</span></label> <input class=home-input required ng-model=vm.datos.password id=password name=password type={{vm.inputType}} ng-maxlength=25 ng-minlength=8 ng-pattern="/^(?=.*[A-Za-z])(?=.*\\d)(?=.*[$@$!%*#?&])[A-Za-z\\d$@$!%*#?&]{8,}$/" autocomplete=off> <img class=home-input-img src={{vm.imgSrc}} name=imgPasswd alt="View/Hide Password" ng-click=vm.showHidePasswd()> <span class=help-block ng-show="signupform.password.$error.required && (signupform.password.$dirty || signupform.password.$touched)">El campo es obligatorio.</span> <span class=help-block ng-show="signupform.password.$error.pattern && signupform.password.$touched">La contrase&ntilde;a debe tener al menos una letra minuscula, una mayuscula y un caracter especial.</span> <span class=help-block ng-show="signupform.password.$error.maxlength && signupform.password.$touched">El contrase&ntilde;a debe tener menos de 25 caracteres.</span> <span class=help-block ng-show="signupform.password.$error.minlength && signupform.password.$touched">El contrase&ntilde;a debe tener mas de 8 caracteres.</span></div><div class=home-field-wrap><label class=home-label>Repetir Contraseña<span class=req>*</span></label> <input class=home-input required ng-model=vm.datos.password2 id=password2 name=password2 type={{vm.inputType2}} autocomplete=off> <img src={{vm.imgSrc2}} name=imgPasswd2 alt="View/Hide Password" ng-click=vm.showHidePasswd2()> <span class=help-block ng-show="signupform.password2.$error.required && (signupform.password2.$dirty || signupform.password2.$touched)">El camp &eacute;s obligatori</span> <span class=help-block ng-show="!vm.checkPasswd() && signupform.password2.$touched">La contrase&ntilde;a no coincide.</span></div><input name=send class="home-button home-button-block" type=submit value="SIGN UP"></form></div></div>'),e.put("app/layout/footer.html","<div class=footer><div class=footer-middle><div class=container><div class=footer-content1><h6>About us</h6><p>Formed by gamers, GameBets was created to help push eSports on Spain to a professional level, GameBets was launched as a company in final of 2016 and plans were immediately set in motion to deliver events and user experiences unlike any that had been seen in European eSports before it.</p></div><div class=footer-content2><div class=footer-subcontent><div class=footer-middle-in><h6>Information</h6><ul><li><a href=#>About Us</a></li><li><a href=#>Delivery Information</a></li><li><a href=#>Privacy Policy</a></li><li><a href=#>Terms & Conditions</a></li></ul></div><div class=footer-middle-in><h6>Customer Service</h6><ul><li><a href=contact.html>Contact Us</a></li><li><a href=#>Returns</a></li><li><a href=contact.html>Site Map</a></li></ul></div></div><div class=footer-subcontent><div class=footer-middle-in><h6>My Account</h6><ul><li><a href=#>Order History</a></li><li><a href=#>Wish List</a></li><li><a href=#>Newsletter</a></li></ul></div><div class=footer-middle-in><h6>Extras</h6><ul><li><a href=#>Affiliates</a></li><li><a href=#>Specials</a></li></ul></div></div></div><div class=clearfix></div></div></div><p class=footer-class>Designed by GameBets</p></div>"),
e.put("app/layout/ht-top-nav.html",'<div class=top-header ng-hide=$root.socialNetwork><div class=container><div class=top-head><ul class=header-in><li><a href=#>Help</a></li><li><a href=/contact>Contact Us</a></li><li><a href=#>How To Use</a></li></ul><div class=search><a target=_self href=/auth/facebook><img src=images/face-mini.png class=header-facebook></a> <a target=_self href=/auth/twitter><img src=images/twitter-mini.png class=header-twitter></a> <a target=_self href=/auth/google><img src=images/google-mini.png class=header-google></a></div><div class=clearfix></div></div></div></div><div class=header-top><div class=container><div class=head-top><div class=logo><h1><a href="#/"><span>G</span>ame<span>B</span>ets</a></h1></div><div class=top-nav ng-controller="SidebarController as vm"><span class=menu><img src=images/menu.png alt></span><ul><li class="nlightblue fade-selection-animation" ng-class=vm.isCurrent(r) ng-repeat="r in vm.navRoutes"><a class=color2 ng-show=$root.generalG ui-sref={{r.name}} ng-bind-html=r.settings.content></a></li><li class="nlightblue fade-selection-animation"><a class=color6 ng-show=$root.signUpG ng-click>Sign Up</a></li><li class="nlightblue fade-selection-animation"><a class=color3 ng-show=$root.loginG ng-click=vm.showSignInModal()>Log In</a></li><li class="nlightblue fade-selection-animation"><a ng-show=$root.profile ng-click href=/profile class="color5 welcome">Welcome: {{$root.displayName}}</a></li><li class="nlightblue fade-selection-animation picture"><img ng-show=$root.profile class=avatar src={{$root.picture}}></li><li class="nlightblue fade-selection-animation"><a id=logout ng-show=$root.logoutG class=color4 ng-click=vm.logout()>Log Out</a></li><div class=clearfix></div></ul><script>\n\t\t\t\t\t$("span.menu").click(function() {\n\t\t\t\t\t\t$(".top-nav ul").slideToggle(500, function() {});\n\t\t\t\t\t});\n\t\t\t\t</script></div></div></div></div>'),e.put("app/layout/shell.html",'<div ng-controller="ShellController as vm"><header class=clearfix><ht-top-nav navline=vm.navline></ht-top-nav></header><section id=content class=content><div ui-view class=shuffle-animation></div><div ngplus-overlay ngplus-overlay-delay-in=50 ngplus-overlay-delay-out=700 ngplus-overlay-animation=dissolve-animation><img src=images/busy.gif><div class="page-spinner-message overlay-message">{{vm.busyMessage}}</div></div></section><div ng-include="\'app/layout/footer.html\'"></div></div>'),e.put("app/layout/sidebar.html",'<div ng-controller="SidebarController as vm"><ht-sidebar when-done-animating=vm.sidebarReady()><div class=sidebar-filler></div><div class=sidebar-dropdown><a href=#>Menu</a></div><div class=sidebar-inner><div class=sidebar-widget></div><ul class=navi><li class="nlightblue fade-selection-animation" ng-class=vm.isCurrent(r) ng-repeat="r in vm.navRoutes"><a ui-sref={{r.name}} ng-bind-html=r.settings.content></a> <a id=profile ng-show=profileV href class=profile>Bienvenido: {{profile}}</a></li></ul></div></ht-sidebar></div>'),e.put("app/login/login.html",'<div class=login><form id=login_form name=login_form novalidate><img src=images/signin.gif class=h1-login><br><hr class=hr-login><div id=email-log><md-input-container class=md-block><label class=label-login>E-mail</label> <input required type=email name=email class=input-email ng-model=vm.datos.email minlength=10 maxlength=100 ng-pattern="/^.+@.+\\..+$/"><div ng-messages=login_form.email.$error role=alert></div></md-input-container></div><br><div id=passw-log><md-input-container class=md-block><label class=label-login>Password</label> <input required ng-minlength=5 class=input-passw ng-maxlength=10 type=password name=passwd ng-model=vm.datos.passwd><div ng-messages=login_form.passwd.$error role=alert></div></md-input-container></div><div id=bar-vertical-v1></div><hr class=hr-horizontal-v1><img class=logo-gb src=images/GFAv.png><hr class=hr-horizontal-v2><div id=bar-vertical-v2></div><br><a href=# id=linkRest>¿Has olvidado tu contraseña?</a><br><br><button class="btn btn-lg btn-primary" type=submit id=SubmitLogin ng-disabled=login_form.$invalid ng-click=vm.SubmitLogin()>Sign In</button><div id=resultMessageFail class=msg_error>{{vm.resultMessageFail}}</div><div id=resultMessageOk class=msg_error>{{vm.resultMessageOk}}</div><div id=social-media><a target=_self href=/auth/facebook><div class=facebook><img class=logo-login src=images/logo-face.png><h5 class=login-h5>Login with<p>Facebook</p><p></p><h5></h5></h5></div></a> <a target=_self href=/auth/twitter><div class=twitter><img class=logo-login src=images/logo-twitter.png><h5 class=login-h5>Login with<p>Twitter</p><p></p><h5></h5></h5></div></a> <a target=_self href=/auth/google><div class=google><img class=logo-login src=images/logo-gooogle.png><h5 class=login-h5>Login with<p>Google</p><p></p><h5></h5></h5></div></a></div></form></div>'),e.put("app/profile/profile.html",'<section class=mainbar><section class=matter><div class=container><div class=row><div class="widget-content user"><br><h1 class=h1-profile>Your Profile</h1><br><div class=login-profile><div class=single-data-profile><h2 class=h2-profile>Email:</h2><p class=p-profile>{{$root.profile}}</p><br><h2 class=h2-profile>Id:</h2><p class=p-profile>{{$root.user}}</p><br><h2 class=h2-profile>Username:</h2><p class=p-profile>{{$root.displayName}}</p><br></div><div class=avatar-profile><h2 class=h2-profile>Avatar:</h2><p class=p-profile><img src={{$root.picture}} width=200 height=200></p><br></div><br></div></div><div class=widget-foot><div class=clearfix></div></div></div></div></section></section>'),e.put("app/widgets/widget-header.html",'<div class=widget-head ng-class="{\'collapsive\': allowCollapse === \'true\'}" ng-click=toggleContent()><div class="page-title pull-left">{{title}}</div><small class=page-title-subtle ng-show=subtitle>({{subtitle}})</small><div class="widget-icons pull-right"></div><small class="pull-right page-title-subtle" ng-show=rightText>{{rightText}}</small><div class=clearfix></div></div>')}]);
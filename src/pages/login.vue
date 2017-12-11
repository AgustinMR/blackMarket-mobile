<template>
    <f7-page class="theme-black">
        <div class="ui center aligned text container" style="margin: 0; padding: 20px">
            <img src="../assets/blackMarket.gif" style="height: 80px">
        </div>
        <div class="ui center aligned text container">
            <h2 class="ui header text-bm-red">Iniciar Sesi&oacute;n</h2>
            <button class="ui icon facebook circular button"><i class="facebook f large icon"></i>
            </button>
        </div>
        <div class="ui text container" style="padding: 0; margin: 0">
            <f7-list :no-hairlines="true" form>
                <f7-list-item style="width: 100%">
                    <f7-label><h3 class="ui header text-bm-red" style="margin: 0; font-weight: 500;">Username</h3>
                    </f7-label>
                    <f7-input type="text" v-model="usernameLogin"/>
                </f7-list-item>
                <f7-list-item style="width: 100%">
                    <f7-label><h3 class="ui header text-bm-red" style="margin: 0; font-weight: 500;">
                        Contrase&ntilde;a</h3></f7-label>
                    <f7-input type="password" v-model="passwordLogin"/>
                </f7-list-item>
            </f7-list>
            <f7-button big raised @click="autenticarUsuario" style="margin: 0">Iniciar Sesi&oacute;n</f7-button>
        </div>
        <div class="ui center aligned text container" style="padding: 20px">
            <h3 class="ui header text-bm-red">&iquest;No tienes cuenta?</h3>
            <f7-button href="/registrarse/">Registrarse</f7-button>
        </div>
    </f7-page>
</template>
<script>
    export default {
        data() {
            return {
                usernameLogin: '',
                passwordLogin: ''
            }
        },
        computed: {
            autenticarUsuarioURL() {
                return this.$store.state.baseUrl + "usuarios/login?username=" + this.usernameLogin + "&password=" + this.passwordLogin;
            },
        },
        methods: {
            autenticarUsuario() {
                if (this.usernameLogin !== '' && this.passwordLogin !== '') {
                    var _this = this;
                    $.get(this.autenticarUsuarioURL, function (response) {
                        if (response === true) {
                            _this.mostrarNotificacion("Autenticado con exito!", 3000);
                            _this.crearSesion();
                        } else _this.mostrarNotificacion("Credenciales incorrectas, o usuario no existe.", 3000);
                    }).fail(function () {
                        _this.mostrarNotificacion("No se pudo enviar la solicitud. Por favor vuelve a intentar");
                    });
                } else this.mostrarNotificacion("Debes ingresar username y password!", 3000);
            },
            mostrarNotificacion(title, duration) {
                this.$f7.addNotification({
                    message: title,
                    hold: duration,
                    closeOnClick: true
                });
            },
            crearSesion() {
                this.$store.commit('setUsername', this.usernameLogin);
                this.$cookie.set('username', this.usernameLogin);
                this.$store.commit('setAutenticado', true);
            },
        }
    }
</script>
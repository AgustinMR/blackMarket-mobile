<template>
    <div id="app">
        <f7-statusbar></f7-statusbar>
        <f7-views>
            <f7-view main>
                <f7-pages>
                    <f7-page class="theme-black">
                        <div class="ui center aligned text container" style="margin: 0; padding: 20px">
                            <img src="../src/assets/blackMarket.gif" style="height: 80px">
                        </div>
                        <div class="ui center aligned text container">
                            <h2 class="ui header text-bm-red">Iniciar Sesi&oacute;n</h2>
                        </div>
                        <div class="ui text container" style="padding: 20px; margin: 0">
                            <f7-list form>
                                <f7-list-item style="width: 100%">
                                    <f7-label floating>Ingrese su username</f7-label>
                                    <f7-input type="text" v-model="usernameLogin"/>
                                </f7-list-item>
                                <f7-list-item style="width: 100%">
                                    <f7-label floating>Ingrese su password</f7-label>
                                    <f7-input type="password" v-model="passwordLogin"/>
                                </f7-list-item>
                            </f7-list>
                            <f7-button @click="autenticarUsuario" big raised fill>Iniciar Sesi&oacute;n</f7-button>
                        </div>
                        <div class="ui center aligned text container">
                            <h3 class="ui header text-bm-red">&iquest;No tienes cuenta?</h3>
                            <f7-button>Registrarse</f7-button>
                        </div>
                    </f7-page>
                </f7-pages>
            </f7-view>
        </f7-views>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                username: '',
                password: '',
                email: '',
                usernameLogin: '',
                passwordLogin: ''
            }
        },
        computed: {
            autenticarUsuarioURL() {
                return this.$store.state.baseUrl + "usuarios/login?username=" + this.usernameLogin + "&password=" + this.passwordLogin;
            }
        },
        methods: {
            autenticarUsuario() {
                if (this.usernameLogin !== '' && this.passwordLogin !== '') {
                    var _this = this;
                    $.get(this.autenticarUsuarioURL, function (response) {
                        if (response === true) {
                            _this.mostrarNotificacion("Autenticado con exito!", 3000);
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
            }
        }
    }
</script>
<style>
    .bm-red {
        color: #f6f9f9;
        background-color: #b24e3a !important
    }

    .bm-dark {
        color: #f6f9f9 !important;
        background-color: #000000 !important
    }

    .border-top-bm-red {
        border-color: #b24e3a !important;
        border-top-style: solid;
        border-top-width: 3px
    }

    .border-left-bm-red {
        border-color: #b24e3a !important;
        border-left-style: solid;
        border-left-width: 3px
    }

    .border-bottom-bm-red {
        border-color: #b24e3a !important;
        border-bottom-style: solid;
        border-bottom-width: 3px
    }

    .border-top-bm-dark {
        border-color: #000000 !important;
        border-top-style: solid;
        border-top-width: 3px
    }

    .border-left-bm-dark {
        border-color: #000000 !important;
        border-left-style: solid;
        border-left-width: 3px
    }

    .border-bottom-bm-dark {
        border-color: #000000 !important;
        border-bottom-style: solid;
        border-bottom-width: 3px
    }

    .hover-bm-red:hover {
        color: #f6f9f9 !important;
        background-color: #b24e3a !important
    }

    .hover-bm-dark:hover {
        color: #f6f9f9 !important;
        background-color: #000000 !important
    }

    .hover-text-bm-red:hover {
        color: #b24e3a !important
    }

    .hover-text-bm-dark:hover {
        color: #000000 !important
    }

    .hover-border-bm-red:hover {
        border-color: #b24e3a !important
    }

    .hover-border-bm-dark:hover {
        border-color: #000000 !important
    }

    .text-bm-red {
        color: #b24e3a !important
    }

    .text-bm-dark {
        color: #000000 !important
    }

    .bm-f1 {
        background-color: #f1f5f9 !important
    }

    .hover-bm-f1:hover {
        background-color: #f1f5f9 !important
    }

    .hover-text-bm-f1:hover {
        color: #f1f5f9 !important
    }

    .text-bm-f1 {
        color: #f1f5f9 !important
    }
</style>
<template>
    <f7-page>
        <div class="ui left aligned basic segment" style="margin-top: 60px; padding: 20px">
            <h3 class="ui header">
                <i class="user circle outline grey icon"></i>{{username}}
            </h3>
            <h3 class="ui header">
                <i class="at grey icon"></i>{{email}}
            </h3>
            <h3 class="ui header">
                <i class="calendar grey icon"></i>Usuario desde: {{fecha}}
            </h3>
        </div>
    </f7-page>
</template>
<script>
    export default {
        data() {
            return {
                email: '',
                fecha: ''
            }
        },
        computed: {
            username() {
                return this.$store.state.username;
            },
            obtenerUsuarioURL() {
                return this.$store.state.baseUrl + "usuarios/username?username=" + this.username;
            }
        },
        mounted() {
            this.obtenerUsuario();
        },
        methods: {
            obtenerUsuario() {
                if (this.username !== undefined && this.username !== '') {
                    var _this = this;
                    $.get(this.obtenerUsuarioURL, function (response) {
                        var fecha = new Date(response['created_at']);
                        _this.fecha = fecha.getDate() + "/" + (fecha.getMonth() + 1) + "/" + fecha.getFullYear();
                        _this.email = response.email;
                    });
                }
            }
        }
    }
</script>
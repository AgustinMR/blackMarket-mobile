<template>
    <f7-page class="theme-black">
        <f7-navbar style="background-color: #b24e3a" :title="nombre || 'Producto desconocido...'"
                   back-link="Volver"></f7-navbar>
        <div class="ui left aligned basic segment" style="margin-top: 60px; padding: 20px">
            <h3 class="ui header">
                <i class="user circle outline grey icon"></i>{{empresa}}
            </h3>
        </div>
    </f7-page>
</template>
<script>
    export default {
        data() {
            return {
                precio: 0,
                tipo: '',
                codigo: '',
                stock: 0
            }
        },
        props: ['id', 'nombre', 'empresa'],
        mounted() {

        },
        computed: {
            obtenerProductoURL() {
                return this.$store.state.baseUrl + "productos/" + this.id;
            }
        },
        methods: {
            obtenerProducto() {
                if (this.id !== undefined && this.id !== '' && this.id !== null) {
                    var _this = this;
                    $.get(this.obtenerProductoURL, function (response) {

                    });
                }
            }
        }
    }
</script>
<template>
    <f7-page class="theme-black">
        <f7-navbar style="background-color: #b24e3a" :title="fecha || 'Fecha desconocida...'"
                   back-link="Volver">
        </f7-navbar>
        <div class="ui left aligned basic segment" style="margin-top: 60px; padding: 20px">
            <h3 class="ui header">
                <i class="marker grey icon"></i>{{destino || 'Destino desconocido...'}}
            </h3>
            <h3 class="ui header" style="margin-top: 10px; border: 0">
                <i :class="{'green checkmark': estado === 'Terminado', 'spinner orange': estado === 'Procesando', 'shipping blue': estado === 'Enviando', 'warning orange': estado !== 'Procesando' && estado !== 'Enviando' && estado !== 'Terminado'}"
                   class="icon"></i>
                {{estado}}
            </h3>
        </div>
        <div class="ui relaxed divided items" style="padding-top: 0; margin: 0">
            <f7-block-title style="margin:0; padding-left: 16px" class="text-bm-black">
                <h1 class="ui sub header huge" style="font-weight: 500;">Productos asociados al pedido</h1>
            </f7-block-title>
            <f7-list :no-hairlines-between="true" :no-hairlines="true">
                <template v-for="prod in productos">
                    <f7-list-item
                            class="ui link item text-bm-red"
                            style="padding:7px">
                        <div slot="inner-start" style="width:inherit">
                            <h2 class="ui header" style="font-weight: 500; margin: 0; padding: 0; color: inherit">
                                {{prod.nombre}} <span class="text-bm-black">x{{prod.cantidad}}</span>
                                <h4 class="ui header" style="margin-top: 5px; border: 0"><i
                                        class="tag icon grey"></i>
                                    {{prod.tipo}}
                                </h4>
                            </h2>
                        </div>
                    </f7-list-item>
                </template>
            </f7-list>
        </div>
        <infinite-loading ref="infiniteLoading"
                          style="padding: 0px 0px 20px;margin-bottom: 40px"
                          @infinite="listarProductos">
            <div slot="no-more">
                <h3 class="ui header text-paperviu-d7" style="opacity: 0.6"><i
                        class="search icon text-bm-red"></i>No hay m&aacute;s resultados.
                </h3>
            </div>
            <div slot="no-results">
                <h3 class="ui header text-paperviu-d7" style="opacity: 0.6"><i
                        class="search icon text-bm-red"></i>No hay resultados que mostrar.
                </h3>
            </div>
        </infinite-loading>
    </f7-page>
</template>
<script>
    import InfiniteLoading from 'vue-infinite-loading';

    export default {
        props: ['id', 'fecha', 'destino', 'estado'],
        data() {
            return {
                productos: [],
                pagina: 1
            }
        },
        computed: {
            listarProductosURL() {
                return this.$store.state.baseUrl + "pedidos/productos?id=" + this.id + "&pagina=" + this.pagina;
            },
            obtenerProductoURL() {
                return this.$store.state.baseUrl + "productos/";
            }
        },
        methods: {
            listarProductos($state) {
                var _this = this;
                setTimeout(() => {
                    $.get(_this.listarProductosURL, function (response) {
                        if (response !== undefined) {
                            if (response.length >= 1) {
                                $.each(response, function (index, pedidoProducto) {
                                    $.get(_this.obtenerProductoURL + pedidoProducto.producto + "?fields=nombre,tipoProducto", function (response2) {
                                        _this.productos.push({
                                            id: pedidoProducto.producto,
                                            nombre: response2.nombre,
                                            tipo: response2.tipoProducto,
                                            cantidad: pedidoProducto.cantidad
                                        });
                                    });
                                });
                                $state.loaded();
                                _this.pagina += 1;
                            } else $state.complete();
                        } else $state.complete();
                    });
                }, 1000);
            },
        },
        components: {
            InfiniteLoading,
        }
    }
</script>

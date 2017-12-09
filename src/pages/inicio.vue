<template>
    <f7-page name="inicio">
        <f7-navbar class="theme-black" sliding>
            <f7-nav-left>
                <f7-link icon="icon-bars" open-panel="left"></f7-link>
            </f7-nav-left>
            <f7-nav-center><img src="../assets/blackMarket.gif" style="height: 50px; margin-top: 25px"></f7-nav-center>
            <f7-nav-right style="margin-top: -40px">
                <f7-link icon="search" style="margin: 0" open-popover="#popover"></f7-link>
            </f7-nav-right>
        </f7-navbar>

        <f7-panel left cover layout="dark" style="margin-top: 20px; padding: 0">
            <f7-list>
                <f7-list-button href="/inicio/">Productos</f7-list-button>
                <f7-list-button>Pedidos</f7-list-button>
                <f7-list-button>Salir</f7-list-button>
            </f7-list>
        </f7-panel>
        <f7-popover id="popover">
            <f7-list form>
                <f7-list-item>
                    <f7-label floating>Nombre</f7-label>
                    <f7-input v-model="filtro" type="text" placeholder="Buscar por nombre..."/>
                </f7-list-item>
                <f7-list-item>
                    <f7-label floating>Precio Min</f7-label>
                    <f7-input v-model="precioMin" type="number"/>
                </f7-list-item>
                <f7-list-item>
                    <f7-label floating>Precio Max</f7-label>
                    <f7-input v-model="precioMax" type="number"/>
                </f7-list-item>
                <f7-block-title style="margin-top: 0" class="text-bm-red">Filtrar por categor&iacute;a</f7-block-title>
                <f7-list
                        class="searchbar-found"
                        style="padding-bottom: 16px"
                        media-list
                        virtual
                        :virtual-items="categorias"
                >
                    <t7-template>
                        <f7-list-button media-item :title="'{{nombre}}'"></f7-list-button>
                    </t7-template>
                </f7-list>
            </f7-list>
        </f7-popover>
        <div v-bar style="margin-top: 20px">
            <div style="max-height: 100%">
                <f7-list
                        id="search-list"
                        class="searchbar-found"
                        media-list
                        virtual
                        :virtual-items="productos"
                >
                    <t7-template>
                        <f7-list-item media-item link="#" :title="'{{nombre}}'"
                                      :subtitle="'{{empresa}}' "></f7-list-item>
                    </t7-template>
                </f7-list>
                <f7-list>
                    <infinite-loading ref="infiniteLoading"
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
                </f7-list>
            </div>
        </div>
    </f7-page>
</template>
<script>
    import InfiniteLoading from 'vue-infinite-loading';

    export default {
        data() {
            return {
                filtro: '',
                categoria: '',
                precioMin: 0,
                precioMax: 0,
                pagina: 1,
                productos: [],
                categorias: []
            }
        },
        mounted() {
            this.getAllCategorias();
        },
        computed: {
            getAllCategoriasURL() {
                return this.$store.state.baseUrl + "tiposproductos/all";
            },
            listarProductosURL() {
                return this.$store.state.baseUrl + "productos?precioMin=" + this.precioMin + "&precioMax=" + this.precioMax + "&nombre=" + this.filtro + "&categoria=" + this.categoria + "&pagina=" + this.pagina;
            },
            getNombreEmpresaURL() {
                return this.$store.state.baseUrl + "empresas/";
            }
        },
        methods: {
            getAllCategorias() {
                var _this = this;
                $.get(this.getAllCategoriasURL, function (response) {
                    _this.categorias = response;
                }).fail(function () {
                    _this.getAllCategorias();
                });
            },
            listarProductos($state) {
                var _this = this;
                setTimeout(() => {
                    $.get(_this.listarProductosURL, function (response) {
                        if (response !== undefined) {
                            if (response.length >= 1) {
                                $.each(response, function (index, producto) {
                                    $.get(_this.getNombreEmpresaURL + producto.empresa + "?fields=nombre", function (response2) {
                                        _this.productos.push({
                                            id: producto.id,
                                            nombre: producto.nombre || 'Desconocido...',
                                            empresa: response2.nombre || 'Desconocido...',
                                            precio: producto.precio || 0,
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
            resetProductos() {
                this.pagina = 1;
                this.productos = [];
                this.$refs.infiniteLoading.$emit('$InfiniteLoading:reset');
            }
        },
        components: {
            InfiniteLoading,
        },
    }
</script>
<template>
    <f7-page class="theme-black">
        <f7-navbar>
            <f7-nav-center><img src="../assets/blackMarket.gif" style="height: 50px; margin-top: 25px"></f7-nav-center>
            <f7-nav-right v-show="productos.length > 0" style="margin-right: 10px">
                <f7-button @click="validarProductos" round style="background-color: #b24e3a">realizar pedido</f7-button>
            </f7-nav-right>
        </f7-navbar>
        <f7-toolbar bottom style="background-color: #b24e3a">
            <f7-link href="/inicio/">
                <i class="home icon big" style="padding: 0; margin-top: 0"></i>
            </f7-link>
            <f7-link href="/carrito/"><i class="cart icon big" style="padding: 0; margin-top: 0"></i></f7-link>
            <f7-link href="/pedidos/"><i class="shipping icon big" style="padding: 0; margin-top: 0"></i></f7-link>
            <f7-link href="/app/" @click="logout"><i class="sign out icon big" style="padding: 0; margin-top: 0"></i>
            </f7-link>
        </f7-toolbar>
        <div class="ui relaxed divided items" style="padding-top: 25px">
            <f7-list :no-hairlines-between="true" :no-hairlines="true">
                <template v-for="prod in productos">
                    <f7-list-item
                            swipeout
                            @swipeout:deleted="quitarProductoDelCarrito(prod.id)"
                            :link="'/carrito-item/' + prod.id + '/'+ prod.nombre + '/'+prod.empresa + '/'+prod.precio + '/' + prod.cantidad"
                            class="ui link item text-bm-red hover-bm-f1"
                            style="cursor: pointer; padding:7px">
                        <f7-swipeout-actions>
                            <f7-swipeout-button delete>Eliminar</f7-swipeout-button>
                        </f7-swipeout-actions>
                        <div slot="inner-start" style="width:inherit">
                            <h2 class="ui header"
                                style="font-weight: 500;padding: 5px; color: inherit">
                                {{prod.nombre}}
                                <h3 class="ui header" style="margin-top: 5px; font-weight: 500; width: inherit">
                                    Cantidad: <span style="font-weight: 600;">x{{prod.cantidad + '  -  '}}</span>
                                    Precio: <span style="font-weight: 600;">${{prod.precio || 0}}</span>
                                </h3>
                            </h2>
                        </div>
                    </f7-list-item>
                </template>
            </f7-list>
        </div>
        <f7-popup class="theme-black" id="listaPopup">
            <f7-navbar style="background-color: #b24e3a">
                <f7-nav-left v-show="productos.length > 0" style="margin-right: 10px">
                    <f7-link icon="icon-back" close-popup="#listaPopup"></f7-link>
                </f7-nav-left>
                <f7-nav-center>Realizar pedido</f7-nav-center>
                <f7-nav-right v-show="productos.length > 0" style="margin-right: 10px">
                    <f7-button raised @click="realizarPedido" style="margin: 0; background-color: #000">Confirmar
                    </f7-button>
                </f7-nav-right>
            </f7-navbar>
            <div class="ui basic segment" style="background-color: #f1f5f9; margin: 0">
                <h3 class="ui header" style="font-weight: 500; margin-bottom: 5px">Precio total: <span
                        class="text-bm-red">${{total}}</span></h3>
                <h1 class="ui sub header huge grey" style="margin: 0; font-weight: 500; font-size: 17px;">
                    para un total de <span class="text-bm-red">{{cantProductos}}</span> productos</h1>
            </div>
            <f7-list style="margin-top: 0; margin-bottom: 0" :no-hairlines="true" form>
                <f7-list-item style="width: 100%">
                    <f7-label><h3 class="ui header text-bm-red" style="margin: 0; font-weight: 500;">
                        Especificar destino</h3></f7-label>
                    <f7-input placeholder="Ingrese el destino de su pedido..." type="text" v-model="destino"/>
                </f7-list-item>
            </f7-list>
            <f7-block-title style="margin-top: 0" class="text-bm-black">
                <div class="ui sub header huge" style="font-weight: 500;">Productos seleccionados</div>
            </f7-block-title>
            <f7-list :no-hairlines-between="true" style="margin: 0">
                <template v-for="prod in lista">
                    <f7-list-item
                            class="ui text-bm-red"
                            style="padding:7px">
                        <div slot="inner-start" style="width:inherit">
                            <h2 class="ui header"
                                style="font-weight: 500;padding: 5px; color: inherit">
                                {{prod.nombre}}
                                <h3 class="ui header" style="margin-top: 5px; font-weight: 500; width: inherit">
                                    Cantidad: <span style="font-weight: 600;">x{{prod.cantidad + '  -  '}}</span>
                                    Precio: <span style="font-weight: 600;">${{prod.precio || 0}}</span>
                                </h3>
                            </h2>
                        </div>
                    </f7-list-item>
                </template>
            </f7-list>
        </f7-popup>
    </f7-page>
</template>
<script>
    export default {
        data() {
            return {
                lista: [],
                total: 0,
                cantProductos: 0,
                destino: '',
            }
        },
        computed: {
            username() {
                return this.$store.state.username;
            },
            productos() {
                return this.$store.state.productos;
            },
            validarProductosURL() {
                return this.$store.state.baseUrl + "productos/validar";
            },
            realizarPedidoURL() {

            }
        },
        methods: {
            validarProductos() {
                this.lista = [];
                var _this = this;
                if (this.productos.length > 0) {
                    $.each(this.productos, function (index, producto) {
                        $.get(_this.validarProductosURL + '?producto=' + producto.id + '&cantidad=' + producto.cantidad, function (response) {
                            if (response.cantidad > 0) {
                                var prod = _this.productos.find(p => p.id === producto.id);
                                if (prod !== undefined) {
                                    _this.lista.push({
                                        id: producto.id,
                                        nombre: prod.nombre,
                                        precio: prod.precio || 0,
                                        cantidad: response.cantidad
                                    });
                                    _this.total += ((prod.precio || 0) * Number(response.cantidad));
                                    _this.cantProductos += Number(response.cantidad);
                                }
                            }
                        });
                    });
                    this.$f7.popup("#listaPopup");
                } else _this.mostrarNotificacion("Debes tener al menos un producto agregado al carrito!", 3000);
            },
            realizarPedido() {

            },
            quitarProductoDelCarrito(id) {
                if (id !== undefined && id !== null && id !== '') {
                    this.$store.commit('quitarProducto', id);
                    this.$storage.remove('carrito');
                    this.$storage.set('carrito', this.productos);
                    this.mostrarNotificacion("Producto quitado del carrito!", 3000);
                }
            },
            mostrarNotificacion(title, duration) {
                this.$f7.addNotification({
                    message: title,
                    hold: duration,
                    closeOnClick: true
                });
            },
            logout() {
                this.$store.commit('setUsername', '');
                this.$store.commit('setAutenticado', false);
                this.$cookie.delete('username');
                this.$storage.remove('carrito');
            }
        }
    }
</script>
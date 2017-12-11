<template>
    <f7-page>
        <f7-navbar class="theme-black">
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
            <f7-list>
                <template v-for="prod in productos">
                    <f7-list-item
                            swipeout
                            @swipeout:deleted="quitarProductoDelCarrito(prod.id)"
                            :link="'/carrito-item/' + prod.id + '/'+ prod.nombre + '/'+prod.empresa + '/'+prod.precio + '/' + prod.cantidad"
                            class="ui link item hover-bm-f1 text-bm-black hover-text-bm-red"
                            style="cursor: pointer; padding-top: 0; padding-left: 20px; padding-bottom: 10px">
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
    </f7-page>
</template>
<script>
    export default {
        data() {
            return {
                lista: []
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
            }
        },
        methods: {
            validarProductos() {
                this.lista = [];
                var _this = this;
                if (this.productos.length > 0) {
                    $.each(this.productos, function (index, producto) {
                        $.get(_this.validarProductosURL + '?producto=' + producto.id + '&cantidad=' + producto.cantidad, function (response) {
                            if (response !== undefined) {
                                if (response.cantidad > 0) {
                                    var prod = _this.productos.find(p => p.id === response.id);
                                    if (prod !== undefined) {
                                        _this.lista.push({
                                            id: response.id,
                                            nombre: prod.nombre,
                                            precio: prod.precio || 0,
                                            cantidad: response.cantidad
                                        });
                                    }
                                }
                            }
                        });
                    });
                } else _this.mostrarNotificacion("Debes tener al menos un producto agregado al carrito!", 3000);
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
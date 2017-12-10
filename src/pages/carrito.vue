<template>
    <f7-page>
        <f7-navbar class="theme-black">
            <f7-nav-center><img src="../assets/blackMarket.gif" style="height: 50px; margin-top: 25px"></f7-nav-center>
            <f7-nav-right style="margin-top: -40px">

            </f7-nav-right>
        </f7-navbar>
        <f7-toolbar bottom style="background-color: #b24e3a">
            <f7-link href="/inicio/">
                <i class="home icon big" style="padding: 0; margin-top: 0"></i>
            </f7-link>
            <f7-link href="/carrito/"><i class="cart icon big" style="padding: 0; margin-top: 0"></i></f7-link>
            <f7-link><i class="shipping icon big" style="padding: 0; margin-top: 0"></i></f7-link>
            <f7-link @click="logout"><i class="sign out icon big" style="padding: 0; margin-top: 0"></i></f7-link>
        </f7-toolbar>
        <div class="ui relaxed divided items" style="padding-top: 65px">
            <template v-for="prod in productos">
                <f7-link
                        :href="'/productos/' + prod.id + '/'+ prod.nombre + '/'+prod.empresa"
                        class="ui link item hover-bm-f1 text-bm-black hover-text-bm-red"
                        style="cursor: pointer; padding-top: 10px; padding-left: 20px; padding-bottom: 10px">
                    <h2 class="ui header" style="font-weight: 500; margin: 0; padding: 5px; color: inherit">
                        {{prod.nombre}}
                        <h4 class="ui header" style="margin-top: 5px"><i
                                class="user outline circle icon grey"></i>{{prod.empresa}}
                        </h4>
                    </h2>
                </f7-link>
            </template>
        </div>
    </f7-page>
</template>
<script>
    export default {
        data() {
            return {}
        },
        computed: {
            username() {
                return this.$store.state.username;
            },
            productos() {
                return this.$store.state.productos;
            }
        },
        methods: {
            logout() {
                this.$store.commit('setUsername', '');
                this.$store.commit('setAutenticado', false);
                this.$cookie.delete('username');
            }
        }
    }
</script>
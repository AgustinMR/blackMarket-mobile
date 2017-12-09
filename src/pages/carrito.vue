<template>
    <f7-page>
        <div class="ui relaxed divided items" style="margin-top:20px">
            <template v-for="prod in productos">
                <f7-link
                        :href="'/productos/' + prod.id + '/'+ prod.nombre + '/'+prod.empresa"
                        class="ui link item hover-bm-f1 text-bm-black hover-text-bm-red"
                        style="cursor: pointer; padding: 20px">
                    <h2 class="ui header" style="font-weight: 500; margin: 0; padding: 0; color: inherit">
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
        methods: {}
    }
</script>
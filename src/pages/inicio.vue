<template>
    <f7-page name="inicio">
        <f7-navbar class="theme-black" sliding>
            <f7-nav-left>
                <f7-link icon="icon-bars" open-panel="left"></f7-link>
            </f7-nav-left>
            <f7-nav-center><img src="../assets/blackMarket.gif" style="height: 50px; margin-top: 25px"></f7-nav-center>
        </f7-navbar>
        <f7-panel left cover layout="dark" style="margin-top: 20px; padding: 0">
            <f7-list>
                <f7-list-button>Productos</f7-list-button>
                <f7-list-button>Pedidos</f7-list-button>
            </f7-list>
        </f7-panel>
    </f7-page>
</template>
<script>
    export default {}
</script>
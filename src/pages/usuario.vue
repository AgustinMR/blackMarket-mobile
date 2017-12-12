<template>
    <f7-page>
        <div class="ui left aligned basic segment" style="margin-top: 60px; padding: 20px">
            <h3 class="ui header">
                <i class="user circle outline grey icon"></i>{{username}}
            </h3>
            <h3 class="ui header">
                <i class="tag grey icon"></i>{{email}}
            </h3>
        </div>
    </f7-page>
</template>
<script>
    export default {
        data() {
            return {
                email: '',
            }
        },
        computed: {},
        methods: {}
    }
</script>
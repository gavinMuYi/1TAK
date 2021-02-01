<template>
    <div id="stylePanel" v-if="show">
        <div id="stylePanelOther" @click="show = false"></div>
        <div id="stylePanelContent"></div>
    </div>
</template>

<script>
    export default {
        name: 'StyleEditor',
        data () {
            return {
                show: false
            }
        },
        methods: {
            open () {
                this.show = true;
            }
        }
    }
</script>

<style lang="less">
    #stylePanel {
        position: fixed;
        width: 100%;
        height: 100%;
        left: 0;
        bottom: 0;
        z-index: 10000;
        #stylePanelOther {
            height: ~'calc(100% - 500px)';
            position: fixed;
            width: 100%;
            height: 500px;
            left: 0;
            top: 0;
            background: #ededed4d;
        }
        #stylePanelContent {
            height: 500px;
            position: fixed;
            width: 100%;
            height: 500px;
            left: 0;
            bottom: 0;
            background: #0c0c15bd;
        }
    }
</style>

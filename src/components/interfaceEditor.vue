<template>
    <div class="interface-editor" v-if="showPanel">
        111
    </div>
</template>

<script>
    export default {
        name: 'InterfaceEditor',
        data () {
            return {
                showPanel: false
            }
        },
        methods: {
            visibleChange () {
                this.showPanel = !this.showPanel;
            }
        }
    }
</script>

<style lang="less">
    .interface-editor {
        position: fixed;
        z-index: 10000000;
        top: 0px;
        left: 0px;
        background: @mainop;
        color: @dep;
        width: 800px;
        height: 100%;
        overflow: auto;
    }
</style>

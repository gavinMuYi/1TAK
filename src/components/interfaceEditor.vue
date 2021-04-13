<template>
    <div class="interface-editor" v-if="showPanel">
        <single-select v-model="currentMock" :options="mockUrls" />
    </div>
</template>

<script>
    import SingleSelect from './styleEditor/components/single-select';
    export default {
        name: 'InterfaceEditor',
        components: {
            SingleSelect
        },
        data () {
            return {
                showPanel: false,
                currentMock: '',
                mockUrls: []
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
        .single-select {
            background: #fff;
            margin: 20px 40px;
        }
    }
</style>

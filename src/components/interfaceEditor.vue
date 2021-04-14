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
        mounted () {
            this.$ajax.get('https://mini-lab-cloudbase-4dxr8e7b614a4-1259082755.ap-shanghai.app.tcloudbase.com/container-gahoulab/getInterfaceList').then(e => {
                console.log(e.data.data.records);
                this.$set(this, 'mockUrls', e.data.data.records);
            });
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

<template>
    <div :class="['pre-script-editor', { 'pre-script-editor-open': open }]">
        <span class="iconfont icon-zuzhuangguanli" @click="closePannel"></span>
        <div class="pre-script-title">前置脚本</div>
    </div>
</template>

<script>
    export default {
        name: 'preScriptEditor',
        data () {
            return {
                open: false,
                preScript: window.preScript
            }
        },
        methods: {
            openPannel () {
                this.open = true;
            },
            closePannel () {
                this.open = false;
            }
        }
    }
</script>

<style lang="less">
    .pre-script-editor {
        position: fixed;
        z-index: 10000000;
        top: 0px;
        left: 0px;
        background: #034a43e8;
        width: 100%;
        height: 100%;
        overflow: auto;
        border-right: 1px solid #034a43;
        display: none;
        background: #034a43e8;
    }
    .pre-script-editor-open {
        display: block;
        .icon-zuzhuangguanli {
            position: fixed;
            right: 20px;
            top: 20px;
            font-size: 26px;
            color: #fff;
            &:hover {
                color: @dep;
                cursor: pointer;
            }
        }
        .pre-script-title {
            color: #fff;
            margin: 30px;
            font-size: 24px;
            font-weight: 700;
        }
    }
</style>

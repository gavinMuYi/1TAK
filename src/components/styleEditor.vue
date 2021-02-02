<template>
    <div id="stylePanel" v-if="show">
        <div id="stylePanelOther" @click="show = false"></div>
        <div id="stylePanelContent">
            <div class="paper">
                <div id="stylePanelPreview"></div>
            </div>
        </div>
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
            background: #ededed00;
        }
        #stylePanelContent {
            height: 500px;
            position: fixed;
            width: 100%;
            height: 500px;
            left: 0;
            bottom: 0;
            border-top: 1px solid #ededed;
            background: #FFF;
            padding: 20px;
            box-sizing: border-box;
            .paper {
                width: 40%;
                height: 100%;
                display: inline-block;
                border: 1px solid #ededed;
                box-shadow: 3px 2px 2px 0 rgb(30 35 48 / 25%);
                border-radius: 5px;
                position: relative;
                overflow: auto;
                box-sizing: border-box;
                padding: 30px;
                #stylePanelPreview {
                    display: flex;
                    display: -webkit-flex;
                    align-items:center;
                    justify-content:center;
                    width: 1000px;
                    height: 1000px;
                }
            }
        }
    }
</style>

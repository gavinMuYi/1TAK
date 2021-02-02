<template>
    <div id="stylePanel" v-if="show">
        <div id="stylePanelOther" @click="show = false"></div>
        <div id="stylePanelContent">
            <div class="paper" ref="paper">
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
                this.$nextTick(() => {
                    this.$refs.paper.scrollTop = 5000 - 300;
                    this.$refs.paper.scrollLeft = 5000 - 250;
                });
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
            height: 700px;
            left: 0;
            bottom: 0;
            border-top: 1px solid #ededed;
            background: #333333e8;
            padding: 20px;
            box-sizing: border-box;
            .paper {
                width: 550px;
                height: 100%;
                display: inline-block;
                border: 1px solid #ededed;
                border-radius: 5px;
                position: relative;
                overflow: auto;
                box-sizing: border-box;
                background: #FFF;
                padding: 30px;
                #stylePanelPreview {
                    display: flex;
                    display: -webkit-flex;
                    align-items:center;
                    justify-content:center;
                    width: 10000px;
                    height: 10000px;
                }
            }
        }
    }
</style>

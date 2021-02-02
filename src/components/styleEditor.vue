<template>
    <div id="stylePanel" :class="show ? 'style-panel-open' : 'style-panel-close'">
        <div id="stylePanelOther" @click="show = false" v-if="show"></div>
        <div id="stylePanelContent" :class="show ? 'style-content-open' : 'style-content-close'">
            <div class="paper" ref="paper" v-if="show">
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
    .style-panel-open {
        opacity: 1;
    }
    #stylePanel.style-panel-close {
        opacity: 0;
        height: 0;
        overflow: hidden;
    }
    #stylePanel {
        position: fixed;
        width: 100%;
        height: 100%;
        left: 0;
        bottom: 0;
        z-index: 10000;
        transition: opacity 1s;
        #stylePanelOther {
            height: ~'calc(100% - 500px)';
            position: fixed;
            width: 100%;
            height: 500px;
            left: 0;
            top: 0;
            background: #ededed00;
        }
        #stylePanelContent.style-content-close {
            height: 0;
        }
        #stylePanelContent {
            transition: height 1s;
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

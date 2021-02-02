<template>
    <div id="stylePanel" :class="show ? 'style-panel-open' : 'style-panel-close'">
        <div id="stylePanelOther" @click="show = false" v-if="show"></div>
        <div id="stylePanelContent" :class="show ? 'style-content-open' : 'style-content-close'">
            <div class="paper" ref="paper">
                <div id="stylePanelPreview" v-if="show"></div>
            </div>
            <div class="dom-tree">{{ currentTree }}
            </div>
            <div class="style-edit-bar">
                <tree-item :data="[{children: [{children : []}]}]"/></div>
        </div>
    </div>
</template>

<script>
    import TreeItem from './tree-item';

    export default {
        name: 'StyleEditor',
        components: {
            TreeItem
        },
        props: {
            nowEdit: {
                type: Object,
                default: () => {
                    return {}
                }
            }
        },
        data () {
            return {
                show: false,
                currentTree: null
            }
        },
        methods: {
            open () {
                this.show = true;
                this.$nextTick(() => {
                    this.$refs.paper.scrollTop = 5000 - 290;
                    this.$refs.paper.scrollLeft = 5000 - 400;
                    this.$nextTick(() => {
                        var currentEL = document.getElementById('stylePanelPreview').childNodes[0];
                        this.currentTree = [this.getTree(currentEL)];
                    });
                });
            },
            getTree (root) {
                var regEx = /\s+/g;
                if ((!root.childNodes.length && (root.nodeType !== 3) && (root.nodeName !== 'SCRIPT')) ||
                (root.childNodes.length === 1 && root.childNodes[0].nodeType === 3)) {
                    return {
                        dom: root,
                        type: 'leaf',
                        class: root.className ? ('.' + root.className.replace(regEx, '.')) : '',
                        id: root.id ? ('#' + root.id) : '',
                        tagName: root.tagName.toLowerCase()
                    };
                } else {
                    let children = [];
                    for (let i = 0; i < root.childNodes.length; i++) {
                        var node = root.childNodes[i];
                        // 过滤 text 节点、script 节点
                        if ((node.nodeType !== 3) && (node.nodeName !== 'SCRIPT')) {
                            var child = this.getTree(node);
                            children.push(child);
                        }
                    }
                    return {
                        dom: root,
                        type: 'father',
                        class: root.className ? ('.' + root.className.replace(regEx, '.')) : '',
                        id: root.id ? ('#' + root.id) : '',
                        tagName: root.tagName.toLowerCase(),
                        children: children
                    };
                }
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
            padding: 30px 20px;
            box-sizing: border-box;
            .paper {
                width: 850px;
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
            .dom-tree {
                border-radius: 5px;
                display: inline-block;
                width: ~'calc(100% - 1280px)';
                height: 100%;
                padding: 30px 10px;
                vertical-align: top;
                box-sizing: border-box;
                border: 1px solid #333;
                background: #333;
                margin: 0 10px;
                overflow: auto;
            }
            .style-edit-bar {
                border-radius: 5px;
                display: inline-block;
                width: 400px;
                height: 100%;
                padding: 10px 10px;
                vertical-align: top;
                box-sizing: border-box;
                border: 1px solid #333;
                background: #FFF;
                overflow: auto;
            }
        }
    }
</style>

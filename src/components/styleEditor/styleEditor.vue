<template>
    <div id="stylePanel" :class="show ? 'style-panel-open' : 'style-panel-close'">
        <div id="stylePanelOther" @click="close" v-if="show"></div>
        <div id="stylePanelContent" :class="show ? 'style-content-open' : 'style-content-close'">
            <div class="paper" ref="paper">
                <div id="stylePanelPreview" v-if="show"></div>
            </div>
            <div class="dom-tree">
                <dom-tree :data="currentTree" @editStyle="editStyle" v-if="show" />
            </div>
            <div class="style-edit-bar">
                <styleBar :domName="domName" :domStyle="domStyle" @change="diffChangeStyle"/>
            </div>
        </div>
    </div>
</template>

<script>
    import DomTree from './dom-tree';
    import StyleBar from './style-bar';
    import { styleCompConfig } from './styleEditor.config.js';

    export default {
        name: 'StyleEditor',
        components: {
            DomTree,
            StyleBar
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
                currentTree: null,
                domName: '',
                domStyle: {}
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
            close () {
                this.domName = '';
                this.domStyle = {};
                this.currentTree = null;
                this.show = false;
            },
            getTree (root) {
                if ((!root.childNodes.length && (root.nodeType !== 3) && (root.nodeName !== 'SCRIPT')) ||
                (root.childNodes.length === 1 && root.childNodes[0].nodeType === 3)) {
                    return {
                        dom: root,
                        type: 'leaf',
                        class: root.className,
                        id: root.id,
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
                        class: root.className,
                        id: root.id,
                        tagName: root.tagName.toLowerCase(),
                        children: children
                    };
                }
            },
            editStyle (dom, name) {
                this.domName = name;
                this.domStyle = {};
                let comstyle = getComputedStyle(dom.dom);
                styleCompConfig.forEach(rule => {
                    this.$set(this.domStyle, rule.key, dom.dom.style[rule.key] || comstyle[rule.key]);
                });
            },
            diffChangeStyle (newStyle) {
                // domName
                // domStyle
                // newStyle
                // create style dom
                // function add_css(str_css){
                // var style=document.createElement("style");
                // style.type="text/css";
                // style.id="styleEditorPreview";
                // style.innerHTML=str_css;
                // document.getElementsByTagName("head").item(0).appendChild(style);
                // }
                // add_css("div{color:red}")
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
                width: ~'calc(100% - 1200px)';
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
                width: 320px;
                height: 100%;
                padding: 20px 10px;
                vertical-align: top;
                box-sizing: border-box;
                border: 1px solid #333;
                background: #FFF;
                overflow: auto;
            }
        }
    }
</style>

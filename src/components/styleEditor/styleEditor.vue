<template>
    <div id="stylePanel" :class="show ? 'style-panel-open' : 'style-panel-close'">
        <div id="stylePanelOther" @click="close" v-if="show"></div>
        <div id="stylePanelContent" :class="show ? 'style-content-open' : 'style-content-close'">
            <div class="paper" ref="paper">
                <div id="stylePanelPreview" v-if="show"></div>
            </div>
            <div class="dom-tree">
                <dom-tree :data="currentTree" @editStyle="editStyle" v-if="show" ref="domTree" />
            </div>
            <div class="style-edit-bar" v-if="show">
                <styleBar v-if="!bycode" :domName="domName" :domStyle="domStyle" @change="diffChangeStyle" @update="update" />
                <div v-else class="customer-style-editor">
                    <span class="code-tit">在对象中编辑CSS(JSON格式)</span>
                    <span class="btn" @click="emitStyle">预览</span>
                    <span class="btn" @click="doUpdate">更新</span>
                    <ide-textarea :code="JSON.stringify(currentStyle)" ref="styleIDE" type="application/json" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import DomTree from './dom-tree';
    import StyleBar from './style-bar';
    import IdeTextarea from '../ideTextarea';
    import cssConfigJSON from './cssConfig.json';
    import { addCss } from '../../utils/common.js';

    export default {
        name: 'StyleEditor',
        components: {
            DomTree,
            StyleBar,
            IdeTextarea
        },
        props: {
            bycode: {
                type: Boolean,
                dafault: false
            },
            nowEdit: {
                type: Object,
                default: () => {
                    return {}
                }
            },
            currentStyle: {
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
                domStyle: {},
                style: {},
                global_style: {},
                cacheStyle: {}
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
                        this.$nextTick(() => {
                            this.$refs.domTree.editStyle('', '', '', '', 0);
                        });
                    });
                });
            },
            close () {
                this.global_style = {};
                this.cacheStyle = {};
                this.style = {};
                this.domName = '';
                this.domStyle = {};
                this.currentTree = null;
                this.show = false;
                var oldStyle = document.getElementById('styleEditorPreview');
                oldStyle && oldStyle.remove();
            },
            doUpdate () {
                let sty = JSON.parse(this.$refs.styleIDE.getValue());
                this.$emit('update', sty);
                this.close();
            },
            update () {
                this.$emit('update', this.global_style);
                this.close();
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
            emitStyle () {
                let sty = JSON.parse(this.$refs.styleIDE.getValue());
                let target = {};
                Object.keys(sty).forEach(css => {
                    target['#stylePanelPreview ' + css] = sty[css];
                });
                this.createStyle(target);
            },
            editStyle (dom, name, domStyle, comstyle) {
                let cssLength = Object.keys(domStyle).length;
                this.domName = name;
                this.domStyle = {};
                cssConfigJSON.css.forEach(rule => {
                    let css = dom.dom.style[rule.key] || (cssLength ? domStyle[rule.key] : comstyle[rule.key]);
                    if (rule.key.indexOf('background') > -1) {
                        css = cssLength ? domStyle[rule.key] : comstyle[rule.key];
                    }
                    this.$set(this.domStyle, rule.key, css);
                });
                if (!this.cacheStyle[this.domName]) {
                    this.cacheStyle[this.domName] = this.domStyle;
                }
            },
            diffChangeStyle (newStyle) {
                let cssStyle = {};
                if (!newStyle || !this.cacheStyle[this.domName]) {
                    return;
                }
                cssConfigJSON.css.forEach(rule => {
                    if (this.cacheStyle[this.domName][rule.key] !== newStyle[rule.key]) {
                        cssStyle[rule.key] = newStyle[rule.key];
                    }
                });
                this.style['#stylePanelPreview ' + this.domName] = cssStyle;
                this.global_style[this.domName] = cssStyle;
                this.createStyle();
            },
            createStyle (stylein) {
                let sty = stylein || this.style;
                var oldStyle = document.getElementById('styleEditorPreview');
                oldStyle && oldStyle.remove();
                let styleStr = '';
                Object.keys(sty).forEach(key => {
                    let cssStr = '';
                    Object.keys(sty[key]).forEach(css => {
                        cssStr += `${css}: ${sty[key][css]};`;
                    })
                    styleStr += `${key} {${cssStr}}`
                });
                addCss(styleStr, 'styleEditorPreview');
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
            background: @mainop;
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
                width: ~'calc(100% - 1260px)';
                height: 100%;
                padding: 30px 10px;
                vertical-align: top;
                box-sizing: border-box;
                border: 1px solid #1b1919;
                background: #1b1919;
                margin: 0 10px;
                overflow: auto;
            }
            .style-edit-bar {
                border-radius: 5px;
                display: inline-block;
                width: 380px;
                height: 100%;
                padding: 20px 10px;
                vertical-align: top;
                box-sizing: border-box;
                border: 1px solid @sub;
                background: #FFF;
                overflow: auto;
                position: relative;
                .change-btn {
                    position: absolute;
                    top: 10px;
                    left: 10px;
                    z-index: 100000;
                    color: @dep;
                    font-weight: 700;
                }
                .customer-style-editor {
                    margin-top: 20px;
                    .btn {
                        position: relative;
                        top: -20px;
                    }
                    .code-tit {
                        position: relative;
                        top: -20px;
                        color: @dep;
                        font-weight: 700;
                        left: 5px;
                    }
                    .CodeMirror {
                        width: 350px;
                        height: 550px;
                    }
                }
            }
        }
    }
</style>

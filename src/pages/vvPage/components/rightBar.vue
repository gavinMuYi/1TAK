<template>
    <div class="right-bar">
        <div class="title">{{ currentEdit.content ? '容器' : '子组件' }}</div>
        <div class="config-bar" v-if="Object.keys(currentEdit).length"><div class="config-comp">
            <span class="config-comp-title vv-title">组件分类: </span>
                <span>{{ compType[currentEdit.type] }}</span>
            </div>
            <div class="config-comp">
                <span class="config-comp-title vv-title">组件类型: </span>
                <span>{{ currentEdit.content ? '容器' : getType(currentEdit.id) }}</span>
            </div>
            <div class="config-comp">
                <span class="config-comp-title vv-title">ID: </span>
                <span>{{ currentEdit.config.hash }}</span>
            </div>
            <div class="config-comp" v-if="!currentEdit.content">
                <span class="config-comp-title vv-title">X轴: </span>
                <input v-model="currentEdit.x" @keydown="moveDom($event, 'x')" /> px
            </div>
            <div class="config-comp" v-if="!currentEdit.content">
                <span class="config-comp-title vv-title">Y轴: </span>
                <input v-model="currentEdit.y" @keydown="moveDom($event, 'y')" /> px
            </div>
            <div class="config-comp" v-if="!currentEdit.content">
                <span class="config-comp-title vv-title">组件样式: </span>
                <span class="btn btn-style" @click="changeStyle(true)">调整</span>
                <span class="btn btn-style" @click="changeStyle(false)">Code</span>
                <styleEditor ref="styleEditor" :nowEdit="currentEdit" @update="updateStyle" :currentStyle="this.currentEdit.config.style || {}" :bycode="bycode" />
            </div>
            <div class="config-comp" v-if="currentEdit.content">
                <span class="config-comp-title vv-title">容器暴露接口: </span>
                <span>{{ currentEdit.config.data.props }}</span>
            </div>
            <div v-if="!currentEdit.content">
                <div class="config-comp" v-if="!currentEdit.content">
                    <span class="config-comp-title vv-title">组件配置: </span>
                </div>
                <div class="event-system">
                    <div class="config-comp" v-for="key in Object.keys(cusComp.config.data.data)" :key="key">
                        <span v-if="key === currentEdit.config.hash">
                            <div class="config-comp vv-title" v-if="Object.keys(cusComp.config.data.data[key]).length">组件接口:</div>
                            <div class="config-comp props-item" v-for="datakey in Object.keys(cusComp.config.data.data[key])" :key="datakey">
                                <span class="config-comp-title" :title="datakey">{{ datakey }}</span>
                                <textarea v-model="cusComp.config.data.data[key][datakey]" @change="emitChange()" />
                            </div>
                            <div class="config-comp vv-title" v-if="hasEvent(key)">事件处理:</div>
                            <div class="config-comp" v-for="(eventKey, eventIndex) in Object.keys(cusComp.config.data.eventHandlers)" :key="eventKey">
                                <div v-show="eventKey.indexOf(key) > -1">
                                    <div class="config-comp">
                                        <span class="config-comp-title">事件名: </span>
                                        <span>{{ cusComp.config.data.eventHandlers[eventKey].label }}</span>
                                    </div>
                                    <div class="config-comp">
                                        <span class="config-comp-title">事件参数: </span>
                                        <span>{{ cusComp.config.data.eventHandlers[eventKey].params }}</span>
                                    </div>
                                    <div class="config-comp">
                                        <div class="config-comp">事件处理器: <span class="btn" @click="emitEvent(eventKey, eventIndex)">更新</span></div>
                                        <ide-textarea :code="loaclHandler[eventKey]" ref="eventIDE" />
                                    </div>
                                </div>
                            </div>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { unitCompIcons } from '../config.js';
    import IdeTextarea from '../../../components/ideTextarea';
    import StyleEditor from '../../../components/styleEditor/styleEditor';

    export default {
        name: 'RightBar',
        components: {
            IdeTextarea,
            StyleEditor
        },
        props: {
            nowEdit: {
                type: Object,
                default: () => {
                    return {}
                }
            },
            cusComp: {
                type: Object,
                default: () => {
                    return {}
                }
            }
        },
        data () {
            return {
                unitCompIcons: unitCompIcons,
                bycode: false,
                compType: {
                    unit: '单位组件',
                    combination: '组合组件',
                    nestification: '嵌套组件'
                }
            }
        },
        computed: {
            currentEdit () {
                return this.nowEdit;
            },
            loaclHandler () {
                let res = {};
                Object.keys(this.cusComp.config.data.eventHandlers).forEach(eventKey => {
                    res[eventKey] = this.cusComp.config.data.eventHandlers[eventKey].handler;
                });
                return res;
            }
        },
        watch: {
            currentEdit: {
                handler (val) {
                    this.$emit('updateParams', val);
                },
                deep: true
            }
        },
        methods: {
            updateStyle (val) {
                this.$set(this.currentEdit.config, 'style', val);
                this.$emit('updateParams', this.currentEdit);
            },
            emitEvent (eventKey, eventIndex) {
                this.cusComp.config.data.eventHandlers[eventKey].handler = this.$refs.eventIDE[eventIndex].getValue();
                this.emitChange();
            },
            emitChange () {
                this.$emit('updateParams', this.currentEdit);
            },
            hasEvent (key) {
                let res = false;
                Object.keys(this.cusComp.config.data.eventHandlers).forEach(eventKey => {
                    eventKey.indexOf(key) > -1 && (res = true);
                });
                return res;
            },
            changeStyle (flag) {
                if (flag) {
                    this.bycode = false;
                } else {
                    this.bycode = true;
                }
                this.$refs.styleEditor.open();
                this.$nextTick(() => {
                    let stylePanel = document.getElementById('stylePanelPreview');
                    // 从外层盒子开始改变
                    let currentEL = document.getElementById(this.currentEdit.config.hash + '-box').cloneNode(true);
                    currentEL.style.position = 'static';
                    stylePanel.appendChild(currentEL);
                })
            },
            getType (id) {
                let res = '';
                this.unitCompIcons.forEach(item => {
                    item.key === id && (res = item.name);
                });
                return res;
            },
            moveDom (ev, s) {
                switch (ev.keyCode) {
                case 38:
                    this.currentEdit[s]++;
                    break;
                case 40:
                    this.currentEdit[s]--;
                    break;
                default:
                    break;
                }
            }
        }
    }
</script>

<style lang="less">
    .event-box {
        &:before {
            content: '';
            position: absolute;
            top: -7px;
            left: -7px;
            width: 100%;
            height: 100%;
            padding: 5px;
            border: 2px dashed @sub;
            border-radius: 3px;
        }
    }
    .right-bar {
        font-size: 14px;
        display: inline-block;
        height: 100%;
        width: 300px;
        border-left: 1px solid #ededed;
        vertical-align: top;
        .vv-title {
            color: #191f1e;
            font-weight: 700;
        }
        .event-system {
            padding-left: 15px;
            border-left: 1px solid #ededed;
            border-bottom: 1px solid #ededed;
        }
        .compname {
            color: @sub;
            font-weight: 700;
        }
        .config-bar {
            overflow: auto;
            width: 308px;
            height: ~'calc(100% - 30px)';
            box-sizing: border-box;
            padding: 20px 10px 0 20px;
            .props-item {
                .config-comp-title {
                    width: 50px;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    vertical-align: top;
                }
            }
            .config-comp {
                margin-bottom: 10px;
                .btn {
                    border: 1px solid #ededed;
                    font-size: 12px;
                    padding: 2px 5px;
                    border-radius: 3px;
                    background: #ededed;
                    float: right;
                    margin-right: 12px;
                    box-shadow: 3px 2px 2px 0 rgb(30 35 48 / 25%);
                    border: 1px solid #ededed;
                }
                .btn-style {
                    float: none;
                    width: 50px;
                    vertical-align: middle;
                    height: 16px;
                    line-height: 16px;
                    display: inline-block;
                    text-align: center;
                }
                .config-comp-title {
                    display: inline-block;
                    margin-right: 5px
                }
            }
        }
    }
</style>

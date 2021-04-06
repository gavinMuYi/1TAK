<template>
    <div :class="['right-bar', {'content-right-bar': currentEdit.content}]">
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
                <span @click="changeStyle(true)"><span class="iconfont icon-pintu css-btn"></span>调整</span>
                <span @click="changeStyle(false)"><span class="iconfont icon-daima css-btn"></span>代码</span>
                <styleEditor ref="styleEditor" :nowEdit="currentEdit" @update="updateStyle" :currentStyle="this.currentEdit.config.style || {}" :bycode="bycode" />
            </div>
            <div class="config-comp" v-if="currentEdit.content">
                <span class="config-comp-title vv-title">容器暴露接口: </span>
                <span>{{ currentEdit.config.data.props }}</span>
            </div>
            <div class="config-comp global-data" v-if="currentEdit.content" :key="'globalDataIDE' + currentEdit.content">
                <div class="config-comp vv-title">全局变量: <span class="iconfont icon-gengxin2 global-gx" @click="emitglobalData"></span></div>
                <ide-textarea :code="globalData" ref="globalDataIDE" type="application/json" :key="currentEdit.content" />
            </div>
            <div class="config-comp global-data" v-if="currentEdit.content" :key="lifeCycleKey">
                <div class="config-comp vv-title">生命周期:
                    <span class="life-cycle">
                        <single-select v-model="lifeCycleKey" :options="lifeCycleOptions" />
                    </span>
                    <span class="iconfont icon-gengxin2 global-gx" @click="emitlifeCycle"></span>
                </div>
                <ide-textarea :code="lifeCycle[lifeCycleKey] || 'function () {}'" ref="lifeCycleIDE" :key="lifeCycleKey + 'IDE'" />
            </div>
            <div v-if="!currentEdit.content">
                <div class="config-comp" v-if="!currentEdit.content">
                    <span class="config-comp-title vv-title">组件配置: </span>
                </div>
                <div class="event-system">
                    <div class="config-comp" v-for="key in Object.keys(cusComp.config.data.data)" :key="key">
                        <span v-if="key === currentEdit.config.hash">
                            <div class="config-comp" v-if="!currentEdit.content">
                                <span class="config-comp-title vv-title">v-if: </span>
                                <span
                                    :class="['iconfont', {'icon--qiyong': !currentEdit.config.vif}, {'icon-qiyong': currentEdit.config.vif}]"
                                    @click="emitSetVif(false)"></span>
                                <span v-if="currentEdit.config.vif" class="props-data">
                                    <span @click="emitSetVif(true)" class="iconfont icon-gengxin2 props-data-gx"></span>
                                    <ide-textarea :code="currentEdit.config.vif" ref="vifIDE" />
                                </span>
                            </div>
                            <div class="config-comp" v-if="!currentEdit.content">
                                <span class="config-comp-title vv-title">v-for: </span>
                                <span>{{ currentEdit.config.vfor }}</span>
                            </div>
                            <div class="config-comp vv-title" v-if="Object.keys(cusComp.config.data.data[key]).length">组件接口:</div>
                            <div class="config-comp props-item" v-for="datakey in Object.keys(cusComp.config.data.data[key])" :key="datakey">
                                <span class="config-comp-title props-title" :title="datakey">
                                    <span @click="emitSetProps(datakey, false)" :class="['iconfont', {'icon-shurukuang1': !currentEdit.config.props[datakey]}, {'icon-daima': currentEdit.config.props[datakey]}]"></span>
                                    {{ datakey }}
                                </span>
                                <span v-if="currentEdit.config.props[datakey]" class="props-data">
                                    <span @click="emitSetProps(datakey, true)" class="icon-gengxin2 iconfont"></span>
                                    <ide-textarea :code="currentEdit.config.props[datakey]" :ref="datakey + 'IDE'" />
                                </span>
                                <textarea v-else v-model="cusComp.config.data.data[key][datakey]" @change="emitChange()" />
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
                                        <div class="config-comp">事件处理器: <span class="event-gx-btn iconfont icon-gengxin2" @click="emitEvent(eventKey, eventIndex)"></span></div>
                                        <ide-textarea :code="loaclHandler[eventKey]" ref="eventIDE" />
                                    </div>
                                </div>
                            </div>
                            <div v-if="currentEdit.config.slot.length">
                                <div class="config-comp vv-title">组件插槽:</div>
                                    <div class="config-comp slot-box" v-for="(slot, slotIndex) in currentEdit.config.slot" :key="slot.name + slotIndex">
                                        <div>
                                            <div class="config-comp">
                                                <span class="config-comp-title">插槽名: </span>
                                                <span>{{ slot.name }}</span>
                                            </div>
                                            <div class="config-comp">
                                                <span class="config-comp-title">插槽参数: </span>
                                                <span>{{ slot.params }}</span>
                                            </div>
                                            <div class="config-comp">
                                                <span class="config-comp-title">插槽组件: </span>
                                                <span v-if="slot.children && slot.children.length" @click="showSlotPanel(slot.name)">
                                                    {{ slot.children.map(e => { return e.name } ) }}
                                                    <span class="iconfont icon-bianji1"></span>
                                                </span>
                                                <span class="iconfont icon-gengduo1" v-else @click="showSlotPanel(slot.name)"></span>
                                            </div>
                                        </div>
                                        <div :class="['slot-editor-panel', { 'slot-editor-panel-open': slotPanel }, { 'slot-editor-panel-close': !slotPanel }]" :key="currentEdit.config.hash + '_' + slot.name" v-if="slotPanel && slot.name === slotName">
                                            <span class="slot-name">
                                                slot编辑: {{ currentEdit.config.hash + '_' + slotName }}
                                            </span>
                                            <span @click="updateSlot" class="update-slot">
                                                <span class="iconfont icon-shangji"></span>更新到上层
                                            </span>
                                            <div v-if="slotPanel" style="height: 100%">
                                                <vv-page :topDataLevel="false" :preCusComp="preCusComp" ref="vvpage" />
                                            </div>
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
    import SingleSelect from '../../../components/styleEditor/components/single-select';

    export default {
        name: 'RightBar',
        components: {
            IdeTextarea,
            StyleEditor,
            SingleSelect,
            VvPage: () => import('../index.vue')
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
            },
            lifeCycle: {
                type: Object,
                default: () => {
                    return {}
                }
            }
        },
        data () {
            return {
                preCusComp: undefined,
                unitCompIcons: unitCompIcons,
                bycode: false,
                slotPanel: false,
                slotName: '',
                compType: {
                    unit: '单位组件',
                    combination: '组合组件',
                    nestification: '嵌套组件'
                },
                lifeCycleKey: 'beforeCreate',
                lifeCycleOptions: ['beforeCreate', 'created', 'beforeMount', 'mounted', 'beforeUpdate', 'updated', 'beforeDestroy', 'destroyed']
            }
        },
        computed: {
            currentEdit () {
                return this.nowEdit;
            },
            globalData () {
                return JSON.stringify(this.currentEdit.config.data.data);
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
            emitSetVif (flag) {
                let func;
                if (!flag) {
                    func = undefined;
                } else {
                    func = this.$refs.vifIDE[0].getValue();
                }
                this.$emit('setVif', this.currentEdit.config.hash, func);
            },
            updateSlot () {
                this.$emit('slotChange', {
                    data: this.$refs.vvpage[0].cusComp.config.data.data,
                    event: this.$refs.vvpage[0].cusComp.config.data.eventHandlers,
                    slots: this.$refs.vvpage[0].cusComp.comps,
                    slotName: this.slotName,
                    hash: this.currentEdit.config.hash
                });
                this.closeSlotPanel();
            },
            showSlotPanel (name) {
                this.$set(this, 'preCusComp', {
                    content: true,
                    type: 'combination',
                    config: {
                        hash: 'slot',
                        data: {
                            props: {},
                            data: {
                                ...window.GlobelMeta.config.data.data
                            },
                            eventHandlers: {
                                ...window.GlobelMeta.config.data.eventHandlers
                            },
                            emitEvents: []
                        },
                        lifeCycle: {
                            ...window.GlobelMeta.config.lifeCycle
                        }
                    },
                    comps: this.currentEdit.config.slot.filter(item => {
                        return item.name === name;
                    })[0].children
                });
                this.slotName = name;
                this.slotPanel = true;
            },
            closeSlotPanel () {
                this.slotPanel = false;
            },
            emitSetProps (datakey, mode) {
                let res = mode
                    ? this.$refs[datakey + 'IDE'][0].getValue()
                    : 'function () {}';
                this.$emit('setProps', this.currentEdit.config.hash, datakey, res, mode);
            },
            emitglobalData () {
                this.$emit('globalData', this.$refs.globalDataIDE.getValue());
            },
            emitlifeCycle () {
                this.$emit('lifeCycle', this.lifeCycleKey, this.$refs.lifeCycleIDE.getValue());
            },
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
        },
        errorCaptured (err, vm, info) {
            console.log(err, vm, info);
            return false;
        }
    }
</script>

<style lang="less">
    .slot-editor-panel {
        transition: opacity 1s;
        position: fixed;
        width: 100%;
        height: 100%;
        background: @main;
        top: 0;
        left: 0;
        .slot-name {
            position: fixed;
            top: 40px;
            right: 50%;
            margin-right: -90px;
            display: inline-block;
            font-size: 16px;
            color: @dep;
            font-weight: 700;
        }
        .update-slot {
            position: fixed;
            top: 40px;
            right: 20px;
            margin-left: 30px;
            font-size: 16px;
            color: @dep;
            font-weight: 700;
            .iconfont {
                font-size: 16px;
                margin-right: 5px;
            }
        }
        .content-right-bar {
            .config-bar {
                * {
                    display: none;
                }
            }
        }
    }
    .slot-editor-panel-open {
        opacity: 1;
        z-index: 10;
        background: #fff;
        .top-bar {
            .actions {
                span {
                    display: none;
                }
            }
            .layout {
                display: inline-block!important;
                position: fixed;
                right: 130px;
                top: 40px;
                font-size: 16px;
                font-weight: 700;
                span {
                    display: inline-block!important;
                }
            }
        }
    }
    .slot-editor-panel-close {
        opacity: 0;
        height: 0;
    }
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
        .css-btn {
            font-size: 12px;
            margin-left: 10px;
            margin-right: 5px;
        }
        .icon-shurukuang1 {
            font-size: 16px;
            font-weight: 700;
            transform: rotate(180deg);
            display: inline-block;
            position: relative;
            top: 1px;
        }
        .icon-daima {
            font-weight: 700;
            position: relative;
            top: 1px;
        }
        .props-title {
            display: block!important;
            width: 200px!important;
            margin-bottom: 20px;
        }
        textarea {
            height: 60px;
            border: none;
            margin-bottom: 20px;
            border-bottom: 1px solid #ededed;
            border-right: 1px solid #ededed;
            box-shadow: 4px 2px 4px #22222230;
        }
        .slot-box {
            border-bottom: 1px solid #ededed;
            &:last-child {
                border-bottom: none;
            }
            .icon-bianji1 {
                position: relative;
                top: 2px;
            }
        }
        .vv-title {
            color: #191f1e;
            font-weight: 700;
        }
        .event-system {
            padding-left: 15px;
            border-left: 1px solid #ededed;
            border-bottom: 1px solid #ededed;
            .event-gx-btn {
                float: right;
                font-size: 24px;
                margin-right: 20px;
            }
            .icon-qiyong,
            .icon--qiyong {
                font-size: 26px;
                position: relative;
                float: right;
                margin-right: 20px;
                z-index: 100;
            }
        }
        .compname {
            color: @sub;
            font-weight: 700;
        }
        .life-cycle {
            .single-select {
                .icon-xiala1 {
                    font-size: 12px;
                    color: #191f1e;
                    margin-left: 5px;
                }
                .box-trigger {
                    color: #191f1e;
                    width: auto;
                    height: auto;
                    border: none;
                    line-height: auto;
                }
            }
        }
        .config-bar {
            overflow: auto;
            width: 308px;
            height: ~'calc(100% - 30px)';
            box-sizing: border-box;
            padding: 20px 10px 0 20px;
            .props-item {
                .config-comp-title {
                    width: 60px;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    vertical-align: top;
                }
                .icon-gengxin2 {
                    position: absolute;
                    top: -20px;
                    right: 0;
                    float: right;
                    font-size: 24px;
                }
                textarea {
                    margin-left: 20px;
                    width: 220px;
                    height: 70px;
                }
            }
            .global-data {
                .CodeMirror {
                    margin-top: 20px;
                }
                .global-gx {
                    float: right;
                    font-size: 24px;
                    margin-right: 20px;
                    font-weight: 400;
                }
            }
            .props-data {
                position: relative;
                width: 240px;
                display: inline-block;
                margin-top: -20px;
                .CodeMirror {
                    height: 100px;
                    margin-top: 15px;
                }
                .props-data-gx {
                    position: absolute;
                    top: -7px;
                    right: 35px;
                    font-size: 24px;
                    float: right;
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

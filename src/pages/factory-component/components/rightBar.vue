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
            <div class="config-comp" v-if="currentEdit.content">
                <span class="config-comp-title vv-title">容器暴露接口: </span>
                <span>{{ currentEdit.config.data.props }}</span>
            </div>
            <div v-if="!currentEdit.content">
                <div class="config-comp" v-if="!currentEdit.content">
                    <span class="config-comp-title vv-title">组件配置: </span>
                </div>
                <!-- <div class="comp-select" v-if="Object.keys(currentEdit.config.data.data).length">
                    <div class="compname box-trigger" @click.stop="showSelectComp = !showSelectComp;">
                        {{ currentComp }}
                        <span class="open">now</span>
                    </div>
                    <div class="select-pop" v-if="showSelectComp">
                        <div
                            v-for="key in Object.keys(currentEdit.config.data.data)"
                            :key="key + 'select'" :value="key"
                            @click.stop="doSelectComp(key)">{{key}}</div>
                    </div>
                </div> -->
                <div class="event-system">
                    <div class="config-comp" v-for="key in Object.keys(cusComp.config.data.data)" :key="key">
                        <span v-if="key === currentEdit.config.hash">
                            <div class="config-comp vv-title" v-if="Object.keys(cusComp.config.data.data[key]).length">组件接口:</div>
                            <div class="config-comp" v-for="datakey in Object.keys(cusComp.config.data.data[key])" :key="datakey">
                                <span class="config-comp-title">{{ datakey }}</span>
                                <input v-model="cusComp.config.data.data[key][datakey]" @change="emitChange()" />
                            </div>
                            <div class="config-comp vv-title" v-if="hasEvent(key)">事件处理:</div>
                            <div class="config-comp" v-for="(eventKey, eventIndex) in Object.keys(cusComp.config.data.eventHandlers)" :key="eventKey">
                                <div v-if="eventKey.indexOf(key) > -1">
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

    export default {
        name: 'RightBar',
        components: {
            IdeTextarea
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
                compType: {
                    unit: '单位组件',
                    combination: '组合组件',
                    nestification: '嵌套组件'
                },
                showSelectComp: false
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
        mounted () {
            let that = this;
            window.onclick = function () {
                that.showSelectComp = false;
            }
        },
        methods: {
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
            // doSelectComp (key) {
            //     this.showSelectComp = !this.showSelectComp;
            //     this.currentComp = key;
            //     let time = 0;
            //     let that = this;
            //     let heightLight = function () {
            //         document.getElementById(that.currentComp).setAttribute('class', 'event-box');
            //         setTimeout(() => {
            //             document.getElementById(that.currentComp).classList.remove('event-box');
            //             time++;
            //             setTimeout(() => {
            //                 time < 5 && heightLight();
            //             }, (100 - time * 15))
            //         }, (300 - time * 55));
            //     };
            //     heightLight();
            // },
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
            border: 2px dashed #333;
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
        // .comp-select {
        //     position: relative;
        //     margin-bottom: 15px;
        //     .box-trigger {
        //         border: 1px solid #ededed;
        //         border-radius: 3px;
        //         height: 30px;
        //         padding: 0 10px;
        //         line-height: 30px;
        //         width: 250px;
        //         box-sizing: border-box;
        //         font-weight: 400;
        //         .open {
        //             float: right;
        //             font-weight: 700;
        //         }
        //     }
        //     .select-pop {
        //         margin-top: 2px;
        //         box-sizing: border-box;
        //         position: absolute;
        //         border: 1px solid #ededed;
        //         border-radius: 3px;
        //         width: 250px;
        //         background: #FFF;
        //         div {
        //             height: 30px;
        //             line-height: 30px;
        //             padding: 0 10px;
        //             &:hover {
        //                 background: #ededed;
        //             }
        //         }
        //     }
        // }
        .compname {
            color: #333;
            font-weight: 700;
        }
        .config-bar {
            overflow: auto;
            width: 308px;
            height: ~'calc(100% - 30px)';
            box-sizing: border-box;
            padding: 20px 10px 0 20px;
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
                    box-shadow: 3px 1px 1px #888888;
                }
                .config-comp-title {
                    display: inline-block;
                    margin-right: 5px
                }
            }
        }
    }
</style>

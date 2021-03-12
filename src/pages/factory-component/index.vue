<template>
    <div class="factory-component">
        <!-- <div id="ballId">drag</div> -->
        <pre class="globel-data" v-if="globelData">{{cusComp}}</pre>
        <div class="top-bar">
            <div class="pro-title">
                Vv Page<span class="iconfont icon-yezhu"></span>
            </div>
            <div class="actions">
                <span @click="globelData = !globelData">
                    <span class="iconfont icon-yuming"></span>
                    页面信息
                </span>
                <span @click="preview = !preview;refreshWorkSpace();">
                    <span class="iconfont icon-qiehuan1"></span>
                    {{ preview ? '预览' : '配置' }}态
                </span>
                <span @click="abs = !abs;refreshWorkSpace();">
                    <span class="iconfont icon-moxingzuzhuang"></span>
                    {{ abs ? '拖动' : '排列' }}
                </span>
                <span @click="back" :class="{'disable-action': !snapshot_flag}">
                    <span class="iconfont icon-shangyibu"></span>
                    撤销
                </span>
                <span @click="redo" :class="{'disable-action': snapshot_flag === snapshot.length - 1 || !snapshot.length}">
                    <span class="iconfont icon-liuchengtuh5-29"></span>
                    重做
                </span>
                <span @click="save" class="iconLast">
                    <span class="iconfont icon-baocun_mian"></span>
                    保存
                </span>
            </div>
        </div>
        <div :class="['work-space', {'preview': preview}]">
            <left-bar />
            <div class="space-content">
                <div class="component-draw-space" ref="drawSpace" @drop="drop" @dragover="ev => {ev.preventDefault()}">
                    <draw-board
                        :comps="comps"
                        @editComponent="editComponent"
                        @editContent="editContent"
                        @changeInline="changeInline"
                        @action="action"
                        :cusComp="cusComp"
                        :key="refresh"
                        :preview="preview" />
                </div>
            </div>
            <right-bar :nowEdit="nowEdit" @updateParams="updateParams" :cusComp="cusComp" />
        </div>
    </div>
</template>

<script>
    import clone from 'clone';
    import LeftBar from './components/leftBar';
    import RightBar from './components/rightBar';
    import DrawBoard from './components/drawBoard';
    import { iconCompMap } from './config.js';
    import { createHash } from '../../utils/common.js';
    // import { suspensionBall } from '../../utils/drag-ball.js';
    const requireComponent = require.context('../../unit-components', false, /\w+\.(vue|js)$/);
    var cmps = {};
    requireComponent.keys().map(fileName => {
        let cmp = requireComponent(fileName).default
        cmps[cmp.name] = cmp
    });

    export default {
        name: 'FactoryComponent',
        components: {
            LeftBar,
            RightBar,
            DrawBoard
        },
        data () {
            return {
                globelData: false,
                abs: true,
                preview: false,
                refresh: 0,
                iconCompMap: iconCompMap,
                nowEdit: {},
                comps: [],
                cusCompHash: createHash(4),
                config_data_data_bak: {},
                config_data_eventHandlers_bak: {},
                snapshot: [],
                snapshot_flag: 0
            }
        },
        computed: {
            cusComp () {
                return {
                    content: true, // 仅用于配置
                    type: 'combination',
                    config: {
                        hash: this.cusCompHash,
                        data: {
                            props: {},
                            data: {
                                ...this.getCompsProps(this.comps),
                                ...this.config_data_data_bak
                            },
                            eventHandlers: {
                                ...this.getCompsEvents(this.comps),
                                ...this.config_data_eventHandlers_bak
                            },
                            emitEvents: []
                        }
                    },
                    comps: this.comps
                };
            }
        },
        watch: {
            nowEdit: {
                handler (val) {
                    this.refreshWorkSpace();
                },
                deep: true
            }
        },
        mounted () {
            this.$set(this, 'nowEdit', this.cusComp);
            // suspensionBall('ballId', 'https://www.baidu.com');
        },
        methods: {
            save () {
                console.log(this.cusComp);
            },
            action (action, hash) {
                switch (action) {
                case 'delete':
                    this.comps.forEach((item, i) => {
                        item.config.hash === hash && this.comps.splice(i, 1);
                    });
                    Object.keys(this.config_data_data_bak).forEach(key => {
                        key.indexOf(hash) > -1 && (delete this.config_data_data_bak[key]);
                    });
                    Object.keys(this.config_data_eventHandlers_bak).forEach(key => {
                        key.indexOf(hash) > -1 && (delete this.config_data_data_bak[key]);
                    });
                    break;
                case 'copy':
                    break;
                }
            },
            refreshWorkSpace () {
                this.$nextTick(() => {
                    if (this.snapshot_flag === this.snapshot.length - 1 || !this.snapshot.length) {
                        if (!this.snapshot[0]) {
                            this.snapshot.push(clone(this.cusComp));
                            this.snapshot_flag = 0;
                        } else {
                            if (JSON.stringify(this.snapshot[this.snapshot.length - 1]) !== JSON.stringify(this.cusComp)) {
                                this.snapshot.push(clone(this.cusComp));
                                this.snapshot_flag++;
                            }
                        }
                    } else if (this.snapshot_flag < this.snapshot.length - 1) {
                        if (
                            JSON.stringify(this.snapshot[this.snapshot_flag + 1]) !== JSON.stringify(this.cusComp) &&
                            JSON.stringify(this.snapshot[this.snapshot_flag]) !== JSON.stringify(this.cusComp)
                        ) {
                            this.snapshot = this.snapshot.slice(0, this.snapshot_flag + 1);
                            if (JSON.stringify(this.snapshot[this.snapshot.length - 1]) !== JSON.stringify(this.cusComp)) {
                                this.snapshot.push(clone(this.cusComp));
                                this.snapshot_flag++;
                            }
                        }
                    }
                    this.refresh++;
                });
            },
            back () {
                if (!this.snapshot_flag) {
                    return;
                }
                this.snapshot_flag--;
                this.updateParams(clone(this.snapshot[this.snapshot_flag]));
                this.$set(this, 'comps', clone(this.snapshot[this.snapshot_flag].comps));
                this.refreshWorkSpace();
            },
            redo () {
                if (this.snapshot_flag === this.snapshot.length - 1 || !this.snapshot.length) {
                    return;
                }
                this.snapshot_flag++;
                this.updateParams(clone(this.snapshot[this.snapshot_flag]));
                this.$set(this, 'comps', clone(this.snapshot[this.snapshot_flag].comps));
                this.refreshWorkSpace();
            },
            updateParams (comps) {
                this.refreshWorkSpace();
                if (comps.content) {
                    this.config_data_data_bak = comps.config.data.data;
                    this.config_data_eventHandlers_bak = comps.config.data.eventHandlers;
                }
            },
            getCompsEvents (comps) {
                this.refreshWorkSpace();
                let events = {};
                comps.forEach(comp => {
                    cmps[comp.name].event && cmps[comp.name].event.forEach(func => {
                        this.$set(events, comp.config.hash + '-' + func.name, {
                            name: func.name,
                            label: func.label,
                            params: func.params,
                            handler: `function ${func.name + comp.config.hash}() {}`
                        });
                    });
                });
                return events;
            },
            getCompsProps (comps) {
                this.refreshWorkSpace();
                let props = {};
                comps.forEach(comp => {
                    this.$set(props, comp.config.hash, {});
                    var prop = cmps[comp.name].props;
                    for (let key in prop) {
                        this.$set(props[comp.config.hash], key, typeof prop[key].type() === 'object' ? prop[key].default() : prop[key].default);
                    }
                });
                return props;
            },
            changeInline (prehash, hash) {
                let preId = 0;
                let id = 0;
                this.comps.forEach((item, i) => {
                    item.config.hash === prehash && (preId = i);
                    item.config.hash === hash && (id = i);
                });
                let item = this.comps.splice(preId, 1);
                this.comps.splice(id, 0, item[0]);
            },
            drop (ev) {
                ev.preventDefault();
                var data = JSON.parse(ev.dataTransfer.getData('DragComp'));
                var domabs = (data.x + data.y) || (data.x + data.y === 0);
                var dragCompData = {
                    ...data,
                    id: data.id,
                    x: this.abs || domabs ? ev.clientX - this.$refs.drawSpace.offsetLeft : undefined,
                    y: this.abs || domabs ? ev.clientY - this.$refs.drawSpace.offsetTop : undefined,
                    name: this.iconCompMap[data.id]
                };
                if (data.config && data.config.hash && !domabs) {
                    dragCompData.x = undefined;
                    dragCompData.y = undefined;
                    return;
                }
                data.config !== undefined
                    ? (dragCompData.config = data.config)
                    : (dragCompData.config = { hash: createHash(4) });
                data.index !== undefined && this.comps.splice(data.index, 1);
                this.comps.push(dragCompData);
                this.editComponent(dragCompData);
            },
            editComponent (e) {
                this.$set(this, 'nowEdit', e);
            },
            editContent () {
                this.$set(this, 'nowEdit', this.cusComp);
            }
        }
    }
</script>

<style lang="less">
.factory-component {
    height: 100%;
    #ballId {
        background: #333;
        color: white;
        width: 50px;
        text-align: center;
        height: 50px;
        line-height: 50px;
        border-radius: 50%;
        box-shadow: 5px 5px 40px rgba(0, 0, 0, 0.5);
        z-index: 10000;
        /* 过渡效果在IE下展示效果不友好 */
        transition: all 0.08s;
        user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        -webkit-user-select: none;
        top: 50%;
        left: 50%;
        transform: translate3d(-50%, -50%, 0);
    }
    .globel-data {
        position: fixed;
        top: 0;
        left: 0;
        background: #333333e8;
        color: #FFF;
        width: 400px;
        max-height: 800px;
        overflow: auto;
        margin: 0;
        z-index: 1000000;
    }
    .top-bar {
        height: 100px;
        background: #f7f8fa;
        // background: #0c0c0c;
        border-bottom: 1px solid #ededed;
        box-sizing: border-box;
        .disable-action {
            color: #cabcbc;
            &:hover {
                cursor: not-allowed;
            }
        }
        .pro-title {
            line-height: 100px;
            font-size: 32px;
            font-weight: 700;
            color: #333;
            margin-left: 30px;
            display: inline-block;
            .icon-yezhu {
                font-size: 37px;
                display: inline-block;
                padding-left: 14px;
                line-height: 100px;
                position: relative;
                top: 3px;
            }
        }
        .actions {
            float: right;
            color: #333;
            font-weight: 700;
            user-select:none;
            .iconfont {
                padding-left: 5px;
            }
            .icon-baocun_mian {
                font-size: 20px;
                line-height: 100px;
                color: #333;
                font-weight: 400;
                padding-left: 5px;
                position: relative;
                top: 2px;
            }
            .iconLast {
                margin-right: 30px;
            }
        }
    }
    // .left-bar,
    // .right-bar {
    //     background: #0c0c0c;
    // }
    .work-space {
        height: ~'calc(100% - 100px)';
        font-size: 0px;
        .space-content {
            height: 100%;
            width: ~'calc(100% - 620px)';
            display: inline-block;
            vertical-align: top;
            background: #ededed;
            padding: 10px;
            box-sizing: border-box;
        }
        .component-draw-space {
            display: inline-block;
            position: relative;
            height: 100%;
            background: #fff;
            width: 100%;
            vertical-align: top;
            font-size: 12px;
            overflow: auto;
            box-shadow: 5px 4px 1px #88888830;
        }
    }
    .preview {
        .left-bar,
        .right-bar {
            position: relative;
            &:before {
                content: '';
                position: absolute;
                background: #333333e8;
                z-index: 10000;
                width: 100%;
                height: 100%;
                &:hover {
                    cursor: not-allowed;
                }
            }
            &:hover {
                cursor: not-allowed;
            }
        }
        .right-bar {
            &:before {
                width: 310px;
            }
        }
    }
    .title {
        width: 295px;
        line-height: 30px;
        font-size: 14px;
        font-weight: 700;
        padding-left: 15px;
        background: #333;
        color: #FFF;
    }
    .materials-list {
        width: 310px;
        font-size: 0;
        padding: 0;
        overflow: auto;
        .material {
            display: inline-block;
            vertical-align: top;
            font-size: 12px;
            letter-spacing: normal;
            word-spacing: normal;
            line-height: inherit;
            width: 60px;
            padding-bottom: 10px;
            text-align: center;
            list-style: none !important;
            cursor: pointer;
            .list-icon {
                display: block;
                height: 70px;
                line-height: 70px;
                font-size: 24px;
                margin: 0 auto 5px;
                color: #191f1e;
                -webkit-transition: font-size 0.15s linear, width 0.15s linear;
                -moz-transition: font-size 0.15s linear, width 0.15s linear;
                transition: font-size 0.15s linear, width 0.15s linear;
                &:hover {
                    font-size: 56px;
                    color: #333;
                }
            }
            .material-name {
                color: #666;
            }
        }
    }
}
</style>

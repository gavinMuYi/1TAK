<template>
    <div class="factory-component">
        <div class="top-bar">
            <div class="pro-title">
                1TAK<span class="iconfont icon-zuzhuangqiang"></span>
            </div>
            <div class="actions">
                create component... <span class="iconfont icon-baocun_mian"></span>
            </div>
        </div>
        <div class="work-space">
            <left-bar />
            <div class="component-draw-space" @drop="drop" @dragover="ev => {ev.preventDefault()}">
                <draw-board :comps="comps" @editComponent="editComponent" />
            </div>
            <right-bar :nowEdit="nowEdit" />
        </div>
    </div>
</template>

<script>
    import LeftBar from './components/leftBar';
    import RightBar from './components/rightBar';
    import DrawBoard from './components/drawBoard';
    import { iconCompMap } from './config.js';
    import { createHash } from '../../utils/common.js';

    export default {
        name: 'FactoryComponent',
        components: {
            LeftBar,
            RightBar,
            DrawBoard
        },
        data () {
            return {
                iconCompMap: iconCompMap,
                nowEdit: {},
                comps: []
            }
        },
        methods: {
            drop (ev) {
                ev.preventDefault();
                var data = JSON.parse(ev.dataTransfer.getData('DragComp'));
                var dragCompData = {
                    id: data.id,
                    x: ev.clientX - 310,
                    y: ev.clientY - 100,
                    name: this.iconCompMap[data.id]
                };
                data.config !== undefined
                    ? (dragCompData.config = data.config)
                    : (dragCompData.config = { hash: createHash() });
                data.index !== undefined && this.comps.splice(data.index, 1);
                this.comps.push(dragCompData);
                this.editComponent(dragCompData);
            },
            editComponent (e) {
                this.$set(this, 'nowEdit', e);
            }
        }
    }
</script>

<style lang="less">
.factory-component {
    height: 100%;
    .top-bar {
        height: 100px;
        background: #FFF;
        border-bottom: 1px solid #ededed;
        box-sizing: border-box;
        .pro-title {
            line-height: 100px;
            font-size: 32px;
            font-weight: 700;
            color: #4854b4;
            margin-left: 30px;
            display: inline-block;
            .icon-zuzhuangqiang {
                font-size: 40px;
                display: inline-block;
                padding-left: 10px;
                line-height: 100px;
                position: relative;
                top: 5px;
            }
        }
        .actions {
            float: right;
            color: #4854b4;
            font-weight: 700;
            .icon-baocun_mian {
                font-size: 24px;
                line-height: 100px;
                color: #4854b4;
                font-weight: 400;
                padding-left: 10px;
                margin-right: 30px;
                position: relative;
                top: 2px;
            }
        }
    }
    .work-space {
        height: ~'calc(100% - 100px)';
        font-size: 0px;
        .component-draw-space {
            display: inline-block;
            position: relative;
            height: 100%;
            width: ~'calc(100% - 620px)';
            vertical-align: top;
            font-size: 12px;
            overflow: auto;
        }
    }
    .title {
        width: 295px;
        line-height: 30px;
        font-size: 14px;
        font-weight: 700;
        padding-left: 15px;
        background: #4854b4;
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
                    color: #6879ff;
                }
            }
            .material-name {
                color: #666;
            }
        }
    }
}
</style>

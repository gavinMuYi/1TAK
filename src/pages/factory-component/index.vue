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
                <draw-board :comps="comps" />
            </div>
            <div class="right-bar">
                <div class="title">子组件</div>
            </div>
        </div>
    </div>
</template>

<script>
    import LeftBar from './components/leftBar';
    import DrawBoard from './components/drawBoard';
    import { iconCompMap } from './config.js';

    export default {
        name: 'FactoryComponent',
        components: {
            LeftBar,
            DrawBoard
        },
        data () {
            return {
                iconCompMap: iconCompMap,
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
                    y: ev.clientY - 50,
                    name: this.iconCompMap[data.id]
                };
                data.index !== undefined && this.comps.splice(data.index, 1);
                this.comps.push(dragCompData);
            }
        }
    }
</script>

<style lang="less">
.factory-component {
    height: 100%;
    .top-bar {
        height: 50px;
        background: #191f1e;
        .pro-title {
            line-height: 50px;
            font-size: 32px;
            font-weight: 700;
            color: #FFF;
            margin-left: 10px;
            display: inline-block;
            .icon-zuzhuangqiang {
                font-size: 40px;
                display: inline-block;
                padding-left: 10px;
                line-height: 50px;
                position: relative;
                top: 5px;
            }
        }
        .actions {
            float: right;
            color: #FFF;
            font-weight: 700;
            .icon-baocun_mian {
                font-size: 24px;
                line-height: 50px;
                color: #FFF;
                font-weight: 400;
                padding-left: 10px;
                margin-right: 10px;
                position: relative;
                top: 2px;
            }
        }
    }
    .work-space {
        height: ~'calc(100% - 50px)';
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
        .right-bar {
            display: inline-block;
            height: 100%;
            width: 300px;
            border-left: 1px solid #ededed;
            vertical-align: top;
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

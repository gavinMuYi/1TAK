<template>
    <div class="right-bar">
        <div class="title">子组件</div>
        <div class="config-bar" v-if="Object.keys(nowEdit).length">
            <div class="config-comp">
                <span class="config-comp-title">组件类型: </span>
                <span>{{ getType(nowEdit.id) }}</span>
            </div>
            <div class="config-comp">
                <span class="config-comp-title">ID: </span>
                <span>{{ nowEdit.config.hash }}</span>
            </div>
            <div class="config-comp">
                <span class="config-comp-title">X轴: </span>
                <span>{{ nowEdit.x }}</span>
            </div>
            <div class="config-comp">
                <span class="config-comp-title">Y轴: </span>
                <span>{{ nowEdit.y }}</span>
            </div>
        </div>
    </div>
</template>

<script>
    import { unitCompIcons } from '../config.js';

    export default {
        name: 'RightBar',
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
                unitCompIcons: unitCompIcons
            }
        },
        methods: {
            getType (id) {
                let res = '';
                this.unitCompIcons.forEach(item => {
                    item.key === id && (res = item.name);
                });
                return res;
            }
        }
    }
</script>

<style lang="less">
    .right-bar {
        font-size: 14px;
        display: inline-block;
        height: 100%;
        width: 300px;
        border-left: 1px solid #ededed;
        vertical-align: top;
        .config-bar {
            height: ~'calc(100% - 30px)';
            box-sizing: border-box;
            padding: 20px 10px 0 20px;
            .config-comp {
                margin-bottom: 10px;
                .config-comp-title {
                    display: inline-block;
                    margin-right: 5px
                }
            }
        }
    }
</style>

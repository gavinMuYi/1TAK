<template>
    <div class="right-bar">
        <div class="title">{{ currentEdit.content ? '容器' : '子组件' }}</div>
        <div class="config-bar" v-if="Object.keys(currentEdit).length"><div class="config-comp">
            <span class="config-comp-title">组件分类: </span>
                <span>{{ compType[currentEdit.type] }}</span>
            </div>
            <div class="config-comp">
                <span class="config-comp-title">组件类型: </span>
                <span>{{ currentEdit.content ? '容器' : getType(currentEdit.id) }}</span>
            </div>
            <div class="config-comp">
                <span class="config-comp-title">ID: </span>
                <span>{{ currentEdit.config.hash }}</span>
            </div>
            <div class="config-comp" v-if="!currentEdit.content">
                <span class="config-comp-title">X轴: </span>
                <input v-model="currentEdit.x" /> px
            </div>
            <div class="config-comp" v-if="!currentEdit.content">
                <span class="config-comp-title">Y轴: </span>
                <input v-model="currentEdit.y" /> px
            </div>
            <div class="config-comp" v-if="currentEdit.content">
                <span class="config-comp-title">容器暴露接口(props): </span>
                <span>{{ currentEdit.config.data.props }}</span>
            </div>
            <div v-if="currentEdit.content">
                <div class="config-comp" v-for="key in Object.keys(currentEdit.config.data.data)" :key="key">
                    <div class="config-comp">{{ key }}</div>
                    <div class="config-comp">组件接口:</div>
                    <div class="config-comp" v-for="datakey in Object.keys(currentEdit.config.data.data[key])" :key="datakey">
                        <span class="config-comp-title">{{ datakey }}</span>
                        <input v-model="currentEdit.config.data.data[key][datakey]" />
                    </div>
                </div>
            </div>
            <div class="config-comp" v-if="currentEdit.content">
                <span class="config-comp-title">数据: </span>
                <span>{{ currentEdit.config }}</span>
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
                unitCompIcons: unitCompIcons,
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
            overflow: auto;
            width: 308px;
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

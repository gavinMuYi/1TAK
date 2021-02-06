<template>
    <div :class="['single-select', {'active-select': showSelectComp}]">
        <div class="trigger-name box-trigger" @click.stop="showSelectComp = !showSelectComp;">
            {{ currentComp }}
            <span class="open iconfont icon-xiala1"></span>
        </div>
        <div class="select-pop" v-if="showSelectComp">
            <div
                v-for="item in options"
                :key="item"
                @click.stop="doSelectComp(item)">{{ item }}</div>
        </div>
    </div>
</template>

<script>
    import clone from 'clone';

    export default {
        name: 'SingleSelect',
        props: {
            options: {
                type: Array,
                default: () => {
                    return []
                }
            },
            value: {
                type: String,
                default: ''
            }
        },
        data () {
            return {
                showSelectComp: false,
                currentComp: clone(this.value)
            }
        },
        watch: {
            value (val) {
                this.currentComp = val;
            }
        },
        mounted () {
            let that = this;
            window.onclick = function () {
                that.showSelectComp = false;
            };
        },
        methods: {
            doSelectComp (item) {
                this.showSelectComp = !this.showSelectComp;
                this.currentComp = item;
                this.$emit('input', this.currentComp);
            }
        }
    }
</script>

<style lang="less">
    .single-select {
        position: relative;
        display: inline-block;
        .trigger-name {
            color: #333;
            font-weight: 700;
        }
        .box-trigger {
            border: 1px solid #ededed;
            border-radius: 3px;
            height: 30px;
            padding: 0 10px;
            line-height: 30px;
            width: 200px;
            box-sizing: border-box;
            font-weight: 400;
            .open {
                float: right;
                font-size: 12px;
                color: #a4a9af;
            }
        }
        .select-pop {
            margin-top: 2px;
            box-sizing: border-box;
            position: absolute;
            border: 1px solid #ededed;
            border-radius: 3px;
            width: 200px;
            background: #FFF;
            z-index: 1000;
            div {
                height: 30px;
                line-height: 30px;
                padding: 0 10px;
                &:hover {
                    background: #ededed;
                }
            }
        }
    }
    .active-select {
        .box-trigger .open {
            color: #333;
        }
    }
</style>

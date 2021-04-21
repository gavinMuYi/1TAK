<template>
    <div :class="['single-select', {'active-select': showSelectComp}]">
        <div class="trigger-name box-trigger" @click.stop="showChange">
            <slot name="placeholder" :props="{currentVal: currentVal}">{{ currentVal || '空'}}</slot>
            <span class="open iconfont icon-xiala1"></span>
        </div>
        <div class="select-pop" v-if="showSelectComp">
            <div class="input-box" v-if="search && showSelectComp"><input v-model="searchKey" @change="doSearch" /></div>
            <div
                v-for="item in options"
                :key="item"
                @click.stop="doSelectComp(item)">
                <slot name="listItem" :props="{item: item}">{{ item }}</slot>
            </div>
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
            },
            search: {
                type: Boolean,
                default: false
            }
        },
        data () {
            return {
                searchKey: '',
                showSelectComp: false,
                currentVal: clone(this.value)
            }
        },
        watch: {
            value (val) {
                this.currentVal = val;
            }
        },
        mounted () {
            let that = this;
            document.addEventListener('click', (e) => {
                if (!that.$el.contains(e.target)) that.showSelectComp = false;
            });
        },
        methods: {
            doSelectComp (item) {
                this.showChange();
                this.currentVal = item;
                this.$emit('input', this.currentVal);
            },
            showChange () {
                this.showSelectComp = !this.showSelectComp;
            },
            doSearch () {
                this.$emit('search', this.searchKey);
            }
        }
    }
</script>

<style lang="less">
    .single-select {
        position: relative;
        display: inline-block;
        .trigger-name {
            color: @sub;
            font-weight: 700;
        }
        .box-trigger {
            border: 1px solid #ededed;
            border-radius: 3px;
            height: 30px;
            padding: 0 10px;
            line-height: 30px;
            width: 185px;
            box-sizing: border-box;
            font-weight: 400;
            .open {
                float: right;
                font-size: 12px;
                color: #a4a9af;
            }
        }
        .input-box {
            background: #fff;
            display: inline-block;
            height: 31px;
            margin: 0px!important;
            width: 508px!important;
            box-sizing: border-box;
            padding: 2px 8px;
            border: 1px solid #dadee7;
            border-radius: 3px;
            transition: border-color .25s;
            input {
                position: relative;
                display: block;
                width: 100%;
                line-height: inherit;
                height: 26px;
                padding: 7px 0;
                color: #1e2330;
                outline: none;
                border: 0 none;
                background: none;
                box-sizing: border-box;
                width: 100%;
            }
        }
        .select-pop {
            margin-top: 2px;
            box-sizing: border-box;
            position: absolute;
            border: 1px solid #ededed;
            border-radius: 3px;
            width: 185px;
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
            color: @sub;
        }
    }
</style>

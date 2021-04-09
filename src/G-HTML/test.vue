<template>
    <!-- <div @click="add"> -->
    <div>
        {{ numsss }} str: {{ value }} obj: {{obj}} arr: {{arr}} num: {{num}} bol: {{bol}}
        <div v-for="item in arr" :key="item.a"><slot :props="item"></slot></div>
        <slot name="ddd" :props="{b: 1}"></slot>
    </div>
</template>

<script>
    export default {
        name: 'G_TEST',
        slot: [{
            name: 'default',
            params: ''
        }, {
            name: 'ddd',
            params: ''
        }],
        props: {
            value: {
                type: String,
                default: '这是一个文本框'
            },
            obj: {
                type: Object,
                default: () => {
                    return {
                        a: 11
                    }
                }
            },
            arr: {
                type: Array,
                default: () => {
                    return [{a: 1}, {a: 2}]
                }
            },
            num: {
                type: Number,
                default: 11
            },
            bol: {
                type: Boolean,
                default: true
            },
            func: {
                type: Function,
                default: (a) => {
                    console.log('aaa');
                }
            }
        },
        data () {
            return {
                numsss: 0
            }
        },
        methods: {
            add () {
                this.numsss++;
            }
        }
    }
</script>

<style lang="less">

</style>

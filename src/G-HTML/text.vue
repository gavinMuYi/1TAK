<template>
    <div @click="func">
        str: {{ value }} obj: {{obj}} arr: {{arr}} num: {{num}} bol: {{bol}}
    </div>
</template>

<script>
    export default {
        name: 'G_TEXT',
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
                    return [{a: 1}, {b: 2}]
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
        }

    }
</script>

<style lang="less">

</style>

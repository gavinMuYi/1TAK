<template>
    <div>
        <input :placeholder="placeholder" :value="value" @input="input"/>
    </div>
</template>

<script>
    export default {
        name: 'Vv_INPUT',
        event: [{
            name: 'input',
            label: '输入框input事件',
            params: '输入值'
        }],
        props: {
            value: {
                type: String,
                default: ''
            },
            placeholder: {
                type: String,
                default: '请输入'
            }
        },
        methods: {
            input (val) {
                this.$emit('input', val)
            }
        }
    }
</script>

<style lang="less">

</style>

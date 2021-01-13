<template>
    <div>
        <input :placeholder="placeholder" :value="value" />
    </div>
</template>

<script>
    export default {
        name: 'Vv_INPUT',
        event: [{
            name: 'change',
            label: '输入框chang事件',
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
        }
    }
</script>

<style lang="less">

</style>

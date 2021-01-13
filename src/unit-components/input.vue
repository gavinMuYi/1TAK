<template>
    <div>
        <input :placeholder="placeholder" :value="value" />
    </div>
</template>

<script>
    export default {
        name: 'ACE_INPUT',
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

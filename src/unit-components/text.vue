<template>
    <div>
        {{ value }}
    </div>
</template>

<script>
    export default {
        name: 'Vv_TEXT',
        props: {
            value: {
                type: String,
                default: '这是一个文本框'
            }
        }

    }
</script>

<style lang="less">

</style>

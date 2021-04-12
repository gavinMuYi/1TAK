<template>
    <div>
        {{ str }}
    </div>
</template>

<script>
    export default {
        name: 'G_TEXT',
        props: {
            str: {
                type: String,
                default: '这是一段文本'
            }
        }
    }
</script>

<style lang="less">
</style>

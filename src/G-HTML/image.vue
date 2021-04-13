<template>
    <div>
        <img v-if="src" :src="src" />
        <img v-else :src="imgUrl" />
    </div>
</template>

<script>

    export default {
        name: 'G_IMAGE',
        props: {
            src: {
                type: String,
                default: ''
            }
        },
        data () {
            return {
                imgUrl: require('../assets/img/img.jpg')
            }
        }
    }
</script>

<style lang="less">
</style>

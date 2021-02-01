<template>
    <div id="stylePanel"></div>
</template>

<script>
    export default {
        name: 'StyleEditor'
    }
</script>

<style lang="less">
    #stylePanel {
        position: fixed;
        width: 100%;
        height: 500px;
        left: 0;
        bottom: 0;
        background: #0c0c15bd;
        z-index: 10000;
    }
</style>

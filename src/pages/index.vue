<template>
    <div class="Vv_Page-index">
        <div class="index-title">GaHou LAB</div>
        <div class="router-box">
            <router-link :to="{ name: 'FactoryComponent' }">G HTML</router-link>
            <router-link :to="{ name: 'FactoryComponent' }">Vv Page</router-link>
            <router-link :to="{ name: 'FactoryComponent' }">Page List</router-link>
        </div>
        <img src="../assets/img/cover.png">
    </div>
</template>

<script>
    export default {
        name: 'Index',
        data () {
            return {
                // imgUrl: require('../assets/img/cover.jpeg')
            }
        }
    }
</script>

<style lang="less">
.Vv_Page-index {
    height: 100%;
    min-width: 2150px;
    position: relative;
    background: linear-gradient(143deg, #ffffff 0, #e8f1ff 30%, #2cf1c0 90%, #0ab68b 100%);
    // clip-path: ellipse(90% 90% at 20% 20%);
    .index-title {
        position: absolute;
        color: @main;
        font-weight: 700;
        font-size: 70px;
        top: 400px;
        left: 120px;
    }
    .router-box {
        position: absolute;
        bottom: 250px;
        left: 250px;
        width: 300px;
        a {
            display: block;
            border: 1px solid @sub;
            background: @sub;
            color: @dep;
            font-weight: 700;
            width: 160px;
            height: 50px;
            line-height: 50px;
            text-align: center;
            border-radius: 5px;
            margin: 20px auto;
            &:hover {
                width: 300px;
                border: 1px solid @main;
                background: @main;
            }
        }
    }
    img {
        position: absolute;
        height: 100%;
        right: 0;
    }
}
</style>

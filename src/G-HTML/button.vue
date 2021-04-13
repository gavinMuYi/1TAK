<template>
    <div>
        <div
            :class="[
                'G_button',
                'G_button-' + status + '-btn',
                'G_button-' + size + '-btn',
                { 'G_button-disabled-btn': disabled }
            ]"
            @click="btnClick">
            <slot>
                {{ label }}
            </slot>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'G_BUTTON',
        slot: [{
            name: 'default',
            params: ''
        }],
        event: [{
            name: 'btnClick',
            label: '按钮点击事件',
            params: ''
        }],
        props: {
            label: {
                type: String,
                default: '按钮'
            },
            status: {
                type: String,
                default: 'default'
            },
            size: {
                type: String,
                default: 'medium'
            },
            disabled: {
                type: Boolean,
                default: false
            }
        },
        methods: {
            btnClick () {
                this.$emit('btnClick');
            }
        }
    }
</script>

<style lang="less">
.G_button {
    display: inline-block;
    text-align: center;
    border-radius: 5px;
    cursor: pointer;
}
.G_button-default-btn {
    color: @dep;
    border: 1px solid @main;
    background-color: @main;
}
.G_button-warning-btn {
    color: #fff;
    border: 1px solid #ff4222;
    background-color: #ff4222;
}
.G_button-medium-btn {
    height: 35px;
    min-width: 50px;
    padding: 0 15px;
    font-size: 13px;
    line-height: 35px;
}
.G_button-large-btn {
    height: 40px;
    min-width: 100px;
    padding: 0 25px;
    font-size: 16px;
    line-height: 40px;
}
.G_button-disabled-btn {
    cursor: not-allowed;
    pointer-events: none;
    opacity: 0.6;
}
</style>

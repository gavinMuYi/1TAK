<template>
    <div class="input">
        <input :placeholder="placeholder" :value="currentVal" @change="change" />
    </div>
</template>

<script>
    import clone from 'clone';
    export default {
        name: 'Input',
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
        data () {
            return {
                currentVal: clone(this.value)
            }
        },
        watch: {
            value (val) {
                this.currentVal = val;
            }
        },
        methods: {
            change (e) {
                this.currentVal = e.target.value;
                this.$emit('input', e.target.value);
            }
        }
    }
</script>

<style lang="less">
    .input {
        position: relative;
        display: inline-block;
        height: 30px;
        width: 185px;
        box-sizing: border-box;
        padding: 2px 8px;
        border: 1px solid #ededed;
        border-radius: 3px;
        transition: border-color .25s;
        input {
            position: relative;
            display: block;
            width: 100%;
            line-height: inherit;
            height: 25px;
            padding: 3px 0;
            color: @sub;
            outline: none;
            border: 0 none;
            background: none;
            box-sizing: border-box;
            width: 100%;
        }
    }
</style>

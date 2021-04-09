<template>
    <div class="G_input">
        <input :placeholder="placeholder" v-model="currentValue" @input="input" @blur="blur"/>
    </div>
</template>

<script>
    export default {
        name: 'G_INPUT',
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
        data () {
            return {
                currentValue: this.value
            }
        },
        watch: {
            value (val, oldValue) {
                if (this.currentValue !== val) {
                    this.currentValue = val;
                }
            }
        },
        methods: {
            input () {
                this.$emit('input', this.currentValue);
            },
            blur () {
                this.$emit('blur', this.currentValue);
            }
        }
    }
</script>

<style lang="less">
    .G_input {
        position: relative;
        display: inline-block;
        height: 40px;
        box-sizing: border-box;
        padding: 2px 8px;
        border: 1px solid #dadee7;
        border-radius: 2px;
        transition: border-color .25s;
        input {
            position: relative;
            display: block;
            width: 100%;
            line-height: inherit;
            height: 34px;
            padding: 7px 0;
            color: #1e2330;
            outline: none;
            border: 0 none;
            background: none;
            box-sizing: border-box;
            width: 100%;
        }
    }
</style>

<template>
    <div class="style-color">
        <ColorPicker
            v-model="currentVal"
            :enableAlpha="true"
            :useConfirm="true">
        </ColorPicker>
    </div>
</template>

<script>
    import clone from 'clone';
    export default {
        name: 'Color',
        props: {
            value: {
                type: String,
                default: ''
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
            },
            currentVal (val) {
                this.$emit('input', this.currentVal);
            }
        }
    }
</script>

<style lang="less">
    .style-color {
        .h-colorpicker {
            width: 185px;
            .h-colorpicker-show {
                border-radius: 3px;
                width: 185px;
                .h-colorpicker-color-bg {
                    width: 179px;
                }
            }
        }
    }
    .h-dropdown {
        z-index: 100000;
        .h-colorpicker-panel-footer {
            display: -ms-flexbox;
            display: flex;
            -ms-flex-pack: justify;
            justify-content: space-between;
            input {
                height: 30px;
                min-width: 1px;
                position: relative;
                background-color: #fff;
                border-radius: 4px;
                border: 1px solid #eee;
                display: inline-block;
                padding: 4px 7.5px;
                line-height: 1.5;
                font-size: 13px;
                transition: all .2s linear;
                box-sizing: border-box;
                -webkit-appearance: none;
                font-family: inherit;
                vertical-align: top;
                outline: none;
            }
            .h-colorpicker-panel-input {
                width: 150px;
            }
        }
        .h-slider {
            padding: 10px 5px;
            .h-slider-line {
                border-radius: 5px;
            }
            .h-slider-container {
                position: relative;
                min-height: 10px;
                .h-slider-track {
                    height: 10px;
                    border-radius: 5px;
                    top: 50%;
                    -ms-transform: translateY(-50%);
                    transform: translateY(-50%);
                    position: absolute;
                    left: 0;
                }
                .h-colorpicker-hue-picker .h-slider-node {
                    background: #eee;
                    -ms-transform: scale(1.1);
                    transform: scale(1.1);
                    box-shadow: none;
                }
                .h-slider-node {
                    height: 16px;
                    width: 16px;
                    position: absolute;
                    border-radius: 16px;
                    margin-left: -8px;
                    top: -3px;
                    -ms-transform: scale(.8);
                    transform: scale(.8);
                    transition: box-shadow,transform .2s ease-in-out;
                    -ms-user-select: none;
                    user-select: none;
                    cursor: pointer;
                    cursor: -webkit-grab;
                }
            }
        }
    }
</style>

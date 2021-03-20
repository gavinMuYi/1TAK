<template>
    <textarea ref="mycode" v-model="code" class="ide-textarea" />
</template>

<script>
    import 'codemirror/theme/ambiance.css';
    import 'codemirror/lib/codemirror.css';
    import 'codemirror/addon/hint/show-hint.css';
    let CodeMirror = require('codemirror/lib/codemirror');
    require('codemirror/addon/edit/matchbrackets');
    require('codemirror/addon/selection/active-line');
    require('codemirror/addon/hint/show-hint');
    require('codemirror/addon/hint/sql-hint');
    require('codemirror/mode/javascript/javascript.js');
    require('codemirror/mode/vue/vue.js');
    require('codemirror/mode/css/css.js');

    export default {
        name: 'IdeTextarea',
        props: {
            code: {
                type: String,
                default: ''
            },
            type: {
                type: String,
                default: 'javascript'
            }
        },
        data () {
            return {
                IDE: null
            }
        },
        mounted () {
            let mime = this.type;
            let editor = CodeMirror.fromTextArea(this.$refs.mycode, {
                mode: {name: mime, json: true},
                indentWithTabs: true,
                smartIndent: true,
                lineNumbers: true,
                matchBrackets: true
            });
            this.IDE = editor;
            editor.on('cursorActivity', function () {
                editor.showHint()
            });
        },
        methods: {
            getValue () {
                return this.IDE.getValue();
            }
        }
    }
</script>

<style lang="less">
    .ide-textarea {
        width: 260px;
        height: 150px;
    }
</style>

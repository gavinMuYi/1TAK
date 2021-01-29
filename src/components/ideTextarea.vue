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
    require('codemirror/mode/sql/sql');
    require('codemirror/addon/hint/show-hint');
    require('codemirror/addon/hint/sql-hint');

    export default {
        name: 'IdeTextarea',
        props: {
            code: {
                type: String,
                default: ''
            }
        },
        data () {
            return {
                IDE: null
            }
        },
        mounted () {
            let mime = 'javascript'
            let editor = CodeMirror.fromTextArea(this.$refs.mycode, {
                mode: mime,
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

<template>
    <div>
        111
        <tree-item v-if="data[0].children && data[0].children.length" :data="data[0].children" />
    </div>
</template>

<script>
    export default {
        name: 'TreeItem',
        props: {
            data: {
                type: Array,
                default: () => {
                    return []
                }
            }
        }
    }
</script>

<style scoped>

</style>

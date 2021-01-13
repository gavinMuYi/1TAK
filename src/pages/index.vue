<template>
    <div class="ACE-index">
        <router-link :to="{ name: 'NewMaterial' }">New Material</router-link>
        <router-link :to="{ name: 'Depository' }">Depository</router-link>
        <router-link :to="{ name: 'Factory' }">Factory</router-link>
        <router-link :to="{ name: 'ExhibitionHall' }">Exhibition Hall</router-link>
    </div>
</template>

<script>
    export default {
        name: 'Index',
        data () {
            return {
            }
        }
    }
</script>

<style scoped>
</style>

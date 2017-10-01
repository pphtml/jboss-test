<template>
    <div>
        <h1>Kočka snědla {{ pocetGranuli }} granulí.</h1>
        <button v-on:click="granuleZvysit">Další granule</button>
    </div>
</template>

<script>
    export default {
        name: 'componentA',
        data () {
            return {
                msg: 'Welcome to Your Vue.js App',
                pocetGranuli: 0
            }
        },
        methods: {
            granuleZvysit() {
                this.pocetGranuli++;
            }
        }
    }
</script>

<style scoped>
    h1 {
        color: coral;
    }
</style>

<template>
    <v-btn light @click="generateSampleData()">Generate Sample Data</v-btn>
</template>

<script>
    export default {
        name: 'sample-data-generator',
        methods: Vuex.mapActions(['generateSampleData'])
    }
</script>

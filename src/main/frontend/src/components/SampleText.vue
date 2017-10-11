<template>
    <v-flex xs12>
        <v-text-field
                label="Sample Text"
                class="mono-font"
                multi-line
                autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false"
                :value="sampleText" @keyup.stop="updateSampleText($event.target.value)"
        ></v-text-field>
    </v-flex>
</template>

<script>
    import Vuex from 'vuex'

    export default {
        computed: Vuex.mapGetters(['sampleText']),
        methods: Vuex.mapActions(['updateSampleText'])
    }
</script>

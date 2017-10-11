<template>
    <v-flex xs12>
        <v-text-field
                label="Regular Expression"
                class="mono-font"
                spellcheck="false"
                :value="regex" @keyup.stop="updateRegex($event.target.value)"
        ></v-text-field>
    </v-flex>
</template>

<script>
    export default {
        name: 'regex-regex',
        computed: Vuex.mapGetters(['regex']),
        methods: Vuex.mapActions(['updateRegex'])
    }
</script>

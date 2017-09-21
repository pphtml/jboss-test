const store = new Vuex.Store({
    state: {
        regex: '',
        sampleText: '',
        markedText: ''
    },
    mutations: {
        updateRegex: (state, regex) => state.regex = regex,
        updateSampleText: (state, sampleText) => state.sampleText = sampleText,
        updateMarkedText: (state, markedText) => state.markedText = markedText
    },
    actions: {
        updateRegex: (state, regex) => {
            store.commit('updateRegex', regex);
            store.dispatch('computeMaskedOnServer');
        },
        updateSampleText: (state, expression) => {
            store.commit('updateSampleText', expression);
            store.dispatch('computeMaskedOnServer');
        },
        computeMaskedOnServer: _.throttle((state) => {
                axios.get('/api/regex', {params: {text: store.state.sampleText, regex: store.state.regex}})
                    .then(response => {
                        //console.info(response.data);
                        store.commit('updateMarkedText', response.data.maskedText);
                    }).catch(e => {
                    console.info(`Handling of exception not implemented yet: ${e}`);
                });
            }, 100), // ms
        generateSampleData: (state) => {
            store.commit('updateRegex', '[A-Z]\\w+');
            store.dispatch('updateSampleText', 'First Second third Fourth');
        }
    },
    getters: {
        regex: (state) => state.regex,
        sampleText: (state) => state.sampleText,
        markedText: (state) => state.markedText
    }
});

Vue.component('regex-regex', {
    template: `<v-flex xs12>
            <v-text-field
              label="Regular Expression"
              class="mono-font"
              :value="regex" @keyup.stop="updateRegex($event.target.value)"
            ></v-text-field>
          </v-flex>`,
//<input class="regex-regex" :value="regex" @keyup.stop="updateRegex($event.target.value)">`,
    computed: Vuex.mapGetters(['regex']),
    methods: Vuex.mapActions(['updateRegex'])
});

Vue.component('sample-text', {
    template: `<v-flex xs12>
            <v-text-field
              label="Sample Text"
              class="mono-font"
              multi-line
              autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false"
              :value="sampleText" @keyup.stop="updateSampleText($event.target.value)"
            ></v-text-field>
          </v-flex>`,
    computed: Vuex.mapGetters(['sampleText']),
    methods: Vuex.mapActions(['updateSampleText'])
});

Vue.component('sample-masked', {
    template: `<div class="mono-font" style="font-size: 16px;" v-html="markedText"></div>`,
    computed: Vuex.mapGetters(['markedText'])
});

Vue.component('sample-data-generator', {
    template: `<v-btn light @click="generateSampleData()">Generate Sample Data</v-btn>`,
    methods: Vuex.mapActions(['generateSampleData'])
});

new Vue({
    el: '#app',
    store: store,
});

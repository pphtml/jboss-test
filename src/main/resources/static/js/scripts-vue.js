const store = new Vuex.Store({
    state: {
        regex: '',
        sampleText: '',
        markedText: ''
    },
    mutations: {
        updateRegex: (state, regex) => state.regex = regex,
        updateSampleText: (state, sampleText) => {
            state.sampleText = sampleText;
            state.markedText = sampleText
                .replace(/\n$/g, '\n\n')
                .replace(/[A-Z].*?\b/g, '<mark>$&</mark>');
        }
    },
    actions: {
        updateRegex: (state, regex) => store.commit('updateRegex', regex),
        updateSampleText: (state, expression) => store.commit('updateSampleText', expression)
    },
    getters: {
        regex: (state) => state.regex,
        sampleText: (state) => state.sampleText,
        markedText: (state) => state.markedText,
    }
});

Vue.component('regex-regex', {
    template: `<v-flex xs12>
            <v-text-field
              label="Regular Expression"
              id="testing"
            ></v-text-field>
          </v-flex>`,
//<input class="regex-regex" :value="regex" @keyup.stop="updateRegex($event.target.value)">`,
    computed: Vuex.mapGetters(['regex']),
    methods: Vuex.mapActions(['updateRegex'])
});

Vue.component('sample-text', {
    // template: `<textarea class="regex-input" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false"
    //                   :value="expression" @keyup.stop="updateSampleText($event.target.value)"></textarea>`,
    template: `<v-flex xs12>
            <v-text-field
              label="Sample Text"
              class="mono-font"
              multi-line
              :value="sampleText" @keyup.stop="updateSampleText($event.target.value)"
            ></v-text-field>
          </v-flex>`,
    computed: Vuex.mapGetters(['sampleText']),
    methods: Vuex.mapActions(['updateSampleText'])
});

Vue.component('sample-masked', {
    template: `<div class="mono-font" v-html="markedText"></div>`,
    computed: Vuex.mapGetters(['markedText'])
});

new Vue({
    el: '#app',
    store: store,
});

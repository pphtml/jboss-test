const store = new Vuex.Store({
    state: {
        expression: '',
        markedExpression: ''
    },
    mutations: {
        updateExpression: (state, expression) => {
            state.expression = expression;
            state.markedExpression = expression
                .replace(/\n$/g, '\n\n')
                .replace(/[A-Z].*?\b/g, '<mark>$&</mark>');
        }
    },
    getters: {
        expression: (state) => state.expression,
        markedExpression: (state) => state.markedExpression,
    }
});

Vue.component('regex-input', {
    template: `<textarea class="regex-input" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false"
                      :value="expression" @keyup.stop="updateExpression($event.target.value)"></textarea>`,
    computed: Vuex.mapGetters(['expression']),
    methods: {
        updateExpression(expression) {
            this.$store.commit('updateExpression', expression);
        }
    }
});

Vue.component('regex-masked', {
    template: `<div class="regex-masked" v-html="markedExpression"></div>`,
    computed: Vuex.mapGetters(['markedExpression'])
});

new Vue({
    el: '#app',
    store: store,
});

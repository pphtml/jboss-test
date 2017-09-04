// Vue.component('ulohy', {
//     template: '<div>Výběr příkladů!</div>'
// })

Vue.component('card', {
    props: ['title'],
    template: '' +
    '<div class="col-sm-4">' +
    '            <div class="panel panel-primary">\n' +
    '                <div class="panel-heading">{{ title }}</div>\n' +
    '                <div class="panel-body"><img src="https://placehold.it/150x80?text=IMAGE" class="img-responsive" style="width:100%" alt="Image"></div>\n' +
    '                <div class="panel-footer">Buy 50 mobiles and get a gift card</div>\n' +
    '            </div>' +
    '</div>' +
    ''
});

// 1. Define route components.
// These can be imported from other files
const Bar = {
    template: '<div>bar 12345</div>',
    props: {},
    created() {
        console.info('Bar created');
        app.$on('classes-selected', function (data) {
            console.info(data);
        });
    }
    //busapp.$on('id-selected', function (id) {
};

const Ulohy = {
    template: `<div>
<h2>Výběr třídy</h2>
<div class="row">
    <template v-for="(category, key) in categories">
        <input type="checkbox" v-bind:id="category.id" v-bind:value="category.id" v-model="selectedCategories">
        <label v-bind:for="category.id">{{category.name}}</label><br/>
    </template>
</div>
<div class="row">
    <button type="button" class="btn btn-primary" v-on:click="selectedHandler">OK</button>
</div>
</div>`,
    data () {
        return {
            categories: undefined,
            selectedCategories: []
        }
    },
    methods: {
        selectedHandler: function () {
            // this.$emit('increment')
            console.info(`inside my method: ${this.selectedCategories}`);
            app.selected = this.selectedCategories;
            console.info(app.selected);
            app.$emit('classes-selected', [1, 2, 3, 4])
            this.$router.push({name: 'bar'});
            //this.$router.push({name: 'bar', params: {bbb: [5, 4, 3] }});
        }
    },
    beforeRouteEnter (to, from, next) {
        axios.get('/api/category/all').then(response => {
            next(vm => {
                vm.categories = response.data;
            })
        })
    }
}

// 2. Define some routes
// Each route should map to a component. The "component" can
// either be an actual component constructor created via
// `Vue.extend()`, or just a component options object.
// We'll talk about nested routes later.
const routes = [
    { path: '/ulohy', component: Ulohy },
    { path: '/bar', name: 'bar', component: Bar }
    //{ path: '/bar', name: 'bar', component: Bar, props: {bbb: [1, 2, 3]} }
]

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = new VueRouter({
    // mode: 'history',
    routes, // short for `routes: routes`,
    linkActiveClass: 'active'
})

// 4. Create and mount the root instance.
// Make sure to inject the router with the router option to make the
// whole app router-aware.
const app = new Vue({
    router: router,
    data: {
        selected: []
    }
}).$mount('#app')

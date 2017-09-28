<template>
  <div class="hello">
    <h1>Kočka snědla {{ pocetGranuli }} granulí.</h1>
    <button v-on:click="granuleZvysit">Další granule</button>
  </div>
</template>

<script>
export default {
  name: 'hello',
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: coral;
}
</style>

<template>
    <div class="mono-font" style="font-size: 16px;" v-html="markedText"></div>
</template>

<script>
    name: 'sample-masked',
    computed: Vuex.mapGetters(['markedText'])
</script>

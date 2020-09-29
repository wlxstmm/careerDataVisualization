<template>
    <div id="app">
        <main-header/>
        <page/>
    </div>
</template>

<script>
    import MainHeader from './components/public/header/index.vue'
    import Page from './components/page/index.vue'
    export default {
        name: 'app',
        components: {
            MainHeader,
            Page
        }
    }
</script>

<style>
    @import "assets/css/clear.css";
    @import "assets/css/index.css";
</style>

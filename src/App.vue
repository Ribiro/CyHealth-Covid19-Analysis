<template>
  <div>
    <HeaderVue/>
    <HeaderBody/>
    <FooterVue/>
  </div>
</template>

<script>
import HeaderVue from './components/common/Header.vue';
import FooterVue from './components/common/Footer.vue';
import HeaderBody from './components/common/HeaderBody.vue'

export default {
  name: 'App',
  components: {
    HeaderVue,
    FooterVue,
    HeaderBody
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

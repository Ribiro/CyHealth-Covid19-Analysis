<template>
     <div>
        <HeaderVue></HeaderVue>
        <BodyVue id="banner"></BodyVue>
     </div>
</template>

<script>
import HeaderVue from './components/common/Header.vue';
import BodyVue from './components/Body.vue';

export default {
  name: 'App',
  components: {
    HeaderVue,
    BodyVue
  }
}
</script>

<style>
#banner {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 80px;
  margin-bottom: 100px;
}
#footer {
  margin-top: 80px;
}
</style>

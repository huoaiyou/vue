<template>
  <div>
    <router-view></router-view>
    <Footer v-show="$route.meta.isShowFooter"/>
  </div>
</template>

<script>
import Footer from './components/Footer/Footer.vue'
export default {
  components: {
    Footer
  }
}
</script>

<style>

</style>

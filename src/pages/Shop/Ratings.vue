<template>
  <div>
Ratings
  </div>
</template>

<script type="text/ecmascript-6">
import {mapState} from 'vuex'
  export default {
    // ...mapState(['ratings'])
    ...mapState({
      ratings: state => state.shop.ratings
      })
  }

</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

 
</style>

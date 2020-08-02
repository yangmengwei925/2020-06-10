<template>
  <div>
    <button @click="flag=!flag">click</button>
    <transition name="abc">
      <p v-if="flag">hello</p>
    </transition>
    <panelProup />
    <Map />
    <Chart />
  </div>
</template>

<script>
 import panelProup from './components/panelProup'
 import Chart from './components/Chart'
 import Map from './components/Map'
// import Main from './components/Main'

export default {
  data(){
    return {
      flag:true
    }
  },
  components:{
    panelProup,
    Chart,
    Map
  }
}
</script>
<style lang="scss">
.abc-enter-active,.abc-leave-active{
  transition:opacity 1s ease;
}
.abc-enter,.abc-leave-to{
  opacity:0
}
</style>


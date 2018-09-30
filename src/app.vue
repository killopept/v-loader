<template>
  <div id= "app" @click = "handleClick">{{msg}}</div>
</template>

<script>
export default {
  data() {
    return {
      msg: 'hello vue-loader'
    }
  },
  methods: {
    handleClick() {
      // console.error('error')
      console.log(123)
    }
  }
}
</script>

<style>
  #app{
    color: rgb(2, 250, 250);
  }
</style>

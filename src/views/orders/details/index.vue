<template>
    <div>
      <pre>{{order}}</pre>
    </div>
</template>

<script>

export default {
  name: 'OrderDetails',
  components: {  },
  params: ['order'],
  data() {
    return {
      order: {}
    }
  },
  mounted() {
    this.order = this.$route.params.order 
  }
}
</script>

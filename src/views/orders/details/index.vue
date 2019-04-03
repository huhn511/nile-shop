<template>
    <div>
      <h2>QR - Code</h2>
      <div class="qrcode-container">
      <qrcode-vue :value="order.root" :size="size" level="H"></qrcode-vue>
      </div>
      <h2>Order data</h2>
      <pre>{{order}}</pre>
    </div>
</template>

<script>
import QrcodeVue from 'qrcode.vue';

export default {
  name: 'OrderDetails',
  components: { QrcodeVue },
  params: ['order'],
  data() {
    return {
      order: {},
      size: 300
    }
  },
  mounted() {
    this.order = this.$route.params.order 
  }
}
</script>

<style lang="scss">

.qrcode-container {
  margin-left: 20px;
}

</style>

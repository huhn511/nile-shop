<template>
    <order-form :is-new="true" />
</template>

<script>
import OrderForm from '../components/OrderForm'

export default {
  name: 'NewOrder',
  components: { OrderForm },
  data() {
    return {
      
    }
  }
}
</script>

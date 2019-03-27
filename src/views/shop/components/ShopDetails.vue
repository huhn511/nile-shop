<template>
  <div v-loading="loading" class="shop-details-form-container">
    root {{details.shop.root}}
  </div>
</template>

<script>
import Sticky from '@/components/Sticky'


export default {
  name: 'ShopDetails',
  components: { Sticky },
  props: {
    details: {
      type: Object
    }
  },
  data() {
    return{
      loading: false
    }
  },
  created() {
    // fetch products from database
    console.log("props", this.details);
    
  },
  methods: {
    
  }
  
}
</script>
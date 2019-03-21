<template>
    <el-row>
        <el-col :span="12" v-for="(product, index) in products" :key="index">
            <el-card>
            <img src="http://via.placeholder.com/320x180" class="image">
                <p>{{ product.data.title }}</p>
                <p>{{ product.data.price }} {{product.data.currency}}</p>
                <div class="bottom clearfix">
                <el-button type="info" @click='addToCart(product)'>Add to cart</el-button>
                </div>
            </el-card>
        </el-col>
        </el-row>
</template>

<script>
export default {
  data() {
    return {
     products: []
    };
  },
  methods: {
   addToCart(product){
    this.$store.dispatch('AddToCart', product)
   }
  },
  created() {
    // fetch products from database
    let products_string = localStorage.getItem('products') || "[]"
    this.products = JSON.parse(products_string)
  },
}
</script>
<style>
  .image {
    width: 100%;
    display: block;
  } 
</style>
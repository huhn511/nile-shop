<template>
  <div v-loading="loading" class="createOrder-container">
    <h2>New Order</h2>
    <el-form ref="form" :model="form" class="form-container">

      <sticky class-name="sub-navbar">
        <el-button style="margin-left: 10px;" type="success" @click="onSubmit">
          Create
        </el-button>
        <el-button @click="onCancel" type="warning">Cancel</el-button>
      </sticky>

      <div class="createOrder-main-container">
        <el-row>
          <el-col :span="24">
            <el-form-item label="Name:">
                <el-input v-model="form.name" :rows="1" type="text" class="order-name" autosize placeholder="Your name" />
            </el-form-item>
          </el-col>
        </el-row>
      </div>
    </el-form>
    <h2>Shopping card</h2>
    <shopping-cart />
    <h2>Product List</h2>
    <product-list />
  </div>
</template>

<script>
import Sticky from '@/components/Sticky'
import ShoppingCart from './ShoppingCart'
import ProductList from './ProductList'
import { composeAPI } from '@iota/core'
import { provider } from '@/config.json';

const iota = composeAPI({
    provider: provider
})
import { createMAMChannel, generateSeed } from '@/utils/MAM'

export default {
  name: 'OrderForm',
  components: { Sticky, ShoppingCart, ProductList },
  props: {
    isNew: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return{
      loading: false,
      products: [],
      form: {
        name: '',
        cart: this.$store.state.cart.items,
        id: 0
      }
    }
  },
  created() {
    // fetch products from database
    let products_string = localStorage.getItem('products') || "[]"
    this.products = JSON.parse(products_string)
    this.calcNextId()
  },
  computed: {
    cart() {
      return this.$store.state.cart.items
    }
  },
  methods: {
    onSubmit: async function() {
      // save it to mam!
      this.loading = true
      let review_seed = generateSeed()
      await iota.getNewAddress(review_seed, { index: 0 })
        .then(address => {
          this.form.paying_address = address
        })
        .catch(err => {
          // ...
        })
        await iota.getNewAddress(review_seed, { index: 1 })
        .then(address => {
          this.form.package_address = address
        })
        .catch(err => {
          // ...
        })
        await iota.getNewAddress(review_seed, { index: 2 })
        .then(address => {
          this.form.pickup_address = address
        })
        .catch(err => {
          // ...
        })
        await iota.getNewAddress(review_seed, { index: 3 })
        .then(address => {
          this.form.delivered_address = address
        })
        .catch(err => {
          // ...
        })

      let order = await createMAMChannel(this.form, 'order')

      // fetch orders from database
      let orders_string = localStorage.getItem('orders') || "[]"
      let orders = JSON.parse(orders_string)

      orders.push(order)

      // save orders in database
      const parsed = JSON.stringify(orders);
      localStorage.setItem('orders', parsed)

      this.loading = false
      this.$router.push('/orders')
    },
    onCancel() {
      this.$router.push('/orders')
    },
    calcNextId() {       
      let _orders = localStorage.getItem('orders') || "[]"
      let orders = JSON.parse(_orders)
      if(orders.length) {
          this.form.id = orders.length + 1;
      } else {
          this.form.id = 1;
      }
    },
    generate_new_address() {

    }
  }
  
}
</script>

<style>
  .image {
    width: 100%;
    display: block;
  } 
</style>
<template>
  <div class="app-container" v-loading="loading">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="Name">
        <el-input v-model="form.name"/>
      </el-form-item>
      <el-form-item label="Description">
        <el-input v-model="form.desc" type="textarea"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">Create</el-button>
        <el-button @click="onCancel">Cancel</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { createProductChannel, generateSeed } from '@/utils/MAM';

import Mam from 'mam.client.js';

const mode = 'restricted'
const provider = 'https://nodes.devnet.thetangle.org:443'
const { asciiToTrytes, trytesToAscii } = require('@iota/converter')

export default {
  
  data() {
    return {
      next_id: 0,
      products: [],
      loading: false,
      form: {
        name: '',
        desc: ''
      }
    }
  },
  methods: {
    loadProducts() {       
      let _products = localStorage.getItem('products') || "[]"
      this.products = JSON.parse(_products)
      if(this.products.length) {
          this.next_id = this.products.length + 1;
      } else {
          this.next_id = 1;
      }
    },
    createProduct: async function(product){
      this.loading = true

      let seed = generateSeed()

      let response = await createProductChannel(product, seed)

      response.seed = seed

      this.products.push(response);
      const parsed = JSON.stringify(this.products);
      localStorage.setItem('products', parsed)
      this.loadProducts()  
      this.loading = false
      this.$message('Product created!')
      this.form = {}
    },
    onSubmit() {
      this.createProduct(this.form)
    },
    onCancel() {
      this.$message({
        message: 'cancel!',
        type: 'warning'
      })
    }
  },
  mounted() {
    this.loadProducts()
  }

}
</script>

<style scoped>
.line{
  text-align: center;
}
</style>

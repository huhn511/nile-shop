<template>
  <div class="app-container" v-loading="loading">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="Title">
        <el-input v-model="form.title" placeholder="Product title"/>
      </el-form-item>
      <el-form-item label="Description:">
          <el-input v-model="form.desc" :rows="5" type="textarea" class="product-textarea" autosize placeholder="Product description" />
          <span v-show="descriptionLength" class="word-counter">{{ descriptionLength }} Chars (1000 Max)</span>
        </el-form-item>
      <el-form-item label="Price">
        <el-col :span="19">
          <el-input type="number" v-model="form.price" step="any" placeholder="1000"></el-input>
        </el-col>
        <el-col :span="5">
          <el-select v-model="form.currency" placeholder="choose currency">
            <el-option label="Euro" value="euro"></el-option>
            <el-option label="IOTA" value="iota"></el-option>
          </el-select>
        </el-col>
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
        title: '',
        desc: ''
      }
    }
  },
  computed: {
    descriptionLength() {
      return this.form.desc.length
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
      
      this.$notify({
        title: 'Sucecss',
        message: `Product ${this.form.title} created!`,
        type: 'success',
        duration: 3000
      })
      this.form = {}

    },
    onSubmit() {
      this.form.id = this.next_id
      this.createProduct(this.form)
    },
    onCancel() {
      this.$router.push("/products")
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
.el-dropdown-link {
  cursor: pointer;
  color: #409EFF;
}
.el-icon-arrow-down {
  font-size: 12px;
}
</style>

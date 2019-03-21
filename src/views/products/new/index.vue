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
      <el-row>
        <div class="info" style="height: 15%">
          <p>Center: {{ center }}</p>
          <p>Iac: {{ iac }}</p>
        </div>
        <l-map
          style="height: 400px; width: 400px"
          :zoom="zoom"
          :center="center"
          @update:zoom="zoomUpdated"
          @update:center="centerUpdated"
          @update:bounds="boundsUpdated"
        >
          <l-tile-layer :url="url"></l-tile-layer>
          <l-marker :lat-lng="center"></l-marker>
        </l-map>   
      </el-row>
      
    </el-form>
  </div>
</template>

<script>
import { createProductChannel, generateSeed } from '@/utils/MAM';

import Mam from 'mam.client.js';

const mode = 'restricted'
const provider = 'https://nodes.devnet.thetangle.org:443'
const { asciiToTrytes, trytesToAscii } = require('@iota/converter')
const iotaAreaCodes = require('@iota/area-codes');

const iac = iotaAreaCodes.encode(52.529562, 13.413047);
console.log("IOTA Area Code", iac);

import {LMap, LTileLayer, LMarker} from 'vue2-leaflet'

const dimensions = iotaAreaCodes.getPrecisionDimensions(11);
console.log("dimensions", dimensions);
console.log("iotaAreaCodes.CodePrecision.EXTRA", iotaAreaCodes.CodePrecision.EXTRA);

export default {
  components: { LMap, LTileLayer, LMarker },
  data() {
    return {
      next_id: 0,
      products: [],
      loading: false,
      form: {
        title: '',
        desc: ''
      },
      url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
      zoom: 13,
      center: { "lat": 52.529562, "lng": 13.413047 },
      bounds: null,
      iac: ''
    }
  },
  computed: {
    descriptionLength() {
      return this.form.desc.length
    },
    calculateIac() {
      
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
        duration: 2000
      })
      this.form = {
        title: '',
        desc: ''
      }
      this.$router.push('/products')

    },
    onSubmit() {
      this.form.id = this.next_id
      this.createProduct(this.form)
    },
    onCancel() {
      this.$router.push("/products")
    },
    zoomUpdated (zoom) {
      this.zoom = zoom;
    },
    centerUpdated (center) {
        this.center = center;
        this.iac = iotaAreaCodes.encode(this.center.lat, this.center.lat, iotaAreaCodes.CodePrecision.EXTRA)
    },
    boundsUpdated (bounds) {
      this.bounds = bounds;
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

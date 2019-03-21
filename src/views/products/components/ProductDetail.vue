<template>
  <div v-loading="loading" class="createPost-container">
    <h2>Update Product</h2>
    <el-form ref="form" :model="form" :rules="rules" class="form-container">

      <sticky :class-name="'sub-navbar '+form.status">
        <el-button style="margin-left: 10px;" type="success" @click="submitForm">
          Update
        </el-button>
        <el-button @click="onCancel" type="warning">Cancel</el-button>
      </sticky>


      <div class="createPost-main-container">
        <el-row>
          <p>ID: {{form.id}}</p>
          <p>Root: {{product.root}}</p>
          <p>Stock root: {{product.stock_root}}</p>
          <el-col :span="24">
            <el-form-item label="Title:">
                <el-input v-model="form.title" :rows="1" type="text" class="product-text" autosize placeholder="Product title" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item label="Description:">
          <el-input v-model="form.desc" :rows="5" type="textarea" class="product-textarea" autosize placeholder="Product description" />
          <span v-show="descriptionLength" class="word-counter">{{ descriptionLength }} Chars (1000 max)</span>
        </el-form-item>


        <el-form-item label="Price">
          <el-col :span="12">
            <el-input type="number" v-model="form.price" step="any"></el-input>
          </el-col>
          <el-col :span="5">
            <el-select v-model="form.currency" placeholder="choose currency">
              <el-option label="Euro" value="euro"></el-option>
              <el-option label="IOTA" value="iota"></el-option>
            </el-select>
          </el-col>
        </el-form-item>
      </div>
    </el-form>
    <h2>Product History</h2>
    <el-collapse accordion>
      <el-collapse-item v-for="(message, index) in sortedMessages" :key="index" v-bind:title="generateTitle(message)" :name=index>
        <pre>{{message.data}}</pre>
      </el-collapse-item>
    </el-collapse>


  </div>
  
</template>

<script>
import Sticky from '@/components/Sticky'

import {
  fetchProduct,
  appendAttributesUpdate,
  fetchProducts,
  createProductChannel,
  generateSeed,
  increaseStock
} from "@/utils/MAM";

const defaultForm = {
  status: 'draft',
  title: 'default title',
  desc: 'default description'
}


export default {
  name: 'ProductDetail',
  components: { Sticky },
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    const validateRequire = (rule, value, callback) => {
      if (value === '') {
        this.$message({
          message: rule.field + 'Necessary',
          type: 'error'
        })
        callback(new Error(rule.field + 'Necessary'))
      } else {
        callback()
      }
    }
    const validateSourceUri = (rule, value, callback) => {
      if (value) {
        if (validURL(value)) {
          callback()
        } else {
          this.$message({
            message: 'Outer chain url is not filled correctly',
            type: 'error'
          })
          callback(new Error('Outer chain url is not filled correctly'))
        }
      } else {
        callback()
      }
    }
    return {
      form: Object.assign({}, defaultForm),
      loading: false,
      userListOptions: [],
      rules: {
        title: [{ validator: validateRequire }]
      },
      tempRoute: {},
      messages: [],
      dialogFormVisible: false

    }
  },
  computed: {
    sortedMessages: function() {
      function compare(a, b) {
        if (a.timestamp > b.timestamp) return -1;
        if (a.timestamp < b.timestamp) return 1;
        return 0;
      }
      return this.messages.sort(compare);
    },
    descriptionLength() {
      return this.form.desc.length
    },
    lang() {
      return this.$store.getters.language
    }
  },
  created() {
    if (this.isEdit) {
      this.product_id = this.$route.params && this.$route.params.id
      this.loadLatestProduct()
    } else {
      this.form = Object.assign({}, defaultForm)
    }

    // Why need to make a copy of this.$route here?
    // Because if you enter this page and quickly switch tag, may be in the execution of the setTagsViewTitle function, this.$route is no longer pointing to the current page
    // https://github.com/PanJiaChen/vue-element-admin/issues/1221
    this.tempRoute = Object.assign({}, this.$route)
  },
  methods: {
    setTagsViewTitle() {
      const title = this.lang === 'zh' ? 'Edit Article' : 'Edit Article'
      const route = Object.assign({}, this.tempRoute, { title: `${title}-${this.form.id}` })
      this.$store.dispatch('updateVisitedView', route)
    },
    submitForm() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.updateProduct(this.form);
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    loadLatestProduct: async function(product_id) {
      this.loading = true;

      let _products = localStorage.getItem("products") || "[]";
      this.products = JSON.parse(_products);

      this.product = this.products.find(this.getCurrentProduct);
      this.messages = await fetchProducts(this.product.seed, this.product.root);

      this.latest_product = this.sortedMessages[0];
      this.form = Object.assign({}, this.latest_product.data)

      this.loading = false;
    },
    getCurrentProduct(product) {
      if (product.data.id == this.product_id) {
        return product;
      }
    },
    updateProduct: async function(data) {
      this.loading = true;

      let response = await appendAttributesUpdate(
        data,
        this.product.seed,
        this.product.next_root,
        this.product.start
      );

      // Remove the correct product
      // search the correct object index (in theory id  - 1)
      this.products.splice(this.product.data.id - 1, 1);

      response.seed = this.product.seed;
      response.root = this.product.root;
      response.stock_next_root = this.product.stock_next_root;
      response.stock_start = this.product.stock_start;
      response.stock_seed = this.product.stock_seed;
      response.stock_root = this.product.stock_root;

      this.product = response;

      this.products.push(this.product);

      const parsed = JSON.stringify(this.products);
      localStorage.setItem('products', parsed);
      this.loadLatestProduct();

      this.$notify({
        title: 'Sucecss',
        message: `Product "${this.form.title}" updated!`,
        type: 'success',
        duration: 2000
      })
      this.form.status = 'published'
      this.loading = false
    },
    generateTitle(message, index) {
      return message.data.title + ", " + message.status + " at " + this.$options.filters.formatTimestampToDate(message.timestamp)
    },
    onCancel() {
      this.$router.push('/products')
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "~@/styles/mixin.scss";
.createPost-container {
  position: relative;
  .createPost-main-container {
    padding: 40px 45px 20px 50px;
    .postInfo-container {
      position: relative;
      @include clearfix;
      margin-bottom: 10px;
      .postInfo-container-item {
        float: left;
      }
    }
  }
}
</style>
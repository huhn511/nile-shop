<template>
  <div class="createPost-container">
    <el-form ref="postForm" :model="postForm" :rules="rules" class="form-container">

      <sticky :class-name="'sub-navbar '+postForm.status">
        <el-button v-loading="loading" style="margin-left: 10px;" type="success" @click="submitForm">
          Save
        </el-button>
        <el-button v-loading="loading" type="warning" @click="draftForm">draft</el-button>
      </sticky>

      <div class="createPost-main-container">
        <el-row>
          <Warning />
          <el-col :span="24">
            <el-form-item label="Title:">
                <el-input v-model="postForm.title" :rows="1" type="text" class="product-text" autosize placeholder="Product title" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item label="Description:">
          <el-input v-model="postForm.desc" :rows="5" type="textarea" class="product-textarea" autosize placeholder="Product description" />
          <span v-show="descriptionLength" class="word-counter">{{ descriptionLength }}字</span>
        </el-form-item>
      </div>
    </el-form>

    <el-collapse accordion v-for="(message, index) in messages" :key="message.data.id">
      <el-collapse-item :title="message.data.title" :name=index>
        <pre>{{message.data}}</pre>
      </el-collapse-item>
    </el-collapse>

  </div>
</template>

<script>
import Warning from './Warning'
import Sticky from '@/components/Sticky'

import {
  fetchProduct,
  appendAttributesUpdate,
  fetchProducts
} from "@/utils/MAM";

const defaultForm = {
  status: 'draft',
  title: 'default title',
  desc: 'default description'
}

export default {
  name: 'ProductDetail',
  components: { Warning, Sticky },
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
      postForm: Object.assign({}, defaultForm),
      loading: false,
      userListOptions: [],
      rules: {
        title: [{ validator: validateRequire }]
      },
      tempRoute: {},
      messages: []
    }
  },
  computed: {
    descriptionLength() {
      return this.postForm.desc.length
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
      this.postForm = Object.assign({}, defaultForm)
    }

    // Why need to make a copy of this.$route here?
    // Because if you enter this page and quickly switch tag, may be in the execution of the setTagsViewTitle function, this.$route is no longer pointing to the current page
    // https://github.com/PanJiaChen/vue-element-admin/issues/1221
    this.tempRoute = Object.assign({}, this.$route)
  },
  methods: {
    setTagsViewTitle() {
      const title = this.lang === 'zh' ? 'Edit Article' : 'Edit Article'
      const route = Object.assign({}, this.tempRoute, { title: `${title}-${this.postForm.id}` })
      this.$store.dispatch('updateVisitedView', route)
    },
    submitForm() {
      this.postForm.display_time = parseInt(this.display_time / 1000)
      console.log(this.postForm)
      this.$refs.postForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$notify({
            title: 'Sucecss',
            message: 'Product created!',
            type: 'success',
            duration: 2000
          })
          this.postForm.status = 'published'
          this.loading = false
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    draftForm() {
      if (this.postForm.title.length === 0) {
        this.$message({
          message: 'Please enter the required title and content',
          type: 'warning'
        })
        return
      }
      this.$message({
        message: 'Successfully saved!',
        type: 'success',
        showClose: true,
        duration: 1000
      })
      this.postForm.status = 'draft'
    },
    getRemoteUserList(query) {
      userSearch(query).then(response => {
        if (!response.data.items) return
        this.userListOptions = response.data.items.map(v => v.name)
      })
    },
    loadLatestProduct: async function(product_id) {
      this.loading = true;


      let _products = localStorage.getItem("products") || "[]";
      this.products = JSON.parse(_products);

      this.product = this.products.find(this.getCurrentProduct);
      this.messages = await fetchProducts(this.product.seed, this.product.root);
      console.log("messages", this.messages)

      this.latest_product = this.messages[this.messages.length - 1];
      this.postForm = this.latest_product.data

      this.loading = false;
    },
    getCurrentProduct(product) {
      console.log("getCurrentProduct", product)

      if (product.data.id == this.product_id) {
        return product;
      }
    },
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
  .word-counter {
    width: 40px;
    position: absolute;
    right: -10px;
    top: 0px;
  }
}
</style>
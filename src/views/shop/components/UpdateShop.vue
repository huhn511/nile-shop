<template>
  <div v-loading="loading" class="shop-details-form-container">
    <el-alert
        v-if="published"
        title="Shop is not published yet!"
        type="warning">
        <p>You can add your shop details and publish it!</p>
    </el-alert>
    
    <el-form ref="form" :model="form" class="form-container">

      <sticky class-name="sub-navbar">
        <el-button style="margin-left: 10px;" type="success" @click="onSubmit">
          Update
        </el-button>
        <el-button @click="onCancel" type="warning">Cancel</el-button>
      </sticky>

      <div class="shop-details-form-main-container">
        <el-row>
          <el-col :span="24">
            <el-form-item label="Name:">
                <el-input v-model="form.name" :rows="1" type="text" class="shop-name" autosize placeholder="Your shop name" />
            </el-form-item>
          </el-col>
        </el-row>
      </div>
    </el-form>
  </div>
</template>

<script>
import Sticky from '@/components/Sticky'

import { createMAMChannel } from '@/utils/MAM'

export default {
  name: 'UpdateShop',
  components: { Sticky },
  props: {
    published: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return{
      loading: false,
      shop: {},
      form: {
        name: '',
      }
    }
  },
  created() {
    // fetch products from database
    let shop_string = localStorage.getItem('shop') || "{}"
    this.shop = JSON.parse(shop_string)
    this.form = this.shop.data
  },
  methods: {
    onSubmit: async function() {
      // save it to mam!
      this.loading = true

      let shop = await createMAMChannel(this.form, 'shop')

      // save orders in database
      const parsed = JSON.stringify(shop);
      localStorage.setItem('shop', parsed)

      this.loading = false
      this.$router.push('/dashboard')
    },
    onCancel() {
      this.$router.push('/dashboard')
    }
  }
  
}
</script>
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
  </div>
</template>

<script>
import Sticky from '@/components/Sticky'

export default {
  name: 'OrderForm',
  components: { Sticky },
  props: {
    isNew: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return{
      loading: false,
      form: {
        name: ''
      }
    }
  },
  methods: {
    onSubmit() {
      console.log("click", this.form)
    },
    onCancel() {
      this.$router.push('/orders')
    }
  }
  
}
</script>

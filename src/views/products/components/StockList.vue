<template>
  <div>
  <sticky :class-name="'sub-navbar'">
        <el-button @click="onIncreaseStock" type="primary">Increase Stock</el-button>
        <el-button @click="onCancel" type="warning">Cancel</el-button>
    </sticky>

    
    <el-table :data="sortedList" border fit highlight-current-row style="width: 100%">

      <el-table-column class-name="status-col" label="Status" width="110">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">
            {{ scope.row.status }}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column  width="220" align="center" label="Date">
        <template slot-scope="scope">
          <span>{{ scope.row.timestamp | formatTimestampToDate }}</span>
        </template>
      </el-table-column>

      
      <el-table-column
        v-loading="loading"
        align="center"
        label="Products"
        element-loading-text="Loading..."
      >
        <template slot-scope="scope">
          <ul>
            <li v-for="root in scope.row.data" v-bind:key="root">
              {{root}}
            </li>
          </ul>
        </template>
      </el-table-column>


    </el-table>

    <el-dialog title="Increase your stock" :visible.sync="dialogFormVisible">
      <p>You can create products of your product blueprint "{{product.data.title}}"</p>
      <el-form :model="increase_stock_form">
        <el-form-item label="Amount" label-width="120px">
          <el-input v-model="increase_stock_form.amount" type="number" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Producer" label-width="120px">
          <el-input v-model="increase_stock_form.producer" type="text" placeholder="Your name"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">Cancel</el-button>
        <el-button type="primary" v-loading="loading" @click="onIncreaseStockConfirmed">Confirm</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { fetch, increaseStock } from '@/utils/MAM';
import Sticky from '@/components/Sticky'
import { async } from 'q';

const defaultIncreaseStockForm = {
  amount: 1
}
export default {
  name: 'StockList',
  components: { Sticky },
  filters: {
    statusFilter(status) {
      const statusMap = {
        increased: 'success',
        created: 'primary',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  props: {
    type: {
      type: String,
      default: 'CN'
    }
  },
  data() {
    return {
      product: {
        data: {

        }
      },
      fetched_product: {},
      product_id: 0,
      product_roots: [],
      list: [],
      increase_stock_form: Object.assign({}, defaultIncreaseStockForm),
      loading: false,
      dialogFormVisible: false
    }
  },
  mounted() {
    this.product_id = this.$route.params && this.$route.params.id
    this.getStock()
  },
  methods: {
    getStock: async function(product_id) {
      this.loading = true

      // get stock root
      this.loadLatestProduct()
 
      // fetch stock items
      await fetch(this.product.stock_root, 'restriced', 'TEST', this.appendToList, this.fetchComplete);


      this.$emit('create') // for test
      this.loading = false

    },
    getCurrentProduct(product) {
      if (product.data.id == this.product_id) {
        return product;
      }
    },
    appendToList: async function(message) {
      console.log("message", message);
      
      /*
        // get product roots
        message.data.forEach((product_root, index) => {
          console.log("pushed hash: ", product_root)
          console.log("index", index)
          console.log("message.data", message.data)

          //this.product_roots.push(hash)
          await fetch(root, 'restriced', 'TEST', this.appendToObject, this.fetchPructComplete);
  
          message.data = this.fetched_product
          
          console.log("message.data 2", message.data)

        });
        */
        // add it to the list
        this.list.push(message)


    },
    fetchComplete() {
      
        this.loading = false
        console.log("loaded stock!", this.list)
    },
    onCancel() {
      this.$router.push('/products')
    },
    onIncreaseStock() {
      this.dialogFormVisible = true
      console.log("Hello world!")
    },
    onIncreaseStockConfirmed() {

      // create choosen amount of new products (new mam channels)
      console.log("amount: ", this.increase_stock_form.amount)
      

      let real_product = {
        producer: this.increase_stock_form.producer
      }
      console.log("real product: ", real_product)
      this.publishRealProduct(real_product)
    },
    publishRealProduct: async function(product){

      this.loading = true;

      // publish it to mam
      let response = await increaseStock(product, this.product)

      console.log("final response", response)

      this.products.pop(this.product);

      this.product.stock_next_root = response.next_root
      this.product.stock_start = response.start

      this.products.push(this.product);
      const parsed = JSON.stringify(this.products);
      localStorage.setItem('products', parsed);
      this.loadLatestProduct();

      this.$notify({
        title: 'Sucecss',
        message: `Product "${this.product.title}" updated!`,
        type: 'success',
        duration: 2000
      })
      this.loading = false;
      this.dialogFormVisible = false
    },
    loadLatestProduct: async function(product_id) {
      this.loading = true;

      let _products = localStorage.getItem("products") || "[]";
      this.products = JSON.parse(_products);

      this.product = this.products.find(this.getCurrentProduct);

      this.loading = false;
    },
    fetchProcutDetails: async function(root) {
        await fetch(root, 'restriced', 'TEST', this.appendToObject, this.fetchPructComplete);
 
        return this.fetched_product
    },
    appendToObject(message){
      console.log("appendToObject");


    },
    fetchPructComplete() {
      
        this.loading = false
    }
  },
  computed: {
    sortedList: function() {
      function compare(a, b) {
        if (a.timestamp > b.timestamp) return -1;
        if (a.timestamp < b.timestamp) return 1;
        return 0;
      }
      return this.list.sort(compare);
    }
  }
}
</script>

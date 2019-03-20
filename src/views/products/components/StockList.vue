<template>
  <el-table :data="list" border fit highlight-current-row style="width: 100%">

    <el-table-column
      v-loading="loading"
      align="center"
      label="DATA"
      element-loading-text="Loading..."
    >
      <template slot-scope="scope">
        <span>{{ scope.row.data }}</span>
      </template>
    </el-table-column>

    <el-table-column class-name="status-col" label="Status" width="110">
      <template slot-scope="scope">
        <el-tag :type="scope.row.status | statusFilter">
          {{ scope.row.status }}
        </el-tag>
      </template>
    </el-table-column>

    <el-table-column width="180px" align="center" label="Date">
      <template slot-scope="scope">
        <span>{{ scope.row.timestamp | formatTimestampToDate }}</span>
      </template>
    </el-table-column>

  </el-table>
</template>

<script>
import { fetch } from '@/utils/MAM';

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
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
      product: null,
      product_id: 0,
      list: [],
      listQuery: {
        page: 1,
        limit: 5,
        type: this.type,
        sort: '+id'
      },
      loading: false
    }
  },
  created() {
    this.product_id = this.$route.params && this.$route.params.id
    this.getStock()
  },
  methods: {
    getStock: async function(product_id) {
      this.loading = true

      // get stock root
      let _products = localStorage.getItem("products") || "[]";
      this.products = JSON.parse(_products);

      this.product = this.products.find(this.getCurrentProduct);

      console.log("this.product", this.product)
 
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
    appendToList(message){
      console.log("message", message);
      
        this.list.push(message)
    },
    fetchComplete() {
        this.loading = false
    }
  }
}
</script>

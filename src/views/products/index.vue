<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row>
      <el-table-column align="center" label="ID" width="95">
        <template slot-scope="scope">
          {{ scope.row.data.id }}
        </template>
      </el-table-column>
      <el-table-column label="Title">
        <template slot-scope="scope">
          <router-link :to="'/products/edit/'+scope.row.data.id" class="link-type">
            <span>{{ scope.row.data.title }}</span>
          </router-link>
        </template>
      </el-table-column>

      <el-table-column label="Price">
        <template slot-scope="scope">
          <span>{{ scope.row.data.price }} {{ scope.row.data.currency }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Last entry">
        <template slot-scope="scope">
          <span>{{ scope.row.timestamp | formatTimestampToDate }} </span>
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="Status" width="110" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{ scope.row.status }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="Actions" align="center">
        <template slot-scope="scope">
          <el-row>
            <el-button @click="$router.push('/viewer/' + scope.row.root)" type="success" icon="el-icon-view" circle></el-button>
            <el-button @click="$router.push('/products/edit/' + scope.row.data.id)" type="primary" icon="el-icon-edit" circle></el-button>
          </el-row>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        created: 'success',
        updated: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: null,
      listLoading: true
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true

      let _products = localStorage.getItem('products') || "[]"
      this.list = JSON.parse(_products)
      
      this.listLoading = false
    }
  }
}
</script>

<template>
    <div class="tab-container">
    <el-tabs v-model="activeName" style="margin-top:15px;" type="border-card">
      <el-tab-pane :label="tabMapOptions[0].label" :name="tabMapOptions[0].key">
        <keep-alive>
          <product-detail :is-edit="true" />
        </keep-alive>
      </el-tab-pane>

      <el-tab-pane :label="tabMapOptions[1].label" :name="tabMapOptions[1].key">
        <keep-alive>
          <stock-list v-if="activeName==tabMapOptions[1].key" :type="tabMapOptions[1].key" />
        </keep-alive>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import ProductDetail from '../components/ProductDetail'
import StockList from '../components/StockList'

export default {
  name: 'EditForm',
  components: { ProductDetail, StockList },
  data() {
    return {
      tabMapOptions: [
        { label: 'Details', key: 'details' },
        { label: 'Stock', key: 'stock' }
      ],
      activeName: 'details'
    }
  }
}
</script>

(window.webpackJsonp=window.webpackJsonp||[]).push([["AyOo"],{AyOo:function(t,e,a){"use strict";a.r(e);var n={filters:{statusFilter:function(t){return{created:"success",updated:"gray",deleted:"danger"}[t]}},data:function(){return{list:null,listLoading:!0}},created:function(){this.fetchData()},methods:{fetchData:function(){this.listLoading=!0;var t=localStorage.getItem("products")||"[]";this.list=JSON.parse(t),this.listLoading=!1}}},l=a("KHd+"),s=Object(l.a)(n,function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"app-container"},[a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.listLoading,expression:"listLoading"}],attrs:{data:t.list,"element-loading-text":"Loading",border:"",fit:"","highlight-current-row":""}},[a("el-table-column",{attrs:{align:"center",label:"ID",width:"95"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n        "+t._s(e.row.data.id)+"\n      ")]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"Title"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("router-link",{staticClass:"link-type",attrs:{to:"/products/edit/"+e.row.data.id}},[a("span",[t._v(t._s(e.row.data.title))])])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"Price"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(e.row.data.price)+" "+t._s(e.row.data.currency))])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"Last entry"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(t._f("formatTimestampToDate")(e.row.timestamp))+" ")])]}}])}),t._v(" "),a("el-table-column",{attrs:{"class-name":"status-col",label:"Status",width:"110",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-tag",{attrs:{type:t._f("statusFilter")(e.row.status)}},[t._v(t._s(e.row.status))])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"Actions",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-row",[a("el-button",{attrs:{type:"success",icon:"el-icon-view",circle:""},on:{click:function(a){t.$router.push("/viewer/"+e.row.root)}}}),t._v(" "),a("el-button",{attrs:{type:"primary",icon:"el-icon-edit",circle:""},on:{click:function(a){t.$router.push("/products/edit/"+e.row.data.id)}}})],1)]}}])})],1)],1)},[],!1,null,null,null);s.options.__file="index.vue";e.default=s.exports}}]);
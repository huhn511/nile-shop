<template>
    <div v-loading="loading">
        <h1>Viewer</h1>
        <div v-if="root">
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                
                    <el-tag :type=getType(init_message.type)>{{init_message.type}}</el-tag>

                    {{init_message.data.title}}
                </div>
            </el-card>
            <h3>Latest message</h3>
            <pre>{{latest_message}}</pre>

            <h3>Init message</h3>
            <pre>{{init_message}}</pre>
        </div>
        <div v-if="!root">
        <el-form :inline="true" :model="searchForm" class="demo-form-inline">
            <el-form-item label="Search for...">
                <el-input v-model="searchForm.query" placeholder="Input root for blueprint, stock, product or order."></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSearch">Search</el-button>
            </el-form-item>
        </el-form>
        </div>
    </div>
</template>

<script>

import Mam from 'mam.client.js';
import { trytesToAscii } from '@iota/converter'
import { provider } from '@/config.json';
import { generateSeed } from '@/utils/MAM';
import { fetch } from '@/utils/MAM';

export default {
    data() {
        return{
            root: '',
            loading: false,
            messages: [],
            init_message: {
                data: {
                    title: ''
                }
            },
            latest_message: {
                data: {
                    title: ''
                }
            },
            searchForm: {
                query: ''
            }
        }
    },
    mounted () {
        this.loadData(this.$route.params.root)
    },
    methods: {
        loadData: async function(root) {
            this.loading = true
            if(root) {
                this.root = root
                
                await fetch(provider, this.root, 'restriced', 'TEST', this.appendToMessages, this.fetchComplete);

            } else {
                console.log("no root defined, show search and latest views.")
                this.loading = false
            }
            
        },
        getType(type) {
            if(type == 'blueprint') {
                return ''
            } else if (type == 'product') {
                return 'success'
            } else if (type == 'stock') {
                return 'info'
            } else if (type == 'order') {
                return 'warning'
            }
        },
        appendToMessages(message){
            this.messages.push(message)
        },
        fetchComplete() {
            this.loading = false
            this.init_message = this.messages[0]
            this.latest_message = this.messages[this.messages.length-1]
        },
        onSearch() {
            this.loadData(this.searchForm.query)
        }

    }

}
</script>


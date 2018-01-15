<template>
	<div class="content">
    <el-tabs v-model="activeName" @tab-click="tabClick">
      <el-tab-pane label="全部" name="">{{fileJson.keyword}}-全部</el-tab-pane>
      <el-tab-pane label="已发布" name="n">{{fileJson.keyword}}-已发布</el-tab-pane>
      <el-tab-pane label="草稿" name="y">{{fileJson.keyword}}-草稿</el-tab-pane>
    </el-tabs>
		<div class="content-body">
			<vSearch :filename="fileJson.filename" :form="fileJson.searchForm.form" :resetName="['isDraft']"></vSearch>
      <router-link append :to="{ path: 'micropage', query: {
        pageType: fileJson.searchForm.form.pageType,
        filename: fileJson.filename
      }}">
		     <el-button type="primary" style="margin-bottom:16px;" v-text="'新增'+fileJson.keyword"></el-button>
      </router-link>
	    <el-button type="primary" style="margin-bottom:16px;" v-text="'取消已设置首页'" @click="confirm({
        filename:fileJson.filename,
        method:'cancel',
        form:{
          businessNo:urlParams.businessNo
        },
        title:'提示',
        msg:'确定要取消首页吗?',
        success:'取消成功',
        error:'取消失败',
      })"></el-button>
			<el-table v-loading="fileJson.table.loading" :data="fileJson.table.data" border :row-class-name="addRowClass">
				<el-table-column prop="name" label="模板名称" min-width="80">
				</el-table-column>
				<el-table-column prop="introduction" label="模板描述" min-width="160">
				</el-table-column>
				<el-table-column prop="productCount" label="商品数量" min-width="55" align="right">
				</el-table-column>
				<el-table-column prop="isMain" label="是否主页" min-width="55">
          <template scope="scope">
            <el-tag :type="scope.row.isMain === 'y' ? 'success' : 'danger'" v-text="scope.row.isMain === 'y' ? '是' : '否'"></el-tag>
          </template>
				</el-table-column>
				<el-table-column label="是否草稿" min-width="55">
          <template scope="scope">
            <el-tag :type="scope.row.isDraft === 'y' ? 'primary' : 'danger'" v-text="scope.row.isDraft === 'y' ? '是' : '否'"></el-tag>
          </template>
				</el-table-column>
				<el-table-column label="二维码" min-width="44">
          <template scope="scope">
            <el-popover :disabled="!scope.row.qrCode || scope.row.isDraft === 'y'" trigger="hover" placement="left">
              <img :src="scope.row.qrCode" style="margin:auto" />
              <div style="text-align:center;">
                <el-button size="small" v-copyUrl="{ showMsg: showMsg }">复制链接<input type="text" style="opacity:0;position:fixed;top:-100px;left:-100px;" :value="scope.row.pageUrl"/></el-button>
                <el-button size="small" @click="openWindow(scope.row.pageUrl)">浏览</el-button>
              </div>
              <div slot="reference">
                <el-tag :type="scope.row.qrCode && scope.row.isDraft !== 'y' ? '' : 'warning'" v-text="scope.row.qrCode && scope.row.isDraft !== 'y' ? '查看' : '暂无'"></el-tag>
              </div>
            </el-popover>
          </template>
				</el-table-column>
				<el-table-column label="操作" min-width="160">
					<template scope="scope">
            <router-link append style="margin-right:10px" :to="{ path: 'micropage', query: {
              id: scope.row.id,
              isDraft: scope.row.isDraft,
              pageNo: scope.row.pageNo,
              pageType: fileJson.searchForm.form.pageType,
              filename: fileJson.filename
            }}">
  						<el-button type="text" size="small">编辑</el-button>
            </router-link>
    				<el-button type="text" @click="confirm({
              filename:fileJson.filename,
              method:'delete',
              form:{
                pageId:scope.row.id,
                pageNo:scope.row.pageNo
              },
              title:'提示',
              msg:'确定要删除 [ '+scope.row.name+' ] 吗?',
              success:'删除成功',
              error:'删除失败',
            })" size="small">删除</el-button>
    				<el-button type="text" @click="confirm({
              filename:fileJson.filename,
              method:'copy',
              form:{
                pageId:scope.row.id
              },
              title:'提示',
              msg:'确定要复制 [ '+scope.row.name+' ] 吗?',
              success:'复制成功',
              error:'复制失败',
            })" size="small">复制</el-button>
    				<el-button v-if="scope.row.isMain !== 'y' && scope.row.isDraft !== 'y'" type="text" @click="confirm({
              filename:fileJson.filename,
              method:'toMain',
              form:{
                pageId:scope.row.id,
                businessNo:urlParams.businessNo,
                pageType:fileJson.searchForm.form.pageType
              },
              title:'提示',
              msg:'确定要将 [ '+scope.row.name+' ] 设为主页吗?',
              success:'设置成功',
              error:'设置失败',
            })" size="small">设为主页</el-button>
            <el-button v-if="scope.row.isDraft !== 'y'" type="text" @click="openPreViewPage({
              pageNo: scope.row.pageNo
            })" size="small">预览</el-button>
            <!-- <el-button type="text" size="small" v-if="scope.row.isMain === 'y'">
              主页
            </el-button> -->
    				<el-button v-if="scope.row.isDraft === 'y'" type="text" @click="confirm({
              filename:fileJson.filename,
              method:'upgrad',
              form:{
                pageId:scope.row.id,
                businessNo:urlParams.businessNo,
                pageType:fileJson.searchForm.form.pageType
              },
              title:'提示',
              msg:'确定要发布 [ '+scope.row.name+' ] 吗?',
              success:'发布成功',
              error:'发布失败',
            })" size="small">发布</el-button>
					</template>
				</el-table-column>
			</el-table>
			<paginationComponent :fileJson="fileJson"></paginationComponent>
		</div>
    <router-view></router-view>
	</div>
</template>
<script>
import vSearch from './search'
import urlParams from 'assets/urlParams'
import {mapGetters, mapActions} from 'vuex'
export default {
  components: {
    vSearch
  },
  data () {
    return {
      activeName: '',
      urlParams: urlParams
    }
  },
  computed: {
    ...mapGetters([
      'HomePage'// 每个组件不同,对应数据在vuex里的state里,写在对应文件夹的fileJson里
    ]),
    fileJson () {
      return this.HomePage// 每个组件不同,对应数据在vuex里的state里,写在对应文件夹的fileJson里
    }
  },
  methods: {
    ...mapActions([
      // 'micropageShow',
      'confirm',
      'searchSetOriginForm',
      'searchBtnClick',
      'openPreViewPage'
    ]),
    tabClick (tab, event) {
      this.activeName !== '0' ? this.fileJson.searchForm.form.isDraft = this.activeName : this.fileJson.searchForm.form.isDraft = ''
      this.searchSetOriginForm({
        filename: this.fileJson.filename
      })
      this.searchBtnClick(this.fileJson.filename)
    },
    addRowClass (row, index) {
      if (row.isMain === 'y') {
        return 'main-row'
      }
    },
    openWindow (url) {
      window.open(url)
    },
    showMsg () {
      this.$message({
        type: 'info',
        message: '已复制链接地址'
      })
    }
  },
  directives: {
    copyUrl: {
      bind: function (el, binding, vnode, oldVnode) {
        el.onclick = function () {
          this.querySelector('input').select()
          document.execCommand('Copy')
          binding.value.showMsg()
        }
      }
    }
  }
}
</script>
<style>
.el-table .main-row {
  background: #c9e5f5;
}
</style>

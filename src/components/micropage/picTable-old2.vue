<template>
<div class="gridlist-demo-container" @click="handleClose">
  <div style="width:300px">
    <mu-list :value="activeId" @change="teamChange" :style="{height:parseInt(height) - 150 + 'px'}" style="padding:0;border: 2px solid gray;box-shadow: grey 0px 5px 20px;">
      <template v-for="item,i of teamList">
        <mu-list-item :value="i" @click.stop="teamClick(item)">
          <!-- <span v-show="!item.isLcyEdit" slot="left" :value="item.id ? item.name : '全部'"></span> -->
          <mu-text-field ref="teamText" v-show="item.isLcyEdit" slot="title" hintText="分组名称" v-model="item.name" class="teamText"/>
          <span v-show="!item.isLcyEdit" slot="title">{{item.id ? item.name : '全部'}}</span>
          <mu-icon-button v-if="!item.id" @click.stop="refreshGroup()" slot="right" icon="refresh"></mu-icon-button>
          <!-- <mu-icon-button v-if="!item.id" @click.stop="teamAdd()" slot="right" icon="add" style="margin-right:50px;"></mu-icon-button> -->
          <mu-icon-button v-if="item.id" @click.stop="editName({
            item: item,
            i: i,
            refreshGroup: true,
            text: (function () {
              if (item.id > -1) {
                return '分组名称修改'
              } else {
                return '新增分组'
              }
            })(),
            name: 'name',
            refName: 'teamText',
            form: (function () {
              if (item.id > -1) {
                return {
                  name: item.name,
                  id: item.id
                }
              } else {
                return {
                  name: item.name
                }
              }
            })(),
            url: (function () {
              if (item.id > -1) {
                return '/picture/updatePictureGroupById.json'
              } else {
                return '/picture/addPictureGroup.json'
              }
            })()
          })" slot="right" :icon="item.isLcyEdit ? 'translate' : 'edit'" ></mu-icon-button>
          <mu-icon-button v-if="item.id && item.id > 1" @click.stop="teamDelete(item)" slot="right" icon="delete" style="margin-right:50px;"></mu-icon-button>
        </mu-list-item>
        <mu-divider inset/>
      </template>
      <mu-list-item v-show="teamList.length && teamAddBtnShow" @click="teamAdd" title="添加新分组">
      </mu-list-item>
      <mu-list-item v-show="!teamList.length" title="正在更新分组数据..">
      </mu-list-item>
    </mu-list>
    <mu-text-field hintText="根据图片名称搜索" fullWidth v-model="pictureNameFuzzy" @input="input" style="margin:8px 16px 0 0"/><br/>
    <el-upload
      class="upload-demo"
      action="/picture/uploadImageFile.jpeg"
      :file-list="[]"
      :before-upload="beforeUpload"
      :on-success="afterSuccess"
      :on-error="afterError">
      <el-button size="small" type="primary">点击上传图片</el-button>
      <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过2MB</div>
    </el-upload>
  </div>
  <mu-grid-list class="gridlist-demo" :style="{height:height}">
    <mu-sub-header v-show="!dialog.data.length && dialog.loading && !isInput" style="padding:0">
      [ {{nowTeam || '全部'}} ] {{pictureNameFuzzy ? '里的' + pictureNameFuzzy : ''}} 数据为空
    </mu-sub-header>
    <mu-sub-header v-show="!dialog.loading" style="padding:0">
      正在读取[ {{nowTeam || '全部'}} ]数据...
    </mu-sub-header>
    <mu-grid-tile v-show="dialog.loading" v-for="item, i in dialog.data" style="width:33%;height:204px" :key="i">
      <!-- <img :src="item.realThumbnailUrl"/> -->
      <img :src="item.realSourceUrl"/>
      <mu-text-field ref="picText" class="picText" hintTextClass="hintText" underlineFocusClass="underline" style="width:90px" v-show="item.isLcyEdit" slot="title" hintText="图片名称" v-model="item.pictureName" inputClass="picNameInput"/>
      <span v-show="!item.isLcyEdit" slot="title">{{item.pictureName}}</span>
      <span slot="subTitle"><b>{{item.createTime}}</b></span>
      <mu-icon-button :icon="item.isLcyEdit ? 'translate' : 'edit'" slot="action" @click="editName({
        item: item,
        i: i,
        text: '图片名称修改',
        name: 'pictureName',
        refName: 'picText',
        url: '/picture/updatePictureNameById.json',
        form: {
          pictureName: item.pictureName,
          id: item.id
        },
        refresh: true
      })"></mu-icon-button>
      <mu-icon-button :icon="index.data[index.active].attr[dialog.destination.name][dialog.destination.num].img && new RegExp(index.data[index.active].attr[dialog.destination.name][dialog.destination.num].img.replace(/_\d+x\d+\./,'.')).test(item.realSourceUrl) ? 'check_box' : 'check_box_outline_blank'" :iconClass="index.data[index.active].attr[dialog.destination.name][dialog.destination.num].img && new RegExp(index.data[index.active].attr[dialog.destination.name][dialog.destination.num].img.replace(/_\d+x\d+\./,'.')).test(item.realSourceUrl) ? 'isSelected' : ''" slot="action" @click="beforeClick(item)"/>
      <mu-icon-button @hover="hover" @hoverExit="hoverExit" @click="micropageConfirm({
        url: '/picture/removePictureById.json',
        form:{
            id:item.id
        },
        title:'提示',
        msg:'确定要删除 [ '+item.pictureName+' ] 吗?',
        success:'删除成功',
        error:'删除失败'
      })" icon="close" slot="action" iconClass="closeIcon" style="position:absolute;top:-132px;right:0;color:black"></mu-icon-button>
      <mu-icon-button @hover="hover" @hoverExit="hoverExit" @click="togglePopover(item)" icon="collections_bookmark" slot="action" iconClass="closeIcon" style="position:absolute;top:-132px;left:0;color:black"></mu-icon-button>
    </mu-grid-tile>
  </mu-grid-list>
  <mu-popover :trigger="trigger" :style="{height:height}" :overlay="false" :open="popoverOpen" @close="popoverClose">
    <mu-menu>
      <template v-for="item of teamList">
        <mu-menu-item :title="item.name" @click="teamEditClick(item)"/>
      </template>
    </mu-menu>
  </mu-popover>
</div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
export default {
  data () {
    return {
      height: document.documentElement.clientHeight / 1.4 + 'px',
      teamList: [],
      open: false,
      trigger: null,
      nowTeam: '',
      pictureNameFuzzy: '',
      popoverOpen: false,
      nowId: '',
      activeId: 0,
      isInput: false,
      teamAddBtnShow: true
    }
  },
  computed: mapGetters([
    'index',
    'dialog'
  ]),
  destroyed () { // 处理遮罩不消失bug(临时)
    // if (document.querySelector('.mu-overlay')) {
    //   document.querySelector('.mu-overlay').style.display = 'none'
    // }
  },
  mounted () { // 处理遮罩不消失bug(临时)
    this.refreshGroup()
    // if (document.querySelector('.mu-overlay')) {
    //   document.querySelector('.mu-overlay').style.display = ''
    // }
  },
  methods: {
    ...mapActions([
      'setPicSize',
      'getTeamList',
      'micropageAjax',
      'micropageConfirm',
      'teamAddOrEditorDelete',
      'picEditName',
      'changeEditName'
      // 'closeDialog'
    ]),
    refreshGroup () {
      this.getTeamList({
        obj: this
      })
      this.teamAddBtnShow = true
    },
    input (val) {
      this.isInput = true
      clearTimeout(this.inputTimer)
      this.inputTimer = setTimeout(() => {
        this.isInput = false
        this.micropageAjax({
          pictureNameFuzzy: this.pictureNameFuzzy,
          currentPage: 1
        })
      }, 1000)
    },
    togglePopover ({id}) {
      this.open = false
      if (!this.popoverOpen) {
        this.getTeamList({
          obj: this,
          name: '取消分组'
        })
        this.popoverOpen = true
        if (window.event) {
          this.trigger = window.event.target
        }
        this.nowId = id
      } else if (this.trigger !== window.event.target) {
        this.trigger = window.event.target
        setTimeout(() => {
          this.togglePopover(arguments[0])
        }, 200)
      }
    },
    toggleList () {
      this.popoverOpen = false
      this.open = !this.open
      if (this.open) {
        this.getTeamList({
          obj: this,
          name: '全部'
        })
      }
    },
    handleClose () {
      this.open = false
    },
    popoverClose () {
      this.popoverOpen = false
    },
    teamChange (val) {
      this.activeId = val
    },
    teamClick ({name, id, isLcyEdit}) {
      if (parseInt(id) === -1 || isLcyEdit) {
        return false
      }
      this.popoverOpen = false
      if (!id) {
        this.micropageAjax({
          pictureNameFuzzy: this.pictureNameFuzzy,
          groupId: '',
          currentPage: 1
        })
        this.nowTeam = ''
      } else {
        this.micropageAjax({
          pictureNameFuzzy: this.pictureNameFuzzy,
          groupId: id,
          currentPage: 1
        })
        this.nowTeam = name
      }
      this.handleClose()
    },
    teamEditClick (item) {
      this.popoverOpen = false
      if (item.id) {
        this.picEditName({
          obj: this,
          info: '分组移动',
          url: '/picture/updateGroupOnPictureById.json',
          form: {
            groupId: item.id,
            id: this.nowId
          },
          refresh: true
        })
      } else {
        this.picEditName({
          obj: this,
          info: '取消分组',
          url: '/picture/removeGroupOnPictureById.json',
          form: {
            id: this.nowId
          },
          refresh: true
        })
      }
    },
    teamAdd () {
      this.teamList.push({
        name: '',
        id: '-1',
        isLcyEdit: true
      })
      this.teamAddBtnShow = false
      setTimeout(() => {
        this.$refs.teamText[this.$refs.teamText.length - 1].$el.querySelector('input').focus()
      }, 0)
      // var name = window.prompt('新建组')
      // if (name) {
      //   this.teamAddOrEditorDelete({
      //     obj: this,
      //     info: '新增',
      //     url: '/picture/addPictureGroup.json',
      //     form: {
      //       name: name
      //     }
      //   })
      // }
    },
    teamEdit (item) {
      var name = window.prompt('更改组名', item.name)
      if (name) {
        this.teamAddOrEditorDelete({
          obj: this,
          info: '修改',
          url: '/picture/updatePictureGroupById.json',
          form: {
            name: name,
            id: item.id
          }
        })
      }
    },
    teamDelete (item) {
      this.$confirm('确定要删除吗', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        customClass: 'topone',
        type: 'warning'
      }).then(() => {
        this.teamAddOrEditorDelete({
          obj: this,
          info: '删除',
          url: '/picture/removePictureGroupById.json',
          form: {
            id: item.id
          }
        })
      })
      .catch(() => {
        // alert(1)
      })
    },
    editName ({item, i, text, name, refName, url, form, refresh, refreshGroup}) {
      // console.log(this.$refs.nameText)
      var maxLength = 12
      var input = this.$refs[refName][i].$el.querySelector('input')
      // alert(name)
      // alert(item['old' + name])
      // alert(item[name] === item['old' + name])
      // alert(item[name].length)
      if (item.isLcyEdit) {
        if (item[name].length > maxLength) {
          this.$message({
            type: 'error',
            customClass: 'topone',
            message: text + '名称不能超过' + maxLength + '个字！'
          })
          input.focus()
          return false
        } else if (!item[name].length) {
          this.$message({
            type: 'error',
            customClass: 'topone',
            message: text + '名称不能为空！'
          })
          input.focus()
          return false
        }
      }
      if (name === 'pictureName') {
        this.dialog.data.splice(i, 1, Object.assign({}, this.dialog.data[i], {
          isLcyEdit: !item.isLcyEdit,
          oldpictureName: item[name]
        }))
      } else {
        this.teamList.splice(i, 1, Object.assign({}, this.teamList[i], {
          isLcyEdit: !item.isLcyEdit,
          oldname: item[name]
        }))
      }
      setTimeout(() => {
        input.focus()
      }, 0)
      if (item.isLcyEdit && item['old' + name] !== item[name]) {
        this.picEditName({
          obj: this,
          info: text,
          url: url,
          form: form,
          refresh: refresh,
          refreshGroup: refreshGroup
        })
      }
    },
    beforeClick (item) {
      this.setPicSize({
        item: item
      })
    },
    beforeUpload (file) {
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isJPG) {
        this.$message({
          type: 'error',
          customClass: 'topone',
          message: '上传头像图片只能是 JPG 和 PNG 格式!'
        })
      }
      if (!isLt2M) {
        this.$message({
          type: 'error',
          customClass: 'topone',
          message: '上传头像图片大小不能超过 2MB!'
        })
      }
      return isJPG && isLt2M
    },
    afterSuccess () {
      // this.dialog.data.unshift(data) // 未完成，假设成功就unshift，改变数据，排在最前
      setTimeout(() => {
        this.micropageAjax({
          currentPage: 1
        })
      }, 500)
      this.$message({
        type: 'success',
        customClass: 'topone',
        message: '上传成功'
      })
    },
    afterError (error) {
      this.$message({
        type: 'error',
        customClass: 'topone',
        message: '错误代码:' + error.status + ',请联系管理员pic'
      })
    },
    hover () {
      window.event.target.querySelector('i').style.color = '#fe6363'
    },
    hoverExit () {
      window.event.target.querySelector('i').style.color = ''
    }
  }
}
</script>

<style lang="less">
.gridlist-demo-container{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
.gridlist-demo{
  width: 636px;
  /*height: 450px;*/
  overflow-y: auto;
}
.topone{
  z-index: 99999999 !important
}
.el-message-box__wrapper{
  z-index: 99999999 !important
}
.v-modal{
  z-index: 99999998 !important
}
.isSelected{
  color: yellow !important
}
.material-icons.closeIcon{
  color: #757575
}
.teamText{
  width:90px;
  min-height:0;
  margin-bottom:0;
  position: absolute;
  left: 0;
  top: -16px;
  .mu-text-field-content{
    padding-bottom:0;
    padding-top:0;
  }
  .underline{
    background-color:#757575;
  }
}
.picText{
  min-height:0;
  margin-bottom:1px;
  .hintText{
    color:#bbbbbb;
  }
  .mu-text-field-content{
    padding-bottom:0;
    padding-top:0;
  }
  .underline{
    background-color:white;
  }
}
.picNameInput{
  color:white;
}
</style>

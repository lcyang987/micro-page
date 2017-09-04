<template>
<div class="gridlist-demo-container" @click="handleClose">
  <div style="width:300px">
    <mu-list :value="activeId" @change="teamChange" :style="{height:parseInt(height) - 170 + 'px'}" style="padding:0;border: 2px solid gray;box-shadow: grey 0px 5px 20px;">
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
                return 'picture/updatePictureGroupById.json'
              } else {
                return 'picture/addPictureGroup.json'
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
      multiple
      :action="uploadUrl"
      :file-list="[]"
      :before-upload="beforeUpload"
      :on-success="afterSuccess"
      :on-error="afterError"
      :data="groupId ? {
        groupId: groupId
      } : {}">
      <el-button size="small" type="primary">点击上传图片</el-button>
      <div slot="tip" class="el-upload__tip">只能上传 JPG,JPEG 和 PNG 文件，且不超过2MB</div>
    </el-upload>
  </div>
  <mu-grid-list class="gridlist-demo" :style="{height:height}">
    <mu-sub-header v-show="!dialog.data.length && dialog.loading && !isInput" style="padding:0">
      [ {{nowTeam || '全部'}} ] {{pictureNameFuzzy ? '里的' + pictureNameFuzzy : ''}} 数据为空
    </mu-sub-header>
    <mu-sub-header v-show="!dialog.loading" style="padding:0">
      正在读取[ {{nowTeam || '全部'}} ]数据...
    </mu-sub-header>
    <mu-grid-tile v-show="dialog.loading" class="picList" v-for="item, i in dialog.data" :key="i">
      <img :src="item.realThumbnailUrl"/>
      <!-- <img :src="item.realSourceUrl"/> -->
      <mu-text-field ref="picText" class="picText" hintTextClass="hintText" underlineFocusClass="underline" style="width:90px" v-show="item.isLcyEdit" slot="title" hintText="图片名称" v-model="item.pictureName" inputClass="picNameInput"/>
      <span v-show="!item.isLcyEdit" slot="title">{{item.pictureName}}</span>
      <!-- <span slot="subTitle"><b>{{item.createTime}}</b></span> -->
      <mu-icon-button @hover="hover" @hoverExit="hoverExit" :icon="item.isLcyEdit ? 'translate' : 'edit'" slot="action" @click="editName({
        item: item,
        i: i,
        text: '图片名称修改',
        name: 'pictureName',
        refName: 'picText',
        url: 'picture/updatePictureNameById.json',
        form: {
          pictureName: item.pictureName,
          id: item.id
        },
        refresh: true
      })"></mu-icon-button>
      <mu-icon-button @hover="hover" @hoverExit="hoverExit" :icon="index.data[index.active].attr[dialog.destination.name][dialog.destination.num].img && new RegExp(index.data[index.active].attr[dialog.destination.name][dialog.destination.num].img.replace(/_\d+x\d+\./,'.')).test(item.realSourceUrl) ? 'check_box' : 'check_box_outline_blank'" :class="index.data[index.active].attr[dialog.destination.name][dialog.destination.num].img && new RegExp(index.data[index.active].attr[dialog.destination.name][dialog.destination.num].img.replace(/_\d+x\d+\./,'.')).test(item.realSourceUrl) ? 'isSelected' : ''"  class="checkbox" slot="action" @click="beforeClick(item)"/>
      <mu-icon-button @hover="hover" @hoverExit="hoverExit" @click="micropageConfirm({
        url: 'picture/removePictureById.json',
        form:{
            id:item.id
        },
        title:'提示',
        msg:'确定要删除 [ '+item.pictureName+' ] 吗?',
        success:'删除成功',
        error:'删除失败'
      })" icon="close" slot="action" class="close"></mu-icon-button>
      <mu-icon-button @hover="hover" @hoverExit="hoverExit" @click="togglePopover(item)" icon="collections_bookmark" slot="action" class="changeGroup"></mu-icon-button>
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
      groupId: '',
      nowId: '',
      activeId: 0,
      isInput: false,
      teamAddBtnShow: true
    }
  },
  computed: {
    ...mapGetters([
      'index',
      'dialog'
    ]),
    uploadUrl () {
      return window.location.pathname.replace(/micropage\/index\.html|micropage\//, '') + 'picture/uploadImageFile.jpeg'
    }
  },
  mounted () {
    this.refreshGroup()
  },
  methods: {
    ...mapActions([
      'picSelect',
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
      this.groupId = id
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
          url: 'picture/updateGroupOnPictureById.json',
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
          url: 'picture/removeGroupOnPictureById.json',
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
          url: 'picture/updatePictureGroupById.json',
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
          url: 'picture/removePictureGroupById.json',
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
      this.picSelect({
        item: item,
        newUrl: item.realSourceUrl + this.dialog.picSize
      })
    },
    beforeUpload (file) {
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 2
      var msg = ''
      var name = file.name.length > 18 ? file.name.substring(0, 18) + '...' : file.name
      if (!isJPG) {
        msg += name + '的格式错误! 请上传 JPG,JPEG 和 PNG 格式图片!'
      }
      if (!msg && !isLt2M) {
        msg += name + '上传图片大小不能超过 2MB!'
      }
      if (msg) {
        this.uploadErrorTimer = setTimeout(() => {
          this.$notify.error({
            title: '错误',
            duration: 10000,
            message: msg
          })
        }, 10)
      }
      return isJPG && isLt2M
    },
    afterSuccess (result) {
      // this.dialog.data.unshift(data) // 未完成，假设成功就unshift，改变数据，排在最前
      if (result.success) {
        setTimeout(() => {
          this.micropageAjax({
            currentPage: 1
          })
        }, 500)
        this.$message({
          type: 'success',
          customClass: 'topone',
          message: result.info || '上传成功'
        })
      } else {
        this.$message({
          type: 'error',
          customClass: 'topone',
          message: result.info || '上传失败'
        })
      }
    },
    afterError (error) {
      this.$message({
        type: 'error',
        customClass: 'topone',
        message: '错误代码:' + error.status + ',请联系管理员pic'
      })
    },
    hover () {
      window.event.target.querySelector('i').style.color = 'orange'
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
@outOpacity : 0;
@overOpacity : 1;
.picList{
  width:25% !important;
  height:104px !important;
  &:hover{
    .checkbox, .close, .changeGroup{
      opacity:@overOpacity;
      background: steelblue;
    }
  }
  .mu-grid-tile-titlebar{
    height:36px;
  }
  .checkbox{
    &.isSelected{
      opacity:@overOpacity;
    }
    opacity:@outOpacity;
    position:absolute;
    top:-40px;
    left:53px;
  }
  .close{
    opacity:@outOpacity;
    position:absolute;
    top:-75px;
    right:-10px;
  }
  .changeGroup{
    opacity:@outOpacity;
    position:absolute;
    top:-75px;
    left:-10px;
  }
}
.mu-menu-list{
  max-height:400px;
}
</style>

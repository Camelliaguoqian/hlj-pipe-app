<template>
  <div class="page">
    <van-nav-bar title="基本信息" 
    fixed 
    :zIndex="100" 
    left-arrow 
    @click-left="goBack"></van-nav-bar>

    <van-cell-group class="cell-group-list">
      <van-cell title="头像" is-link >
        <template slot="default">
          <van-image class="user-avatar" width="24" height="24" round :src="userAvatarUrl" />
        </template>
      </van-cell>
      <van-cell title="用户名" is-link value="系统管理员" />
      <van-cell title="手机号" is-link value="15523231111" />
      <van-cell title="职务" is-link value="管理员" />
    </van-cell-group>



  </div>  
</template>

<script>
import { NavBar,
 Cell, 
 CellGroup,  
 Field,
 DatetimePicker,
 Picker,
 Popup,
 Image, 
 Button
} from 'vant'

export default {
  name: 'BasicUserPage',
  components: {
    [NavBar.name]: NavBar,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Field.name]: Field,
    [DatetimePicker.name]: DatetimePicker,
    [Picker.name]: Picker,
    [Popup.name]: Popup,
    [Image.name]: Image,
    [Button.name]: Button,
  },
  props: {
    zIndex: Number,
  },
  data() {
    return {
      userAvatarUrl: require('assets/image/user/avatar.png'),
    }
  },
  methods: {
    goBack() {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
    },
    
  }
}
</script>

<style lang="less" scoped>
.page {
  padding: 46px 0 0 0;
  &-wrapper {
    padding: 0 10px;
    margin: 10px auto;
  }

  &-wrapper:last-child {
    margin-bottom: 0;
  }

  &-panel {
    margin: 10px auto;
  }

  &-panel:last-child {
    margin-bottom: 0;
  }

  &-icon-panel {
    &-content {
      padding: 10px 16px;
    }

    .panel-title {
      position: relative;
      display: flex;
      box-sizing: border-box;
      width: 100%;
      padding: 10px 16px;
      overflow: hidden;
      color: #323233;
      font-size: 14px;
      line-height: 24px;
      background-color: #fff;
      &-icon {
        margin-right: 2px;
        margin-top: 4px;
      }
    }
  }

}
</style>


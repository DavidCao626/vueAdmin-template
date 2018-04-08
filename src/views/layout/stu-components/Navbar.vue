<template>
  <div class="navbar" id="header">
    <div class="navbar__inner">
      <div class="navbar-layout">
        <div class="navbar-layout__side">
          <slot name="side">
            <h1 class="navbar-logo">
              <a href="/" title="学生工作管理系统">
              </a>
            </h1>
          </slot>
        </div>
        <div class="navbar-layout__extra">
          <slot name="extra">
            <div class="navbar-account">
              <el-dropdown class="avatar-container" trigger="click">
                <div class="avatar-wrapper">
                  <img src="http://wx.qlogo.cn/mmopen/srV4q1ZBhL5noVk7Qhtm9230Akc0ziabqibibHJsGhW4deMx5fY0nr0zlXQvBBOf9icWQKicuKPbG1LRRwE47FoB95dWSBl47IVFo/64"  class="user-avatar"/>
                   <span class="name">administatro</span>
                  <i class="el-icon-caret-bottom"></i>
                </div>
                <el-dropdown-menu class="user-dropdown" slot="dropdown">
                  <router-link class="inlineBlock" to="/">
                    <el-dropdown-item>
                      Home
                    </el-dropdown-item>
                  </router-link>
                  <el-dropdown-item divided>
                    <span @click="logout" style="display:block;">LogOut</span>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </slot>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import { mapGetters } from 'vuex'

export default {
  components: {
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar'
    ])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('ToggleSideBar')
    },
    logout() {
      this.$store.dispatch('LogOut').then(() => {
        location.reload() // 为了重新实例化vue-router对象 避免bug
      })
    }
  }
}

</script>
<style lang="scss" scoped>
@import "src/styles/components/_button.scss";
.navbar {
  background-color: #ffffff;
  box-shadow: 0 1px 4px 0 rgba(238, 238, 238, 0.5);

  &__inner {
    padding: 0 65px;
    height: 80px;
  }
  &-layout {
    height: 100%;
    position: relative;
  }
  &-layout__side {
    float: left;
  }
  &-logo {
    padding-top: 20px;
    a {
      display: block;
      overflow: hidden;
      text-decoration: none;
      font-size: 0;
    }
    a:before {
      display: inline-block;
      width: 240px;
      height: 39px;
      vertical-align: top;
      content: " ";
      //background: transparent url("data:image/svg+xml;charset=utf8, %3Csvg width='239' height='40' viewBox='0 …2.384 2.384 0 1 1 0-4.767 2.384 2.384 0 0 1 0 4.767'/%3E%3C/g%3E%3C/svg%3E") 0 0 no-repeat;
    }
    a:before {
      width: 376.4px;
      background-image: url("/src/icons/svg/logo.svg");
    }
  }

  &__inner > &-layout > &-layout__extra {
    position: absolute;
    right: 0;
    top: 0;
  }
  &__inner > &-layout > &-layout__extra,
  &__inner > &-layout &-account {
    height: 100%;
  }

   .hamburger-container {
    line-height: 58px;
    height: 50px;
    float: left;
    padding: 0 10px;
  }
  .screenfull {
    position: absolute;
    right: 90px;
    top: 16px;
    color: red;
  }
  .avatar-container {
    height: 50px;
    display: inline-block;
    position: absolute;
    right: 35px;
    .avatar-wrapper {
      cursor: pointer;
      margin-top: 5px;
      position: relative;
      width: 150px;
      height: 40px;
      .user-avatar {
        width: 40px;
        height: 40px;
        border-radius: 30%;
        margin: 13px;
      }
      .name{
         position: absolute;
        top: 80%;
        transform: translateY(-50%);
      }
      .el-icon-caret-bottom {
        position: absolute;
        right: -20px;
        top: 25px;
        font-size: 12px;
      }
    }
  }
}
</style>


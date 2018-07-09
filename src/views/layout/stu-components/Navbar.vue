<template>
  <div class="navbar" id="header">
    <div class="navbar__inner">
      <div class="navbar-layout">
        <div class="navbar-layout__side">
          <slot name="side">
            <h1 class="navbar-logo">
              <a href="#/" title="学生工作管理系统">
              </a>
            </h1>
          </slot>
        </div>
        <div class="navbar-layout__center" v-if="0">
          <slot name="center">
            <input type="text" placeholder="搜索关键字" style="border:0px solid #ffffff">
          </slot>
        </div>
        <div class="navbar-layout__extra">
          <slot name="extra">
            <div class="navbar-account">

              <div class="avatar-wrapper">
                <el-dropdown trigger="hover" size="medium">
                  <el-badge class="item" :value="messageCount">
                    <i class="el-icon-sort message" style="transform:rotate(90deg);"></i>
                  </el-badge>
                  <el-dropdown-menu class="user-dropdown" slot="dropdown">
                    <router-link class="inlineBlock" to="/">
                      <el-dropdown-item>
                        <i class="el-icon-caret-right"></i>&nbsp; 内蒙古大学
                      </el-dropdown-item>
                    </router-link>
                    <router-link class="inlineBlock" to="/">
                      <el-dropdown-item>
                        <i class="el-icon-caret-right"></i>&nbsp; 内蒙古师范大学
                      </el-dropdown-item>
                    </router-link>
                    </el-dropdown-menu>
                </el-dropdown>
                &nbsp;&nbsp; &nbsp;&nbsp; 

                <router-link class="inlineBlock" to="/user/messages">
                  <el-badge class="item" :value="messageCount">
                    <i class="el-icon-message message"></i>
                  </el-badge>
                </router-link>
                &nbsp;&nbsp;
                <el-dropdown trigger="hover" size="medium">

                  <div class="avatar-container">

                    <img :src="avatar" class="user-avatar" />
                    <div class="name">
                      <span class="name__1">{{name}}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      <!-- <span class="name__2">学号：No.01521</span> --><br/>
                      <span class="name__2" v-if="dutyRoles">{{ dutyRoles['managerNodeName']}} | {{dutyRoles['dutyName']}} </span>
                    </div>
                    <i class="el-icon-caret-bottom"></i>
                  </div>

                  <el-dropdown-menu class="user-dropdown" slot="dropdown">
                    <router-link class="inlineBlock" to="/user/updateUserInfo">
                      <el-dropdown-item>
                        <i class="el-icon-date"></i>&nbsp; 账号详情
                      </el-dropdown-item>
                    </router-link>
                    <router-link class="inlineBlock" to="/user/userduty">
                      <el-dropdown-item>
                        <i class="el-icon-circle-check-outline"></i>&nbsp; 任职详情
                      </el-dropdown-item>
                    </router-link>
                    <router-link class="inlineBlock" to="/">
                      <el-dropdown-item>
                        <i class="el-icon-setting"></i>&nbsp; 功能设置
                      </el-dropdown-item>
                    </router-link>
                    <!-- divided -->
                    <el-dropdown-item>
                      <span @click="logout" style="display:block;">
                        <i class="el-icon-refresh"></i>&nbsp;&nbsp;退出登录</span>
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </div>

            </div>
          </slot>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import { mapGetters } from "vuex";
import { queryUserNoticeCountByStatus } from "~/api/notice";
export default {
  data() {
    return {
      messageCount: "",
      dutyRoles: null
    };
  },
  components: {},
  computed: {
    ...mapGetters(["sidebar", "avatar", "name", "roles"])
  },
  mounted: function() {
    var that = this;
    queryUserNoticeCountByStatus({
      status: "N"
    }).then(data => {
      // 查未读数量
      that.messageCount = data.resBody.count;
    });
  },
  created: function() {
    for (const key in this.roles) {
      if (key.length > 0) {
        this.roles[key].forEach(element => {
          if (element.currently === true) {
            this.dutyRoles = element;
            console.log(this.dutyRoles);
            return element;
          } else {
            return this.roles.MemberDutyList[0];
          }
        });
      } else {
        return this.roles.MemberDutyList[0];
      }
    }
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch("ToggleSideBar");
    },
    logout() {
      this.$store.dispatch("LogOut").then(() => {
        location.reload(); // 为了重新实例化vue-router对象 避免bug
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.navbar {
  background-color: #ffffff;
  height: 100%;
  &__inner {
    padding: 0 65px;
  }
  &-layout {
    height: 80px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-content: center;
    align-items: center;
  }
  &-layout__side {
    flex: 0;
  }
  &-layout__center {
    flex: 1;
    padding-left: 60px;
    color: #9a9a9a;
  }

  &-logo {
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
    height: 100%;
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
  .avatar-wrapper {
    height: 80px;
    display: flex;
    align-items: center;
    align-content: center;
    .user-avatar {
      width: 40px;
      height: 40px;
      border-radius: 30%;
      margin-left: 15px;
    }
    .avatar-container {
      display: flex;
      align-items: center;
    }
    .name {
      margin: 10px;
      line-height: 1.4;
      &__1 {
        color: var(--color-grey-dark-2);
      }
      &__2 {
        color: var(--color-grey-light-2);
        font-size: 12px;
      }
    }
    .message {
      padding: 6px;
      font-size: 24px;
      color: var(--color-grey-light-1);
      border: 1px solid var(--color-grey-light-3);
      border-radius: 50%;
    }
  }
}
.user-dropdown {
  margin-top: -3px;
}
</style>


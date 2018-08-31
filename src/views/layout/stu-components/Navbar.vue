<template>
  <div class="navbar" id="header">
    <div class="navbar__inner">
      <div class="navbar-layout">
        <div class="navbar-layout__side">
          <slot name="side">
            <h1 class="navbar-logo">
              <a href="#/" title="学生工作管理系统">
              <svg-icon  icon-class="logo2" style="height:60px;width: 470px;margin-left: 35px;" ></svg-icon>
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

              <div class="avatar-wrapper i-cursor">
                <el-dropdown trigger="hover" size="medium">
                  <div style="display: inline-flex;flex-direction:column;align-items:center" class="i-cursor">
                    <el-badge class="item">
                      <i class="el-icon-sort message" style="transform:rotate(90deg);color:#fff"></i>

                    </el-badge>
                    <!-- <span style="font-size:12px;color:#909399">身份切换</span> -->
                  </div>

                  <el-dropdown-menu slot="dropdown">

                    <ul class="dropdown-menu-devin">

                      <li class="header">任职情况:</li>
                      <li>
                        <!-- inner menu: contains the actual data -->
                        <ul class="menu">
                          <li v-for="(i,index) in user.roles" :key="index">
                            <a @click="myswitch(i)">
                              <h3>
                                <small v-if="i.isCurrent">[当前身份]</small>
                                <!-- <small v-if="i.isDefault">[默认]</small>  -->
                                {{ i.schoolName }}
                                <span class="text-green fontello-record" @click.stop="ooDefault(i)" v-if="i.isCurrent">
                                  设为默认
                                </span>
                              </h3>
                              <p>{{ i.zhiwu }}</p>

                            </a>
                          </li>

                        </ul>
                      </li>

                    </ul>
                  </el-dropdown-menu>
                </el-dropdown>
                &nbsp;&nbsp; &nbsp;&nbsp;

                <router-link class="inlineBlock" to="/user/messages">
                  <div style="display: inline-flex;flex-direction:column;align-items:center">
                    <el-badge class="item" :value="messageCount">
                      <i class="el-icon-bell message"></i>

                    </el-badge>
                    <!-- <span style="font-size:12px;color:#909399">我的通知</span> -->
                  </div>
                </router-link>
                &nbsp;&nbsp;
                <el-dropdown trigger="hover" size="medium">

                  <div class="avatar-container">

                    <!-- <img :src="avatar" class="user-avatar" /> -->
                    <svg-icon class="user-avatar" icon-class="user2" style="fill:#fff"></svg-icon>
                    <div class="name">
                      <span class="name__1" style="color:#fff">{{name}}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      <!-- <span class="name__2">学号：No.01521</span> --><br/>
                      <span class="name__2" style="color:#fff" v-if="dutyRoles">{{ dutyRoles['managerNodeName']}} | {{dutyRoles['dutyName']}} </span>
                    </div>
                    <i class="el-icon-caret-bottom" style="color:#fff"></i>
                  </div>

                  <el-dropdown-menu class="user-dropdown" slot="dropdown">
                    <router-link class="inlineBlock" to="/user/updateUserInfo">
                      <el-dropdown-item>
                        <i class="el-icon-date"></i>&nbsp; 账号详情
                      </el-dropdown-item>
                    </router-link>
                    <router-link class="inlineBlock" to="/user/userduty">
                      <el-dropdown-item>
                        <i class="el-icon-setting"></i>&nbsp; 我的任职
                      </el-dropdown-item>
                    </router-link>
                    <!-- <router-link class="inlineBlock" to="/">
                      <el-dropdown-item>
                        <i class="el-icon-setting"></i>&nbsp; 功能设置
                      </el-dropdown-item>
                    </router-link> -->
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
      dutyRoles: null,
      radio2: "",
      menuRenZhi: [
        {
          schoolName: "内蒙古大学",
          isDefault: false,
          isCurrent: true,
          zhiwu: "班主任"
        },
        {
          schoolName: "内蒙古大学",
          isDefault: false,
          isCurrent: false,
          zhiwu: "系主任"
        },
        {
          schoolName: "内蒙古农业大学",
          isDefault: true,
          isCurrent: false,
          zhiwu: "班主任"
        }
      ]
    };
  },
  components: {},
  computed: {
    ...mapGetters(["sidebar", "avatar", "name", "roles", "user"])
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
    this.user.roles.forEach(key => {
      console.log(["key", key]);
      if (key.currently === true) {
        this.dutyRoles = key;
        console.log(["dutyR", this.dutyRoles]);
        return key;
      }
    });
  },
  methods: {
    roleSwitchches(item, rolesItem) {
      if (item.currently === "true") {
        return;
      }
      const userTempRoles = this.user.roles;
      this.$store.dispatch("SwitchDuty", item);
    },
    setDefaultDuty(item) {
      this.$store
        .dispatch("SetDefaultDuty", item)
        .then(response => {
          this.$message.success("设置成功");
        })
        .catch(response => {
          this.$message.error("设置失败");
        });
    },
    GetDutyList() {
      this.$store.dispatch("GetDutyList", {});
    },

    myswitch(item) {
      if (item.currently == true) {
        this.$message.info("您已切换到当前职务");
        return;
      }
      this.$store.dispatch("SwitchDuty", item);
    },
    ooDefault(i) {
      i.isDefault = true;
      this.$store
        .dispatch("SetDefaultDuty", i)
        .then(response => {
          this.$message.success("设置成功");
        })
        .catch(response => {
          this.$message.error("设置失败");
        });
      //1.ajax更新后台设为默认
      //2,ajax重新获取菜单数据接口 用来刷新默认状态
    },
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
  background-color: #0c9bea;
  background-image: linear-gradient(#0c9bea, #409EFF 50%);
  height: 100%;
  &__inner {
    padding: 0 40px;
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
      width: 376.4px;
     
    }
  }
  body {
    background-image: url("http://www.imu.edu.cn/images/header_bg.png");
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
        color:  #ffffff !important;
      }
      &__2 {
        color:  #ffffff !important;
        //font-size: 12px;
      }
    }
    .message {
      padding: 8px;
      margin-bottom: 2px;
      font-size: 20px;
      color:  #ffffff !important;
      font-weight: 400;
      //border: 1px solid var(--color-grey-light-3);
      border-radius: 50%;
    }
  }
}
.user-dropdown {
  margin-top: -3px;
}

.dropdown-menu-devin {
  max-width: 280px;
  overflow-x: auto;
  list-style: none;
  margin: 0;
  padding: 0;
}
.dropdown-menu-devin .header {
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
  padding: 10px 15px;
  color: #444444;
  font-size: 14px;
}
.dropdown-menu-devin li {
  list-style: none;
  margin: 0;
  padding: 0;
}
.dropdown-menu-devin .footer {
  padding: 15px;
  text-align: right;
}
.dropdown-menu-devin .footer a {
  background: #ccc;
  color: #fff;
  padding: 5px 15px;
  border-radius: 30px;
  margin: 0;
  position: relative;
  top: 3px;
}
.menu {
  margin: 0;
  padding: 0;
}
.menu li {
  padding: 0 15px;
  position: relative;
  float: left;
  display: inline-block;
  width: 100%;
}
.menu li svg {
  stroke: red;
  height: 40px;
  width: 30px;
  display: inline-block;
  position: relative;
  left: 0;
  top: 0;
  line-height: 30px;
  text-align: left;
  margin: 10px 10px 0 0;
  padding-bottom: 0;
  padding: 0;
  font-size: 16px;
  float: left;
}
.menu li i {
  height: 40px;
  width: 30px;
  display: inline-block;
  position: relative;
  left: 0;
  top: 0;
  line-height: 30px;
  text-align: left;
  margin: 10px 10px 0 0;
  padding-bottom: 0;
  padding: 0;
  font-size: 16px;
  float: left;
}
.menu li a {
  color: #8c92a3 !important;
}
.menu li a h3 {
  font-size: 14px;
  margin: 0;
  padding: 10px 0 0;
  font-weight: bold;
  color: #8c92a3;
}
.menu li a h3 span {
  font-size: 11px;
  float: right;
  font-weight: 100;
  font-style: italic;
}
.menu li a p {
  margin: 0;
  padding: 5px 0 15px;
  color: #8c92a3;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}
</style>


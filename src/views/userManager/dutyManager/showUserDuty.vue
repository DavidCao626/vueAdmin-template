<style lang="scss" scoped>
.state_empty_hd {
  margin-top: 40px;
  .desc {
    padding: 0 60px;
  }
}
.content {
  &__flex {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }
  &__box {
    border: 1px solid var(--color-grey-light-3);
    padding: 20px;
    margin: 20px;
    text-align: center;
    line-height: 1.6;
    border-radius: 5px;
    img {
      height: 150px;
    }
  }
}
</style>


<template>
        <page>
            <span slot="title">任职详情</span>
            <div slot="panel">
                <div class="state_empty_hd">
                    <p class="desc">您当前的任职情况:</p>
                </div>
                <div class="content__flex">
                    <template v-for="member in user.roles.MemberDutyList">
                     
                        <div class="content__box">
                           <div v-if="member.currently">**</div>
                            <img src="/src/assets/img/student-man.svg" />
                            <h3>{{member.dutyName}}</h3>
                            <p>{{member.managerNodeName}}</p>
                            <!-- <p>任期时间: 2017-6 ~ 2018-10</p> -->
                            <br/>

                            <el-tooltip class="item" effect="dark" content="你当前已经切换到该角色" placement="bottom">
                                <el-button type="primary"  @click="roleSwitchches(member,'MemberDutyList')">切换角色</el-button>
                            </el-tooltip>
                                <el-button v-if="member.currently" type="primary"  @click="setDefaultDuty(member)">设为默认</el-button>
                        </div>
                    </template>

                    <template v-for="appoint in user.roles.AppointDutyList">
                        <!-- <el-dropdown-item divided :command="appoint">
                            <i class="el-icon-circle-check" v-if="appoint.currently"></i>
                            <p>
                                <span v-if="appoint.officeOrgName"> {{appoint.officeOrgName}}/</span> {{ appoint.dutyName }}</p>
                        </el-dropdown-item> -->
                        <div class="content__box">
                           <div v-if="appoint.currently">**</div>
                            <img src="/src/assets/img/teacher-man.svg" />
                            <h3> {{ appoint.dutyName }}</h3>
                            <p>{{appoint.officeOrgName}}</p>
                            <!-- <p>任期时间: 2017-6 ~ 2018-10</p> -->
                            <br/>

                            <el-button type="default" @click="roleSwitchches(appoint,'AppointDutyList')">切换角色</el-button>
                            <el-button v-if="appoint.currently" type="primary"  @click="setDefaultDuty(appoint)">设为默认</el-button>
                        </div>
                    </template>

                    <!-- <div class="content__box">
                        <img src="/src/assets/img/worker-man.svg" />
                        <h3>教职工</h3>
                        <p>内蒙古大学计算机学员2017级8班</p>
                        <p>任期时间: 2017-6 ~ 2018-10</p>
                        <br/>
                        <el-button type="default" @click="roleSwitchches()">切换角色</el-button>
                    </div> -->
                </div>
            </div>

        </page>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  components: {},
  computed: {
    ...mapGetters(['user'])
  },
  methods: {
    roleSwitchches(item, rolesItem) {
      if (item.currently === 'true') {
        return
      }
      const userTempRoles = this.user.roles
      this.$store.dispatch('SwitchDuty', item)
    },
    setDefaultDuty(item) {
      this.$store.dispatch('SetDefaultDuty', item).then((response) => {
        this.$message.success('设置成功')
      }).catch((response) => {
        this.$message.error('设置失败')
      })
    }
  },

  data() {
    return {}
  }
}
</script>


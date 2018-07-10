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
                  <div style="display: inline-flex;flex-direction:column;align-items:center">
                    <el-badge class="item" >
                      <i class="el-icon-sort message" style="transform:rotate(90deg);"></i>

                    </el-badge>
                    <span style="font-size:12px;color:#909399">身份切换</span>
                  </div>

                  <el-dropdown-menu class="user-dropdown" slot="dropdown">
                    <router-link class="inlineBlock" to="/">
                      <el-dropdown-item>
                        <i class="el-icon-caret-right"></i>&nbsp; 03班
                      </el-dropdown-item>
                    </router-link>
                    <router-link class="inlineBlock" to="/">
                      <el-dropdown-item>
                        <i class="el-icon-caret-right"></i>&nbsp; 04班
                      </el-dropdown-item>
                    </router-link>
                  </el-dropdown-menu>
                </el-dropdown>
                &nbsp;&nbsp; &nbsp;&nbsp;

                <router-link class="inlineBlock" to="/user/messages">
                  <div style="display: inline-flex;flex-direction:column;align-items:center">
                        <el-badge class="item" :value="messageCount">
                            <i class="el-icon-message message"></i>

                    </el-badge>
                    <span style="font-size:12px;color:#909399">我的通知</span>
                  </div>
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
      background-image: url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+Cjxzdmcgd2lkdGg9IjM3NnB4IiBoZWlnaHQ9IjM5cHgiIHZpZXdCb3g9IjAgMCAzNzYgMzkiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDQ5LjIgKDUxMTYwKSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPgogICAgPGRlZnM+PC9kZWZzPgogICAgPGcgaWQ9IlBhZ2UtMiIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGcgaWQ9IjIyIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtODUuMDAwMDAwLCAtMTkuMDAwMDAwKSI+CiAgICAgICAgICAgIDxnIGlkPSLlr7zoiKoiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDQuMDAwMDAwLCAtMS4wMDAwMDApIj4KICAgICAgICAgICAgICAgIDxnIGlkPSJsb2dvIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg4MC4wMDAwMDAsIDIwLjAwMDAwMCkiPgogICAgICAgICAgICAgICAgICAgIDxpbWFnZSB4PSIwIiB5PSIwIiB3aWR0aD0iMTQwLjYwNjA2MSIgaGVpZ2h0PSI0MCIgeGxpbms6aHJlZj0iZGF0YTppbWFnZS9wbmc7YmFzZTY0LGlWQk9SdzBLR2dvQUFBQU5TVWhFVWdBQUFPZ0FBQUJDQ0FZQUFBQmRMcHJ3QUFBRURXbERRMUJKUTBNZ1VISnZabWxzWlFBQU9JMk5WVjFvSEZVVVBydHpaeU1remxOc05JVjBxRDhOSlEyVFZqU2h0THAvM2QwMmJwWkpOdG9pNkdUMjdzNll5YzQ0TTd2OW9VOUZVSHd4NnBzVXhMKzNnQ0FvOVEvYlByUXZsUW9sMnRRZ0tENjArSU5RNkl1bTY1azdNNWxwdXJIZVplNTg4NTN2bm52dXVXZnZCZWk1cWxpV2tSUUJGcHF1TFJjeTRuT0hqNGc5SzVDRWg2QVhCcUZYVVIwclhhbE1BalpQQzNlMVc5OUR3bnRmMmRYZC9wK3R0MFlkRlNCeEgyS3o1cWdMaUk4QjhLZFZ5M1lCZXZxUkh6L3FXaDcyWXVpM01VREVMM3E0NFdQWHczTStmbzFwWnVRczR0T0lCVlZUYW9pWEVJL014ZmhHRFBzeHNOWmZvRTFxNjZybzVhSmltM1hkb0xGdzcySCtuMjNCYUlYemJjT256NW1mUG9UdllWejdLelVsNStGUnhFdXFrcDlHL0FqaWEyMTl0aHpnMjVhYmtSRS9CcERjM3BxdnBoSHZSRnlzMndlcXZwK2tyYldLSVg3bmhEYnpMT0l0aU04MzU4cFR3ZGlycXBQRm5NRjJ4TGMxV3ZMeU93VEFpYnBibXZISGN2dHRVNTd5NStYcU5ackxlM2xFL1BxOGVVajJmWEtmT2UzcGZPanpoSll0Qi95bGw1U0RGY1NEaUgraFJrSDI1K0wrc2R4S0VBTVphaHJsU1g4dWtxTU9XeS9qWFcybTZNOUxEQmMzMUI5TEZ1djZnVktnLzBTemkzS0FyMWtHcTFHTWpVL2FMYm5xNi9sUnhjNFhmSjk4aFRhcmdYKytEYk1KQlNpWU1JZTlDazFZQXhGa0tFQUczeGJZYUttRERnWXlGSzBVR1lwZm9XWVhHK2ZBUFBJNnRKbk53YjdDbFA3SXlGK0QrYmpPdENwa2h6NkNGcklhL0k2c0Z0Tmw4YXVGWEdNVFAzNHNOd0kvSmhrZ0V0bUR6MTR5U2ZhUmNUSUJJbm1LUEUzMmt4eXlFMlR2K3RoS2JFVmVQRGZXL2J5TU0xS21tMFhkT2JTN29HRC9NeXBNWEZQWHJDd090b1lqeXluN0JWMjkvTVpmc1Z6cExEZFJ0dUlabmJwWHp2bGYrZXY4TXZZci9HcWs0SC9rVi9HM2NzZGF6THV5VE1Qc2JGaHpkMVVhYlFiakZ2RFJtY1dKeFIzemNmSGtWdzlHZnBiSm1lZXY5RjA4V1c4dURrYXNsd1g2YXZsV0dVNk5SS3owZy9TSHRDeTlKMzBvL2NhOXpYM0tmYzE5em4zQlhRS1JPOHVkNDc3aExuQWZjMS9HOW1yekdscmZleFo1R0xkbjZaWnJyRW9oSTJ3VkhoWnl3amJoVVdFeThpY01DR05DVWRpQmxxM3IreGFmTDU0OUhRNWpIK2FuKzF5K0xsWUJpZnV4QXZSTi9sVlZWT2x3bENrZFZtOU5PTDVCRTR3a1EyU01sRFpVOTdoWDg2RWlsVS9sVW1rUVV6dFRFNm14MUVFUGg3T21kcUJ0QXZ2OEhkV3BickpTNnRKajNuMENXZE02YnVzTnpSVjNTOUtUWWhxdk5pcVdtdXJvaUtnWWhzaE1qbWhUaDlwdFdoc0Y3OTcwai9TYk1yc1BFMXN1UjV6N0RNQytQL0hzK3k3aWpyUUFsaHlBZ2NjamJoalB5Z2ZlQlRqemhOcXkyOEVka1VoOEMrRFU5K3oydi9veWVINzkxT25jeEhPczV5MkF0VGM3bmIvZjczVFdQa0QvcXdCbmpYOEJvSjk4VlZCZy9tOEFBQkNBU1VSQlZIZ0I3VjFMakJ4SEdhN1p4TS9FOGV5RkF3aDJjZ0FpZ2NsRWhGTU9ub1JMNHN1T2tTS0JBdHBaVG5EeStvQ0REOGhqZ1dTU2k4Y1hjZ283SzBWQ0FvbWQ1V0RuRkk4bE9CSGtzWnhJUEE2ZUJZa0RseDNIaWUzWXlRemYxNjdxN2VtcDdxM3E3bmxYU2JQVjlkZi83dnE3bnQyYkV4bW5aeTdzRlBZOUpwWkVWK1I3T1ZITUNlUTlVUndRa3hONTFBM0NnZGdUb29VL25UQk5MaWRhcU92a2VxaGZFSjJIbjR2dHY1OWRiSWZ4WE5sNVlGWThnQmhKbGdvWGQvSlBQQkRMWUZCR01ESFlDaUtIM3poU1Q3UVJ1RzNJN3lCdmZMSmZiTFZQTHc0RStEaFVjektkQjlKNEFIRmxsNzd4NWs1eG9TdE9JUmdxZHBRanh1NkplbmRCWFByd3pHSnJ4SktkT09lQnpEeGdIS0RzTVo5OElOWkJVTTVNK2dnWXNVZjllTDlZZFQzcUNKenRSR1R1QWFNQVBmYkdEb055SGI5ODVocU1obUVIWWxadnZyN1lHSTA0SjhWNUlCc1BMT3pGNXRpRm5RcHdOdkdiMXVDa2lkUjlVOXJDc2t2T0ExUGhnZGdlMUd2UUMxN1BPUlhHR0NuWlJVOTZkckZ1aE91UW5BZkc3SUhJQUpYRFd2YWNzNWhPdXVIdUxON1cyYk5KRzZCY0VEcnlRTnlDdWRNOHJJMjdXNTA3KzhYVGJ1RW96a1d1YmhJOG9KMkRjclVXeXMxcWNOTHYzb3IwSk53QXA0UHpRSndIQm5wUWI1K3pKNjdIRWMxSzNjT3VlTnFkUkpxVnV6bWJkZ3owb0FzOXNUYWJwZzVhdFc5QlZBZWhEdUk4TURrZTZPdEI1ZHh6WjNMVUc3NG1tSXN1dXJubzhQM3NKQ1R6UUY4UGV1VCtkSjBTU21aeVA5VTgydHp2QVZlYVpBODgzcWRjYnY0Q0ZHZUt5L0JCdmM4UHJtRGtnVktwbEQ5OCtQQkZJRmQ2dlY0N2w4dlZMbCsrZk1tSU9DWFNpUk1uS1BNY1pCYkFxbjczN3QzVHpXYXprNUx0eEpIMzlhQjRQV3lXVjI2MXpwOUhtN1dPU0FBOGRPZ1FWL3NySkpXQlVudmxsVmY0d0J0cWtqTFdwVXpLcWtoZGhpcDNITXo3QWhUdldTNk5RNGx4eXB4SG03UHlOd0pFRjR3NldGWWlGWjhCR1JHNktQeXB6ZnNDZEd6dmM0N1RmZU42aDNXY05nOVhkbUc0N0QzdW81QXhBalAyRnVIUFFma2xoTDNSOVJqTDM5d3ZYbnYrZ0hqbUM0K0pqejd0aWF2L2ZDamUrZHVuNGgvLysxeFBNR0ZRMmo3Ty9WQU8yZEFETEdOTzFjSHYwcnZ2dnR1ZU1CYzVkY2JrQWI4SFJhUVdrdWp3eXhPSEJYOE1UcWFuRHVURThySDk0ZytWSStLMWJ4OUl3bkxrTkVsdHowSlJMSFpVRVp3ODgxeEJ2cmF3c0hEOTVaZGZMbVRCMi9HWWZnLzRBWnBic0Y4Z1lzL0pYMVI2L2J1SHhOdmZmMUo4OFNsZlRCVHFXT0ZKYk05UTRYTWhYbmtFYVNVRWM4VTU5WUFmT2IySUQzakYrZVdscis2THEvYnF2dk9WeDhYdlY0K0lyOHNlZGsrQ01TQWtzWDJZYW1LWVd4b21mOGQ3ZWp6Z0J5Zy8vR1dyOXZNSVBwUEVZZS9iUDNoU3ZHZ1EwQ2I4SEk3endMeDRZRGZDOElsTVc2TzVDUFQ4bDNkWnhORXpTQytkZkVMODR2SmRzZlhCZ3pqVWNkU1Z4aUYwMkRMbFFZTGprS1B1YlFIWGJmdzYzVzUzUzdjWUpmY1lqMk0rVEp3TkhRN29yUkxuMUJpMnIwaWlBdkkyZUxjQnU0R0REUzByWmhralIvbUkra0hVdFRUMmt6ZlZqVHBBSWYyeURCUjhtcmFYMS9uY0xMb29SWlArK3UvUGpBTlVrWE5CaVdrQ2cxU3BPTlFjTjJVRk42SU1JZDdOMHdsRC9iTUlsS3VxRG1VMmFBWkxVOEhpOHNBSm4wZzVDQTRlS21paVlaeFhmRkZlZ3l5ZURQSVNjTmFnNzNOSkd5bURIZnpPZ1ZsUnN2UXo4UGF1c1VqV2dtMDF5Tmp3SzBkd0lZT0R1bFYwNHBSK1lSL3BjTU13K3A4SEoyQTcvUy9JNDk2OWV5ZFZvTUxtSXZ4K0VmVWxSWXRyNzVJK1IvMkw2c0cxTzhSVm1CYjVPKzhuMjByNUdSYVBKbmxPYXVFQ0sxVGNxQnB1UUowM2pqY25lSU5DalBnMDllb2xUZ1YwVjlHb1NpRzhnU0tEQXNmdmJxR2lnbC9rUTRDRTVFMitvTG5LUm9VeUcyd3dKVnF3SWkvdzNBUS9yazRQQkdkUUFPdnBFNlZEcUc0b1JRVEFPY2hVUG9xVkVmRFJKdTJLUlphVkNNNHE2THpnSklnOEFLdnhtcktSWFNlTVpVMWliK3Joc2k1VmdON0JudWVQZi9leDlYNm5tcFBPVzVEaXBxeG9ib2d4Q0kxcUxRNFpONzhDR1F5S2ZCeGV1STZOUlFiMUFCMGFTeW1NSDFjR0w1N1B2WXE4SEljWHJsTTZ3SVppdUM2ck1nTU0vSytEWDlXV0orMmhqd3oxMDlsd25QZkhSRFo5cVBSTEZhQmt3aUI5dFg1SHNEZTFTUXhTTmR5MW9adG1YRFQyUitPWUlSZ2hiLzU2Q3RaK28wakJnNlRQNHFkcm9DWnMyWHNZOTFRbURJTTRmSENrMEkyczZDT09aQW9zMkNRRVhRSDRSdmNIUG1ncDNzRUFQYXFBU2ZJMzM3c25UbTErNGdXc0tUMFBONXg1NlpBcCtpemdWZE1Zd2JtYWpsNDJtSXU2dWdEc0JtNzhOZlVMd0lkK0NabTNsVnlaMzQ0U3lvYU00ZUJtVkgxU09JYlE5RjB4aG40N3FHTU1Ib2Y5cWZXakxNZzRMMzliS0hzK0lSenoxVFVsMzE4a3lzVXJyL0JqODZ2L2V1Z05lWCtMTFpVajZDRk4wZzl4UlBBOTBMMy9uODlNMEllQ0EwMlBENFZ4aU9tVksxZTRNTk5HSXd3MmxITWhOQmEzOGF2eklwQWFXRWhwQmNyK0pmZ3hPUE0rSUhBaEcxMGx2TkRENFI1NkZEWUVuZndBaDFTWHRLTUt1K3RoTG9IaDNsSzREdmFVNEtjeTZCcmh1aVJsenQzQjg1U09Gdjdad0srcTg0K2NTK3JvaXRDL2lvV2NxbzVuSEF5eStMQXFRMTR6RGsvVitRR3FBR2x6YnIxd1htb1RwRDlDa0k0elFOUGFiRU12RzUzZjhIQ2pCd0lFTjdBTnZLb0pYL2FlYUh4bEhTNzRiSUJQUlZjblZ4U3JrTjhHWGcwOGp1cndVc0J1NEIzTmtscTVEUE5CNDY3aklkSEFRNktKdW1mRDlTZ3pNSHcvYWVxTlFiQnR3TWVTZUJYK3Flc1lTYjI1b3RwQy9ib0c1eFQwcjBYWnA4SDNRRGJCU1lMZ0VEZUtwelZjQlNubnB5YkpIV0F3OFpJZUI0MXZUVjhqdHFLQ000alBRRUc1R29TbHZVWWp2QjBYbklvL0d6ZnhpSzlnS29kZEpRUkhVWldUNXVSQlhocjY4OUoyVGRVdVNPS2MzNFg0VjJvRTRnTU1McmozM0RUQTgxR0dFcUNLdTFsNFBscG9ValF1dC9iQXNvNENEYitpZyt0Z0NPUWFndVNhcmk0SmpBOE4wNTZGZURFUG1YSVMrVUVhMkZVS2x0VTE1dk4xZGIxWERsL1dkRGpndmFLRFI4R0FYNCtxaTRKblBzU2xJRzZmOEdnZlYycE4wdnM0OE9DU3ZRYzRqMFRqTG9RcDBSQTJUQU5FMFlKUEhkZkhWVGxwRHRtM280YU5VVHdSQUJ6cXJvZnJ3YXNVaGlVb0R3UTUrSElkWUFuejNDVUxmaTNnRm9QNDlEM3ZnYW12NFpkR2tON2tPdk1BNWVJUXQwOU1nNU5LL3VZdjkwMTBkVGdoRHh3OGVMQ3Z3YWhxTkp5bXVqYk5vNExFbEY3aEpaSE5CbzVndVFiYThBUENKb0NVQ24wNWVBN01id0VyQUttSlgrb2s3MEV6TmFNSUJ2NFFGLyttL2tZRWpqR1k1M0t2L09RcC85MVFFOEszRUp6amZyRzdoek9YSnJwT0N3NkdiMjFiWFUxN0FRTys3R21zRTRLbUdTYVNnUlFHMjVienRnU1RoTzhIS0Q1MzBrbWoyRTlmT09pdDNOcjBuRnk1WllDNmxNd0QySThyUlZDMkkrQ3hZQXo5WnVwQkZXdnNsRlNtSHVMeVplemE5NTZ3NmpYcEc2N3dudnJqSjFQaXBvbFZzeDJoV1FId3FMb0lFdS9NNk1Cd01CTFpWZEFETjJ4WFpXM2RsaXBBT2Qva1l0Q1hqdTUyeENZS3FETzg0VzJZNExlTlRQZ0VjZjZPL1ZjZU4velQ1TDNLRmxRejAyc09aZEdMWnNrejlYQVF2WEFoaVVLa3c1QTJDYWsxRFdSeFd5ZlJVSnpDb0djSFBQaUdTcDNsWWFaVUFYb0diNlhZQmllTjBSMnc1NUUvbmlwS21uaHM4RmRZbkdMT1k0ZnprQkNjMm1tSkhQbzJiWHpBMHpZMitERzQ0WVdlR05TK3FnRTZCRUhxSVRlREVRRjFOQ2dKNVZ2WTN5d0ZZWk42bmVyeHk4K1oyQ1QybUh4aFc3Y285TkxYOXY1OGlvbXNlVHIwZ0ViV2tyMUJuMnNBVytrREdCVFFhQ3NHYUh1aWdFL0JOdGpsVWJ5Q2hubGJBN01DUVorbWhxQm9xNk9HeDBoQXV3SGFzKy95YlQ0R3BvYTF3MzVSTytFb1NYY1RSM0lEMGdyUk5VQUdDYll0MWt4NXk5TTIxa0VkeFIveXowWFY2ZURvOFMvcTRJQTFJdURHWUR5c21qcGtXeDExUEVZQjJ3M1FCS3U0dXA1UXAvUi9QK3BxaDdWQjNQZndMZDBzVWxaOHN0QmxSRHkwalpnTjBPU29IRGZhb2VkNmxycENOby9wR2ZHVWVNV3dmSTRNa216c2gvbHducWdiWmRqb3FIamlvY2QzT3BlbHp4UjRxTGtmb0ppZXQyd2xtZlNHZk1QbDFmVTcybUZ0VUI3bmpWSEQzeUJlMURVZkZxUlBNdjlNWW51VUhobkJsMHo1eUxPaTJ4cDhCaDYvbGxEVzFIa2dCbkFHNzBoR3NhOHcrS0lhTStFeU9DczZCZ2lnbWc1dUM1UDd1L1VJdWdyOHMrZjduUndPQSs4V2RHcUNEMDg5M1FLc0VNRXpVN0EvaWV4MVJRZmZoN1ZLWERYbHNUN2R0M0U1cE9VZXA4MkwzQXg0azZDM1V0SUFtYllib0kwTUJRMkJRMVIrbGFBSm9RWDBBQ1hrRGZRb3A1RVBKS3ptZXA5RUdhakFLMmpnc1lsQWFLR3VnUi9uckR6N3lnUHFSWlRMR3Bvc1FSVTA1akxrTjZCakUzTGJrRnVRaTFpVW5ZOFF0aDExL2pVQ1B4YU1YclNLVjhjcWtOKzNXRVFpK2dLL1cvQjNBM2tUK3JVa25Mb1ZVU1pkZ2JCQW9sL1hVT1p2cU1rUFVKeUdiU2RacG1HdnhiTzBYSUZsc0RJdytYN25XMysrTHppMG5ZYjA4VUg3MFVPR2R2RUUxOEQrSXhwQUNYRCsySWlZOGRVbmZnV3Z6a0l3Y1M4T0RXd0RlQ3RCZU9DNmlHditGQzgvRCtBTTZ6SVB4bnlBVkNoQTJzTEx5TVFIVG9Zbm13UjV3WGNsQ0x3ZUpSUjZsVkZYRHVzWExrZlJEd3Z1OTVscC9qY0plejErOXVSYmIzYkVDNWR1ZTBQTmFRbE9PbmJNLzJHN1lYRnpDMUc0NkYwcnFFdDhYQk05QmZjR0p5R3REbVB6bnl2ZU1HNDFDd1BwSy94cU5yeVMrdGNQVUFyclBYcVQzMGJ1MU9PTzIyWTVsRE1Ock5oZ1JpUGtrR3dqd1UyNUFib2k2TGJEdE9oQm1tRllYSm55OFRzZGg2T3JBdzBmRUt1NkVVSVlYNmVUcEErajlwVWw3K2NBSExDekR6RytzQTM1SlR4RTJsRm9xTytFNjNRNmgzRjA1YjRBQlVKYmh6VGpzTEhhek9FWGdyUUVINStQYVdSc1VHeThMZVN4aVQwcCtKd0VrbWtqUEUvNWJIQ2dXd3N4MzJzdXVCWENaNUZ6NVJyeTU4RHZtcVorQUVROE5ucVQ0Q1N4ZktpRjdhc01NTllBNkVQUUYxRVY1MjhOcGVkUCtxcG9jQitxc0lrUEhDL3hHc04yK3NRNjVZSVV4MzY5MDhDaCtlVWdiT2F2ZTJMcjVzOFh5NU5pcDl5MEw2TEI1cWtURjFlU0R2a3dMNlZkbkZjVmthdDU3allhVEJ2bEJuSis1NGpYZnVMcXBKd3Z0dEVZRzNGelFhN0U4bnV2NEw4Q0J1UmJrOEhwODhQY3oxdG9BWUE2MEs2anJBUXVnN2VGY3QyZ3daT2tMMUUyRjZBQUxNQkg5YkFkZmNneEJlbWpFbENvMjNHRkN2MFlZQzM1YThLdWhxb3p5YVZ2S3NUVitkbUVCM0g2QS9UQ1RnVWZRVmszSlo0SnZLNVl2WGwyc1Q0VHRqZ2paczREZlVQY093ZlRuOXlZTmcvTm84M1Rkby9tV2QrK0FKV3JtUnR6NUpDTk1hL2d6cEdybmFsSlBOQVhvR1RRellsYUVrYlRTUE93SzZyVHFMZlRlWDQ4TUJDZ0g1NVpiR0cvUmJjNk4xdGVnWTFwOW41bnl4bk9ta24xd0VDQVV0RTdCL0Nmc1FMTHhKT3FmR0s5WUp0blkySUdqdEI1WURRZTBBYW9OeS9MNlAzQTBaaGhKd1gvdzZqczVwNTJQblBZNC9HQU5rQ3B5czNYRnhzQ1d4RGpVV3VJVW1IVEIyY1htME9VNEZnN0QyVG1nYjU5VUIzWFk3TzBOK3IyUEhXMzJNRW0yQU43QmloMVAvYkdUaGx6MGpwZVJmQk9nVXl3UFhyVk1PZmtzTmIxbkhyM09Pamtlc0FvUUtsKzRlSk8vc2luK0pkNDAzWVVFS3UxWEJCeWM4N0piWVJPczJnUEdBZW9ZdkhNaFozQ3ZnVnYvNURuTHljNWJYQ2YwMjJsVFBJdGNycnQ1UUhyQUZVTXZSNzFQdDdJejRreS9yRjdIdkFDbUMycCtsSG12VWR2YnJSelBYd1pvU2NhUEw3bmVzeFIzZ0VuYTFnZVNCeWdVUXF4aDhWbkdncjRmRW9lZ1ZPVWVLVUIvQjQveCtHL1lkRlg3ZjJmR1AxSHpKcEVoTkl0ZnFhRVgwSndnZGpuT2xkd0huQWVjQjV3SG5BZWNCNXdIbkFlRVA4SGVOb0xTSmZsSGRvQUFBQUFTVVZPUks1Q1lJST0iPjwvaW1hZ2U+CiAgICAgICAgICAgICAgICAgICAgPHRleHQgaWQ9IuWtpueUn+W3peS9nOeuoeeQhuezu+e7nyIgZm9udC1mYW1pbHk9IlBpbmdGYW5nU0MtTGlnaHQsIFBpbmdGYW5nIFNDIiBmb250LXNpemU9IjI4IiBmb250LXdlaWdodD0iMzAwIiBmaWxsPSIjNEQ0RDREIj4KICAgICAgICAgICAgICAgICAgICAgICAgPHRzcGFuIHg9IjE1NCIgeT0iMzAiPuWtpueUn+W3peS9nOeuoeeQhuezu+e7nzwvdHNwYW4+CiAgICAgICAgICAgICAgICAgICAgPC90ZXh0PgogICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICA8L2c+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4=");
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
      margin-bottom:2px;
      font-size: 14px;
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


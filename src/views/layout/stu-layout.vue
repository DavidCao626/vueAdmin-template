<template>
  <div>
    <div class="headerWrapper" style="box-shadow:  0px 5px 20px 0px rgba(17, 17, 17, 0.1);">
      <header class="header">
        <navbar></navbar>
        <div style="position: absolute;top: 18px;left:18px;z-index: 99999;">
          <button @click="sidebar=!sidebar" class="menuButton">
            <!-- <i class="el-icon-d-arrow-left" v-if="sidebar"></i>
              <i class="el-icon-d-arrow-right" v-else></i> -->
            <svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false" class="style-scope yt-icon" style="pointer-events: none; display: block; width: 24px; height: 24px;fill:rgba(255,255,255,0.8)">
              <g class="style-scope yt-icon">
                <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" class="style-scope yt-icon"></path>
              </g>
            </svg>
          </button>
          </Sticky>
        </div>
      </header>
    </div>

    <el-scrollbar class="page-component__scroll" ref="componentScrollBar">
      <div class="page-container page-component ">
        
          <el-scrollbar class="page-component__nav" style="box-shadow: inset 0 4px 3px 0px rgba(86, 86, 86, 0.12);padding-top: 0px;background-color: #fff;" v-show="sidebar">
            <sidebar></sidebar>
          </el-scrollbar>

        <div :class="['page-component__content', sidebar?'sidebar-hide':'']" style="margin-top: 25px;">
          <!-- <router-view class="content"></router-view> -->
          <app-main class=" app-container "></app-main>
          <div class="app-container app-footer">
            <!-- <div class="app-footer__info">
              <ul>
                <li>
                  <a href="">常见问题</a>
                </li>
                <li>|</li>
                <li>关于我们</li>
                <li>|</li>
                <li>版权说明</li>
                <li>|</li>
                <li>意见反馈</li>
                <li>|</li>
                <li>123-{{sidebar}}</li>
              </ul>
            </div> -->

            <div class="app-footer__ext" style="color:#666">
              Copyright &copy; 2017-2018 内蒙古中融创科技有限公司 &nbsp;提供技术支持.
            </div>

          </div>
        </div>

      </div>
    </el-scrollbar>
  </div>
  <!-- <div class="container">
    <div class="headerWrapper">
      <header class="header">
        <navbar></navbar>
      </header>
    </div>

    <div class="main-cnt">
      <el-scrollbar class="page-component__scrollcomponent__scroll" ref="componentScrollBar">
        <div class="content">
          <div style="position: absolute;top: 90px;left:-12px;opacity: 0.4;    z-index: 999;">
            <Sticky>
              <el-button @click="sidebar=!sidebar" type="info" size="mini">
                <i class="el-icon-d-arrow-left" v-if="sidebar"></i>
                <i class="el-icon-d-arrow-right" v-else></i>
              </el-button>
            </Sticky>
          </div>
          <el-scrollbar class="page-component__nav">
            <div class="sidebar-container" v-show="sidebar">
              <sidebar></sidebar>
            </div>
          </el-scrollbar>
          <main class="main-view ">
            <el-scrollbar>
              <app-main class="app-container"></app-main>
            </el-scrollbar>
            <div class="app-container app-footer">
              <div class="app-footer__info">
                <ul>
                  <li>
                    <a href="">常见问题</a>
                  </li>
                  <li>|</li>
                  <li>关于我们</li>
                  <li>|</li>
                  <li>版权说明</li>
                  <li>|</li>
                  <li>意见反馈</li>
                  <li>|</li>
                  <li>123-{{sidebar}}</li>
                </ul>
              </div>

              <div class="app-footer__ext">
                Copyright &copy; 2017-2018 Tabler. All Rights Reserved.
              </div>

            </div>

          </main>

        </div>
      </el-scrollbar>
    </div>

  </div> -->
</template>

<script>
import { Navbar, Sidebar, AppMain } from "~/views/layout/stu-components";
import Sticky from "~/components/Sticky";
export default {
  name: "layout",
  components: {
    Navbar,
    Sidebar,
    AppMain,
    Sticky
  },
  computed: {},
  data() {
    return {
      sidebar: !this.$store.state.app.sidebar["opened"]
    };
  }
};
</script>

<style  lang="scss" scoped>
//@import "src/styles/main.scss"; // global css
.headerWrapper {
  position: fixed;
  width: 100%;
  left: 0;
  top: 0;
  z-index: 1500;
  box-shadow:  0px 5px 20px 0px rgba(17, 17, 17, 0.14);
}
.container {
  min-width: 1300;
  margin: 0 auto;
}
.header {
  //box-shadow: var(--shadow-dark);

  height: 80px;
  background-color: #fff;
  color: #fff;
  top: 0;
  left: 0;
  width: 100%;
  // line-height: 80px;
  z-index: 100;
  position: relative;
}
.content {
  padding: 40px 0 80px;
  display: flex;
}
.page-component__scroll {
  height: calc(100% - 80px);
  margin-top: 80px;

  .el-scrollbar__wrap {
    overflow-x: auto;
  }
}

.page-component {
  box-sizing: border-box;
  height: 100%;

  &.page-container {
    padding: 0;
  }

  .page-component__nav {
    width: 220px;
    position: fixed;
    top: 0;
    bottom: 0;
    margin-top: 80px;
    transition: padding-top 0.3s;

    .el-scrollbar__wrap {
      height: 100%;
    }

    &.is-extended {
      padding-top: 0;
    }
  }

  .side-nav {
    height: 100%;
    padding-top: 50px;
    padding-bottom: 50px;
    padding-right: 0;

    & > ul {
      padding-bottom: 50px;
    }
  }

  .page-component__content {
    padding-bottom: 100px;
    box-sizing: border-box;
  }

  .content {
    padding-top: 50px;

    > {
      h3 {
        margin: 55px 0 20px;
      }

      table {
        border-collapse: collapse;
        width: 100%;
        background-color: #fff;
        font-size: 14px;
        margin-bottom: 45px;
        line-height: 1.5em;

        strong {
          font-weight: normal;
        }

        td,
        th {
          border-bottom: 1px solid #d8d8d8;
          padding: 15px;
          max-width: 250px;
        }

        th {
          text-align: left;
          white-space: nowrap;
          color: #666;
          font-weight: normal;
        }

        td {
          color: #333;
        }

        th:first-child,
        td:first-child {
          padding-left: 10px;
        }
      }

      ul:not(.timeline) {
        margin: 10px 0;
        padding: 0 0 0 20px;
        font-size: 14px;
        color: #5e6d82;
        line-height: 2em;
      }
    }
  }

  .page-component-up {
    background-color: #fff;
    position: fixed;
    right: 100px;
    bottom: 150px;
    size: 40px;
    border-radius: 20px;
    cursor: pointer;
    transition: 0.3s;
    box-shadow: 0 0 6px rgba(0, 0, 0, 0.12);
    z-index: 5;

    i {
      color: #409eff;
      display: block;
      line-height: 40px;
      text-align: center;
      font-size: 18px;
    }

    &.hover {
      opacity: 1;
    }
  }
  .back-top-fade-enter,
  .back-top-fade-leave-active {
    transform: translateY(-30px);
    opacity: 0;
  }
}

@media (max-width: 768px) {
  .page-component {
    .page-component__nav {
      width: 100%;
      position: static;
      margin-top: 0;
    }
    .side-nav {
      padding-top: 0;
      padding-left: 50px;
    }
    .page-component__content {
      padding-left: 10px;
      padding-right: 10px;
    }
    .content {
      padding-top: 0;
    }
    .content > table {
      overflow: auto;
      display: block;
    }
    .page-component-up {
      display: none;
    }
  }
}

.sidebar-hide {
  padding-left: 220px;
}
.menuButton {
  vertical-align: middle;
  color: inherit;
  outline: none;
  background: none;
  margin: 0;
  border: none;
  padding: 6px;
  width: 100%;
  height: 100%;
  line-height: 0;
  cursor: pointer;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  -webkit-tap-highlight-color: transparent;
  border-radius: 50%;
}
.menuButton:hover {
  background-color: rgba(255, 255, 255, 0.15);
}
.menuButton:active {
  background-color: rgba(200, 200, 200, 0.6);
}
</style>
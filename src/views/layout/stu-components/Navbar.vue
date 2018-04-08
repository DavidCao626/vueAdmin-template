<template>
  <div class="navbar" id="header">
    <div class="navbar__inner">
      <div class="navbar-layout">
        <div class="navbar-layout__side">
          <slot name="side">
            <h1 class="navbar-logo">
              <a href="/" title="微信公众平台">
              </a>
            </h1>
          </slot>
        </div>
        <div class="navbar-layout__extra">
          <slot name="extra">
            <div class="navbar-account">
              <a href="/cgi-bin/frame?t=notification/index_frame&amp;lang=zh_CN&amp;token=2058891718" class="weui-desktop-btn__head-opr weui-desktop-account__message"></a>
              <div class="weui-desktop-operation-group weui-desktop-account__opr weui-desktop-operation-group_hover weui-desktop-operation_default">
                <span class="weui-desktop-operation-group_default">
                  <div class="weui-desktop-account__info">
                    <a href="/cgi-bin/settingpage?t=setting/index&amp;action=index&amp;token=2058891718&amp;lang=zh_CN"><img src="http://wx.qlogo.cn/mmopen/srV4q1ZBhL5noVk7Qhtm9230Akc0ziabqibibHJsGhW4deMx5fY0nr0zlXQvBBOf9icWQKicuKPbG1LRRwE47FoB95dWSBl47IVFo/64" class="weui-desktop-account__thumb"></a>
                    <a href="/cgi-bin/settingpage?t=setting/index&amp;action=index&amp;token=2058891718&amp;lang=zh_CN" class="weui-desktop-account__nickname weui-desktop__small-screen-hide">曹鹏飞个人公众服务助手</a>
                    <a href="/cgi-bin/settingpage?t=setting/index&amp;action=index&amp;token=2058891718&amp;lang=zh_CN" class="weui-desktop-account__type weui-desktop__small-screen-hide">订阅号</a>
                    <a href="javascript:;" class="weui-desktop-account__type weui-desktop__small-screen-hide weui-desktop-account__type_split">未认证</a>
                  </div>
                </span>
              </div>
            </div>
          </slot>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
</script>
<style lang="scss" scoped>
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

  &__inner > &-layout > &-layout__extra,
  &__inner > &-layout &-account {
    height: 100%;
  }
  &__inner > &-layout > &-layout__extra {
    position: absolute;
    right: 0;
    top: 0;
  }
}
</style>


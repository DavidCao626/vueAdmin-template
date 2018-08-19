<template>
    <div>
        <page>
            <div slot="title">
                评测填表模版
            </div>
            <div slot="extra">
                <el-input placeholder="搜索学生姓名或学号" style="width:280px" prefix-icon="el-icon-search">
                </el-input>
                <el-button plain>搜索</el-button>
            </div>
            <div class="approval-panel">
                <p>　　加强民主评议政风行风工作，对于纠正部门和行业不正之风、促进依法行政、推进党风廉政建设、优化发展环境具有重要作用。近年来，承蒙社会各界的高度关注和广大人民群众的热情参与，我县政风行风评议工作取得较好成效，希望继续关注和积极参与我县评议工作，请您根据被评议单位在依法履职、规范服务、办事效率、转变作风等方面的情况，给予客观公正评价。为有效杜绝恶意评议，评议为不满意单位不得超过60%，即63个单位，否则不予提交评议结果。本次测评采用了限制IP投票，每个固定IP在72小时内限投参与一次。网上评议起止日期为2017年9月18日0:00至2017年10月18日24:00</p>
            </div>
            <div class="approval-panel" style="margin-top:20px;margin-bottom:20PX;" v-for="(i,index) in 4">
                <div class="item-head">
                    <div class="item-head-title">{{ index+=1 }}、张三</div>
                    <div class="item-head-des">学号：105644、年龄：21岁、性别：女、民族：蒙古族</div>
                </div>
                <div class="item-body">
                    <ul>
                        <li>思想：
                            <el-input-number  size="mini" placeholder="最高100分" :min="0" :max="100"></el-input-number>&nbsp;分</li>
                        <li>政治：
                            <el-input-number  size="mini" placeholder="最高100分" :min="0" :max="100" ></el-input-number>&nbsp;分</li>
                        <li>成绩：
                            <el-input-number size="mini" placeholder="最高100分" :min="0" :max="100"></el-input-number>&nbsp;分</li>
                        <li>心理：
                            <el-input-number  size="mini" placeholder="最高100分" :min="0" :max="100"></el-input-number>&nbsp;分</li>
                    </ul>
                </div>
            </div>

            <div class="approval-panel  footer-toolbar clearfix">
                <div class="footer-toolbar__pagination">
                    <el-pagination layout="prev, pager, next" :total="1000">
                    </el-pagination>
                </div>
                <div class="footer-toolbar__tools">
                    <el-button plain>取消</el-button>
                    <el-button type="primary">提交</el-button>
                </div>

                <div class="footer-toolbar__messages">
                    <el-popover placement="top" width="200" trigger="hover" title="表单验证结果">

                        <div style="color:red;"> e-1-1项目下的所有子节点占比不能超过1
                        </div>
                        <i class="el-icon-warning" slot="reference"> 3</i>
                    </el-popover>

                </div>
            </div>
        </page>
    </div>
</template>
<script>
export default {
  data() {
    return {
      value1: 30
    };
  }
};
</script>

<style scoped>
.el-input {
  width: 50%;
}
.item-head {
}
.item-head-title {
  float: left;
  font-weight: 500;
  font-size: 16px;
}
.item-head-des {
  float: left;
  color: var(--color-grey-light-2);
  height: 16px;
  line-height: 16px;
  margin-top: 5px;
  margin-left: 15px;
}
.item-body {
  clear: both;
  margin-left: 15px;
  padding: 10px;
}
.item-body li {
  list-style: none;
  line-height: 36px;
  width: 20%;
}
.footer-toolbar__pagination {
  float: left;
}
</style>

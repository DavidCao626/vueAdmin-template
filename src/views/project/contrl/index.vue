<template>
    <page :Breadcrumb="true">
        <div slot="title">项目控制台</div>
        <div slot="panel">

            <ProjectType :typeName="projectInfo.tyleName"></ProjectType>
            <div class="project" style="display:flex;align-items: center;justify-content: space-between;">
                <div class="project-left" style="margin:30px;">
                    <div class="project-name">
                        2019年17级贫困建档项目
                    </div>
                    <div class="project-desc">
                        <p>
                            项目开始时间：2018-06-25
                        </p>
                        <p>
                            项目结束时间：2018-07-30
                        </p>
                        <p>
                            附件说明： 2019年17级贫困建档项目流程指导手册.doc
                        </p>
                    </div>
                    <div style="display: flex;justify-content: flex-end;">
                        <el-button style="color:#444;font-weight: 400;" type="text">
                            <svg-icon icon-class="seejindu" width="20px" height="20px" /> 查看进度</el-button>

                        <el-button style="color:#444;font-weight: 400;" type="text">
                            <svg-icon icon-class="seedate" width="20px" height="20px" /> 查看数据</el-button>
                    </div>
                </div>
                <div class="project-right" style="margin: 30px;display:flex;justify-content:center;flex:1">
                    <ProjectScoped></ProjectScoped>
                </div>
            </div>
            <ContrlTimeLine></ContrlTimeLine>

            <br/> <br/> <br/>
        </div>
    </page>

</template>

<script>
import ContrlTimeLine from "./_components/ContrlTimeLine";
import ProjectType from "./_components/ProjectType";
import ProjectScoped from "./_components/ProjectScoped";
export default {
  components: {
    ContrlTimeLine,
    ProjectType,
    ProjectScoped
  },
  data() {
    return {
      projectInfo: {
        name: "2019年17级贫困建档项目",
        tyleId: "001",
        tyleName: "贫困建档",
        bginDate: "2018-06-28",
        endDate: "2018-09-1",
        endDateCount: "90",
        attachment: [
          {
            name: " 2019年17级贫困建档项目流程指导手册.doc",
            src: "http://baidu.com/2019年17级贫困建档项目流程指导手册.doc"
          }
        ],
        delivery: true,
        files: [
          { name: "2018年上学期2017级贫困学生建档项目.doc" },
          { name: "新版学工系统建档操作手册.doc" }
        ],
        desc:
          "“2018年上学期2017级贫困学生建档项目开始了，请各级学院老师提前做好准备！”"
      }
    };
  }
};
</script>
<style>
.project-name{
  font-size: 24px;
  color: #444;
  font-weight: 400;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
}
.project-desc{
  font-size: 14px;
  color: #666;
  font-weight: 500;
  margin: 30px;
  line-height: 30px;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
}
</style>

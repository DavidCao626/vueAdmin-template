<style  scoped>
.block {
  /* max-width: 1000px;
  margin: 50px auto; */
  background-color: #fff;
  border: 1px solid #d2d2d2;
}
.block-left {
  padding: 10px;
  border-right: 1px solid #d2d2d2;
  background: #f4f7fa;
  height: 810px;
}
.block-right {
  padding: 15px;
}
.block-right__noBody {
  text-align: center;
  font-size: 24px;
  font-weight: 200;
  margin-top: 35%;
}
.block-body {
  padding: 15px;
  height: 800px;
}
.block-header {
  font-size: 16px;
  font-weight: 500;
  height: 22px;
}
.block-header h3 {
  height: 0px;
  line-height: 14px;
  font-size: 20px !important;
}
.block-nav {
}
.block-line {
  margin-top: 10px;
  margin-bottom: 10px;
  border-bottom: 1px solid #d2d2d2;
}
.block-line__hide {
  margin-top: 10px;
  margin-bottom: 10px;
}
.el-tree {
  background: no-repeat;
}
</style>

<template>
  <page>
    <div slot="title">机构管理</div>
    <div slot="panel" style="">
      <div class="block">
        <el-dialog title="新增下级节点" :visible.sync="dialogVisible" width="30%">

          <el-form :inline="true" :model="formAdd" size="small" label-width="100px">
            <el-card shadow="hover">
              <el-form-item label="新建节点类型:">
                <el-select v-model="isOrgAdd">
                  <el-option v-for="(item,i) in DiverseOrgBean" :key="i" :label="item.name" :value="item.type">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-card>
            <el-card shadow="hover" v-show="isOrgAdd!='10'||isOrgAdd=='10'">
              <el-form-item label="组织名称:">
                <el-input v-model="formAdd.orgName"></el-input>
              </el-form-item>
              <el-form-item label="组织简称:">
                <el-input v-model="formAdd.orgTitle"></el-input>
              </el-form-item>
              <el-form-item label="社会属性:">
                <el-input v-model="formAdd.socialCode"></el-input>
              </el-form-item>
              <!-- <el-form-item label="是否可用:"> 新增时 文档中没有写需要available字段
                <el-switch v-model="formAdd.available" active-color="#13ce66" inactive-color="#ccc">
                </el-switch>
              </el-form-item> -->
            </el-card>
            <br/>
            <el-card shadow="hover" v-show="isOrgAdd=='10'">
              <el-form-item label="所属学年:">
                <elx-select v-model="formAdd.expandData.schoolYearId">
                  <el-option v-for="(item,i) in schoolYearDict" :key="i" :label="item.name" :value="item.id">
                  </el-option>
                </elx-select>
              </el-form-item>
              <el-form-item label="学制:">
                <elx-select v-model="formAdd.expandData.academic">
                  <el-option v-for="(item,i) in educationalType" :key="i" :label="item.dict_desc" :value="item.dict_key">
                  </el-option>
                </elx-select>
              </el-form-item>
              <el-form-item label="成员类型:">
                <elx-select v-model="formAdd.expandData.memberType">
                  <el-option v-for="(item,i) in study_degree_code" :key="i" :label="item.dict_desc" :value="item.dict_key">
                  </el-option>
                </elx-select>
              </el-form-item>

              <el-form-item label="专业名称:">
                <elx-select v-model="formAdd.expandData.majorCode">
                  <el-option v-for="(item,i) in MajorList" :key="i" :label="item.majorName" :value="item.majorCode">
                  </el-option>
                </elx-select>
              </el-form-item>
              <el-form-item label="组织状态:">
                <elx-select v-model="formAdd.expandData.orgState">
                  <el-option v-for="(item,i) in orgState" :key="i" :label="item.dict_desc" :value="item.dict_key">
                  </el-option>
                </elx-select>
              </el-form-item>
            </el-card>
          </el-form>
          <span slot="footer" class="dialog-footer">

            <el-button type="primary" @click="addNode()" size="medium">确 定</el-button>
            <el-button @click="dialogVisible = false" size="medium">取 消</el-button>
          </span>
        </el-dialog>
        <el-row>
          <el-col :span="6">
            <div class="block-left">
              <div class="block-header">
                <i class="el-icon-menu"></i> 机构列表</div>
              <div class="block-line"></div>
              <div class="block-nav">
                <el-input placeholder="输入关键字进行过滤" v-model="filterText">
                </el-input>
                <el-tree ref="tree2" :props="treeProps" :data="data" :filter-node-method="filterNode" node-key="id" :default-expanded-keys="[1]" :expand-on-click-node="false" default-expand-all @node-click="handleNodeClick"></el-tree>
              </div>
            </div>
          </el-col>
          <el-col :span="18" style="background-color:#f4f7fa" v-loading="loading">
            <div class="block-right">
              <div class="block-header">
                <h3>{{ form.orgName }}&nbsp;&nbsp;
                  <small>({{ form.orgTitle }})</small>
                  <span style="font-size: 12px;font-weight: 400;margin-left: 10px;"> 组织代码:{{ form.orgCode }}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 社会属性代码:{{ form.socialCode }}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 是否可用（Y/N）:{{ form.available=='Y'?'是':'否' }}
                  </span>
                </h3>

              </div>
              <div>
                <template  v-if="form.orgType!='10'">

                <el-button type="text" @click="add(form)">新增子节点</el-button>&nbsp;&nbsp;&nbsp;|
                </template>
                <el-button type="text" @click="onNodeDel(form)">删除</el-button>
              </div>
              <div class="block-line"></div>
              <div style="margin-bottom: 10px;color: #999;    font-size: 12px;">基础信息维护:</div>
              <el-form :inline="true" :model="form" size="small" label-width="100px">
                <el-card shadow="hover">
                  <el-form-item label="组织名称:">
                    <el-input v-model="form.orgName"></el-input>
                  </el-form-item>
                  <el-form-item label="组织简称:">
                    <el-input v-model="form.orgTitle"></el-input>
                  </el-form-item>
                  <el-form-item label="社会属性:">
                    <el-input v-model="form.socialCode"></el-input>
                  </el-form-item>
                  <el-form-item label="是否可用:">
                    <el-switch v-model="form.available" active-color="#13ce66" inactive-color="#ccc">
                    </el-switch>
                  </el-form-item>
                </el-card>
                <br/>
                <template v-if="form.expandData && form.orgType=='10'">
                  <div style="margin-bottom: 10px;color: #999;font-size: 12px;">扩展信息维护:</div>
                  <el-card shadow="hover">
                    <el-form-item label="所属学年:">
                      <elx-select v-model="form.expandData.schoolYearId">
                        <el-option v-for="(item,i) in schoolYearDict" :key="i" :label="item.name" :value="item.id">
                        </el-option>
                      </elx-select>
                    </el-form-item>
                    <el-form-item label="学制:">
                      <elx-select v-model="form.expandData.academic">
                        <el-option v-for="(item,i) in educationalType" :key="i" :label="item.dict_desc" :value="item.dict_key">
                        </el-option>
                      </elx-select>
                    </el-form-item>
                    <el-form-item label="成员类型:">
                      <elx-select v-model="form.expandData.memberType">
                        <el-option v-for="(item,i) in study_degree_code" :key="i" :label="item.dict_desc" :value="item.dict_key">
                        </el-option>
                      </elx-select>
                    </el-form-item>

                    <el-form-item label="专业名称:">
                      <elx-select v-model="form.expandData.majorCode">
                        <el-option v-for="(item,i) in MajorList" :key="i" :label="item.majorName" :value="item.majorCode">
                        </el-option>
                      </elx-select>
                    </el-form-item>
                    <el-form-item label="组织状态:">
                      <elx-select v-model="form.expandData.orgState">
                        <el-option v-for="(item,i) in orgState" :key="i" :label="item.dict_desc" :value="item.dict_key">
                        </el-option>
                      </elx-select>
                    </el-form-item>
                  </el-card>
                </template>
              </el-form>
              <br/>
              <div>
                <el-card shadow="hover">
                  <el-button type="primary" @click="save">保存信息</el-button>
                </el-card>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
  </page>

</template>

<script>
import menus from "../_mixin/menus.js";
export default {
  mixins: [menus],
  data() {
    return {
      formAdd: {
        //ADD绑定form
        orgCode: "",
        orgType: "",
        orgName: "",
        orgTitle: "",
        available: true,
        socialCode: "",
        expandData: {
          schoolYearId: "",
          schoolYearName: "",
          academic: "",
          memberType: "",
          majorCode: "",
          majorName: "",
          orgState: ""
        }
      },
      form: {
        //更新绑定form
        orgCode: "",
        orgType: "",
        orgName: "",
        orgTitle: "",
        available: "",
        socialCode: "",
        expandData: {
          schoolYearId: "",
          schoolYearName: "",
          academic: "",
          memberType: "",
          majorCode: "",
          majorName: "",
          orgState: ""
        }
      },
      dialogVisible: false,
      filterText: "", //树节点搜索
      treeProps: {
        //树prop映射字段
        label: function(data, node) {
          return data.org.orgName;
        }
      },
      data: [], //左侧树结构数据
      org: {}, //暂没有用
      educationalType: [], //当前可用的学制码表数据
      study_degree_code: [], //当前可用的成员类型码表数据
      orgState: [], //当前可用的组织状态码表数据
      schoolYearDict: [], //当前可用的学年码表数据
      loading: false,
      MajorList: [], //专业码表数据
      DiverseOrgBean: [], //当前节点可以创建的下级节点类型
      isOrgAdd: "" //当前新建节点选择的创建类别 0x4、0x10 。。。。
    };
  },
  watch: {
    //搜索数节点
    filterText(val) {
      this.$refs.tree2.filter(val);
    }
  },
  methods: {
    //获取字典api内容
    getDict(key, callback) {
      this.getDictByDictNames({ dicts: [key] }).then(response => {
        callback(response.resBody);
      });
    },
    //获取树结构加载全部api内容
    getData() {
      this.loading = true;
      this.getOrgTreeView().then(response => {
        this.data = [];
        console.log(["tree", response]);
        var res = response.resBody;
        this.data = [res];
        this.form =this.data[0].org;
        this.loading = false;
      });
    },

    //查找数节点名称
    filterNode(value, data) {
      if (!value) return true;
      return data.org.orgName.indexOf(value) !== -1;
    },
    //新建子节点按钮

    add() {
      this.dialogVisible = true;
    },
    //单击组织树某个节点所触发的方法
    handleNodeClick(data, node) {
      this.isOrgAdd = "";
      this.DiverseOrgBean = data.childTypes;
      this.loading = true;
      var requestData = {
        orgCode: data.org.orgCode,
        orgType: data.org.orgType
      };
      //点击树某一节点，查询回当前节点树的详细一个组织信息
      this.getOrg(requestData).then(response => {
        console.log(["itemAndScore", response]);
        var res = response.resBody;
        res.available = res.available == "Y" ? true : false; //Y和true 的布尔值转换，用来显示el组件
        this.form = res; //将查询结果付值到更新form表单中
        this.org = res; //暂无用处
        this.loading = false;
      });
    },
    onNodeDel(nodeData) {
      this.$confirm("此操作将永久删除该节点, 是否继续?", "删除节点", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        //删除
        this.deleteOrg({
          orgCode: nodeData.orgCode,
          orgType: nodeData.orgType
        }).then(response => {
          //this.org.splice(this.org.indexOf(nodeData), 1); //无用
          this.$message({
            type: "success",
            message: "删除成功!"
          });
          this.getData(); //重新加载树全部数据
        });
      });
    },
    addNode() {
      var requestData;
      if (this.isOrgAdd == "10") {
        //如果当前选择的班级 加载班级所需要的提交字段
        requestData = {
          parentCode: this.form.orgCode, //上级组织
          orgType: this.isOrgAdd, //新建节点的类型 （从第一步选择中结果中拿到）
          orgName: this.formAdd.orgName,
          orgTitle: this.formAdd.orgTitle,
          socialCode: this.formAdd.socialCode,
          expandData: {
            schoolYearId: this.formAdd.expandData.schoolYearId,
            schoolYearName: this.formAdd.expandData.schoolYearName,
            academic: this.formAdd.expandData.academic,
            memberType: this.formAdd.expandData.memberType,
            majorCode: this.formAdd.expandData.majorCode,
            majorName: this.formAdd.expandData.majorName,
            orgState: this.formAdd.expandData.orgState
          }
        };
      } else {
        //如果当前新建类型不是班级的，加载通用提交字段
        requestData = {
          parentCode: this.form.orgCode, //上级组织
          orgType: this.isOrgAdd, //新建节点的类型 （从第一步选择中结果中拿到）
          orgName: this.formAdd.orgName,
          orgTitle: this.formAdd.orgTitle,
          socialCode: this.formAdd.socialCode,
          expandData: {}
        };
      }

      this.insertOrg(requestData).then(response => {
        this.dialogVisible = false;
        this.$message({
          message: "添加成功",
          type: "success"
        });
        this.getData(); //重新请求加载 刷新左侧树的全部数据
      });
    },
    save() {
      this.updateOrg({
        orgCode: this.form.orgCode,
        orgType: this.form.orgType,
        orgName: this.form.orgName,
        orgTitle: this.form.orgTitle,
        socialCode: this.form.socialCode,
        available: this.form.available ? "Y" : "N",
        expandData: {
          schoolYearId: this.form.expandData.schoolYearId,
          schoolYearName: this.form.expandData.schoolYearName,
          academic: this.form.expandData.academic,
          memberType: this.form.expandData.memberType,
          majorCode: this.form.expandData.majorCode,
          majorName: this.form.expandData.majorName,
          orgState: this.form.expandData.orgState
        }
      }).then(r => {
        this.$message({
          message: "更新成功！",
          type: "success"
        });
      });
    },
    getSchoolYearDict() {
      this.querySchoolYearDict({}).then(response => {
        this.loading = false;
        this.schoolYearDict = response.resBody;
        this.queryMajorList().then(response => {
          this.MajorList = response.resBody;
        });
      });
    },
    //获取码表
    getDictlist() {
      this.loading = true;
      this.getDict("educationalType", body => {
        this.educationalType = body.educationalType;
        this.getDict("study_degree_code", body => {
          this.study_degree_code = body.study_degree_code;
          this.getDict("orgState", body => {
            this.orgState = body.orgState;
            this.loading = false;
            this.getData();
          });
        });
      });
    }
  },

  beforeRouteEnter(to, form, next) {
    next(vm => {
      vm.getSchoolYearDict();
      vm.getDictlist();
    });
  }
};
</script>

<style>
</style>

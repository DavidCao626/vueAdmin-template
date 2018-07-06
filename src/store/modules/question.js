import Utils from "@/components/Utils.js";
import qusApi from "@/API/question/questionApi.js";

const state = {
  baseSet: {
    radio: {
      type: "radio",
      name: [],
      label: "单选题",
      required: true,
      options: [
        {
          type: "radio",
          label: "单选题1",
          value: "0",
          number_Percentage: 0
        },
        {
          type: "radio",
          label: "单选题2",
          value: "1",
          number_Percentage: 0
        },
        {
          type: "radio",
          label: "单选题3",
          value: "2",
          number_Percentage: 0
        },
        {
          type: "radio",
          label: "单选题4",
          value: "3",
          number_Percentage: 0
        }
      ]
    },
    checkbox: {
      type: "checkbox",
      name: [],
      label: "多选题",
      required: true,
      options: [
        {
          type: "checkbox",
          label: "多选题1",
          value: "0",
          number_Percentage: 0
        },
        {
          type: "checkbox",
          label: "多选题2",
          value: "1",
          number_Percentage: 0
        },
        {
          type: "checkbox",
          label: "多选题3",
          value: "2",
          number_Percentage: 0
        },
        {
          type: "checkbox",
          label: "多选题4",
          value: "3",
          number_Percentage: 0
        }
      ]
    },
    input: {
      type: "input",
      label: "填空题",
      required: false,
      options: [
        {
          type: "input",
          label: "",
          value: "请填写内容"
        }
      ]
    },
    textarea: {
      type: "textarea",
      label: "多行填空题",
      required: false,
      options: [
        {
          type: "textarea",
          label: "",
          value: "请填写内容"
        }
      ]
    }
  },
  qss: {
    id: null,
    taskCode: null,
    startTime: null,
    endTime: null,
    availabile: null,
    orgCode: ["100101", "10010101", "1001010101"],
    title: "点击添加问卷名称",
    description:
      "欢迎添加调查！答卷数据仅用于统计分析，请放心填写。题目选项无对错之分，按照实际情况选择即可。感谢您的帮助！",
    questionLists: []
  },
  results: {
    taskCode: null,
    title: "点击添加问卷名称",
    description:
      "欢迎添加调查！答卷数据仅用于统计分析，请放心填写。题目选项无对错之分，按照实际情况选择即可。感谢您的帮助！",
    questionLists: [
      {
        type: "radio",
        label: "单选题",
        options: [
          {
            type: "radio",
            label: "单选题1",
            number_Percentage: 50
          }
        ]
      }
    ]
  }
};

const clone = function(obj) {
  var newObj = {};
  for (const key in obj) {
    var target = obj[key];

    if (Object.prototype.toString.call(target) === "[object Object]") {
      newObj[key] = clone(target);
    } else {
      if (Object.prototype.toString.call(target) === "[object Array]") {
        newObj[key] = target.slice(0);
      } else {
        newObj[key] = target;
      }
    }
  }
  return newObj;
};

// 添加问题时，直接push进数组即可
const mutations = {
  // 添加问题方法
  addQuestion(state, type) {
    state.qss.questionLists.push(clone(state.baseSet[type]));
  },

  copyQuestion(state, index) {
    const list = state.qss.questionLists[index["key"]].options;
    // 复制时，同样需要对引用对象进行深拷贝

    list.splice(
      index["optionsKey"],
      1,
      list[index["optionsKey"]],
      clone(list[index["optionsKey"]])
    );

    for (
      let i = 0;
      i < state.qss.questionLists[index["key"]].options.length;
      i++
    ) {
      state.qss.questionLists[index["key"]].options[i].value = i + "";
    }
  },
  deletQuestion(state, index) {
    const list = state.qss.questionLists[index["key"]].options;
    // 复制时，同样需要对引用对象进行深拷贝

    list.splice(index["optionsKey"], 1);
    if (list.length === 0) {
      state.qss.questionLists.splice(index["key"], 1);
    }

    for (
      let i = 0;
      i < state.qss.questionLists[index["key"]].options.length;
      i++
    ) {
      state.qss.questionLists[index["key"]].options[i].value = i + "";
    }
  },

  moveQuestion(state, index, direct) {
    const list = state.qss.questionLists[index["key"]].options;

    if (index["direct"] === "up") {
      if (index["optionsKey"] < 1) {
        alert("已经是第一项！");
        return;
      }

      list.splice(
        index["optionsKey"] - 1,
        2,
        list[index["optionsKey"]],
        list[index["optionsKey"] - 1]
      );
    } else {
      if (index["optionsKey"] >= list.length - 1) {
        alert("已经是最后一项！");
        return;
      }

      list.splice(
        index["optionsKey"],
        2,
        list[index["optionsKey"] + 1],
        list[index["optionsKey"]]
      );
    }

    for (
      let i = 0;
      i < state.qss.questionLists[index["key"]].options.length;
      i++
    ) {
      state.qss.questionLists[index["key"]].options[i].value = i + "";
    }
  },

  updateValue: (state, qss) => {
    console.log("mutations" + qss);
    state.qss = qss;
  },

  // 从Ajax等获取外部数据灌入Stat.qss中
  setQssForExternalData: (state, externalData) => {
    state.qss = externalData;
  }
};

const getters = {
  getQssResults: state => {
    return state.results;
  },
  getQss: state => {
    return state.qss;
  },
  getQssForStyl: state => {
    var dataFormat = state.qss.dataFormat;
    state.qss.questionLists.forEach((temItem, index) => {
      if (dataFormat && dataFormat.length > 0) {
        dataFormat.forEach(e => {
          if (e.key) {
            temItem[e.key] = "";
          }
          if (e.children && e.children.length > 0) {
            e.children.forEach(i => {
              if (i.key) {
                temItem[i.key] = "";
              }
            });
          }
        });
      }
    });
    return state.qss;
  },
  // 获取stat.qss给外部数据
  getQssToExternalData: state => {
    return state.qss;
  },
  // 获取stat.qss给外部数据
  getQssToAjax: state => {
    // {"content_type":null,"taskCode":"20180020332","nodes":[
    // {"nodeCode":"20180020332-180","nodeType":"Array","nodeVal":["2","4"]}
    // ]}
    const data = {};
    data["content_type"] = "application/json";
    data["taskCode"] = state.qss.taskCode;

    const list = [];
    for (var i = 0; i < state.qss.questionLists.length; i++) {
      const newnode = {};
      newnode["nodeCode"] = state.qss.questionLists[i]["code"];
      newnode["nodeType"] = state.qss.questionLists[i]["type"];
      newnode["nodeVal"] = state.qss.questionLists[i]["name"];

      list.push(newnode);
    }
    console.log(data);
    data["nodes"] = list;

    return data;
  },
  // 获取stat.qss给外部数据
  getQssToAjax1: state => {
    // {"cont1ent_type":null,"taskCode":"20180020332","nodes":[
    // {"nodeCode":"20180020332-180","nodeType":"Array","nodeVal":["2","4"]}
    // ]}
    const data = {};
    data["content_type"] = "application/json";
    data["taskCode"] = state.qss.taskCode;

    const list = [];
    for (var i = 0; i < state.qss.questionLists.length; i++) {
      const newnode = {};
      newnode["nodeCode"] = state.qss.questionLists[i]["code"];
      newnode["nodeType"] = state.qss.questionLists[i]["type"];

      if (typeof state.qss.questionLists[i]["name"] === "number") {
        const arrayvar = [];
        arrayvar.push(state.qss.questionLists[i]["name"]);
        newnode["nodeVal"] = arrayvar;
        list.push(newnode);
      } else {
        newnode["nodeVal"] = state.qss.questionLists[i]["name"];
        list.push(newnode);
      }
    }
    console.log(data);
    data["nodes"] = list;

    return data;
  }
};
const actions = {
  up: ({ commit }, index) => {
    index.direct = "up";
    commit("moveQuestion", index);
  },
  down: ({ commit }, index) => {
    index.direct = "down";
    commit("moveQuestion", index);
  },
  copy: ({ commit }, index) => {
    commit("copyQuestion", index);
  },
  close: ({ commit }, index) => {
    commit("deletQuestion", index);
  },
  updateValue: ({ commit }, qss) => {
    commit("updateValue", qss);
  },
  // 添加按钮方法
  addQuestion: ({ commit }, type) => {
    commit("addQuestion", type);
  },
  // 生成问卷
  saveForm(commit) {
    var data = state.qss;
    console.log(data);
    //data['content_type'] = 'application/json'
    Utils.requestBody(qusApi.add, data, function(data) {
      console.log(data);
      // debugger
      alert("添加成功,任务代号：" + data.resBody.taskCode);
      localStorage.setItem("taskCode", data.resBody.taskCode);
    });
  },
  // 初始化问卷-
  initQuuestion(commit, taskCode) {
    let ls = null;
    if (!taskCode || taskCode === undefined) {
      ls = localStorage.getItem("taskCode");
    } else {
      ls = taskCode;
    }
    if (!ls || ls === undefined) {
      alert("你还没taskcode！");
      return;
    }
    var data = [{ taskCode: ls }];
    data["content_type"] = "application/json";
    Utils.post(qusApi.get, data[0], function(data) {
      console.log(data);
      if (data.resBody.questionLists.length > 0) {
        for (var i = 0; i < data.resBody.questionLists.length; i++) {
          if (data.resBody.questionLists[i]["name"] == null) {
            data.resBody.questionLists[i]["name"] = [];
          }
        }
      }
      //state.qss = data.resBody;
      var e = {
        content_type: "application/json",
        id: null,
        taskCode: "201807061006703",
        startTime: null,
        endTime: null,
        availabile: null,
        title: "点击添加问卷名称",
        description:
          "欢迎添加调查！答卷数据仅用于统计分析，请放心填写。题目选项无对错之分，按照实际情况选择即可。感谢您的帮助！",
        orgCode: ["100101", "10010101", "1001010101"],
        questionLists: [
          {
            id: 1,
            desc: null,
            code: "201807061006703-180",
            name: [],
            type: "radio",
            availabile: null,
            updateTime: "2018-07-06",
            label: "王武",
            required: true,
            isDot: false,
            options: [
              {
                id: 0,
                label: "好",
                value: "0",
                type: "radio",
                availabile: null,
                updateTime: null,
                number_Percentage: 0
              },
              {
                id: 0,
                label: "不好",
                value: "1",
                type: "radio",
                availabile: null,
                updateTime: null,
                number_Percentage: 0
              },
              {
                id: 0,
                label: "还可以",
                value: "2",
                type: "radio",
                availabile: null,
                updateTime: null,
                number_Percentage: 0
              },
              {
                id: 0,
                label: "行的",
                value: "3",
                type: "radio",
                availabile: null,
                updateTime: null,
                number_Percentage: 0
              }
            ]
          },
          {
            id: 2,
            desc: null,
            code: "201807061006703-181",
            name: [],
            type: "radio",
            availabile: null,
            updateTime: "2018-07-06",
            label: "王123123123123武",
            required: true,
            isDot: false,
            jtQk: "63",
            options: [
              {
                id: 0,
                label: "好",
                value: "0",
                type: "radio",
                availabile: null,
                updateTime: null,
                number_Percentage: 0
              },
              {
                id: 0,
                label: "不好",
                value: "1",
                type: "radio",
                availabile: null,
                updateTime: null,
                number_Percentage: 0
              },
              {
                id: 0,
                label: "还可以",
                value: "2",
                type: "radio",
                availabile: null,
                updateTime: null,
                number_Percentage: 0
              },
              {
                id: 0,
                label: "行的",
                value: "3",
                type: "radio",
                availabile: null,
                updateTime: null,
                number_Percentage: 0
              }
            ]
          },
          {
            id: 3,
            desc: null,
            code: "201807061006703-182",
            name: [],
            type: "radio",
            availabile: null,
            updateTime: "2018-07-06",
            label: "李晓明",
            required: true,
            isDot: false,
            jtQk: "13",
            options: [
              {
                id: 0,
                label: "好",
                value: "0",
                type: "radio",
                availabile: null,
                updateTime: null,
                number_Percentage: 0
              },
              {
                id: 0,
                label: "不好",
                value: "1",
                type: "radio",
                availabile: null,
                updateTime: null,
                number_Percentage: 0
              },
              {
                id: 0,
                label: "还可以",
                value: "2",
                type: "radio",
                availabile: null,
                updateTime: null,
                number_Percentage: 0
              },
              {
                id: 0,
                label: "行的",
                value: "3",
                type: "radio",
                availabile: null,
                updateTime: null,
                number_Percentage: 0
              }
            ]
          }
        ]
      };
      state.qss = e;
    });
  },
  // 提交问卷
  subForm(commit) {
    var data = this.getters["getQssToAjax1"];
    //data['content_type'] = 'application/json'
    Utils.requestBody(qusApi.submitQuestionResult, data, function(data) {
      console.log(data);
      state.qss = data.resBody;
    });
  },
  updetaForm(commit) {
    var data = state.qss;
    data["content_type"] = "application/json";
    Utils.post(qusApi.updeta, data, function(data) {
      console.log(data);
      state.qss = data.resBody;
    });
  },
  getResultsQuuestion(commit) {
    const ls = localStorage.getItem("taskCode");

    if (!ls || ls === undefined) {
      alert("你还没taskcode！");
      return;
    }
    var data = "taskCode=" + ls;
    // data["content_type"]="application/json";
    Utils.post(qusApi.getQuestionResult, data, function(data) {
      state.results = data.resBody;
      console.log(state.results);
    });
  }
};

export default {
  state,
  mutations,
  actions,
  getters
};

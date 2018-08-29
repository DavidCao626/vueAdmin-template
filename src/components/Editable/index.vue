

<script>
export default {
  props: {
    rows: {
      type: Number,
      default() {
        return 7;
      }
    },
    column: {
      type: Number,
      default() {
        return 8;
      }
    },
    data: {
      type: String,
      default() {
        return "";
      }
    }
  },
  data() {
    return {
      thead: [
        "星期一",
        "星期二",
        "星期三",
        "星期四",
        "星期五",
        "星期六",
        "星期日"
      ]
    };
  },
  render: function(createElement) {
    var self = this;
    var func = function() {
      return {
        template: self.data
      };
    };
    if (this.data != "") {
      return createElement(func());
    }
    return createElement(
      "table",
      { attrs: { border: "0", id: "data-table" } },
      [
        createElement("thead", [
          createElement("th", { attrs: { align: "center" } },"#"),
          this.thead.map(element => {
            return createElement("th", element);
          })
        ]),
        createElement("tbody", [
          Array.apply(null, Array(this.rows)).map((element, index) => {
            return createElement("tr", [
              createElement("td", { attrs: { align: "center" },style:{width:'20px'} }, [index + 1]),
              Array.apply(null, Array(this.column - 1)).map(element => {
                return createElement("td", {
                  attrs: { contenteditable: "true" }
                });
              })
            ]);
          })
        ])
      ]
    );
  },
  methods: {
    saveTable() {
      let table = this.$refs["table"];
      debugger;
    }
  },
  mounted() {
    console.log();
  }
};
</script>

<style scoped>
#data-table {
  border-width: 1px;
  border-color: #777;
  border-collapse: collapse;
}
#data-table th {
  border-width: 1px;

  border-style: solid;
  border-color: #666666;
  background-color: #dedede;
}
#data-table td {
  border-width: 1px;
  max-width: 100px;
  width: 100px;
  border-style: solid;
  border-color: #666666;
  background-color: #ffffff;
}
</style>

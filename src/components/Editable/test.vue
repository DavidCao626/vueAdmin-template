<template>
    <page>
        <div slot="panel">
            <datatable :rows="rows" ref="dataTable" data=""></datatable>
            <el-button type="primary" @click="save">save</el-button>
        </div>
    </page>

</template>

<script>
import datatable from "./index";
export default {
  components: {
    datatable
  },
  data() {
    return {
        rows:12,
      t:'<table border="1" id="data-table" data-v-a9387cba=""><thead><th>#</th><th>星期一</th><th>星期二</th><th>星期三</th><th>星期四</th><th>星期五</th><th>星期六</th><th>星期日</th></thead><tbody><tr><td style="width: 10px;">1</td><td contenteditable="true" style="max-width: 100px; width: 100px;"></td><td contenteditable="true" style="max-width: 100px; width: 100px;"></td><td contenteditable="true" style="max-width: 100px; width: 100px;"></td><td contenteditable="true" style="max-width: 100px; width: 100px;"></td><td contenteditable="true" style="max-width: 100px; width: 100px;"></td><td contenteditable="true" style="max-width: 100px; width: 100px;"></td><td contenteditable="true" style="max-width: 100px; width: 100px;"></td></tr><tr><td style="width: 10px;">2</td><td contenteditable="true" style="max-width: 100px; width: 100px;"></td><td contenteditable="true" style="max-width: 100px; width: 100px;"></td><td contenteditable="true" style="max-width: 100px; width: 100px;">asdas</td><td contenteditable="true" style="max-width: 100px; width: 100px;"></td><td contenteditable="true" style="max-width: 100px; width: 100px;"></td><td contenteditable="true" style="max-width: 100px; width: 100px;"></td><td contenteditable="true" style="max-width: 100px; width: 100px;"></td></tr><tr><td style="width: 10px;">3</td><td contenteditable="true" style="max-width: 100px; width: 100px;">asdasd</td><td contenteditable="true" style="max-width: 100px; width: 100px;"></td><td contenteditable="true" style="max-width: 100px; width: 100px;"></td><td contenteditable="true" style="max-width: 100px; width: 100px;"></td><td contenteditable="true" style="max-width: 100px; width: 100px;"></td><td contenteditable="true" style="max-width: 100px; width: 100px;"></td><td contenteditable="true" style="max-width: 100px; width: 100px;"></td></tr><tr><td style="width: 10px;">4</td><td contenteditable="true" style="max-width: 100px; width: 100px;"></td><td contenteditable="true" style="max-width: 100px; width: 100px;">adasdas</td><td contenteditable="true" style="max-width: 100px; width: 100px;">adsadsads</td><td contenteditable="true" style="max-width: 100px; width: 100px;"></td><td contenteditable="true" style="max-width: 100px; width: 100px;"></td><td contenteditable="true" style="max-width: 100px; width: 100px;"></td><td contenteditable="true" style="max-width: 100px; width: 100px;"></td></tr><tr><td style="width: 10px;">5</td><td contenteditable="true" style="max-width: 100px; width: 100px;"></td><td contenteditable="true" style="max-width: 100px; width: 100px;">adsads</td><td contenteditable="true" style="max-width: 100px; width: 100px;">adsads</td><td contenteditable="true" style="max-width: 100px; width: 100px;">adsads</td><td contenteditable="true" style="max-width: 100px; width: 100px;">asdads</td><td contenteditable="true" style="max-width: 100px; width: 100px;"></td><td contenteditable="true" style="max-width: 100px; width: 100px;"></td></tr><tr><td style="width: 10px;">6</td><td contenteditable="true" style="max-width: 100px; width: 100px;">asdads</td><td contenteditable="true" style="max-width: 100px; width: 100px;"></td><td contenteditable="true" style="max-width: 100px; width: 100px;"></td><td contenteditable="true" style="max-width: 100px; width: 100px;"></td><td contenteditable="true" style="max-width: 100px; width: 100px;"></td><td contenteditable="true" style="max-width: 100px; width: 100px;"></td><td contenteditable="true" style="max-width: 100px; width: 100px;"></td></tr><tr><td style="width: 10px;">7</td><td contenteditable="true" style="max-width: 100px; width: 100px;"></td><td contenteditable="true" style="max-width: 100px; width: 100px;"></td><td contenteditable="true" style="max-width: 100px; width: 100px;"></td><td contenteditable="true" style="max-width: 100px; width: 100px;"></td><td contenteditable="true" style="max-width: 100px; width: 100px;"></td><td contenteditable="true" style="max-width: 100px; width: 100px;"></td><td contenteditable="true" style="max-width: 100px; width: 100px;"></td></tr><tr><td style="width: 10px;">8</td><td contenteditable="true" style="max-width: 100px; width: 100px;"></td><td contenteditable="true" style="max-width: 100px; width: 100px;"></td><td contenteditable="true" style="max-width: 100px; width: 100px;"></td><td contenteditable="true" style="max-width: 100px; width: 100px;"></td><td contenteditable="true" style="max-width: 100px; width: 100px;"></td><td contenteditable="true" style="max-width: 100px; width: 100px;"></td><td contenteditable="true" style="max-width: 100px; width: 100px;"></td></tr><tr><td style="width: 10px;">9</td><td contenteditable="true" style="max-width: 100px; width: 100px;"></td><td contenteditable="true" style="max-width: 100px; width: 100px;"></td><td contenteditable="true" style="max-width: 100px; width: 100px;"></td><td contenteditable="true" style="max-width: 100px; width: 100px;"></td><td contenteditable="true" style="max-width: 100px; width: 100px;"></td><td contenteditable="true" style="max-width: 100px; width: 100px;"></td><td contenteditable="true" style="max-width: 100px; width: 100px;"></td></tr><tr><td style="width: 10px;">10</td><td contenteditable="true" style="max-width: 100px; width: 100px;"></td><td contenteditable="true" style="max-width: 100px; width: 100px;"></td><td contenteditable="true" style="max-width: 100px; width: 100px;"></td><td contenteditable="true" style="max-width: 100px; width: 100px;"></td><td contenteditable="true" style="max-width: 100px; width: 100px;"></td><td contenteditable="true" style="max-width: 100px; width: 100px;"></td><td contenteditable="true" style="max-width: 100px; width: 100px;"></td></tr></tbody></table>'
    };
  },
  methods: {
    save() {
        this.rows=this.rows+1
      //var s = this.$refs["dataTable"];
     // console.log(s.$el);
     // debugger;
    }
  }
};
</script>

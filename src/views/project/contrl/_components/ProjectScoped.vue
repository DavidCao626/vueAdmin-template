<template>
    <div class="box">
        <div>
            <svg-icon icon-class="school" width="131px" height="131px" />
        </div>
        <div>
            <p class="scopedName">{{scopedName}}</p>
        </div>
        <div>
            <p>环节开始时间：{{scopedBginData}}</p>
            <p>环节结束时间：{{scopedEndData}}</p>
        </div>
    </div>
</template>
<script>
export default {
  props: {
    scopedName: {
      type: String,
      default: "内蒙古大学数学学院"
    },
    scopedBginData: {
      type: String,
      default: "2018-06-28"
    },
    scopedEndData: {
      type: String,
      default: "2018-07-30"
    }
  }
};
</script>

<style scoped>
.box {
  padding: 30px;
  border: 1px solid rgb(236, 236, 236);
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 280px;
  width: 250px;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 12px;
  font-weight: 500;
  color: #666;
}
.scopedName {
  font-size: 16px;
  margin: 8px;
  color: #444;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-weight: 500;
}
</style>

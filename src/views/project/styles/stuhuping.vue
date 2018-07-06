<template>
    <div>

        <page :breadcrumb="false">
            <div slot="title">班级互评</div>
            <huping></huping>
        </page>
    </div>
</template>

<script>
import huping from "./huping/index";
export default {
  components: {
    huping
  }
};
</script>

<style>
</style>

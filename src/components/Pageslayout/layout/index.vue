<template>
    <div class="elx-table-layout">
        
        <div style="background-color: #f5f5f5; padding: 10px 10px 0px;" v-if="$slots.headerLeft">
            <slot name="headerLeft"></slot>
        </div>
        <div style="margin-top: 10px;margin-bottom: 5px;" v-if="$slots.headerRight">
            <slot name="headerRight"></slot>
        </div>
        <div>
            <slot name="default"></slot>
        </div>
        <div style="margin-top: 10px;" v-if="$slots.footer">
            <slot name="footer"></slot>
        </div>
    </div>

</template>
<script>
export default {
  name: "ElxTableLayout"
};
</script>

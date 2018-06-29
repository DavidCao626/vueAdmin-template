<template>
     <div style="position:relative">
                <div class="project-type" style="position:absolute;top:-30px;right:-30px">
                    <svg width="118px" height="105px" viewBox="0 0 118 105" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">

                        <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                            <g id="Group-9">
                                <polygon id="Polygon" fill="#67B2FF" points="52.9101562 0.30859375 117.011719 55.7539063 117.011719 104.351562 0.796875 0.30859375"></polygon>
                                <text :id="typeName" transform="translate(73.802125, 41.518886) rotate(43.000000) translate(-73.802125, -41.518886) " font-family="PingFangSC-Regular, PingFang SC" font-size="20" font-weight="normal" fill="#FFFFFF">
                                    <tspan x="33.8021251" y="48.5188862">{{typeName}}</tspan>
                                </text>
                            </g>
                        </g>
                    </svg>
                </div>
            </div>
</template>

<script>
export default {
    props:['typeName']

}
</script>

<style>

</style>

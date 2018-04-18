<template>
    <div>
        <div style="margin:20px;">
            <router-link :to="{'name':'stuBaseInfo',params:{'stuBaseInfoCode':'65'}}">
                <el-button>测试学生基本信息</el-button>
            </router-link>
        </div>
        <div style="margin:20px;">
            <router-link :to="{'name':'stuPersonalInfo',params:{'stuPersonalInfoCode':'47'}}">
                <el-button>测试学生个人信息</el-button>
            </router-link>
        </div>
        <div style="margin:20px;">
            <router-link :to="{'name':'stuUniversityInfo',params:{'stuUniversityInfoCode':'54'}}">
                <el-button>测试学生在校信息</el-button>
            </router-link>
        </div>
        <div style="margin:20px;">
            <router-link :to="{'name':'staffBaseInfoCode',params:{'staffBaseInfoCode':'485'}}">
                <el-button>测试职工基本信息</el-button>
            </router-link>
        </div>
        <div style="margin:20px;">
            <router-link :to="{'name':'staffUniversityInfo',params:{'staffUniversityInfoCode':'473'}}">
                <el-button>测试职工在校信息</el-button>
            </router-link>
        </div>
    </div>
</template>

<script>
export default {}
</script>

<style>

</style>

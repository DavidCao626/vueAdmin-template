export const setTableDataToDo = (state, data) => {
    state.styles.config.listStyle.data = []
    state.styles.config.serviceTypeList = []
    data.serviceTypeList.forEach(item => {
        let temp = {
            'label': item.classifyName,
            'value': item.classifyCode
        }
        state.styles.config.serviceTypeList.push(temp)
    })
    data.baseData.forEach(item => {
        let temp = {
            id: 0,
            dataNo:item.dataNo,
            name: item.studentName,
            cid: item.stuNo,
            jtNumber: item.homePersonCount,
            jtQk: "单亲",
            jtisDb: "是",
            jtisjdlk: "是",
            jtsr: item.perCapitaIncome,
            jtzc: item.perCapitalExpenditure,
            sqType: item.serviceTypeName,
            shenqin: item.childServiceTypeName,
            banjipingshen: item.classRecommend,
            huping: item.eachOtherComment,
            zuping: item.groupComment
        }
        if (item.isSingleParent == "Y") {
            temp.jtQk = "单亲";
        } else if (item.isOrghan == "Y") {
            temp.jtQk = "孤儿";
        } else {
            temp.jtQK = "双亲";
        }
        if (item.isBasicAllowance == "Y") {
            temp.jtisDb = "是"
        } else {
            temp.jtisDb = "否"
        }
        if (item.isCreateFile == "Y") {
            temp.jtisjdlk = "是"
        } else {
            temp.jtisjdlk = "否"
        }
        state.styles.config.listStyle.data.push(temp)
    })
}

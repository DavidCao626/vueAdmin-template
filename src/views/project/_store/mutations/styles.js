export const setTableDataToDo = (state, data) => {
    state.style.data.tableDataTodo = []

    data.baseData.forEach(item => { 
        var temp = {
            id: 0,
            sqtime: item.applyTime,
            name: item.studentName,
            cid: item.stuNo,
            phone: "12345678",
            class: item.StuOrgName,
            jtNumber: item.homePersonCount,
            jtQk: "单亲",
            jtisDb: "是",
            jtisjdlk: "是",
            jtsr: item.perCapitaIncome,
            jtzc: item.perCapitalExpenditure,
            sqType: item.serviceTypeName,
            sqdengji: item.childServiceTypeName,
            sqLiyou:
                item.applyReason,
            sqFujian: [
                { name: "贫困照片.png", url: "http://baidu.com/1.jpg" },
                { name: "贫困照片2.png", url: "http://baidu.com/2.jpg" }
            ],
            classJieguo: "特殊困难",
            classTujianRen: "鄂王",
            classTujianRenZhiwu: "班主任",
            classPingYiCountNumber: "39",
            classPingYiOk: "23",
            classPingYiNo: "2",
            xueyuanJieguo: "特殊困难",
            xueyuanTujianRen: "鄂王",
            xueyuanTujianRenZhiwu: "内蒙古大学数学学院学工办公室主任",
            xueyuanPingYiCountNumber: "69",
            xueyuanPingYiOk: "63",
            xueyuanPingYiNo: "2",
            form: {
                type: [],
                desc: ""
            }
        }


    })





}

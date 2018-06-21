import request from '~/utils/request'
import ajax from '~/utils/ajax'



const insertOrUpdateProject = data =>
    new Promise(resolve => {
        ajax({
            url: '/project/insertOrUpdateProject.do',
            method: 'post',
            data: data
        }).then(response => {
            resolve(response)
        })
    })

export default {
    insertOrUpdateProject
};

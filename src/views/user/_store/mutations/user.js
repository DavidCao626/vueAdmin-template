export const setUserAuthData = (state, resBody) => {
    state.user_auth_data = {
        id:resBody.baseData.id,
        auth_user_name: resBody.baseData.user_login_name,
        manager_node_name: resBody.baseData.manager_node_name,
        duty_name: resBody.baseData.duty_name,
        user_object_name: resBody.baseData.user_object_name,
        auth_body: resBody.authBodyMap,
        itemBeanList: resBody.itemBeanList
    }
}

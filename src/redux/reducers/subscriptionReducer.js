import { GET_GLOBAL_SUBSCRIPTIONS, GET_USER_SUBSCRIPTIONS } from '../actions/subscriptionAction'

const defaultState = {
    globalSubs: {},
    userSubs: {}
}

const subscriptionReducer = (state = defaultState, action) => {
    switch (action.type) {
        case GET_GLOBAL_SUBSCRIPTIONS:
            const data = action.globalSubs.response?.status !== 404 ? action.globalSubs.data : {}
            return {
                ...state,
                globalSubs: data
            }
        case GET_USER_SUBSCRIPTIONS:
            const userData = action.userSubs.response?.status !== 404 ? action.userSubs.data : {}
            return {
                ...state,
                userSubs: userData
            }
        default:
            return state
    }
}

export default subscriptionReducer
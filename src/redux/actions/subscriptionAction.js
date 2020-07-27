import { APISubs, API } from '../../api/apiRequest'
import endpoint from '../../api/endpoints'
import { serviceEnabled } from '../slices/servicesSlice'


/**
 *    Constants
 */

export const GET_GLOBAL_SUBSCRIPTIONS = 'GET_GLOBAL_SUBSCRIPTIONS'
export const GET_USER_SUBSCRIPTIONS = 'GET_USER_SUBSCRIPTIONS'

/**
 *    Actions
 */

const getGlobalSubscriptions = payload => {
  return ({ type: GET_GLOBAL_SUBSCRIPTIONS, globalSubs: payload })
}

const getUserSubscriptions = payload => {
  return ({ type: GET_USER_SUBSCRIPTIONS, userSubs: payload })
}

export const globalSubscription = () => {
  return async dispatch => {
    try {
      const response = await APISubs.get(`${endpoint.subs}`)
      dispatch(getGlobalSubscriptions(response))
    } catch (err) {
      dispatch(getGlobalSubscriptions(err))
    }
  }
}

export const userSubscriptions = () => {
  return async (dispatch, getState) => {
    try {
      const response = await API.get(`https://${getState().auth.userId}.dev.env.yodata.io/${endpoint.subs}`)
      dispatch(getUserSubscriptions(response))
      const subsIdentifiers = getState().subs.userSubs.items.map(value => {
        return `${value.agent.split("/")[2].split(".")[0]}_id`
      })
      subsIdentifiers.forEach(element => {
        dispatch(serviceEnabled(element))
      })
    } catch (err) {
      dispatch(getUserSubscriptions(err))
    }
  }
}
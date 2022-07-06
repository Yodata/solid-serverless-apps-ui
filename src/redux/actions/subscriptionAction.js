import { API, APIGlobalSubs } from '../../api/apiRequest'
import endpoint from '../../api/endpoints'
import { serviceEnabled } from '../slices/servicesSlice'
import { getAllApps } from '../../redux/actions/applicationActions';
import { getParentOrgandRole } from '../../redux/actions/authenticationActions';
import { toastSuccess } from '../slices/toastSlice'


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
      const response = await APIGlobalSubs.get(`${endpoint.subs}`)
      dispatch(getGlobalSubscriptions(response))
    } catch (err) {
      dispatch(getGlobalSubscriptions(err))
    }
  }
}

export const userSubscriptions = id => {
  return async (dispatch, getState) => {
    try {
      const response = await API.get(`https://${id || getState().auth.userData.contact_id}${getState().auth.userData.userDomain}/${endpoint.subs}`)
      dispatch(getUserSubscriptions(response))
      dispatch(serviceEnabled(false))
      const subsIdentifiers = getState().subs.userSubs.items.map(value => {
        return value.agent
      })
      subsIdentifiers.forEach(element => {
        dispatch(serviceEnabled({id: element.toLowerCase(), connect: true}))
      })
      dispatch(toastSuccess(true))
    } catch (err) {
      dispatch(getUserSubscriptions(err))
      dispatch(serviceEnabled(false))
      dispatch(toastSuccess(false))
    } finally {
      dispatch(getAllApps())
      dispatch(getParentOrgandRole())
    }
  }
}
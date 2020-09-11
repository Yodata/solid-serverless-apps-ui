import { API } from './apiRequest'
import endpoints from './endpoints'

const publishEvent = async payload => {
    try {
        await API.post(`https://forevercloudstore.${process.env.REACT_APP_HOSTNAME}/${endpoints.publish}`, payload)
    } catch (err) {
        console.log(err)
    }
}

export default publishEvent
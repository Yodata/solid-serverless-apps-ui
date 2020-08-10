import { APIBase } from './apiRequest'
import endpoints from './endpoints'

const publishEvent = async payload => {
    try {
        await APIBase.post(endpoints.publish, payload)
    } catch (err) {
        console.log(err)
    }
}

export default publishEvent
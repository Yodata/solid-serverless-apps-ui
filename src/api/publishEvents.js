import { APIEvents } from './apiRequest'
import endpoints from './endpoints'

const publishEvent = async payload => {
    try {
        await APIEvents.post(endpoints.publish, payload)
    } catch (err) {
        throw err
    }
}

export default publishEvent
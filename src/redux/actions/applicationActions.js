/**
*   Constants
*/

export const GET_APPS = 'START_CALL';

/**
 *   Actions
 */

const getApps = payload => {
     return ({ type: GET_APPS, application: payload})
 }

 export const getAllApps = () => {
     return async dispatch => {
         try{
            const response = await fetch('https://my-json-server.typicode.com/siddharth-upamanyu/fake-json-server/db');
            const data = await response.json();
            dispatch(getApps(data));
         } catch (err) {
             throw err;
         }
     }
 }
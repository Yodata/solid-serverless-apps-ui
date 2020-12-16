import axios from 'axios';

const API = axios.create({
    responseType: 'json',
    headers: {
        "x-api-key": process.env.REACT_APP_HOSTKEY,
        "Content-Type": "application/json"
    }
});

const APIBase = axios.create({
    baseURL: `https://${process.env.REACT_APP_HOSTNAME}/`,
    responseType: 'json',
    withCredentials: true,
    headers: {
        'x-api-key': process.env.REACT_APP_HOSTKEY,
        'Content-Type': 'application/json'
    }
});

// const APIFormData = axios.create({
//     baseURL: `https://${process.env.REACT_APP_HOSTNAME}/`,
//     responseType: 'json',
//     withCredentials: true,
//     headers: {
//         'x-api-key': process.env.REACT_APP_HOSTKEY,
//         'Content-Type': 'multipart/form-data'
//     }
// })

const APIGlobalSubs = axios.create({
    baseURL: `https://${process.env.REACT_APP_GLOBALSUBS}/`,
    responseType: 'json',
    withCredentials: true,
    headers: {
        'x-api-key': process.env.REACT_APP_GLOBALSUBSKEY,
        'Content-Type': 'application/json'
    }
});

// export { API, APIBase, APIGlobalSubs, APIFormData };
export { API, APIBase, APIGlobalSubs };


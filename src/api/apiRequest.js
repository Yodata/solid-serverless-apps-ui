import axios from 'axios';

// const API = axios.create({
//     baseURL: 'https://sandbox.dev.yodata.io/',
//     responseType: 'json',
//     headers: {
//         "x-api-key": 'yvqUgOn4IZotIF8B0FXFyolCpPlvLTni3mZ67Yk6TX',
//         "Content-Type": "application/ld+json"
//     }
// });

const API = axios.create({
    baseURL: 'https://sandbox.dev.env.yodata.io/',
    responseType: 'json',
    headers: {
        "x-api-key": 'yvqUgOn4IZotIF8B0FXFyolCpPlvLTni3mZ67Yk6TX',
        "Content-Type": "application/ld+json"
    }
});

const APIAuth = axios.create({
    baseURL: 'https://dev.env.yodata.io/',
    responseType: 'json',
    headers: {
        "x-api-key": 'yvqUgOn4IZotIF8B0FXFyolCpPlvLTni3mZ67Yk6TX'
    }
});

export { API, APIAuth };


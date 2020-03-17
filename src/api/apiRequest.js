import axios from 'axios';

// const API = axios.create({
//     baseURL: 'https://my-json-server.typicode.com/siddharth-upamanyu/fake-json-server',
//     responseType: 'json',
//     headers: {
        
//     }
// });

const API = axios.create({
    baseURL: 'https://sandbox.dev.yodata.io',
    responseType: 'json',
    headers: {
        "x-api-key": 'yvqUgOn4IZotIF8B0FXFyolCpPlvLTni3mZ67Yk6TX',
        "Content-Type": "application/ld+json"
    }
});

export default API;


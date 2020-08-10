import axios from 'axios';

const API = axios.create({
    responseType: 'json',
    headers: {
        "x-api-key": 'yvqUgOn4IZotIF8B0FXFyolCpPlvLTni3mZ67Yk6TX',
        "Content-Type": "application/ld+json"
    }
});

const APIAuth = axios.create({
    baseURL: 'https://dev.env.yodata.io/',
    responseType: 'json',
    withCredentials: true,
    headers: {
        "x-api-key": 'yvqUgOn4IZotIF8B0FXFyolCpPlvLTni3mZ67Yk6TX'
    }
});

const APISubs = axios.create({
    baseURL: 'https://global.dev.env.yodata.io/',
    responseType: 'json',
    headers: {
        'x-api-key': 'yvqUgOn4IZotIF8B0FXFyolCpPlvLTni3mZ67Yk6TX'
    }
})

const APIEvents = axios.create({
    baseURL: 'https://dev.env.yodata.io/',
    responseType: 'json',
    headers: {
        'x-api-key': 'yvqUgOn4IZotIF8B0FXFyolCpPlvLTni3mZ67Yk6TX',
        'Content-Type': 'application/ld+json'
    }
})

export { API, APIAuth, APISubs, APIEvents };


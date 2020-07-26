import axios from 'axios';

const API = axios.create({
    responseType: 'json',
    headers: {
        "x-api-key": 'qR4tAA93d3DnPCbLL59NaPxOgN9xk2n5rlcdjiWMwI',
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
    baseURL: 'https://bhhs.hsfaffiliates.com/',
    responseType: 'json',
    headers: {
        'x-api-key': 'zmzJyTwgRJ7wCKg9S5Qzxp86xzXacJ6CkbxnAbCLGV'
    }
})

export { API, APIAuth, APISubs };


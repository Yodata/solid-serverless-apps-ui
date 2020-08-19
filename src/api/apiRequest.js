import axios from 'axios';

const API = axios.create({
    responseType: 'json',
    headers: {
        "x-api-key": process.env.REACT_APP_HOSTKEY,
        "Content-Type": "application/ld+json"
    }
});

const APIBase = axios.create({
    baseURL: `https://${process.env.REACT_APP_HOSTNAME}/`,
    responseType: 'json',
    withCredentials: true,
    headers: {
        'x-api-key': process.env.REACT_APP_HOSTKEY,
        'Content-Type': 'application/ld+json'
    }
});

const APIGlobalSubs = axios.create({
    baseURL: `https://${process.env.REACT_APP_GLOBALSUBS}/`,
    responseType: 'json',
    withCredentials: true,
    headers: {
        'x-api-key': process.env.REACT_APP_GLOBALSUBSKEY,
        'Content-Type': 'application/ld+json'
    }
});

export { API, APIBase, APIGlobalSubs };


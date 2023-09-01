import axios from 'axios';

const BASE_URL = "https://www.googleapis.com/webmasters/v3/sites";
const SERVER_BASE_URL= "http://localhost:8000/api";

//user registration

export function registerUser(data){
    return axios .post(`${SERVER_BASE_URL}/register`, data, {

        headers: {
            "Content-Type": "application/json"
        }
    });
}

//user login

export function loginUser(data){
    return axios.post(`${SERVER_BASE_URL}/login`, data, {

        headers: {
            "Content-Type": "application/json"
        }
    });
}

//verify token

export function verifyToken(){
    return axios.get(`${SERVER_BASE_URL}/verify`,{

        headers: {
            "Authorization" : sessionStorage.getItem('jwt-token')
        }
    })
}


//webscrapping

export function scrapWebPage(data){
    return axios.post(`${SERVER_BASE_URL}/scrapit`, data, {
        headers: {
            "Authorization" : sessionStorage.getItem('jwt-token')
        }
    })
}

export function getDataByPage(data,site){

    console.log(data);

    return axios.post(`${BASE_URL}/${site}/searchAnalytics/query`, data, {

        headers: {
            "Authorization": sessionStorage.getItem('token'),

            "Accept": "application/json",   

            "Content-Type": "application/json"
        }

    })
}

export function getAllPages(data,site){
    //const site = "https%3A%2F%2Fwww.enggstudy.com"
    return axios.post(`${BASE_URL}/${site}/searchAnalytics/query`,data, {
        
    headers: {
        "Authorization": sessionStorage.getItem('token'),

        "Accept": "application/json",   

        "Content-Type": "application/json"
    }

    });
}

//get site list

export function getListofSites(){
    return axios.get(`${BASE_URL}`, {

        headers : {

            "Authorization": sessionStorage.getItem('token'),

            "Accept": "application/json",   

            "Content-Type": "application/json"
        }
    })
}
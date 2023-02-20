import axios from 'axios';
// import React, { useState, useEffect, useRef, useContext } from "react";
import { baseURL } from "@/services/endpoint";
import Cookies from 'js-cookie'
// import Router from 'next/router'
export const loadToken = (token) => {
    let tokens
    tokens = token
    return token
}
axios.defaults.baseURL = baseURL;
axios.interceptors.request.use(
    function (config) {
        const token = Cookies.get('token');
        if (token) {
            config.headers["Authorization"] = 'Bearer ' + token;
        }
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);
export default axios;
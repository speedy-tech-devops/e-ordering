import axios from "axios";
import { baseURL } from "@/services/endpoint"
// import Cookies from 'js-cookie'
export const getScanqr = async (qrText) => {
    // const token = Cookies.get('token')
    try {
      var data = {
        'qr_code': qrText
      };
      var config = {
        method: 'post',
        url: baseURL + "/v1/auth/scan",
        data: data
      };
  
      const response = await axios(config)
    .then(function (response) {
        return response.data
    }).catch((error) => {
        return error.response.data
    })
      return response;
    } catch(error) {
        console.log(error)
    }
}
export const getMe = async (token) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);
  
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
  
    let data = await fetch(baseURL + "/v1.0/auth/merchant/me", requestOptions)
      .then(response => response.text())
      .then(async result => {
        return JSON.parse(result)
  
      })
      .catch(error => {
        console.log(error)
        return error
      });
    return data
}
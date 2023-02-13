import axios from '@/services/axios';
import { baseURL } from '@/services/endpoint';
import Cookies from 'js-cookie'

export const getProducts = async () => {
    const token = axios.defaults.headers.Authorization;
    try {
      var config = {
        method: 'get',
        url: baseURL + '/v1/master/product/group?page=1&limit=10',
        headers: {
          Authorization: axios.defaults.headers.Authorization,
        },
      };
      let data = await axios(config)
        .then(function (response) {
          return response.data;
        })
        .catch(function (error) {
          return error.response.data;
        });
      return data;
    } catch { }
};
export const getHistory = async (id) => {
  const token = axios.defaults.headers.Authorization;
  try {
    var config = {
      method: 'get',
      url: baseURL + '/v1/transaction/history/',
      headers: {
        Authorization: axios.defaults.headers.Authorization,
      },
    };
    let data = await axios(config)
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        return error.response.data;
      });
    return data;
  } catch { }
};
export const getHistoryByID = async (id) => {
  const token = axios.defaults.headers.Authorization;
  try {
    var config = {
      method: 'get',
      url: baseURL + '/v1/transaction/history/'+id,
      headers: {
        Authorization: axios.defaults.headers.Authorization,
      },
    };
    let data = await axios(config)
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        return error.response.data;
      });
    return data;
  } catch { }
};
export const addTransactions = async (item) => {
  const token = axios.defaults.headers.Authorization;
  try {
    var config = {
      method: 'post',
      url: baseURL + '/v1/transaction/order',
      headers: {
        Authorization: axios.defaults.headers.Authorization,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      data: item
    };
    let data = await axios(config)
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        return error.response.data;
      });
    return data;
  } catch { }
};

export const getCategory = async () => {
    const token = axios.defaults.headers.Authorization;
    try {
      var config = {
        method: 'get',
        url: baseURL + '/v1/master/category?page=1&limit=10',
        headers: {
          Authorization: axios.defaults.headers.Authorization,
        },
      };
      let data = await axios(config)
        .then(function (response) {
          return response.data;
        })
        .catch(function (error) {
          return error.response.data;
        });
      return data;
    } catch { }
};

export const getCategoryByID = async (id) => {
    const token = axios.defaults.headers.Authorization;
    try {
      var config = {
        method: 'get',
        url: baseURL + '/v1/master/product/category/'+id+'?page=1&limit=10',
        headers: {
          Authorization: axios.defaults.headers.Authorization,
        },
      };
      let data = await axios(config)
        .then(function (response) {
          return response.data;
        })
        .catch(function (error) {
          return error.response.data;
        });
      return data;
    } catch { }
};
export const getProductsByID = async () => {
    const token = axios.defaults.headers.Authorization;
    try {
      var config = {
        method: 'get',
        url: baseURL + '/v1/master/category?page=1&limit=10',
        headers: {
          Authorization: axios.defaults.headers.Authorization,
        },
      };
      let data = await axios(config)
        .then(function (response) {
          return response.data;
        })
        .catch(function (error) {
          return error.response.data;
        });
      return data;
    } catch { }
};
import React, { createContext, useState, useContext, useEffect } from 'react'
import Cookies from 'js-cookie'
import { getMe, getScanqr } from '@/services/auth'
import { getProducts } from "@/services/getServices"
import Router, { useRouter } from 'next/router';
// import { connect } from 'react-redux';
// import {io} from 'socket.io-client';
const AuthContext = createContext({});
export const AuthProvider = ({ children }) => {
    const router = useRouter()
    // const [lastPong, setLastPong] = useState(null);
    const [user, setUser] = useState(null)
    const [products, setProducts] = useState([])
    const [slideIndex, setSlideIndex] = useState(0)
    const [updateCount, setUpdateCount] = useState(0)
    const [showConfirm, setShowConfirm] = useState(false)
    const [transitions, setTransitions] = useState({
        customer: {
            name: "",
            tel: "",
            line_uid: "",
            note: "",
            expected_date: "",
            priceTotal: 0,
            total: ""
        },
        products: []
    })
    // console.log("socket",socket.connected,socket)
    const [idCate, setIdCate] = useState(null)
    const [emp, setEmp] = useState(null)
    const [heightCateory, setHeightCateory] = useState(0)
    const [dataSearch, setDataSearch] = useState([])
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        async function loadUserFromCookies() {
            // const token = Cookies.get('token')
            const table = Cookies.get('table')
            setTransitions({
                customer: {
                    name: "",
                    tel: "",
                    line_uid: "",
                    note: "",
                    expected_date: "",
                    priceTotal: 0,
                    total: ""
                },
                products: []
            })
            if (router.query?.slug || !table) {
                // console.log(router.query.code)
                const data = await getScanqr(router.query.slug)
                if (data?.data) {
                    Cookies.set('token', data.data.token, { expires: 1 })
                    let product = await getProducts().then((res) => {
                        return res
                    })
                    setProducts(product.data)
                    setUser(data.data)
                    setTransitions({
                        customer: {
                            name: "",
                            tel: "",
                            line_uid: "",
                            note: "",
                            expected_date: "",
                            priceTotal: 0,
                            total: ""
                        },
                        products: []
                    })
                    // setIdCate(product.data)
                    Cookies.set('table', JSON.stringify(data.data), { expires: 1 })
                    Router.push('/')
                } else {
                    setUser(data);
                }

                // console.log("Got a token in the cookies, let's see if it is valid")
                // const data = await getMe(token)
                // if (data) setUser(data);
            } else {
                let product = await getProducts().then((res) => {
                    return res
                })
                // console.log(JSON.parse(account))
                setProducts(product.data)
                setIdCate(product.data)
                setTransitions({
                    customer: {
                        name: "",
                        tel: "",
                        line_uid: "",
                        note: "",
                        expected_date: "",
                        priceTotal: 0,
                        total: ""
                    },
                    products: []
                })
                setUser(JSON.parse(table))
                // router.push("error")
            }
            setLoading(false)
        }
        loadUserFromCookies()
    }, [])

    const scrolLWithUseRef = (e, i) => {
        setHeightCateory(e)
        setUpdateCount(e)
        i.defaultPrevented
        // divFive.current?.scrollIntoView({ block: "center", behavior: "smooth" });
    };
    const login = async (code) => {
        const { data: token } = await getScanqr(code)
        if (token) {
            // console.log("Got token")
            Cookies.set('token', token.token, { expires: 1 })
            // api.defaults.headers.Authorization = `Bearer ${token.token}`
            // const { data: user } = await getMe(token.token)
            // setUser(user)
            //     ("Got user", user)
        }
    }

    const logout = (email, password) => {
        Cookies.remove('token')
        setUser(null)
        delete api.defaults.headers.Authorization
        // window.location.pathname = '/login'
    }

    const addToOrder = (order, qty, options, note, totalPrice, options_detail) => {
        // console.log('transitions',order._id,qty,options,note)
        const sum = transitions.products.reduce((accumulator, object) => {
            return accumulator + object.qty;
        }, 0);
        const sumTotal = options_detail.reduce((accumulator, object) => {
            return accumulator + object.price;
        }, 0)
        setTransitions((prev) => ({
            customer: {
                name: "",
                tel: "",
                line_uid: "",
                note: "",
                expected_date: "",
                priceTotal: parseInt(prev.customer.priceTotal) + parseInt(totalPrice),
                total: sum + qty
            },
            products: [
                ...prev.products, {
                    product_id: order._id,
                    qty: qty,
                    note: note,
                    sumTotal: sumTotal,
                    options: options,
                    options_detail: options_detail,
                    order: order
                }
            ]
        }))


    }
    const editToOrder = (index, qty, plusmin, order) => {
        // console.log('transitions',order._id,qty,options,note)
        const sum = transitions.products.reduce((accumulator, object) => {
            return accumulator + object.qty;
        }, 0);
        const sumTotal = transitions.products[index].options_detail.reduce((accumulator, object) => {
            return accumulator + object.price;
        }, 0)
        transitions.products[index] = {
            ...transitions.products[index],
            sumTotal: sumTotal,
            qty: qty
        }
        setTransitions((prev) => ({
            customer: {
                ...prev.customer,
                priceTotal: parseInt(prev.customer.priceTotal) + ((parseInt(order.sale_price != 0 ? order.sale_price : order.price) + sumTotal) * plusmin),
                total: sum + (plusmin)
            },
            products: transitions.products
        }))
    }
    const remove = (index, qty, plusmin, order) => {
        // console.log('transitions',order._id,qty,options,note)
        const sum = transitions.products.reduce((accumulator, object) => {
            return accumulator + object.qty;
        }, 0);
        const sumTotal = transitions.products.reduce((accumulator, object) => {
            return accumulator + object.qty;
        }, 0);
        transitions.products[index] = {
            ...transitions.products[index],
            qty: qty
        }
        setTransitions((prev) => ({
            customer: {
                ...prev.customer,
                priceTotal: parseInt(prev.customer.priceTotal) + (parseInt(order.sale_price != 0 ? order.sale_price : order.price) * plusmin),
                total: sum + (plusmin)
            },
            products: transitions.products
        }))
    }
    return (
        <AuthContext.Provider value={{ isAuthenticated: !!user, user, login, loading, setLoading, logout, products, setProducts, idCate, setIdCate, scrolLWithUseRef, setHeightCateory, heightCateory, transitions, setTransitions, slideIndex, setSlideIndex, updateCount, setUpdateCount, addToOrder, editToOrder, dataSearch, setDataSearch, emp, setEmp, showConfirm, setShowConfirm }}>
            {children}
        </AuthContext.Provider>
    )
}

export const login = async (email, password) => {
    const { data: token } = await getAuth(email, password)
    if (token) {
        // console.log("Got token")
        Cookies.set('token', token.token, { expires: 60 })
        // api.defaults.headers.Authorization = `Bearer ${token.token}`
        const { data: user } = await getMe(token.token)
        setUser(user)
        // console.log("Got user", user)
    }
}

export const useAuth = () => useContext(AuthContext)
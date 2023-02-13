import React,{ useEffect, useState } from "react";
import Pages from '@/layouts/pageMain'
import Router, { useRouter } from 'next/router'
import Image from 'next/legacy/image';
import en from '@/locales/en'
import th from '@/locales/th'
const Home = (props) => {
    const router = useRouter()
    const { locale } = router
    const t = locale === "en" ? en : th
    const Spinner = () => {
        const content = <div className="loading-pages">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0"
                y="0"
                version="1.1"
                viewBox="0 0 100 100"
                xmlSpace="preserve"
                >
                <circle
                    cx="50"
                    cy="50"
                    r="48"
                    fill="none"
                    stroke="#e1e1e1"
                    strokeMiterlimit="10"
                    strokeWidth="4"
                ></circle>
                <path
                    fill="none"
                    stroke="#e1e1e1"
                    strokeLinecap="round"
                    strokeMiterlimit="10"
                    strokeWidth="4"
                    d="M50 50L85 50.5"
                >
                    <animateTransform
                    attributeName="transform"
                    dur="2s"
                    from="0 50 50"
                    repeatCount="indefinite"
                    to="360 50 50"
                    type="rotate"
                    ></animateTransform>
                </path>
                <path
                    fill="none"
                    stroke="#e1e1e1"
                    strokeLinecap="round"
                    strokeMiterlimit="10"
                    strokeWidth="4"
                    d="M50 50L49.5 74"
                >
                    <animateTransform
                    attributeName="transform"
                    dur="15s"
                    from="0 50 50"
                    repeatCount="indefinite"
                    to="360 50 50"
                    type="rotate"
                    ></animateTransform>
                </path>
                </svg>
        </div>;
        return content
    }
    useEffect(()=>{
    },[])
    return (
        <div>
            {/* {Spinner()} */}
        </div>
    )
}
export default Home
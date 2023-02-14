import React, { useState, useEffect } from "react"

import dynamic from 'next/dynamic'
import Header from '../components/header'
import { NextSeo } from "next-seo";
import { motion } from "framer-motion";
import Router ,{useRouter}from 'next/router'
import en from '@/locales/en'
import th from '@/locales/th'
import { useAuth } from '@/context/useAuth';
const Pagemini = (props) =>{
    const router = useRouter()
    const { locale } = router
    const t = locale === "en" ? en : th
    const[state,setState] = useState({
        loading : false
    })
    let dataContext = useAuth()
    const Spinner = () => {
        const content = <div className="loading-pages">
            {/* <svg
            width="80"
            height="80"
            viewBox="0 0 100 100"
            preserveAspectRatio="xMidYMid"
            >
            <circle
                cx="50"
                cy="50"
                fill="none"
                stroke="#000"
                strokeWidth="10"
                r="35"
                strokeDasharray="164.93361431346415 56.97787143782138"
                transform="rotate(275.845 50 50)"
            >
                <animateTransform
                attributeName="transform"
                type="rotate"
                calcMode="linear"
                values="0 50 50;360 50 50"
                keyTimes="0;1"
                dur="1s"
                begin="0s"
                repeatCount="indefinite"
                />
            </circle>
            </svg> */}
        </div>;
        return content
    }
    useEffect(() => {
        const routeChange = () => {
            // Temporary fix to avoid flash of unstyled content
            // during route transitions. Keep an eye on this
            // issue and remove this code when resolved:
            // https://github.com/vercel/next.js/issues/17464
      
            const tempFix = () => {
              const allStyleElems = document.querySelectorAll('style[media="x"]');
              allStyleElems.forEach((elem) => {
                elem.removeAttribute("media");
              });
            };
            tempFix();
        };
      
        Router.events.on('routeChangeStart', () => {
            routeChange()
            setState({ isLoading: true });
            var body = document.body;
            body.classList.add("lockPage");
            
          });
          Router.events.on('routeChangeComplete', () => {
            routeChange()
            setState({ isLoading: false });
           
            var body = document.body;
            body.classList.remove("lockPage");
          });
      
          Router.events.on('routeChangeError', () => {
            setState({ isLoading: false });
          });
    },[]);
    return (
        <>
            <NextSeo
                title={props.title}
                description={''}
                canonical={props.url}
                openGraph={{
                    url: props.url,
                    title: props.title,
                    description: props.description,
                    images: [{ url: props.images }],
                    site_name: "Jeerawut",
                }}
            />
            
            {state.isLoading || dataContext.loading ? Spinner() : ''}
            <div className='group_back mini'>

                {props.isDetail == undefined && <i className="fal fa-arrow-left" onClick={()=> {!props.onBack && props.onBack == undefined ? router.push("/") : router.push("/")}}></i>}
                <div className="titlePagename">{props.title}</div>
            </div>
            <motion.div className={(state.isLoading || dataContext.loading ? 'loadingBlur height-100 pagemini' : 'pagemini')} initial="initial" animate="animate" exit={{ opacity: 0 }}>
                {props.children}
            </motion.div>
        </>
    )
}
export default Pagemini

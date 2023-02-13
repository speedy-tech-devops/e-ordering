import 'bootstrap/dist/css/bootstrap.css'
import '@/styles/globals.scss'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import App from 'next/app'
import { AnimatePresence } from "framer-motion"
import { AuthProvider } from '@/context/useAuth';
import ErrorBoundary from '@/components/ErrorBoundary'

const MyApp = ({ Component, pageProps, router, user }) => {
  useEffect(() => {
      if (typeof window !== 'undefined') {
              const loader = document.getElementById('globalLoader');
          if (loader){
            var body = document.body;
            body.classList.remove("lockPage");
            setTimeout(() => {
              loader.classList.remove("face")
              loader.style.zIndex = '-1';
            }, 1000);
            
            // loader.style.display = 'none';
          }
              
      }
  }, []);
  return ( 
    
      <AuthProvider>
        <AnimatePresence exitBeforeEnter mode='wait'>
        <ErrorBoundary>
          <Component {...pageProps} key={router.route} route={router}  />
          </ErrorBoundary>
        </AnimatePresence>
      </AuthProvider>
   
  )
}
MyApp.getInitialProps = async (appContext) => {
  const appProps = await App.getInitialProps(appContext);
  const { ctx } = appContext;
  // axios.defaults.headers.Authorization = `Bearer ${cookies(ctx).token}`;
//   axios.interceptors.request.use(
//     function(config) {
//     const token = cookies(ctx).token; 
//     if (token) {
//         config.headers["Authorization"] = 'Bearer ' + token;
//     }
//     return config;
//     },
//     function(error) {
//     return Promise.reject(error);
//     }
// );
  let referringURL;
        let requestingURL;
  if (appContext.isServer) {
      referringURL = appContext.req.headers.referer;
      requestingURL = appContext.req.reqPath;
  } 
  return { ...appProps,referringURL,requestingURL }
}
export default MyApp


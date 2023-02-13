import React,{ useEffect, useState } from "react";
import Pagemini from '@/layouts/pageMini'
import Router, { useRouter } from 'next/router'
import Image from 'next/image';
import en from '@/locales/en'
import th from '@/locales/th'
import DealItemEdit from "@/components/dealItemedit";
import style from "@/styles/CheckoutWait.module.scss"
import { Modal } from 'react-bootstrap';
import { useAuth } from '@/context/useAuth'
import { addTransactions ,getProducts } from "@/services/getServices";
import { motion, AnimatePresence } from "framer-motion"
import Swal from 'sweetalert2'
const WaitOrder = (props) => {
    const router = useRouter()
    const { locale } = router
    const t = locale === "en" ? en : th
    const dataContext = useAuth()
    const [dataItems, setDataItems] = useState(dataContext.transitions)
    
    const [showConfirm,setShowConfirm] = useState(false)
    const [showReject,setShowReject] = useState(false)
    const [showAddtoCart,setShowAddtoCart] = useState(false)
    return (
        <>
            <motion.div
                initial={{ y: 100 }}
                animate={{ y: 0 }}
                exit={{ y: 100 }}
                className={style.DetailProduct}
            >
            <div className="container_deal">
                <div className="group_no_item">
                    <div style={{textAlign : " center", fontSize : "24px" , lineHeight : "1.2"}}>
                        <img src="/images/wait.png"></img><br/><br/>
                        กรุณารอสักครู่ <div class="snippet" data-title="dot-collision">
                    <div className="stage">
                        <div className="dot-collision"></div>
                    </div>
                    </div><br/>
                        <span style={{display : "block",color : "#777",fontSize : "22px"}}>พนักงานกำลังดำเนินการเช็ดบิลของคุณ</span>
                    </div>
                    
                </div>
            </div>
            </motion.div>
        </>
    )
}
export default WaitOrder
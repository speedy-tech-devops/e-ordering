import React, { useState, useEffect } from 'react'
import style from '@/styles/detailProduct.module.scss'
import Image from 'next/legacy/image'
import Accordion from 'react-bootstrap/Accordion';
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from 'next/router'
import { useAuth } from '@/context/useAuth';
import en from '@/locales/en'
import th from '@/locales/th'
import { Modal } from 'react-bootstrap';
import Swal from 'sweetalert2'
const Noti = (props) => {
    const { dataItem } = props
    const router = useRouter()
    const { locale } = router
    const t = locale === "en" ? en : th
    const { addToOrder,setTransitions,setEmp,showConfirm,setShowConfirm } = useAuth()
    
    return (
        <>
            <div className={style.overlay} onClick={(e) => setEmp(false)} ></div>
            <motion.div
                initial={{ y: 470 }}
                animate={{ y: 270 }}
                exit={{ y: "40%" }}
                className={style.DetailProduct}
            >
                <div className={style.title}>
                    <h1>เรียกพนักงาน</h1>
                    <div className={style.btnClose + ' icon_close'} onClick={(e) => setEmp(false)} />
                </div>
                <div className={style.scrollDtail}>

                    <div className='AccordionCustom'>
                       <div className='optionItem '>
                            <div className="form-check" style={{borderBottom : "1px solid #dee2e6"}} onClick={()=> {
                                setEmp(false)
                                setShowConfirm(true)
                                }}>
                                {/* <input className={"form-check-input"+" check_"} type="checkbox"  /> */}
                                <label className="form-check-label" style={{padding: "15px 0" }} htmlFor={"check_"}>
                                    <span>เช็ดบิล</span>
                                </label>
                            </div>
                            <div className="form-check" style={{ borderBottom : "1px solid #dee2e6"}} onClick={()=> {
                                setEmp(false)
                                setShowConfirm(true)
                                }}>
                                {/* <input className={"form-check-input"+" check_"} type="checkbox"  /> */}
                                <label className="form-check-label" style={{padding: "15px 0" }} htmlFor={"check_"}>
                                    <span>เติมน้ำซุป</span>
                                </label>
                            </div>
                            <div className="form-check" style={{ borderBottom : "1px solid #dee2e6"}} onClick={()=> {
                                setEmp(false)
                                setShowConfirm(true)
                                }}>
                                {/* <input className={"form-check-input"+" check_"} type="checkbox"  /> */}
                                <label className="form-check-label" style={{padding: "15px 0"}} htmlFor={"check_"}>
                                    <span>ขอเครื่องปรุง</span>
                                </label>
                            </div>
                            <div className="form-check" style={{borderBottom : "1px solid #dee2e6"}} onClick={()=> {
                                setEmp(false)
                                setShowConfirm(true)
                                }}>
                                {/* <input className={"form-check-input"+" check_"} type="checkbox"  /> */}
                                <label className="form-check-label" style={{padding: "15px 0" }} htmlFor={"check_"}>
                                    <span>เติมเครื่องดื่ม</span>
                                </label>
                            </div>
                            {/* <div className="form-check" style={{padding: "15px 0" , borderBottom : "1px solid #dee2e6"}}>
                                <label className="form-check-label" style={{padding: "15px 0" , borderBottom : "1px solid #dee2e6"}} htmlFor={"check_"}>
                                    <span>อื่นๆ</span>
                                </label>
                            </div> */}
                        </div>
 
                    </div>
                   
                    {/* <div className={style.note}>
                        <div className="form-group">
                            <textarea className="form-control" id="note" rows={3} placeholder={t.additional} defaultValue={""} onChange={(e) => {onChangeNoteOrder(e)}} />
                        </div>
                    </div>
                    <div className={[style.countNumber , style.countNumberCo].join(' ')}>
                        <button className={style.btnCountCo} onClick={() => ""}>ยกเลิก</button>
                        <button className={style.btnCountCo} style={{ background : "#16284B" ,color: "#fff"}} onClick={() => setEmp(false)}>ยืนยัน</button>
                    </div> */}
                </div>
            </motion.div>
        </>

    )
}
export default Noti
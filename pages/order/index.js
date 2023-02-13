import React,{ useEffect, useState } from "react";
import Pagemini from '@/layouts/pageMini'
import Router, { useRouter } from 'next/router'
import Image from 'next/image';
import en from '@/locales/en'
import th from '@/locales/th'
import DealItemOrder from "@/components/dealItemorder";
import style from "@/styles/DealItemOrder.module.scss"
import { Modal } from 'react-bootstrap';
import { getHistory } from "@/services/getServices";
import { motion, AnimatePresence } from "framer-motion"
import { useAuth } from '@/context/useAuth'
import moment from 'moment';
import WaitOrder from "@/components/waitorder";
const Order = (props) => {
    const router = useRouter()
    const { locale } = router
    const t = locale === "en" ? en : th
    const [showConfirm,setShowConfirm] = useState(false)
    const [history,setHistory] = useState([])
    const dataContext = useAuth()
    const [total,setTotal] = useState(0)
    const [isDetail, setDetail] = useState(false)
    const loadHistory = async () => {
        let historys = await getHistory()
        const sumTotal = 0
        setTotal(sumTotal)
        setHistory(historys.data)
    }
    useEffect(()=>{
        loadHistory()
    },[])
    const onClickAddOrder = async () =>{
        // router.push('/checkout')
        setShowConfirm(true)
    }
    return (
        <Pagemini  title={'รายการที่สั่งทั้งหมด'} onBack={true}>
            {/* <div className={style.number_bill}>
                หมายเลขบิล: <span>{history[0]?.order_booking}</span>
            </div> */}
            <br/>
            <div className="height-100" style={{paddingBottom : "130px"}}>
                <div className="container_deal">
                    {
                        history?.orders && history?.orders.map((item,i) => {
                            
                            return (
                                <>
                                <div className={style.order_all_time_bill}>
                                    <div className={style.order_time_bill}>
                                    <span style={{paddingTop:"2px"}}>บิลที่ {item.order_no}</span>
                                        <span>{moment(item.created_at).format('LT')}</span>
                                    </div>
                                    {
                                        item.details.map((dataItem,i) => {
                                            return <DealItemOrder dealItem={dataItem} order_number={i} />
                                        })
                                    }
                                    <div className={style.total_number_bill}>
                                        <span className={style.text_total}>รวมค่าอาหาร:</span> <span className={style.price}>฿ {item.total_amount.toLocaleString('en-US')}</span>
                                    </div>
                                </div>
                                <br/>
                                </>
                            )
                        })
                    }
                    
                    
                </div>
            </div>
            <div className={style.group_button_bottom}>
               <div className={style.group_vat}>
                <div className={style.total_number_bill}>
                        <div className={style.text_total}>รวมค่าอาหารทั้งหมด</div>
                        <div className={style.text_total}>฿ {parseFloat(history.sub_total).toLocaleString(undefined,{'minimumFractionDigits':2,'maximumFractionDigits':2})}</div>
                    </div>
                    {dataContext?.user?.configs?.is_service_charge_enable && <div className={style.total_number_bill}>
                        <div className={style.text_total}>Service charge {history.service_charge_rate}%</div>
                        <div className={style.text_total}>฿ {parseFloat(history.service_charge_amount).toLocaleString(undefined,{'minimumFractionDigits':2,'maximumFractionDigits':2})}</div>
                    </div>}
                    {dataContext?.user?.configs?.is_vat_enable && <div className={style.total_number_bill}>
                        <div className={style.text_total}>VAT {history.vat_rate}% {!dataContext?.user?.configs?.is_vat_exclude ? t.excluding : t.including}</div>
                        <div className={style.text_total}>฿ {parseFloat(history.vat_amount).toLocaleString(undefined,{'minimumFractionDigits':2,'maximumFractionDigits':2})}</div>
                    </div>}
                    
               </div>
               <div className={style.group_total}>
                <div className={style.titletotal}>รวมทั้งหมด</div>
                <div className={style.price}>฿ {parseFloat(history.totol_amount).toLocaleString('en-US')}</div>
                {/* <span style={{fontSize :"12px" , lineHeight : "1"}}>ยังไม่รวม VAT,Service Chage</span> */}
            </div>
            <div className={style.group_addtocart}>
                <div className={style.btn_addtocart} onClick={()=> onClickAddOrder()}>ชำระเงิน</div>
            </div>
           </div>
           
            {/* <div className={style.group_button_bottom}>
                <div className={style.group_total}>
                    <div className={style.titletotal}>รวมค่าอาหาร</div>
                    <div className={style.price}>฿ {total.toLocaleString('en-US')}</div>
                </div>
                <div className={style.group_addtocart}>
                    <div className={style.btn_addtocart} onClick={()=> onClickAddOrder()}>สรุปยอดเงิน</div>
                </div>
           </div> */}
           <AnimatePresence initial={false}>
                {isDetail &&
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="modelUp"
                >
                    <WaitOrder />
                </motion.div>
                }
            </AnimatePresence>
            <Modal key={1} show={showConfirm} onHide={()=> setShowConfirm(false)} size="sm"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered>
                    <Modal.Body>
                        <div className='group-modal'>
                        <div className="title_name_modal">
                                <div className="title_text">เรียกพนักงาน</div>
                                <p className="subtitle_text">คุณต้องการเรียกพนักงานเพื่อชำระเงินใช่หรือไม่</p>
                        </div>
                        <div className="group_btn_confirm">
                                <div className="btn btn_false" onClick={() => {setShowConfirm(false)}}>ยกเลิก</div>
                                <div className="btn btn_true" onClick={() => {
                                    setShowConfirm(false)
                                    setDetail(true)
                                    setTimeout(() => {
                                        setDetail(false)
                                        router.push('/checkout')
                                    }, 2000);
                                }}>ยืนยัน</div>
                        </div>
                        </div>
                    </Modal.Body>
            </Modal>
        </Pagemini>
    )
}
export default Order
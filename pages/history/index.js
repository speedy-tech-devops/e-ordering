import React, { useEffect, useState } from "react";
import Pagemini from '@/layouts/pageMini'
import Router, { useRouter } from 'next/router'
// import Image from 'next/image';
import en from '@/locales/en'
import th from '@/locales/th'
import DealItemOrder from "@/components/dealItemorder";
import style from "@/styles/DealItemOrder.module.scss"
import { Modal } from 'react-bootstrap';
// import { getHistory } from "@/services/getServices";
import { motion, AnimatePresence } from "framer-motion"
import { useAuth } from '@/context/useAuth'
import moment from 'moment';
import WaitOrder from "@/components/waitorder";
import { io } from 'socket.io-client';
import { baseURL } from "@/services/endpoint";
import Cookies from 'js-cookie';

const socket = io(baseURL, {
    query: { token: Cookies.get('token'), type: "QR" }
});

const History = () => {
    const router = useRouter()
    const { locale } = router
    const t = locale === "en" ? en : th
    const [showConfirm, setShowConfirm] = useState(false)
    const [history, setHistory] = useState([])
    const dataContext = useAuth()
    // const [total, setTotal] = useState(0)
    const [isDetail, setDetail] = useState(false)

    useEffect(() => {
        // socket.connect();
        if (socket) {
            socket.emit("subscribe-history")
            socket.on('history-live', (res) => {
                setHistory(res)
            });
        }

        if (!socket.connected) {
            socket.connect();
        }

        return () => {
            socket.off('subscribe-history');
            socket.off('disconnect');
            socket.off('history-live');
        };

    }, [socket]);

    const onClickAddOrder = async () => {
        // router.push('/checkout')
        setShowConfirm(true)
    }

    return (
        <Pagemini title={t.EZ4001} onBack={true}>
            {/* <div className={style.number_bill}>
                หมายเลขบิล: <span>{history[0]?.order_booking}</span>
            </div> */}
            <br />
            <div className="height-100" style={{ paddingBottom: "130px" }}>
                <div className="container_deal">
                    {
                        history?.orders && history?.orders.map((item, i) => {

                            return (
                                <>
                                    <div className={style.order_all_time_bill}>
                                        <div className={style.order_time_bill}>
                                            <span style={{ paddingTop: "2px" }}>{t.EZ4002}{item.order_no}</span>
                                            <span>{moment(item.created_at).format('LT')}</span>
                                        </div>
                                        {
                                            item.details.map((dataItem, i) => {
                                                return <DealItemOrder dealItem={dataItem} order_number={i} />
                                            })
                                        }
                                        <div className={style.total_number_bill}>
                                            <span className={style.text_total}>{t.EZ4003}:</span> <span className={style.price}>฿ {item.total_amount.toLocaleString('en-US')}</span>
                                        </div>
                                    </div>
                                    <br />
                                </>
                            )
                        })
                    }


                </div>
            </div>
            <div className={style.group_button_bottom}>
                <div className={style.group_vat}>
                    <div className={style.total_number_bill}>
                        <div className={style.text_total}>{t.EZ4004}</div>
                        <div className={style.text_total}>฿ {parseFloat(history.sub_total).toLocaleString(undefined, { 'minimumFractionDigits': 2, 'maximumFractionDigits': 2 })}</div>
                    </div>
                    {dataContext?.user?.configs?.is_service_charge_enable && <div className={style.total_number_bill}>
                        <div className={style.text_total}>Service charge {history.service_charge_rate}%</div>
                        <div className={style.text_total}>฿ {parseFloat(history.service_charge_amount).toLocaleString(undefined, { 'minimumFractionDigits': 2, 'maximumFractionDigits': 2 })}</div>
                    </div>}
                    {dataContext?.user?.configs?.is_vat_enable && <div className={style.total_number_bill}>
                        <div className={style.text_total}>{t.EZ4005} {history.vat_rate}% {dataContext?.user?.configs?.is_vat_exclude ? t.excluding : t.including}</div>
                        <div className={style.text_total}>฿ {parseFloat(history.vat_amount).toLocaleString(undefined, { 'minimumFractionDigits': 2, 'maximumFractionDigits': 2 })}</div>
                    </div>}

                </div>
                <div className={style.group_total}>
                    <div className={style.titletotal}>{t.EZ4006}</div>
                    <div className={style.price}>฿ {parseFloat(history.total_amount).toLocaleString('en-US')}</div>
                    {/* <span style={{fontSize :"12px" , lineHeight : "1"}}>ยังไม่รวม VAT,Service Chage</span> */}
                </div>
                <div className={style.group_addtocart}>
                    <div className={style.btn_addtocart} onClick={() => onClickAddOrder()}>{t.EZ4007}</div>
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
            <Modal key={1} show={showConfirm} onHide={() => setShowConfirm(false)} size="sm"
                aria-labelledby="contained-modal-title-vcenter"
                centered>
                <Modal.Body>
                    <div className='group-modal'>
                        <div className="title_name_modal">
                            <div className="title_text">{t.EZ4008}</div>
                            <p className="subtitle_text">{t.EZ4009}</p>
                        </div>
                        <div className="group_btn_confirm">
                            <div className="btn btn_false" onClick={() => { setShowConfirm(false) }}>{t.EZ4010}</div>
                            <div className="btn btn_true" onClick={() => {
                                setShowConfirm(false)
                                setDetail(true)
                                setTimeout(() => {
                                    socket.emit("unsubscribe-history")
                                    setDetail(false)
                                    router.push('/checkout')
                                    socket.disconnect()
                                }, 2000);
                            }}>{t.EZ4011}</div>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </Pagemini>
    )
}
export default History
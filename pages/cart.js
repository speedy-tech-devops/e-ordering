import React,{ useEffect, useState } from "react";
import Pagemini from '@/layouts/pageMini'
import Router, { useRouter } from 'next/router'
import Image from 'next/image';
import en from '@/locales/en'
import th from '@/locales/th'
import DealItemEdit from "@/components/dealItemedit";
import style from "@/styles/DealItemEdit.module.scss"
import { Modal } from 'react-bootstrap';
import { useAuth } from '@/context/useAuth'
import { addTransactions ,getProducts } from "@/services/getServices";
import Swal from 'sweetalert2'
const Cart = (props) => {
    const router = useRouter()
    const { locale } = router
    const t = locale === "en" ? en : th
    const dataContext = useAuth()
    const [dataItems, setDataItems] = useState(dataContext.transitions)
    
    const [showConfirm,setShowConfirm] = useState(false)
    const [showReject,setShowReject] = useState(false)
    const [showAddtoCart,setShowAddtoCart] = useState(false)
    useEffect(()=>{
    },[dataContext.transitions])
    const onClickAddOrder = async () =>{
        setShowConfirm(true)
        
    }
    const onTransactions = async () =>{
        dataContext.setLoading(true)
        let data = await addTransactions(dataContext.transitions).then((res) => {
            if(res?.code == 200){
                dataContext.setTransitions({
                    customer : {
                        name : "",
                        tel : "",
                        line_uid : "",
                        note : "",
                        expected_date : "",
                        priceTotal : 0,
                        total : ""
                    },
                    products : []
                })
                setShowConfirm(false)
                router.push('/order')
                Swal.fire({
                    icon: 'success',
                    title: t.EZ3012,
                    showConfirmButton: false,
                    timer: 1000,
                    confirmButtonText: 'ปิด',
                }).then((result) => {
                    dataContext.setLoading(false)
                    /* Read more about isConfirmed, isDenied below */
                    
                })
            }else{
                Swal.fire({
                    title: t.EZ3013,
                    text: t.EZ3014,
                    icon: 'error',
                    confirmButtonText: 'Close'
                })
                dataContext.setLoading(false)
            }
            
        }).catch((error) => {
            Swal.fire({
                title: 'Error!',
                text: 'Do you want to continue',
                icon: 'error',
                confirmButtonText: 'Close'
            })
            dataContext.setLoading(false)
        })
    }
    
    const Load = (data) => {
        dataContext.setTransitions(data)
        setDataItems(data)
    }
    return (
        <Pagemini  title={t.EZ3001}>
            
            <div className="container_deal">
                {
                    dataContext?.transitions.products.length != 0 ? dataContext?.transitions.products.map((item,i) => {
                        return <DealItemEdit dealItem={item}  index={i} Load={(e) => Load(e)} />
                    }) : <div className="group_no_item">
                        <div style={{textAlign : " center", fontSize : "24px" , lineHeight : "1.2"}}>
                            <img src="/images/notfound.png"></img><br/><br/>
                            {t.EZ3015}<br/>
                            <span style={{display : "block",color : "#777",fontSize : "22px"}}>{t.EZ3016}</span>
                        </div>
                        
                    </div>
                }
            </div>
            <div className={style.group_button_bottom}>
                <div className={style.group_total}>
                    <div className={style.titletotal}>{t.EZ3002}</div>
                    <div className={style.price}>฿ {dataContext?.transitions.customer.priceTotal.toLocaleString('en-US')}</div>
                </div>
                <div className={style.group_addtocart}>
                    <div className={[style.btn_addtocart,dataContext?.transitions.products.length == 0 && style.disabled].join(' ')}  onClick={()=> onClickAddOrder()}>{t.EZ3003}</div>
                </div>
           </div>
           
           <Modal key={1} show={showConfirm} onHide={()=> setShowConfirm(false)} size="sm"
                aria-labelledby="contained-modal-title-vcenter"
                centered>
                <Modal.Body>
                    <div className='group-modal'>
                       <div className="title_name_modal">
                            <div className="title_text">{t.EZ3008}</div>
                            <p className="subtitle_text">{t.EZ3009}</p>
                       </div>
                       <div className="group_btn_confirm">
                            <div className="btn btn_false" onClick={()=> setShowConfirm(false)}>{t.EZ3010}</div>
                            <div className="btn btn_true" onClick={() => {!dataContext.loading && onTransactions()}}>{t.EZ3011}</div>
                       </div>
                    </div>
                </Modal.Body>
            </Modal>
        </Pagemini>
    )
}
export default Cart
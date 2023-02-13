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
                    title: 'Your work has been saved',
                    showConfirmButton: false,
                    timer: 1000,
                    confirmButtonText: 'Close',
                }).then((result) => {
                    /* Read more about isConfirmed, isDenied below */
                    
                })
            }else{
                Swal.fire({
                    title: 'Error!',
                    text: 'Do you want to continue',
                    icon: 'error',
                    confirmButtonText: 'Close'
                })
            }
            
        }).catch((error) => {
            Swal.fire({
                title: 'Error!',
                text: 'Do you want to continue',
                icon: 'error',
                confirmButtonText: 'Close'
            })
        })
    }
    
    const Load = (data) => {
        dataContext.setTransitions(data)
        setDataItems(data)
    }
    return (
        <Pagemini  title={'รายการที่สั่ง'}>
            
            <div className="container_deal">
                {
                    dataContext?.transitions.products.length != 0 ? dataContext?.transitions.products.map((item,i) => {
                        return <DealItemEdit dealItem={item}  index={i} Load={(e) => Load(e)} />
                    }) : <div className="group_no_item">
                        <div style={{textAlign : " center", fontSize : "24px" , lineHeight : "1.2"}}>
                            <img src="/images/notfound.png"></img><br/><br/>
                            ไม่พบรายการ<br/>
                            <span style={{display : "block",color : "#777",fontSize : "22px"}}>ยังไม่มีรายการที่สั่งเข้ามา</span>
                        </div>
                        
                    </div>
                }
            </div>
            <div className={style.group_button_bottom}>
                <div className={style.group_total}>
                    <div className={style.titletotal}>รวมค่าอาหาร</div>
                    <div className={style.price}>฿ {dataContext?.transitions.customer.priceTotal.toLocaleString('en-US')}</div>
                </div>
                <div className={style.group_addtocart}>
                    <div className={[style.btn_addtocart,dataContext?.transitions.products.length == 0 && style.disabled].join(' ')}  onClick={()=> onClickAddOrder()}>ส่งรายการ</div>
                </div>
           </div>
           
           <Modal key={1} show={showConfirm} onHide={()=> setShowConfirm(false)} size="sm"
                aria-labelledby="contained-modal-title-vcenter"
                centered>
                <Modal.Body>
                    <div className='group-modal'>
                       <div className="title_name_modal">
                            <div className="title_text">ยืนยันรายการ</div>
                            <p className="subtitle_text">คุณต้องการส่งรายการอาหารนี้ใช่หรือไม่</p>
                       </div>
                       <div className="group_btn_confirm">
                            <div className="btn btn_false" onClick={()=> setShowConfirm(false)}>ยกเลิก</div>
                            <div className="btn btn_true" onClick={() => onTransactions()}>ยืนยัน</div>
                       </div>
                    </div>
                </Modal.Body>
            </Modal>
        </Pagemini>
    )
}
export default Cart
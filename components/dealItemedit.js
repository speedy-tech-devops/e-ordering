import React ,{useEffect,useState} from "react";
import style from "@/styles/DealItemEdit.module.scss"
import Image from "next/image";
import Router ,{useRouter}from 'next/router'
import en from '@/locales/en'
import th from '@/locales/th'
import { useAuth } from '@/context/useAuth';
import Swal from 'sweetalert2'
import { Modal } from 'react-bootstrap';
const DealItemEdit = (props) => {
    const router = useRouter()
    const { locale } = router
    const t = locale === "en" ? en : th
    const [showReject,setShowReject] = useState(false)
    const [nameReject,setnameReject] = useState(false)
    const[state,setState] = useState({
        loading : false
    })
    let dataContext = useAuth()
    const [count, setCount] = useState(props.dealItem.qty);
    const Order = () =>{
        
    }
    const plusFunc = (i) => {
        setCount(count + 1);
        dataContext.editToOrder(props.index, count + 1 , 1,props.dealItem.order)
    };
    const minusFunc = (i) => {
        if((count - 1) > 0){
            setCount(count - 1);
            dataContext.editToOrder(props.index, count - 1,-1,props.dealItem.order)
        }else{
            
            setShowReject(true)
            setnameReject(props.dealItem.order?.name[locale] ? props.dealItem.order?.name[locale] : props.dealItem.order?.name["th"])
            // Swal.fire({
            //     title: 'ยกเลิก!',
            //     text: 'คุณต้องการยกเลิก......ใช่ไหม?',
            //     icon: 'error',
            //     showDenyButton: true,
            //     confirmButtonText: 'ยืนยัน',
            //     denyButtonText: `ยกเลิก`,
            //     reverseButtons: true
            // }).then((result) => {
            //     /* Read more about isConfirmed, isDenied below */
            //     if (result.isConfirmed) {
            //         // router.push('/')
            //         let price = dataContext.transitions?.products[props.index]
            //         const sum = price.options_detail.reduce((accumulator, object) => {
            //             return accumulator + object.price;
            //         }, 0);
            //         let remove = dataContext.transitions.products.splice(props.index, 1);
                    
            //         dataContext.setTransitions((prev) => ({
            //             customer : {
            //                 ...prev.customer,
            //                 priceTotal :prev.customer.priceTotal - (props.dealItem.order.sale_price != 0 ? ((props.dealItem.order.sale_price + sum) * props.dealItem.qty)  :  ((props.dealItem.order.price + sum) * props.dealItem.qty))
            //             },
            //             products : dataContext.transitions.products
            //         }))
            //     } else if (result.isDenied) {
            //         // Swal.fire('Changes are not saved', '', 'info')
            //     }
            // })
        }
    };
    const removeConut = (index,dealItem) => {
        // router.push('/')
        dataContext.setLoading(true)
        let price = dataContext.transitions?.products[index]
        const sum = price.options_detail.reduce((accumulator, object) => {
            return accumulator + object.price;
        }, 0);
        
        let remove = dataContext.transitions.products.splice(index, 1);
        const qtys = dataContext.transitions.products.reduce((accumulator, object) => {
            return accumulator + object.qty;
        }, 0);
        console.log(remove)
        dataContext.setTransitions((prev) => ({
            customer : {
                ...prev.customer,
                total : qtys,
                priceTotal :prev.customer.priceTotal - (dealItem.order.sale_price != 0 ? ((dealItem.order.sale_price + sum) * dealItem.qty)  :  ((dealItem.order.price + sum) * dealItem.qty))
            },
            products : dataContext.transitions.products
        }))
        
        dataContext.setLoading(false)
        setShowReject(false)
    }
    return (
        <>
        <div className={style.dealItem}>
            <div className={style.dealImages}>
                <Image src={props.dealItem.order?.image_url ? props.dealItem.order?.image_url : "/images/blur.png"}  alt={props.dealItem.order?.image_url} width={40} height={40} layout={'responsive'} style={{objectFit:"cover"}}></Image>
            </div>
            <div className={style.group_dealitem}>
                <div className={style.deal_name}><span className={style.rowfisrt}>{props.dealItem.order?.name[locale] ? props.dealItem.order?.name[locale] : props.dealItem.order?.name["th"]}</span><span className={style.prices}>฿ {(props.dealItem.order.sale_price != 0 ? (props.dealItem.order.sale_price + props.dealItem.sumTotal).toLocaleString('en-US') :  (props.dealItem.order.price) + props.dealItem.sumTotal).toLocaleString('en-US')} x {count}</span></div>
                <div className={style.deal_detail}>
                    {props.dealItem.note}
                    
                </div>
                
                {props.dealItem.options_detail.map((addOn,i) =>{
                         return  (
                            <>
                            {
                                addOn?.name[locale] ? addOn?.name[locale] : addOn.name["th"]
                            }
                            {
                                props.dealItem.options_detail.length != i+1 && ", "
                            }
                            </>
                        )
                    })}
                
                <div className={style.bottom_deal_item}>
                    <div className={style.deal_price}>
                        {/* <span>แก้ไข</span> */}
                    </div>
                    <div className={style.group_qty}>
                        <div className={style.min_qty} onClick={() => minusFunc()}>
                            <i className="fal fa-minus"></i>
                        </div>
                        <div className={style.qty}>{count}</div>
                        <div className={style.max_qty} onClick={() => plusFunc()}>
                        <i className="fal fa-plus"></i>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
        <Modal key={1} show={showReject} onHide={()=> setShowReject(false)} size="sm"
                aria-labelledby="contained-modal-title-vcenter"
                centered>
                <Modal.Body>
                    <div className='group-modal'>
                       <div className="title_name_modal">
                            <div className="title_text">ยกเลิก</div>
                            <p className="subtitle_text">คุณต้องการยกเลิก <b >{nameReject}</b> ใช่ไหม?</p>
                       </div>
                       <div className="group_btn_confirm">
                            <div className="btn btn_false" onClick={() => {setShowReject(false)}}>ยกเลิก</div>
                            <div className="btn btn_true" onClick={() => {!dataContext.loading && removeConut(props.index,props.dealItem)}}>ยืนยัน</div>
                       </div>
                    </div>
                </Modal.Body>
        </Modal>
        </>
        
        
    )
}
export default DealItemEdit
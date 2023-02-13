import React ,{useEffect,useState} from "react";
import style from "@/styles/DealItem.module.scss"
import Image from "next/image";
import Router ,{useRouter}from 'next/router'
import en from '@/locales/en'
import th from '@/locales/th'

const DealItem = (props) => {
    const router = useRouter()
    const { locale } = router
    const t = locale === "en" ? en : th
    const[state,setState] = useState({
        loading : false
    })
    const Order = () =>{
        
    }
    return (
        <>
        <div className={style.dealItem} onClick={()=>{ props.handleShow(props.data)}}>
            <div className={style.dealImages}>
                <Image src={'/images/item1.png'} blurDataURL={"/images/item1.png"} width={98} height={98} alt={props.data.name[locale]}></Image>
            </div>
            <div className={style.group_dealitem}>
                <div className={style.deal_name}>{props.data.name[locale]}</div>
                <div className={style.deal_detail}>{props.data.description[locale]}</div>
                <div className={style.bottom_deal_item}>
                    <div className={style.deal_price}>
                        <span>฿{props.data.sale_price}</span>
                        <span>฿{props.data.price}</span>
                    </div>
                    <div className={style.plus}>
                        <i className="fal fa-plus"></i>
                    </div>
                </div>
                
            </div>
        </div>
        </>
    )
}
export default DealItem
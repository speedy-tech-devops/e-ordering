import React ,{useEffect,useState} from "react";
import style from "@/styles/DealItemOrder.module.scss"
import Image from "next/image";
import Router ,{useRouter}from 'next/router'
import en from '@/locales/en'
import th from '@/locales/th'
import { useAuth } from '@/context/useAuth';

const DealItemOrder = (props) => {
    const {dealItem } = props
    const router = useRouter()
    const { locale } = router
    const t = locale === "en" ? en : th
return (
    <div className={style.dealItem}>
            <div className={style.dealImages}>
                <Image src={dealItem?.product?.image_url ? dealItem?.product?.image_url : "/images/blur.png"} width={70} height={70} alt="ss"></Image>
            </div>
            <div className={style.group_dealitem}>
                <div className={style.deal_name}><span className={style.nameOrder}>{dealItem?.product?.name[locale] ? dealItem.product.name[locale]  : dealItem.product.name["th"] }</span> <span className={style.priceOrder}>฿ {(dealItem.unit_price + dealItem.option_amount).toLocaleString('en-US')} x {dealItem.qty}</span></div>
                <div className={style.deal_detail}>{
                    dealItem.options.map((opt,i) =>{
                        return  (
                            <>
                            {
                                opt?.option?.name[locale] ? opt.option.name[locale] : opt.option.name["th"]
                            }
                            {
                                dealItem.options.length != i+1 && " ,"
                            }
                            </>
                        )
                    })
                }</div>
                <div className={style.bottom_deal_item}>
                    <div className={[style.deal_status,style.bottom_deal_item].join(' ')} style={{backgroundColor : (dealItem.status == "PENDING" && "#FFA800" || dealItem.status == "PROCESSING" && "#00D42F" || dealItem.status == "REJECTED" && "#FF0000")}}>
                        <span>{dealItem.status}</span>
                    </div>
                </div>
                
            </div>
        
        
    </div>
)
}
export default DealItemOrder
import React,{ useEffect, useState } from "react";
import PagesNoHeader from '@/layouts/pageBack'
import Router, { useRouter } from 'next/router'
import Image from 'next/image';
import style from "@/styles/DealDetail.module.scss"
import en from '@/locales/en'
import th from '@/locales/th'
import Cookies from "js-cookie";
const DetailSlug = (props) => {
    const router = useRouter()
    const { locale } = router
    const t = locale === "en" ? en : th
    useEffect(()=>{
        let data = JSON.parse(Cookies.get("table"))
    },[])
    const myLoader = ({ src, width, quality }) => {
        return `https://e-ordering-six.vercel.app/${src}?w=${width}&q=${quality || 75}`
      }
    return (
        <PagesNoHeader>
           <div className={style.group_images}>
            <Image loader={myLoader} src={'/images/detail.png'} fill className={style.imagesTemp}  sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw" alt="detaile"></Image>
           </div>
           <div className={style.group_deal_detail_product+' mb-2'}>
                <div className={style.deal_name_price}>
                    <div className={style.deal_name}>นมถั่วเหลืองสูตร(เจ)</div>
                    <div className={style.deal_group_price}>
                        <span className={style.s_price}>฿80</span>
                        <span className={style.r_price}>฿85</span>
                    </div>
                </div>
                <div className={style.deal_detail}>ทางร้านใส่แค่ นมสด กับ นมข้น เท่านั้น (ถ้าไม่ใส่โปรดระบุ)</div>
           </div>
           <div className={style.group_container_choices}>
                <div className={style.group_choices}>
                    <div className={style.group_name_choices}>เพิ่มท็อปปิ้ง <span>(ไม่จำเป็นต้องระบุ)</span></div>
                    <div className={" group_checkbox"}>
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                            <label className="form-check-label" for="flexCheckDefault">
                                ไข่มุกดำ 
                            </label>
                            <span>+10</span>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked" checked />
                            <label className="form-check-label" for="flexCheckChecked">
                                แปะก๊วย
                            </label>
                            <span>+10</span>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked" checked />
                            <label className="form-check-label" for="flexCheckChecked">
                                ฟรุ๊ตสลัด
                            </label>
                            <span>+10</span>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked" checked />
                            <label className="form-check-label" for="flexCheckChecked">
                                เยลลี่
                            </label>
                            <span></span>
                        </div>
                    </div>
                </div>
                <div className={style.group_choices}>
                    <div className={style.group_name_choices}>เพิ่มท็อปปิ้ง <span>(ไม่จำเป็นต้องระบุ)</span></div>
                    <div className={" group_checkbox"}>
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                            <label className="form-check-label" for="flexCheckDefault">
                                ไข่มุกดำ 
                            </label>
                            <span>+10</span>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked" checked />
                            <label className="form-check-label" for="flexCheckChecked">
                                แปะก๊วย
                            </label>
                            <span>+10</span>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked" checked />
                            <label className="form-check-label" for="flexCheckChecked">
                                ฟรุ๊ตสลัด
                            </label>
                            <span>+10</span>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked" checked />
                            <label className="form-check-label" for="flexCheckChecked">
                                เยลลี่
                            </label>
                            <span></span>
                        </div>
                    </div>
                </div>
           </div>
           <div className={style.group_button_bottom}>
                <div className={style.group_qty}>
                    <div className={style.min_qty}>
                        <i className="fal fa-minus"></i>
                    </div>
                    <div className={style.qty}>1</div>
                    <div className={style.max_qty}>
                     <i className="fal fa-plus"></i>
                    </div>
                </div>
                <div className={style.group_addtocart}>
                    <div className={style.btn_addtocart}>เพิ่มเข้าตะกร้า - ฿180</div>
                </div>
           </div>
        </PagesNoHeader>
    )
}

export default DetailSlug
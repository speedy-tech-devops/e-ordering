import React ,{useEffect,useState} from "react";
import style from "@/styles/DealItemCheckOut.module.scss"
import Image from "next/image";
const DealItemOrder = (props) => {
return (
    <div className={style.dealItem}>
        
            <div className={style.group_dealitem}>
                <div className={style.deal_name}>นมถั่วเหลืองสูตร(เจ) <span>฿180 x 2</span></div>
                <div className={style.deal_detail}>ไข่มุกดำ, ไม่ใส่น้ำเชื่อมหรือน้ำตาล</div>
                {/* <div className={style.bottom_deal_item}>
                    <div className={[style.deal_status,style.bottom_deal_item].join(' ')}>
                        <span>กำลังรอ</span>
                    </div>
                </div> */}
                
            </div>
        
        
    </div>
)
}
export default DealItemOrder
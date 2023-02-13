import React, { useState, useEffect } from 'react'
import style from '@/styles/detailProduct.module.scss'
import Image from 'next/legacy/image'
import Accordion from 'react-bootstrap/Accordion';
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from 'next/router'
import { useAuth } from '@/context/useAuth';
import en from '@/locales/en'
import th from '@/locales/th'
const DetailProduct = (props) => {
    const { dataItem } = props
    const router = useRouter()
    const { locale } = router
    const { addToOrder,setTransitions } = useAuth()
    const [options,setOptions] = useState([])
    const [options_detail,setOptionsDetail] = useState([])
    const [note,setNote] = useState('')
    const t = locale === "en" ? en : th
    const [count, setCount] = useState(1);
    const [totalPrice, setTotalPrice] = useState(dataItem?.sale_price != 0 && dataItem?.sale_price ? dataItem?.sale_price : dataItem?.price);
    const [req , setReq] = useState(dataItem.attributes)
    const [enabled, setEnabled] = useState(true)
    const plusFunc = () => {
        let priceItem = dataItem?.sale_price != 0 && dataItem?.sale_price ? dataItem?.sale_price : dataItem?.price
        setCount(count + 1);
        setTotalPrice(priceItem * (count + 1))
    };
    const minusFunc = () => {
        let priceItem = dataItem?.sale_price != 0 && dataItem?.sale_price ? dataItem?.sale_price : dataItem?.price
        if (count === 1) {
            return;
        }
        setCount(count - 1);
        setTotalPrice(priceItem * (count - 1))
    };
    const onChangeAddtoOrder = (e,id,limit,data,cho_id,choice_limit) => {
        const {name,value,checked,type} = e.target
        var checks = document.querySelectorAll("."+id);
        var max = limit;
        for (var i = 0; i < checks.length; i++)
        checks[i].onclick = selectiveCheck;
        var checkedCheckss = document.querySelectorAll("."+id+":checked");
        function selectiveCheck (event) {
            var checkedChecks = document.querySelectorAll("."+id+":checked");
            if (checkedChecks.length >= max + 1){
                return false
            }
        }
        
        let dataOpenis = []
        if(type != "radio"){
            if(checked && checkedCheckss.length <= limit){
                setOptions((prev) => [...prev,value])
                setOptionsDetail((prev) => [...prev,{ch_id:cho_id,...data,min : choice_limit}])
                setTotalPrice((prev) => prev + data.price)
                // let checkSelectOptions = [...options_detail,{ch_id:cho_id,...data,min : choice_limit}].map(e => e.ch_id)
                // const counts = {};
                // checkSelectOptions.forEach(function (x) { counts[x] = (counts[x] || 0) + 1; });
                // console.log(counts)
                // console.log('if',counts)
                if(checkedCheckss.length == limit){
                    var arr = Array.from(document.getElementsByClassName("check_" + cho_id));
                    arr.map((checkbox) =>  {
                        if(!checkbox.checked){
                           
                           checkbox.disabled = true 
                        }
                        
                    })
                }
            }else{
                const index = options.indexOf(value);
                const x = options.splice(index, 1);
                
                let indexs = options_detail.map(e => e.ch_id).indexOf(cho_id)
                options_detail.splice(indexs, 1);
                setOptions(options)
                setOptionsDetail((prev) => [...prev])
                setTotalPrice((prev) => prev - data.price)
                // let checkSelectOptions = options_detail.map(e => e.ch_id)
                // const counts = {};
                // checkSelectOptions.forEach(function (x) { counts[x] = (counts[x] || 0) + 1; });
                // console.log('else',counts)
                var arr = Array.from(document.getElementsByClassName("check_" + cho_id));
                arr.map((checkbox) =>  {
                    if(!checkbox.checked){
                        checkbox.disabled = false 
                    }
                })
            }
            
        }else{
            let indexs = options_detail.map(e => e.ch_id).indexOf(cho_id)
            if(indexs < 0){
                setOptions((prev) => [...prev,value])
                setOptionsDetail((prev) => [...prev,{ch_id:cho_id,...data,min : choice_limit}])
                setTotalPrice((prev) => prev + data.price)
            }else{
                options_detail.splice(indexs, 1);
                setOptionsDetail((prev) => [...options_detail,{ch_id:cho_id,...data,min : choice_limit}])
                const sum = [...options_detail,{ch_id:cho_id,...data,min : choice_limit}].reduce((accumulator, object) => {
                    return accumulator + object.price;
                }, 0);
                setTotalPrice((dataItem?.sale_price != 0 && dataItem?.sale_price ? dataItem?.sale_price : dataItem?.price) + sum)
                
            }
            
        }
        let checkLimit = dataItem.attributes.map(e => e.attribute)
        let checkSelectOptions = [...options_detail,{ch_id:cho_id,...data,min : choice_limit}].map(e => e.ch_id)
        const counts = {};
        checkSelectOptions.forEach(function (x) { counts[x] = (counts[x] || 0) + 1; });
        // const counts = {};
        // checkSelectOptions.forEach(function (x) { counts[x] = (counts[x] || 0) + 1; });
        let disable_count_limit = checkLimit.filter((limit) => {
            if(counts[limit._id] == undefined){
                counts[limit._id] = 0 
            }
            return limit.choice_min > counts[limit._id]
        })
        setEnabled(disable_count_limit.length != 0)
    }
    // useEffect(() => {
    //     let checkLimit = dataItem.attributes.map(e => e.attribute)
        
    //     let checkSelectOptions = options_detail.map(e => e.ch_id)
    //     const counts = {};
    //     checkSelectOptions.forEach(function (x) { counts[x] = (counts[x] || 0) + 1; });
    //     let disable_count_limit = checkLimit.filter((limit) => limit.choice_min > counts[limit._id])
        
    //     console.log('checkENd',counts)
    //     setEnabled(disable_count_limit.length != 0)
    // },[options_detail])
    const onChangeNoteOrder = (e) => {
        const {name,value} = e.target
        setNote(value)
    }
    useEffect(() => {
        let checkLimit = dataItem.attributes.map(e => e.attribute)
        let checkSelectOptions = options_detail.map(e => e.ch_id)
        const counts = {};
        checkSelectOptions.forEach(function (x) { counts[x] = (counts[x] || 0) + 1; });
        let limit = checkLimit.filter((limit) => {
            if(counts[limit._id] == undefined){
                counts[limit._id] = 0 
            }
            return limit.choice_min > counts[limit._id]
        })
        // checkSelectOptions.filter((choice) => choice == )
        
        setEnabled(limit.length > 0)
    },[dataItem,options_detail])

    // useEffect(() => {
    //     console.log(dataItem.attributes.map(e => e.attribute).filter(v => v.choice_min == 0).length <= 0)
    //     if(dataItem.attributes.map(e => e.attribute).filter(v => v.choice_min == 0).length <= 0){
    //         setEnabled(false)
    //     }else{
    //         setEnabled(true)
    //     }
    // },[dataItem])
    return (
        <>
            <div className={style.overlay} onClick={(e) => props.setDetail(false)} ></div>
            <motion.div
                initial={{ y: 100 }}
                animate={{ y: 0 }}
                exit={{ y: 100 }}
                className={style.DetailProduct}
            >
                <div className={style.title}>
                    <h1>{dataItem.name[locale]}</h1>
                    <div className={style.btnClose + ' icon_close'} onClick={(e) => props.setDetail(false)} />
                </div>
                <div className={style.scrollDtail}>
                    <div className={style.pic}>
                        <Image src={dataItem?.image_url ? dataItem?.image_url : "/images/blur.png"} alt="" width={300} height={300} layout={'responsive'} style={{objectFit:"cover"}} />
                    </div>
                    <div className={style.nameProduct}>
                        <div className={style.row}>
                            <h1>{dataItem.name[locale]}</h1>
                            <h1 style={{ width: "100px",textAlign:'right' }}>{dataItem?.sale_price != 0 && dataItem?.sale_price ? <>
                                <span>
                                  {dataItem.sale_price} ฿
                                </span>
                                <span  className='discount-price'>
                                  {
                                     dataItem.price
                                  } ฿

                                </span>
                                </> : dataItem.price + " ฿"}</h1>
                        </div>
                        <div className={style.row}>
                            <p>{dataItem.description[locale]}</p>
                        </div>
                    </div>

                    <Accordion className='AccordionCustom' defaultActiveKey={[0, 1]} alwaysOpen>
                        {
                            dataItem.attributes.map((attr, i) => {
                                return (
                                    <Accordion.Item eventKey={i}>
                                        <Accordion.Header>
                                            <p className={style.subMenu}> {attr.attribute.choice_min > 0  && <span style={{color: "red",fontSize : '20px'}}>* </span>}{attr.attribute.name[locale]} <span style={{display : "block"}}>Select at least {attr.attribute.choice_min} item</span></p>
                                        </Accordion.Header>
                                        <Accordion.Body>
                                            {
                                                attr.attribute.choice_limit <= 1 ?
                                                    <div className='optionItem'>
                                                        {
                                                            attr.options.map((opt, i) => {
                                                                return (

                                                                    <div className="form-check mb-3">
                                                                        <input className="form-check-input" type="radio" name={attr.attribute._id} id={"radio_"+i} value={opt._id} onClick={(e) => {onChangeAddtoOrder(e,"check_" + attr.attribute._id,attr.attribute.choice_limit,opt,attr.attribute._id,attr.attribute.choice_min)}} />
                                                                        <label className="form-check-label" htmlFor={"radio_"+i}>
                                                                            <span>{opt.name[locale]}</span>
                                                                            <span>{opt.price ? "+"+opt.price +" ฿" : ''}</span>
                                                                        </label>
                                                                    </div>

                                                                )
                                                            })
                                                        }
                                                    </div>
                                                    :
                                                    <div className='optionItem'>
                                                        {
                                                            attr.options.map((opt, i) => {
                                                                return (

                                                                    <div className="form-check mb-3">
                                                                        <input className={"form-check-input"+" check_" + attr.attribute._id} type="checkbox" id={"check_" + opt._id} value={opt._id} onClick={(e) => {onChangeAddtoOrder(e,"check_" + attr.attribute._id,attr.attribute.choice_limit,opt,attr.attribute._id,attr.attribute.choice_min)}} />
                                                                        <label className="form-check-label" htmlFor={"check_" + opt._id}>
                                                                            <span>{opt.name[locale]}</span>
                                                                            <span>{opt.price ? "+"+opt.price +" ฿" : ''} </span>
                                                                        </label>
                                                                    </div>

                                                                )
                                                            })
                                                        }
                                                    </div>
                                            }

                                        </Accordion.Body>
                                    </Accordion.Item>
                                )
                            })
                        }
                    </Accordion>



                    <div className={style.note}>
                        <div className="form-group">
                            <label className="mb-2" htmlFor="note">Additional info</label>
                            <textarea className="form-control" id="note" rows={3} placeholder={t.additional} defaultValue={""} onChange={(e) => {onChangeNoteOrder(e)}} />
                        </div>
                    </div>
                    <div className={style.countNumber}>
                        <button className={style.btnCount} onClick={() => minusFunc()}>-</button>
                        <h1>{count}</h1>
                        <button className={style.btnCount} onClick={() => plusFunc()}>+</button>
                    </div>
                    <div className={style.group_button + ' p-3 ' + enabled} disabled={enabled} onClick={() => {
                        if(!enabled) {
                            addToOrder(dataItem,count,options,note,totalPrice,options_detail)
                            props.setDetails(false)
                        }
                        }}>
                        <button className={style.addToCart +' addToCart'} disabled={enabled}>
                            <span>Add to cart</span>
                            <span>{dataItem?.sale_price != 0 && dataItem?.sale_price ? <>
                                  {totalPrice.toLocaleString('en-US')} ฿
                                </> : totalPrice.toLocaleString('en-US') + " ฿"}</span>
                            
                        </button>
                    </div>

                </div>
            </motion.div>
        </>

    )
}
export default DetailProduct
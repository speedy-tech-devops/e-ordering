import React, { useState, useEffect, useRef, useCallback } from 'react'
import style from '@/styles/header.module.scss'
import Image from 'next/legacy/image'
import Scroll ,{ Link, animateScroll as scroll } from "react-scroll";

import { useAuth } from '@/context/useAuth'
import { useRouter } from 'next/router'
import en from '@/locales/en'
import th from '@/locales/th'
import Slider from "react-slick";
import { Modal } from 'react-bootstrap';
import Swal from 'sweetalert2'
const Header = (props) => {
    const [isSearchBar, setSearchBar] = useState(false)
    const sliderRef = useRef();
    const data = useAuth()
    const router = useRouter()
    const { locale } = router
    const Events = Scroll.Events;
    let scrollSpy = Scroll.scrollSpy;
    const t = locale === "en" ? en : th
    const settings = {
        className: "slider variable-width",
        dots: true,
        infinite: false,
        centerMode: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        variableWidth: true,
        afterChange: () => {
            data.setSlideIndex((prev) => (prev + 1))
        }
        ,
        beforeChange: (current, next) => data.setSlideIndex(next)
      };
    const onChangeFunc = (e) => {
        const { name, value } = e.target
        let array = []
        let dataSearch = data.products.map((e) => e.menus)
        let datas = array.concat(...dataSearch).filter((item) => {
            return item.name[locale].toLowerCase().match(value.toLowerCase())
        })
        props.setSearch(value)
        data.setDataSearch(datas)

    }
    const backBtn = (e) => {
        setSearchBar(false)
        props.setSearch('')
    }
    useEffect(() => {
        // refs.current[0].current.focus()
        // refs.current?.scrollIntoView({ block: "start", behavior: "smooth" });
        // dataContext.setHeightCateory()
        sliderRef.current.slickGoTo(data.heightCateory)
        scrollSpy.update();
        return () => {
            Events.scrollEvent.remove('begin');
            Events.scrollEvent.remove('end');
        }
      }, [data.heightCateory]);
    //   const createWheelStopListener = useCallback((element, callback, timeout) => {
    //     const { pageYOffset, scrollY } = window;
    //     var handle = null;
    //     var onScroll = function() {
    //         if (handle) {
    //             clearTimeout(handle);
    //         }
    //         handle = setTimeout(callback, timeout || 200); // default 200 ms
    //     };
    //     window.addEventListener('wheel', onScroll);
    //     return function() {
    //       window.removeEventListener('wheel', onScroll);
    //     };
    // }, []);
    //   useEffect(() => {
    //     createWheelStopListener(window, function() {
    //         console.log(data.updateCount)
    //         // sliderRef.slickGoTo(data.heightCateory)
    //   })
    //   }, []);
    const handleRoute = (locale) => router.push(`${locale}${router.asPath}`, `${locale}${router.asPath}`, { locale: false })
    return (
        <>
            <header className={style.header}>
                <div className={style.topbar_menu}>
                    <div className={style.logo}>
                        <Image src={ !data?.user?.logo_image ? '/images/logo.png' : data?.user?.logo_image} width={36} height={36} alt="logo"></Image>
                    </div>
                    <div className={style.group_shop}>
                        <div className={style.name}>{data?.user?.shop_name[locale]}</div>
                        <div className={style.table}><span>{data?.user?.table_name[locale]}</span></div>
                    </div>
                    <div className={style.active_all_menu}>
                        <div className={style.lang_change}>
                            <img src="/images/ring-bell.png" width={20} onClick={() => {data.setEmp(true)}}></img>
                        </div>
                        <div className={style.lang_change}>
                        <img src="/images/Vector.png" width={20}  onClick={() => {router.push('/order')}}></img>
                        </div>
                        {
                            router.locale == "th" ? 
                            <div className={style.lang_change} onClick={() => handleRoute("en")}>
                                <img src="/images/thai.png" width={20}></img>
                            </div> 
                            : 
                            <div className={style.lang_change}>
                                <img src="/images/eng.png" width={20}  onClick={() => handleRoute("th")}></img>
                            </div>
                        }
                        
                    </div>
                </div>
                {/* <div className={style.appName}>
                    {isSearchBar &&
                        <div className={style.btnBack + ' icon_back'} onClick={(e) => backBtn()} />
                    }
                    <div className={style.groupText}>
                        <h1>{data?.user?.shop_name[locale]}</h1>
                        <p>{data?.user?.branch_name[locale] +" - "+ data?.user?.table_name[locale]}</p>
                    </div>
                </div> */}
                <div className={style.swichNav}>
                    {isSearchBar == true ?
                        <div className={style.searchBar}>
                            <div className={style.icon + ' icon_search'} />
                            <input type={'text'} placeholder={'Search menu'} onChange={(e) => onChangeFunc(e)} />
                            <div className={style.icon_close } onClick={(e) => {
                                setSearchBar(false)
                                props.setSearch('')
                                }}>✕</div>
                        </div>
                        :
                        <div className={style.navBar + ' navBar'}>
                            <div className={style.icon + ' icon_search'} onClick={(e) => setSearchBar(true)} />
                            <div className={style.groupNav}>
                                <Slider {...settings} ref={sliderRef}>
                                {
                                    data?.products && data.products.map((item,i) =>{
                                        return <Link className={style.navItem + ` ${data.heightCateory == i && " active"}`} to={`sec_${i}`} spy={true}
                                        smooth={true}
                                        hashSpy={true}
                                        offset={-120}
                                        duration={50}
                                        isDynamic={true}
                                        ignoreCancelEvents={false}
                                         onSetActive={(e) => {
                                            data.scrolLWithUseRef(i,e)
                                        }}
                                          onClick={(e) => {
                                            sliderRef.current.slickGoTo(i)
                                        }} >
                                        <span>{item.category_name[locale]}</span>
                                    </Link>
                                    })
                                }
                                {/* {
                                    data?.products && data.products.map((item,i) =>{
                                        return <div onClick={(e) => {
                                            sliders.slickGoTo(i)
                                            data.scrolLWithUseRef(i,e)
                                            
                                        }} className={style.navItem} to={`sec_${i}`} spy={true} smooth={true} exact='true' offset={-50} duration={50} >
                                        <span>{item.category_name[locale]}</span>
                                    </div>
                                    })
                                } */}
                                </Slider>
                                {/* {
                                    data?.products && data.products.map((item,i) =>{
                                        return <div onClick={(e) => data.scrolLWithUseRef(i,e)} className={style.navItem} to={`sec_${i}`} spy={true} smooth={true} exact='true' offset={-50} duration={50} >
                                        <span>{item.category_name[locale]}</span>
                                    </div>
                                    })
                                } */}
                                {/* <Link className={style.navItem} to="sec_1" spy={true} smooth={true} offset={-200} duration={50} >
                                    <span>Recommended</span>
                                </Link>
                                <Link className={style.navItem} to="sec_2" spy={true} smooth={true} offset={-200} duration={50} >
                                    <span>Menu-1</span>
                                </Link>
                                <Link className={style.navItem} to="sec_3" spy={true} smooth={true} offset={-200} duration={50} >
                                    <span>Menu-2</span>
                                </Link> */}
                            </div>
                        </div>
                    }
                </div>
            </header>
            <Modal key={1} show={data.showConfirm} onHide={()=> data.setShowConfirm(false)} size="sm"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered>
                    <Modal.Body>
                        <div className='group-modal'>
                        <div className="title_name_modal">
                                <div className="title_text">เรียกพนักงาน</div>
                                <p className="subtitle_text">คุณต้องการเรียกพนักงานหรือไม่</p>
                        </div>
                        <div className="group_btn_confirm">
                                <div className="btn btn_false" onClick={()=> data.setShowConfirm(false)}>ยกเลิก</div>
                                <div className="btn btn_true" onClick={() => {
                                    data.setShowConfirm(false)
                                    Swal.fire({
                                        icon: 'success',
                                        title: 'เรียกพนักงานเรียบร้อย',
                                        text: 'พนักงานกำลังกำเนินการตามที่ท่านขอ',
                                        showConfirmButton: false,
                                        confirmButtonText: 'Close',
                                    }).then((result) => {
                                        /* Read more about isConfirmed, isDenied below */
                                        router.push('/order')
                                    })
                                }}>ยืนยัน</div>
                        </div>
                        </div>
                </Modal.Body>
            </Modal>
        </>

    )
}
export default Header
// import Head from 'next/head'
import Image from 'next/legacy/image'
import Pages from '/layout/pageMain'
// import Link from 'next/link'
import style from '@/styles/productList.module.scss'
import DetailProduct from '@/components/detailProduct'
import React, { useState, useEffect, useRef, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useAuth } from '@/context/useAuth'
import { useRouter } from 'next/router'
import en from '@/locales/en'
import th from '@/locales/th'
// import ScrollSpy from "react-ui-scrollspy";
// import Slider from "react-slick";
import { animateScroll as scroll } from "react-scroll";
const Index = (props) => {
  let refs = useRef(null);
  const [isDetail, setDetail] = useState(false)
  const [dataItems, setDataItems] = useState([])
  const [scrollY, setScrollY] = useState(false)
  const dataContext = useAuth()
  const router = useRouter()
  const { locale } = router
  const t = locale === "en" ? en : th
  const [Search, setSearch] = useState('')
  // const [dataSearch , setDataSearch] = useState([])
  useEffect(() => {
    if (Search != '') {
      window.scrollTo(0, 0)
    }
  }, [Search])
  const onScroll = useCallback(event => {
    const { pageYOffset, scrollY } = window;
    // console.log("yOffset", pageYOffset, "scrollY", scrollY);
    if (pageYOffset < 100) {
      setScrollY(true)
    } else {
      setScrollY(false)
    }

    // setScrollY(window.pageYOffset);
  }, []);

  useEffect(() => {
    //add eventlistener to window
    window.addEventListener("scroll", onScroll, { passive: true });
    // remove event on unmount to prevent a memory leak with the cleanup
    return () => {
      window.removeEventListener("scroll", onScroll, { passive: true });
    }
  }, []);
  // useEffect(() => {
  //   // refs.current[0].current.focus()
  //   refs.current?.scrollIntoView({ block: "start", behavior: "smooth" });
  //   // dataContext.setHeightCateory()
  // }, [dataContext.heightCateory]);
  useEffect(() => {
    if (!isDetail) {
      var body = document.body;
      body.classList.remove("lockPage");
    }

  }, [isDetail])
  const scrollToTop = () => {
    scroll.scrollToTop();
  };
  const openModelDataItem = (data) => {
    var body = document.body;
    body.classList.add("lockPage");
    setDataItems(data)
    setDetail(true)
  }
  const checkOrder = () => {
    router.push('/cart')
  }
  return (
    <Pages isDetail={isDetail} setSearch={setSearch}>

      {Search == '' ?
        <>
          {
            dataContext.products.length != 0 ? dataContext.products.map((group_cat, index) => {
              return (
                group_cat.category_recommend ?
                  <section className={style.productRec} id={`sec_${index}`} ref={index === dataContext?.heightCateory ? refs : null}>
                    <h1 className={style.title}>{group_cat.category_name[locale]}</h1>
                    <div className={style.group}>

                      {group_cat.menus.map((menu, i) => {
                        return (
                          <div className={style.item} onClick={(e) => { !menu.is_out_stock ? openModelDataItem(menu) : "" }}>
                            <div className={menu.is_out_stock ? [style.pic, style.soldout].join(' ') : style.pic} title={menu.is_out_stock ? t.Soldout : ""} >
                              <Image src={menu?.image_url ? menu?.image_url : "/images/blur.png"} blurDataURL={'/images/blur.png'} placeholder="blur" alt={menu?.image_url} width={300} height={300} layout={'responsive'} style={{ objectFit: "cover" }} />
                            </div>
                            <div className={style.detail}>
                              <h1>{menu?.name[locale] ? menu?.name[locale] : menu?.name["th"]}</h1>
                              <p>{menu?.sale_price != 0 && menu?.sale_price ? (
                                <>
                                  <span>
                                    {menu.sale_price.toLocaleString('en-US')} ฿
                                  </span>
                                  <span className='discount-price'>
                                    {
                                      menu.price.toLocaleString('en-US')
                                    } ฿
                                  </span>
                                </>
                              ) : menu.price.toLocaleString('en-US') + " ฿"} </p>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </section>
                  :
                  <section className={style.productList} id={`sec_${index}`} ref={index === dataContext?.heightCateory ? refs : null}>
                    <h1 className={style.title}>{group_cat.category_name[locale]}</h1>
                    <div className={style.group}>
                      {
                        group_cat.menus.map((menu, i) => {
                          return (
                            <div className={style.item} onClick={(e) => !menu.is_out_stock ? openModelDataItem(menu) : ''}>
                              <div className={menu.is_out_stock ? [style.pic, style.soldout].join(' ') : style.pic} title={menu.is_out_stock ? t.Soldout : ""}>
                                <Image src={menu?.image_url ? menu?.image_url : "/images/blur.png"} blurDataURL={'/images/blur.png'} placeholder="blur" alt="" width={120} height={120} objectFit={"cover"} />
                              </div>
                              <div className={style.detail}>
                                <div className={style.row}>
                                  <h1>{menu?.name[locale] ? menu?.name[locale] : menu?.name["th"]}</h1>
                                  <p>{menu?.description[locale] ? menu?.description[locale] : menu?.description["th"]}</p>
                                </div>
                                {menu.price != 0 && <div className={style.row}>
                                  <p className='txt-md text-dark' style={{ 'fontSize': '20px' }}>{menu?.sale_price != 0 && menu?.sale_price ? (
                                    <>
                                      <span>
                                        {menu.sale_price.toLocaleString('en-US')} ฿
                                      </span>
                                      <span className='discount-price'>
                                        {
                                          menu.price.toLocaleString('en-US')
                                        } ฿

                                      </span>
                                    </>
                                  ) : menu.price.toLocaleString('en-US') + " ฿"}</p>
                                </div>}
                              </div>
                            </div>
                          )
                        })
                      }
                    </div>
                  </section>
              )
            }) : <div className="group_no_item">
              <div style={{ textAlign: " center", fontSize: "24px", lineHeight: "1.2" }}>
                <img src="/images/notfound.png"></img><br /><br />
                ไม่พบเมนูอาหาร<br />
                {/* <span style={{display : "block",color : "#777",fontSize : "22px"}}>ยังไม่มีรายการที่สั่งเข้ามา</span> */}
              </div>

            </div>
          }

          <div className={style.group_button_all}>

            {!scrollY && <div onClick={() => scrollToTop()} className={"arrow-up"}> <i className="fa fa-arrow-up"></i> </div>}

            {
              dataContext.transitions.products.length != 0 &&
              <div className={style.group_button + ' p-3'}>
                <button className={style.addToCart} onClick={() => checkOrder()}>
                  <span>{t.EZ1002}</span>
                  <span>{dataContext.transitions.customer.total} {t.Item}</span>
                </button>
              </div>
            }

          </div>

        </>
        :
        <>
          <section className={style.productList} >
            <div className={style.group}>
              {
                dataContext.dataSearch.map((menu, i) => {
                  return (
                    <div className={style.item} onClick={(e) => { !menu.is_out_stock ? openModelDataItem(menu) : "" }}>
                      <div className={menu.is_out_stock ? [style.pic, style.soldout].join(' ') : style.pic} title={t.Soldout}>
                        <Image src={menu?.image_url ? menu?.image_url : "/images/blur.png"} alt="" width={120} height={120} objectFit={"cover"} />
                      </div>
                      <div className={style.detail}>
                        <div className={style.row}>
                          <h1>{menu?.name[locale] ? menu?.name[locale] : menu?.name["th"]}</h1>
                          <p>{menu?.description[locale] ? menu?.description[locale] : menu?.description["th"]}</p>
                        </div>
                        {menu.price != 0 && <div className={style.row}>
                          <p className='txt-md text-dark' style={{ 'fontSize': '20px' }}>{menu?.sale_price != 0 && menu?.sale_price ? (
                            <>
                              <span>
                                {menu.sale_price.toLocaleString('en-US')} ฿
                              </span>
                              <span className='discount-price'>
                                {
                                  menu.price.toLocaleString('en-US')
                                } ฿

                              </span>
                            </>
                          ) : menu.price.toLocaleString('en-US') + " ฿"}</p>
                        </div>}
                      </div>
                    </div>
                  )
                })
              }
            </div>
          </section>

        </>
      }

      <AnimatePresence initial={false}>
        {isDetail &&
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="modelUp"
          >

            <DetailProduct setDetail={setDetail} dataItem={dataItems} setDetails={setDetail} />
          </motion.div>
        }
      </AnimatePresence>



    </Pages>
  )
}
export default Index

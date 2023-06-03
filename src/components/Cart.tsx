import React, { useEffect, useRef, useState } from 'react'
import styles from '../styles/cart.module.css'
import axios from 'axios'
import {useDispatch, useSelector} from 'react-redux'
import { add, isDisabled} from '../reducer/cartReducer';
import { RootState } from '../reducer/store'
import shopping from '../assets/shopping.png'
import love from '../assets/love.png'
import rating from '../assets/rating.png'
import sales from '../assets/sales.png'
import shipping from '../assets/shipping.png'
import { Link } from 'react-router-dom';



interface items {
  title : string,
  price : number,
  image : string,
  description : string,
  id : number,
  disabled : boolean,
  totalItem: number,
  quantity: number
};

interface prop{
  sideBar: boolean;
  setSideBar: React.Dispatch<React.SetStateAction<boolean>>;
  barHeight: number
}

const Cart:React.FC<prop> = ({sideBar,setSideBar, barHeight}) => {

  const dispatch = useDispatch();

  const [updatedData, setUpdatedData] = useState<items[]>([])
  const [data, setData] = useState<items[]>([])

    const fetchData = async () => {
      try{
        const response = await axios.get<items[]>('https://fakestoreapi.com/products')
        setData(response.data)
      }
      catch(err){
        console.log(err)
      }
    }

    if(data.length === 0){
      fetchData();
    }

    useEffect(()=>{
      setUpdatedData(data.map(item => {
        return {...item, disabled : false, quantity: 1, totalItem: item.price}
      }))
    },[data.length])

    useEffect(()=>{
      dispatch(add(updatedData))
    },[updatedData.length])
    
    const products: Array<items> = useSelector((state : RootState) => state.cart)
  
  const buttonFunction = (id: number) =>{
    dispatch(isDisabled(id));
  }


  return(
    <>

        <div 
        className={`${styles.container} ${sideBar ? styles.blur : ''}`} 
        onClick={() => setSideBar(false)} 
        style={sideBar ? {height : barHeight} : {height : 'auto'}}>


          <div className={styles.Intro}>
            <img src={shopping} alt="Shop online, save time." className={styles.introImg} data-aos="fade-right"/>
            <div className={styles.introBox}>
              <h2 className={styles.introHeader} data-aos="fade-left">
                Shop <span className={styles.headerSpan}>online</span>, save time.
              </h2>
              <h3 className={styles.introText} data-aos="fade-left" data-aos-delay="800">
                Whether you're looking for fashion, electronics, beauty, or home goods, <br />
                <span className={styles.headerSpan}>we've got you covered</span>.
              </h3>
            </div>
          </div>

          <div className={styles.statistics}>
            <div className={styles.statisticBox} data-aos="fade-right" data-aos-delay="200">
              <img src={love} alt="love" className={styles.statisticIcon} />
              <h4 className={styles.statistic}>
                <span className={styles.statisticSpan}>5,000+</span> <br />
                "Satisfied Customers and Counting.."
              </h4>
            </div>

            <div className={styles.statisticBox} data-aos="zoom-in" data-aos-delay="400">
              <img src={sales} alt="rating" className={styles.statisticIcon} />
              <h4 className={styles.statistic}>
                <span className={styles.statisticSpan}>Over $100,000</span> <br />
                "in Sales"
              </h4>
            </div>

            <div className={styles.statisticBox} data-aos="zoom-in" data-aos-delay="600">
              <img src={rating} alt="sales" className={styles.statisticIcon} />
              <h4 className={styles.statistic}>
                <span className={styles.statisticSpan}>4-Star</span> <br />
                "Customer Ratings"
              </h4>
            </div>

            <div className={styles.statisticBox} data-aos="fade-left" data-aos-delay="800">
              <img src={shipping} alt="shipping" className={styles.statisticIcon} />
              <h4 className={styles.statistic}>
                <span className={styles.statisticSpan}>20+ Countries</span> <br />
                "Shipped to Worldwide"
              </h4>
            </div>
          </div>

        <h2 className={styles.categories}>All Categories</h2>
        
        <div className={styles.boxes}>

          <>
            {
              products.map((product, index) => {
                let title = product.title;
                let price = product.price;
                let image = product.image;
                let description = product.description;
                let id = product.id
                let disabled = product.disabled

                return(

                  <div className={styles.box} key={id}>
                    <div className={styles.smallBox}>
                      <img src={image} alt="item" className={styles.productImg}/>
                      <div className={styles.info}>
                        <div className={styles.head}>
                          <h4 className={styles.title}>{title.split(" ").slice(0,3).join(" ")+ '..'}</h4>
                          <h5 className={styles.price}>${price}</h5>
                        </div>
                        <h6 className={styles.description}>
                          {description.split(" ").slice(0,16).join(" ")+ '...'}
                        </h6>
                      </div>
                    </div>
                    <button className={`${styles.button} ${disabled ? styles.disable : ''}`} onClick={() => buttonFunction(id)} disabled={disabled}>
                      Add to Cart
                    </button>
                  </div>
                )
              })
            }
          </>

        </div>

        <div className={styles.footer}>
          <div className={styles.brand} data-aos="fade-right">
            <h2 className={styles.brandHeading}>SHOP HOUSE</h2>
            <h5 className={styles.brandDescription}>
              Established in 2015: With a rich history spanning over 8 years,<br />
              SHOP HOUSE has been a trusted name in the world of shopping. <br />
              Our longevity speaks to our expertise, reliability, and commitment
              to delivering exceptional products and services.
            </h5>
          </div>

          <div className={styles.branches} data-aos="zoom-in">
            <h3 className={styles.brandHeading}>Branches</h3>
            <h5 className={styles.branch}>Downtown Store, <br /> 123 Main Street, New York, NY 10001</h5>
            <h5 className={styles.branch}>Beach side Outlet Store, <br /> 456 Market Street, San Francisco, CA 94103</h5>
            <h5 className={styles.branch}>Mall of America Store, <br /> 789 Broadway Avenue, Chicago, IL 60607</h5>
          </div>

          <div className={styles.links} data-aos="fade-left">
            <h3 className={styles.brandHeading}>Links</h3>
            <h5 className={styles.link}>Facebook</h5>
            <h5 className={styles.link}>Instagram</h5>
            <h5 className={styles.link}>WhatsApp</h5>
          </div>

        </div>
        <div className={styles.credit}>
          <h5 className={styles.salamaCredit}>©2023 developed by <Link target='_blank' to='https://salama-portfolio.web.app/' className={styles.salamaLink}>Mahmoud Salama</Link></h5>
        </div>
      </div>
    </>
  )
}

export default Cart
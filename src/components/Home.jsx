import React from 'react'
import { lazy,Suspense } from 'react'
import { useState,useEffect } from 'react'
import axios from 'axios'
import { BsCalendar } from 'react-icons/bs'
import {AiFillRightCircle,AiFillLeftCircle} from 'react-icons/ai'
import {Helmet} from "react-helmet";
import Footer from './Footer'
import Loader from './Loader'

const MostViewsCard =lazy(()=> import("./MostViewsCard"))
const PostCard= lazy(()=>import('./PostCard')) 
const LatestNews=lazy(()=>import("./LatestNews"))
const date = new Date();
const months = ["जानेवारी", "फेब्रुवारी", "मार्च ", "एप्रिल ", "मे ",  "जून", "जुलै", "ऑगस्ट", "सप्टेंबर ", "ऑक्टोबर ","नोव्हेंबर ", "डिसेंबर"];


export default function Home() {
  const [start,setstart]=useState(false);
  const [end,setend]=useState(false)
  const [maxpage,setmaxpages]=useState(0);
  const [page,setpage]= useState(1);
  const [randomnum,setrandomnum]=useState(0);
  const [posts,setposts] = useState([]);
  const [maxpost, setmaxpost]=useState([]);
  const [isposts,setisposts]=useState(false);
  const BaseURL=process.env.REACT_APP_API_URL+ "/posts"
  const BaseURL2=process.env.REACT_APP_API_URL+ "/posts/maxviewedall"
  const BaseURL3=process.env.REACT_APP_API_URL+ "/posts/getlength"

  let allposts=[];

  const checkpage=()=>{
    if(maxpage==1 && page==1){
      setend(true);
      setstart(true);
    }
}
  const visiblestart=()=>{
      if(page==1){
        setstart(true);
      }else{
        setstart(false);
      }
  }

  const visiblend=()=>{
    if(page==maxpage){
      setend(true);
    }else{
      setend(false);
    }
  }
  const incpage=()=>{
    if(page<maxpage){
      setpage(page+1);
    }
   
  }
  const decpage=()=>{
    if(page > 1){
      setpage(page-1);
    }
  }
  const fetchData=()=>{
    
    axios.get(BaseURL,{
      params:{pageno:page}
    })
    .then((res)=>{
     let allposts = res.data;
     setposts(allposts)
    setisposts(true);
      
  
    })
    
  }
  const fetchMaxnews=()=>{
      axios.get(BaseURL2).then((res)=>{
        setmaxpost(res.data[0])
      })
  }
  const fetchlength=()=>{
      axios.get(BaseURL3).then((res)=>{

          setmaxpages(Math.ceil(Number(res.data)));
      })
  }
  useEffect(()=>{
   fetchlength();
    fetchMaxnews();
    visiblestart();
    visiblend();
    fetchData();
  },[page]);

  useEffect(()=>{
    checkpage();
  },[maxpage])
  return (
<>
  <Helmet>
          <title>SP News</title>
          <meta name="robots" content="index, follow, noodp, noydir" />
          <meta name="description" content=" Karad Local news, explore karad with Spnews, Karad news, Karad Headlines" />
          <meta name="description" content=" Satara Local news, explore Satara with Spnews, Satara news, Satara Headlines" />
          <meta name="keywords" content="Karad satara news,Latest News, News, karad news, karad news today, karad , satara, kolhapur, sangli news, patan news, satara news, patan news in marathi, karad news marathi, local news daily"/>
          <meta name="author" content="Sp news"/>
          <meta name="category" content="News" />
          <meta name="inLanguage" content="mr" />

          <meta property="og:title" content="Karad Latest News in Marathi, Karad Top Headline, Photos, Videos Online, karad latest News, karad Top Headlines, SP News HOME" />
          <meta property="og:description" content=" Get kard  onlinenews and top headlines on SP News, Karad Top headlines, Satara Top headlinesS" />
          <meta property="og:site_name" content="SP NEWS" />
          <meta property='og:type' content='article' />
          

  </Helmet>

<div className='topdiv' style={{paddingBottom:"5px",paddingLeft:"10px", fontSize:"1rem"}}><BsCalendar/> {date.getDate()} {months[date.getMonth()]} {date.getFullYear()}</div>
<div className='homebody'>
  <div className='homeinnerbody'>
    {
      isposts?
      <></>:<Loader/>
    }
    {
      isposts?
      
      <Suspense fallback={<div>Loading...</div>}><MostViewsCard posts={maxpost} key={maxpost._id}/></Suspense>:<></>

    }
      
{
  isposts?
  <Suspense fallback={<div>Loading...</div>}>
           <LatestNews/>
      </Suspense>:<></>
}
<div  style={{backgroundColor:"#e30905", marginTop:"10px"}} >
       <h2 className='title' style={{color:"white",paddingBottom:"5px"}}>Latest news</h2>
       </div>
      
    {
      posts.map((onepost)=>{
        return(
          <Suspense fallback={<div>Posts Loading</div>}>
          <PostCard post={onepost} key={onepost._id}/>

          </Suspense>
        )
      })
    }
    
    {
      isposts?
      
      <div className="pagination">
      {
        start?<button style={{float:"left",backgroundColor:"white",color:"white"}} onClick={decpage} className="paginationPrev"><AiFillLeftCircle/></button>
        :    <button style={{float:"left",backgroundColor:"white"}} onClick={decpage} className="paginationPrev"><AiFillLeftCircle/></button>

      }
      <span>{page}</span>
      {
        end?<button style={{float:"right", backgroundColor:"white",color:"white"}} onClick={incpage} className="paginationNext"><AiFillRightCircle/></button>
        :   <button style={{float:"right", backgroundColor:"white"}} onClick={incpage} className="paginationNext"><AiFillRightCircle/></button>

      }

      
    </div>:<></>

    }
    
    

  </div>
</div>
    {
      isposts?<Footer/>:<></>
    }
     
</>
  )
}

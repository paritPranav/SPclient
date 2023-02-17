import React, { useEffect, useState } from 'react'
import { useLocation,useParams } from 'react-router-dom'
import MostViewsCard from './MostViewsCard';
import PostCard from './PostCard';
import axios from 'axios';
import Loader from './Loader';
import { AiFillRightCircle,AiFillLeftCircle } from 'react-icons/ai';
import Footer from './Footer';
import { Helmet } from 'react-helmet';

export default function Categorypage() {
  let location = useLocation();
  const [start,setstart]=useState(false);
  const [end,setend]=useState(false)
  const [maxpage,setmaxpages]=useState(1);
  const [page,setpage]= useState(1);
  const [posts,setposts] = useState([]);
  const [maxpost, setmaxpost]=useState([]);
  const [isposts,setisposts]=useState(false);
  const [marathiCategory,setMarathiCategory]=useState();
  const {category} = useParams()
  const checkMarathiCategory=()=>{
    if(category=="Agriculture"){
      setMarathiCategory("कृषी");
    }
    if(category=="Crime"){
      setMarathiCategory("गुन्हे वृत्त/अपघात ");
    }
    if(category=="Entertainment"){
      setMarathiCategory("मनोरंजन");
    }
    if(category=="Sports"){
      setMarathiCategory("खेळ जगत");
    }
    if(category=="Education"){
      setMarathiCategory("शिक्षण");
    }
    if(category=="Politics"){
      setMarathiCategory("राजकारण");
    }
    if(category=="Others"){
      setMarathiCategory("इतर");
    }


  }
 


  


  const BaseURL= process.env.REACT_APP_API_URL+ "/posts/fpost"
  const BaseURL2=process.env.REACT_APP_API_URL+ "/posts/maxviewed"
  const BaseURL3=process.env.REACT_APP_API_URL+ "/posts/fpostlength"


const checkpage=()=>{
        if(maxpage==1){
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

 const fetchfilterpost=()=>{

 
    axios.get(BaseURL,{
      params:{
        pcategory:category,
        pageno:page
      }
    })
    .then((res)=>{
      let allposts = res.data;
      setposts(allposts)
      setisposts(true)
    
  
    })

  

  
 }
 const fetchMaxnews=()=>{
  axios.get(BaseURL2,{
    params:{pcategory:category}
  })
  .then((res)=>{  
    let allposts = res.data;
    setmaxpost(allposts)
  

  })
}
const fetchlength=()=>{
  axios.get(BaseURL3,{
    params:{pcategory:category}
  }).then((res)=>{

      setmaxpages(Math.ceil(Number(res.data)));
     
  })
}

 useEffect(()=>{
  fetchlength()
    fetchfilterpost()
    fetchMaxnews()
    setisposts(false)
    checkMarathiCategory()
 },[category])

 useEffect(()=>{
   
 },[posts])

 useEffect(()=>{
  visiblestart();
  visiblend();
  checkpage()
},[page])


  return (
    <div>
        <Helmet>
          <title>SP News|{category}</title>

          <meta name="robots" content="index, follow, noodp, noydir" />
          <meta name="description" content={` Karad ${category} News, Get latest  ${category} News on Sp news`} />
          <meta name="keywords" content={`"${category} News satara , ${category} news today ,Karad satara ${category}  ,news,Latest News, News, karad news, karad news today, karad , satara, kolhapur, sangli news, patan news, satara news, patan news in marathi, karad news marathi, local news daily`} />
          <meta name="author" content="Sp news"/>
          <meta name="category" content="News" />
          <meta name="inLanguage" content="mr" />

          <meta property="og:title" content={` ${category} News in marathi, Satara-karad latest ${category} news in marathi`} />
          <meta property="og:description" content={`Get karad stara ${category} onlinenews and top headlines on SP News, Karad Top headlines, Satara Top headlines`} />
          <meta property="og:site_name" content="SP NEWS" />
          <meta property='og:type' content='article' />
          



        </Helmet>
        <h2 style={{paddingTop:"10vh", textAlign:"center"}}></h2>
        {
      isposts?<MostViewsCard posts={maxpost} key={maxpost._id}/>:<></>

    }
    {
      isposts?<></>:<Loader/>
    }
      {
        isposts?<>
            {
          posts.map((onepost)=>{
            return(
              <PostCard post={onepost} key={onepost._id}/>
            )
          })
        }

        </>:<></>
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
    {
      isposts?<Footer/>:<></>
    }
    </div>
  )
}
  
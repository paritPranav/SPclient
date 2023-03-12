import axios from 'axios';
import React, { useEffect, useState,Suspense } from 'react'
import {SlArrowRight,} from 'react-icons/sl'
import { Link } from 'react-router-dom';



export default function LatestNews() {

  const [post,setpost]=useState([]);
  const posturl=process.env.REACT_APP_API_URL+ "/posts/top5"

  const fetchnews=()=>{

      axios.get(posturl)
      .then((res)=>{
        let allpost=res.data;
        setpost(allpost);
      })
  }

    useEffect(()=>{
    fetchnews()
  },[])
  
  return (
    <div>
            <div className='LatestNewscontainer' style={{height:"auto"}}>
       <div  style={{backgroundColor:"#e30905"}} >
       <h2 className='title' style={{color:"white",paddingBottom:"5px"}}>Top 5 News...</h2>
       </div>
      
        <div className='innercontainer' style={{padding:"0",margin:"0",height:"auto"}}>
        {
          post.map((T)=>{
            return(
            <>
            <Link style={{textDecoration:"none",color:"black"}} to={"/fullpost"+"/"+T._id}  state={{ pid:T._id }}>
            <div className='titleHeading' style={{padding:"10px"}}>
              <h4><SlArrowRight style={{paddingTop:"5px"}}/>{T.Post_Title.substring(0,80)}...</h4>        
          </div>
          <hr style={{width:"100%",marginLeft:"0",color:"black", display:"block"}} />

            </Link>
          
            </>

            )
          })

        }
           
        </div>
    </div>
    </div>
  )
}

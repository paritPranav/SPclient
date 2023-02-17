import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import {FaCalendarAlt} from 'react-icons/fa';
import { Link } from 'react-router-dom';
const months = ["जानेवारी", "फेब्रुवारी", "मार्च ", "एप्रिल ", "मे ",  "जून", "जुलै", "ऑगस्ट", "सप्टेंबर ", "ऑक्टोबर ","नोव्हेंबर ", "डिसेंबर"];

export default function PostCard(props) {

const [Desc, setDesc] = useState(props.post.Post_Description);
const shortDesc= Desc.substring(0,70);
const [Title,setTitle]=useState(props.post.Post_Title);
const [image, setImage]=useState(props.post.Post_Image)
const [id, setid]=useState(props.post._id);
const [category,setcategory]=useState(props.post.Post_Category)
const [marathiCategory,setMarathiCategory]=useState();

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

useEffect(()=>{
  checkMarathiCategory()
})

  return (
    <div className='postcontainer'>
    <br />
    <div className='innercontainer'>
        <div className='imgpart'>
            <img className='cardimg' src={image} alt="" />
        </div>
        <div className='infopart'>
            <h4>
              {Title}  
            </h4>
            
            
            <p >{shortDesc}...<Link to={"/fullpost"+"/"+id}>read More</Link></p>
            <hr style={{marginLeft:0,width:"60%",marginTop:"5px"}}/>
            <p> {marathiCategory} | <FaCalendarAlt/>  {props.post.Post_Date.substring(8,10)}  {months[Number(props.post.Post_Date.substring(5,7))-1]} </p>
           
        </div>
    </div>
    <hr style={{display:"block"}}/>
</div>
  )
}

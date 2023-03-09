/* styles.module.css */
import axios from 'axios';
import React, { useEffect,Suspense } from 'react'
import { BsArrowLeft ,BsFillShareFill,BsYoutube} from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useParams ,Link} from 'react-router-dom';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import toast, { Toaster } from 'react-hot-toast';
import { Helmet } from 'react-helmet';
import Loader from './Loader';
import Footer from './Footer';
import PostCard from './PostCard';
import Popup from 'reactjs-popup';
import {AiFillCloseCircle} from'react-icons/ai'



import {  WhatsappShareButton, WhatsappIcon} from "react-share";
const months = ["जानेवारी", "फेब्रुवारी", "मार्च ", "एप्रिल ", "मे ",  "जून", "जुलै", "ऑगस्ट", "सप्टेंबर ", "ऑक्टोबर ","नोव्हेंबर ", "डिसेंबर"];


export default function FullPost() {
    const notify = () => toast('Copied to clipboard.');

    const BaseURL= process.env.REACT_APP_API_URL+ "/posts/fpost"
    const posturl=process.env.REACT_APP_API_URL+ "/posts/post"
    const viewinc=process.env.REACT_APP_API_URL+ "/posts/incview"
    const[isposts,setisposts]=useState(false);
    const[post,setpost]= useState([]);
    const [link,setlink]=useState("");
    const [islink,setislink]=useState(false);
    const [title,settilte]=useState('');
    const [posts,setposts] = useState([]);
    const [category,setcategory]=useState('');
    // const id=location.state.pid;
    // console.log(id);

    const { id } = useParams()
    console.log(id)
    const navigate=useNavigate()
    // console.log(post.Post_Date());

    const fetchPost=()=>{
        
        axios.get(posturl,{
            params:{postid:id}
        }).then((res)=>{
                setpost(res.data);
                setisposts(true);
                setlink(res.data.Post_Video_Link)
        })

        //increment view
        axios.patch(viewinc,{id:id})
        .then((res)=>{
        })
    }

 const fetchfilterpost=()=>{

 
    axios.get(BaseURL,{
      params:{
        pcategory:category
      }
    })
    .then((res)=>{
      let allposts = res.data;
      setposts(allposts)
     console.log(posts)
  
    })

  

  
 }


    useEffect(()=>{
        fetchPost()
        window.scroll({top:0})

    },[id])
 
    useEffect(()=>{
        setcategory(post.Post_Category);
        console.log(category)
        fetchfilterpost()
        console.log(post.Post_Date);
    },[post])
    
    useEffect(()=>{
            if(link==""){
                setislink(false);
            }else{
                setislink(true)
            }
            console.log(islink);
    },[link])

    const [open, setOpen] = useState(true);
    const closeModal = () => setOpen(false);

    
  return (

    
    <div style={{paddingTop:"10vh"}}>
    {/* <Popup className='popo' open={open} closeOnDocumentClick onClose={closeModal}>
        <div className="modal">
          <a className="close" onClick={closeModal}>
<AiFillCloseCircle/> 
          </a>
          <img src={require('../poster.png')} width="90%" style={{marginLeft:"5%"}}></img>
        </div>
      </Popup> */}
     <Helmet>
          <title>{post.Post_Title}</title>
          <meta name="description" content={post.Post_Description} />
          <meta name="keywords" content={post.Post_Keywords}/>
          <meta name="author" content="Sp news"/>
          <meta name="category" content="News" />
          <meta name="inLanguage" content="mr" />

          <meta property="og:title" content={post.Post_Title} />
          <meta property="og:description" content={post.Post_Description} />
         

          <meta name="robots" content="index, follow, noodp, noydir" />
          <meta property="og:site_name" content="SP NEWS" />
          <meta property='og:type' content='article' />
        <meta property='og:image' content={post.Post_Image} />

    </Helmet>

   {
    isposts?
    <>
        <Toaster/>
        <Link to={`/categoryPage/${post.Post_Category}`} style={{textDecoration:"none"}}>
            <button className='backbutton' > <BsArrowLeft className='arrow'/></button>
        </Link>
       
        <WhatsappShareButton
          url={window.location.href}
          title={`*${post.Post_Title}*`}
          className="sharebutton" 
        >

          <WhatsappIcon size={36} round="true"/>
        </WhatsappShareButton>
        <div className='postimagediv'>
        <img className='postimage' src={post.Post_Image}  alt="Loading" />

        </div>
        <br />
        <div className="postinfo">
            <div className='heading'>
        <h4>{post.Post_Title}</h4>
            </div>
            <br />
            <p style={{fontSize:"1.2rem",marginBottom:"10px"}}>{post.Post_Place}: {post.Post_Date.substring(8,10)}  {months[Number(post.Post_Date.substring(5,7))-1]} </p>
            
            <p style={{fontSize:"1.2rem"}}>	&nbsp;	&nbsp;	&nbsp;	&nbsp;	&nbsp;	&nbsp;	&nbsp;{post.Post_Description}</p>
            {
             islink?<div style={{textAlign:"center"}}><a href={post.Post_Video_Link} style={{textDecoration:"none"}} target="_blank"><BsYoutube/> Youtube Video Link</a></div>:<></>
            }
        </div>
            
        <hr/>
        <h3 style={{textAlign:"center",marginTop:"15px"}}>--------   संबंधित बातम्या   --------</h3>
        {
          posts.filter((onepost)=>{
            return(id!=onepost._id)
          }).map((onepost)=>{
            return(
                <PostCard post={onepost} key={onepost._id}/>
              )
          })
        }

    <Footer/>
    </>:<Loader/>
   }
    
  
    </div>
  )
}

            

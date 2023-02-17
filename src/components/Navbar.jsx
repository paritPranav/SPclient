import React, { useState } from 'react'
import {Routes, Route, BrowserRouter as Router,Switch,Link, useNavigate, useRoutes,useLocation} from 'react-router-dom';
import {FaBars,FaHome} from "react-icons/fa";
import {BsArrowUpRight} from "react-icons/bs"
export default function Navbar() {
const[Mobile, setmobile]=useState(false);


const route=useLocation();
let category=route.pathname.split("/")[2]
console.log();

const [marathiCategory,setMarathiCategory]=useState();

// const checkMarathiCategory=()=>{
//   if(category=="Agriculture"){
//     setMarathiCategory("कृषी");
//   }
//   if(category=="Crime"){
//     setMarathiCategory("गुन्हे वृत्त/अपघात ");
//   }
//   if(category=="Entertainment"){
//     setMarathiCategory("मनोरंजन");
//   }
//   if(category=="Sports"){
//     setMarathiCategory("खेळ जगत");
//   }
//   if(category=="Education"){
//     setMarathiCategory("शिक्षण");
//   }
//   if(category=="Politics"){
//     setMarathiCategory("राजकारण");
//   }
//   if(category=="Others"){
//     setMarathiCategory("इतर");
//   }
// }

const categories={

    Agriculture:"> कृषी",
    Crime:"> गुन्हे वृत्त/अपघात",
    Entertainment:"> मनोरंजन",
    Sports:"> खेळ जगत",
    Education:"> शिक्षण",
    Politics:"> राजकारण",
    Others:"> इतर"

}


  return (
    <div>
      <nav className='navbar' >
      {/* <div className='container'> */}
        
     
        <h3 className='logo'> SP News {categories[category]} </h3>
       
   
      <ul className={Mobile? "nav-links-mobile":"nav-links"} onClick={()=>{setmobile(false)}}> 
      <Link to="/" style={{textDecoration:"none"}} state={{ category: "Home" }}  >
          <li style={{}}><FaHome/></li>
        </Link>
        <hr/>
        <Link to={"/categoryPage"+"/"+"Agriculture"} style={{textDecoration:"none"}}>
          <li >कृषी</li>
        </Link>
        <hr />
        <Link to={"/categoryPage"+"/"+"Crime"} style={{textDecoration:"none"}} >
          <li>गुन्हे वृत्त/अपघात </li>
        </Link>
        <hr />
        <Link to={"/categoryPage"+"/"+"Entertainment"} style={{textDecoration:"none"}} >
          <li>मनोरंजन</li>
        </Link>
        <hr />
        <Link to={"/categoryPage"+"/"+"Sports"} style={{textDecoration:"none"}} >
          <li>खेळ जगत</li>
        </Link>
        <hr />
        <Link to={"/categoryPage"+"/"+"Education"} style={{textDecoration:"none"}} >
          <li>शिक्षण</li>
        </Link>
        <hr />
        <Link to={"/categoryPage"+"/"+"Politics"} style={{textDecoration:"none"}}>
          <li>राजकारण</li>
        </Link>
        <hr />
        <Link to={"/categoryPage"+"/"+"Others"} style={{textDecoration:"none"}} >
          <li>इतर..</li>
        </Link>
     

      </ul>
      <button className='Mobile-Menu-Button' onClick={()=>{setmobile(!Mobile)}}>
        {Mobile?<BsArrowUpRight/>:<FaBars/>}

      </button>
      {/* </div> */}
      </nav>

    </div>
  )
}

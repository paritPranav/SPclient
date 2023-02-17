import React from 'react'
import { BsYoutube,BsFillTelephoneFill,BsEnvelopeFill } from 'react-icons/bs'
export default function Footer() {
  return (
    <> 

    <footer class="footer">
        <div class="icons">
           <a href="https://www.youtube.com/@sporiginative7108" target="_blank"><BsYoutube/> SP News</a>
            <br />
            <br />
            <a href="#"><BsEnvelopeFill/> spnews205@gmail.com</a>
            <br />
            <br />
           <a href="#"><BsFillTelephoneFill/> +91 82086 96562</a>
            <br />
            <br />
            {/* <p class="company-name">
                ABC &copy; 2021, ALL Rights Reserved
            </p> */}
        </div>
    </footer>
    
    </>
  )
}

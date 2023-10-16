import React from 'react'
import {GrFacebook} from "react-icons/gr"
import {FaTwitter} from "react-icons/fa"


export default function Profile() {
  return (
   <>
   <div className='max-w-2xl mx-auto my-20 grid grid-cols-1 md:gap-8 bg-white md:grid-cols-2 rounded-lg shadow-lg md:place-items-center overflow-hidden'>
    <article>
        <img src="https://images.pexels.com/photos/343717/pexels-photo-343717.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Thomas Sankara"
        className='md:h-64 md:object-cover ' />
    </article>

    <article className='p-8 md:p-0 md:pr-8'>
        <h3 className='text-2xl mb-4'>Thomas Sankara</h3>
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptas illum illo aperiam. Minus nisi vel perspiciatis cupiditate voluptas natus! Temporibus.</p>
    
    <ul className='flex items-center justify-start gap-4 mt-8'>
        <li><GrFacebook className='text-2xl text-slate-600'/></li>
        <li><FaTwitter className='text-2xl text-slate-600'/></li>

    </ul>
    </article>
    </div>
    </>
  )
}

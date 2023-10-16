import React, {useState, useEffect} from 'react'
import { Link, useParams } from 'react-router-dom';
import {client} from "../libs/client.js"
import { format } from 'date-fns';
import {PortableText} from "@portabletext/react"
import Profile from '../components/Profile.js';

export default function BlogPost() {
  const [blogpost, setBlogpost] = useState([]);
  const {slug} = useParams()

  useEffect(() =>{
    client.fetch(
      `*[slug.current == "${slug}"] {
        title,
        slug,
        body,
        publishedAt,
        mainImage{
          asset -> {
            _id,
            url
          },
          alt,
        },
        "name": author -> name,
      }`
    ).then((data) => {
      setBlogpost(data[0])
  })
    .catch(console.error); 
  }, [slug])

  useEffect(() => {
    document.title = `Reading | ${blogpost.title}`
  }, [slug])
  
  return (
    <>
    {blogpost && <section className='py-20 px-5 max-w-5xl mx-auto'>
       {blogpost.mainImage && <img src={blogpost.mainImage.asset.url}  alt ={blogpost.mainImage.alt} 
       className='h-[50%] w-full object-cover rounded-2xl shadow'/>}
       <h1 className='text-4xl my-8 xl:text-6xl'>{blogpost.title}</h1>
      <p className='font-bold text-sm mb-8'>By {blogpost.name} {blogpost.publishedAt && <>
        &middot;{" "}
      {format(new Date(blogpost.publishedAt), "dd MMMM yyyy")}</>}
      </p>

      <PortableText value={blogpost.body}/>
       <div className='max-w-7xl mx-auto px-5 mb-20 mt-10 flex items-end justify-end '>
      <Link to="/blog" className='bg-white py-2 px-8 rounded shadow
       text-slate-800 tracking-wide hover:opacity-75 transition-all duration-200 w-full md:w-auto'>Read More Blog Posts</Link>
      </div>
      <Profile />
       </section>}
    </>
 )
}

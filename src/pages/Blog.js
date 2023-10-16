import React, { useEffect, useState } from 'react'
import {client} from "../libs/client"
import {format} from "date-fns"
import {Link} from "react-router-dom"

export default function Blog() {

  const [stories, setStories] = useState([])

useEffect(() =>{
  client.fetch(
    `*[_type == "post"] {
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
    } | order(publishedAt desc)`
  ).then((data) => {
    setStories(data)
    console.log(data)
})
  .catch(console.error); 
}, [])

  return (
    <>
    <div className='max-w-7xl px-5 mx-auto mt-20 mb-10'>
      <h1 className='text-4xl lg:text-6xl mb-6 capitalize'>All Blog Posts</h1>
    </div>
    <section className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto px-5 mb-10'>
       {stories.map((story) => (
        <Link to = {`/blog/${story.slug.current}`}  key={story.slug.current}> 
        <article className='border border-slate-400 rounded-lg overflow-hidden hover:bg-slate-200 transition-all duration-200'>
        {story.mainImage && <img 
        src={story.mainImage.asset.url}
        alt={story.mainImage.alt} loading='"lazy'
        className='md:h-50 w-full object-cover' />}
        <div className='p-4'>
        <p className='text-sm'>By {story.name} &middot; {format(new Date(story.publishedAt), "dd MMMM yyyy")} </p>
        <h2 className='text-xl my-2'>{story.title}</h2>
        <p className='text-sm leading-relaxed'>
        {`${story.body[0].children[0].text.substring(0,200)}...`}</p> 
        </div>
      </article></Link>
       ))}
      </section>
      <div className='max-w-7xl mx-auto px-5 mb-20 flex items-end justify-end '>
      <Link to="/" className='bg-white py-2 px-8 rounded shadow
       text-slate-800 tracking-wide hover:opacity-75 transition-all duration-200 w-full md:w-auto'>Back to Homepage</Link>
      </div>
      </>
  )
}

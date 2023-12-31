import React, {useState, useEffect} from 'react'
import NewsLetter from '../components/NewsLetter'
import Profile from '../components/Profile'
import Footer from '../components/Footer'
import {client} from "../libs/client"
import {format} from "date-fns"
import {Link} from "react-router-dom"



export default function HomePage() {
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
    setStories(data.slice(0,3))
})
  .catch(console.error); 
}, [])

  return (
    <>
      {stories[0] && <Link to = {`/blog/${stories[0].slug.current}`}> 
        <section className='max-w-7xl mx-auto my-20 px-5'>
        <article className='relative'>
         {
          stories[0].mainImage &&  <img src={stories[0].mainImage.asset.url}
          alt={stories[0].mainImage.alt} className='h-96 w-full object-cover rounded-2xl' />
         }
          <div className='absolute bottom-8 left-8'>
            <h1 className='text-4xl lg:text-5xl mb-6 text-white capitalize'>{stories[0].title}</h1>
            <p className='text-slate-200 mb-8 md:w-1/2'>{`${stories[0].body[0].children[0].text.substring(0,200)}...`}</p>
            <Link to={`/blog/${stories[0].slug.current}`} className='bg-white py-2 px-8 rounded shadow
                text-slate-800 tracking-wide hover:opacity-75 transition-all duration-200 w-full md:w-auto'>Read More</Link>
          </div>
        </article>
      </section></Link>}

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
      <Link to="/blog" className='bg-white py-2 px-8 rounded shadow
       text-slate-800 tracking-wide hover:opacity-75 transition-all duration-200 w-full md:w-auto'>Read All Blog Posts</Link>
      </div>
      
      <NewsLetter />
      <Profile />
      <Footer />
    </>
  )
}

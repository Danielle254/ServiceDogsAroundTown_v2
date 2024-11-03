import React from 'react'

export default function AboutPage({ page }) {
  if (page === 'about') {
    return (
      <div>
        <p>about page</p>
        <p>Created with React, Tailwind CSS, Google Maps API, and Firebase. <span><a href='https://github.com/Danielle254/ServiceDogsAroundTown_v2' className='underline'>View Code</a></span></p>
      </div>
    )
  }
  
}

import React from 'react'

export default function AboutPage({ page }) {
  if (page === 'about') {
    return (
      <div>
        <h2 className='text-xl font-bold'>Created for Service Dog Handlers by a Service Dog Handler</h2>
        <h3 className='text-lg font-bold'>Easily save and reference information about local businesses as it affects the safety and comfort of your service dog.</h3>
        <img src='https://upload.wikimedia.org/wikipedia/commons/b/bf/Service_dogs_20181212-Library-52_%2846753606291%29.jpg' alt='yellow labrador retriever service dog wearing a green guide dogs for the blind vest looks up and to the right while laying down' className='w-48'/>
        <p>This app was created to solve a personal problem - I couldn't always reliabily remember which restaurants I'd visited in town were good choices and which I should avoid going back to. What was the space like? How were the staff?</p>
        <br/>
        <p>It's often difficult to get the information we need as service dog handlers to make good choices on where to visit and know what to expect. I was researching Google photos and reviews, checking out the restaurant's website and social media, and sometimes even having to call to find out what I needed to plan my visit. Things like is all of your seating at bar height? My service dog needs easy access to me to alert and task; I can't be up on a barstool.</p>
        <br/>
        <p>And you can't always tell from those other sources if the floor is dirty, sticky, or contains hazards like glass.</p>
        <br/>
        <p>I wanted to create a tool for people like myself to capture these important pieces of information after a visit and easily look back on it when needed. This also makes travel easier for service dog handlers as you can look up local places you might be thinking of visiting and see if anyone's left a positive review.</p>
        <p>A final key piece of this website is noting where you encountered access issues or safety issues. Going through the experience of a business denying you and your service dog access, even though rights are protected under the ADA, can be incredibly stressful and may even trigger medical events. This website will help you know where to avoid, or read success stories of denied access issues being successfully resolved.</p>
        <h3 className='text-lg font-bold'>How to Use This Website</h3>
        <p></p>
        <p>Created with React, Tailwind CSS, Google Maps API, and Firebase. <span><a href='https://github.com/Danielle254/ServiceDogsAroundTown_v2' className='underline'>View Code</a></span></p>
      </div>
    )
  }
  
}

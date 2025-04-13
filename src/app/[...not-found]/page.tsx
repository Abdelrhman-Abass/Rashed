
import { Button } from '@/components/ui/button'
import React from 'react'

export default function page() {
  return (
    <section className='not_found py p-lg'>
      <div className="not_found_page">
        <div className="not_found_page_image"></div>
        <div className="not_found_page_content">
          <h2>error404.title</h2>
          <p>error404.message</p>
          <Button title="return"/>
        </div>
      </div>
    </section>
  )
}

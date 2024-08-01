"use client";
import Image from 'next/image'
import styles from './page.module.css'

import App from './components/App'

export default function Home() {



  return (
    <main>
      <div className="container m-5 text-center " >
        <h1 >RTK Weather</h1>
      </div>
      
      <App />
      
    </main>
  )
}

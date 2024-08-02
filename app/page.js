"use client";
import Image from 'next/image'
import styles from './page.module.css'

import App from './components/App'

export default function Home() {



  return (
    <main>
      <div className="container mt-5" >
        <h1 className="text-center" >RTK Weather</h1>
      </div>
      
      <App />
      
    </main>
  )
}

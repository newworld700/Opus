'use client'
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Footer from '@/components/Footer'
import { checkAuth } from '@/store/slices/authSlice'

export default function ClientLayout({ children }) {
  const pathname = usePathname()
  const dispatch=useDispatch()

  useEffect(()=>{
    dispatch(checkAuth())
  },[dispatch])

  return (
    
      <div className="min-h-screen flex flex-col">
  
        <main className="flex-grow">{children}</main>
       <Footer />
      </div>
 
  )
}
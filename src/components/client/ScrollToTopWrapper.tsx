'use client'

import dynamic from 'next/dynamic'

const DynamicScrollToTop = dynamic(() => import('@/components/ScrollToTop'), {
  ssr: false,
})

export default function ScrollToTopWrapper() {
  return <DynamicScrollToTop />
} 
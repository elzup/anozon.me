import dynamic from 'next/dynamic'

const Index = dynamic(() => import('../src'), { ssr: false })

export default Index

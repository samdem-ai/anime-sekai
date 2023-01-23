import Image from 'next/image'
import Popular from '../components/Popular'
import NewestRelease from '../components/NewestRelease'
import Recommended from '../components/Recommended'
import RandomQuote from '../components/RandomQuote'

export default async function Home() {
  return (
    <main className='page'>
      <Popular></Popular>
      <div className="grid-layout">
        <NewestRelease></NewestRelease>
        <Recommended></Recommended>
        <RandomQuote></RandomQuote>
      </div>
    </main>
  )
}

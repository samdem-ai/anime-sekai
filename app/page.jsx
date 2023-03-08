import Image from 'next/image'
import Popular from '../components/Popular'
import NewestRelease from '../components/NewestRelease'
import Recommended from '../components/Recommended'
import RandomQuote from '../components/RandomQuote'
import Footer from '../components/Footer'
import SearchBar from '../components/SearchBar'

export default async function Home() {
  return (
    <>
      <main className='page'>
        <SearchBar></SearchBar>
        <Popular></Popular>
        <div className="grid-layout">
          <NewestRelease></NewestRelease>
          <Recommended></Recommended>
          <RandomQuote></RandomQuote>
        </div>

      </main>
      <Footer></Footer>
    </>
  )

}

import type { NextPage } from 'next'
import { useRef, useState } from 'react'


const Home: NextPage = () => {

  const linkRef = useRef<HTMLInputElement>(null);

  const [shortenedLink, setShortenedLink] = useState<string>()
  const [loading, setLoading] = useState<boolean>(false)

  const createLink = async (original?: String) => {
    if (!original || loading) return;
    setLoading(true)
    const response = await fetch('/api/create-url/create', {
      method: "POST",
      body: JSON.stringify(
        {
          link: original,
        }
      )
      ,
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const data = await response.json()
    setLoading(false)
    setShortenedLink(`${window.location.origin}/${data}`)


  }

  return (
    <div className='w-full flex justify-center center mt-10 '>
      <div className="flex flex-col w-1/2 justify-center">
        <h1 className='self-center mb-10'  >URL SHORTENER</h1>
        <div className='self-center'>
          <table >
            <tbody>
              <tr>
                <td className='px-5 py-2'>
                  <h2>Link</h2>
                </td>
                <td>
                  <input ref={linkRef} className='border-2 text-center' type={"text"} />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        {shortenedLink && <div className=' py-5 self-center'>
          <a className='underline text-slate-600' target={"_blank"} rel='noreferrer' href={shortenedLink}>{shortenedLink}</a>
        </div>}
        <button onClick={() => createLink(linkRef.current?.value)} className={`${loading ? "bg-slate-200" : "bg-slate-400"} rounded-lg w-fit p-3 self-center mt-8`}>Shorten</button>
      </div>
    </div>
  )
}

export default Home

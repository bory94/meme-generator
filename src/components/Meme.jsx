import {useEffect, useRef, useState} from "react";
// import memesData from "../data/memesData"

export const Meme = () => {
  const topTextRef = useRef(null)
  const bottomTextRef = useRef(null)
  useEffect(() => {
    topTextRef.current.focus()
  }, [topTextRef]);

  const [memesData, setMemesData] = useState([])
  const [meme, setMeme] = useState({
    topText: "",
    bottomText: "",
    url: ""
  })

  useEffect(() => {
    fetch('https://api.imgflip.com/get_memes')
    .then(response => response.json())
    .then(data => setMemesData(data.data.memes))
  }, [])

  const onGenerate = () => {
    if (memesData.length === 0) {
      console.log('There is no memes data loaded.')
      return
    }
    const index = Math.floor(Math.random() * memesData.length)
    const data = memesData[index]
    const changedMeme = {...meme, url: data.url}

    setMeme(changedMeme)
  }

  const onTextChanged = (e) => {
    const {name, type, value, checked} = e.target
    setMeme({
      ...meme,
      [name]: type === 'checkbox' ? checked : value
    })
  }

  return (
      <main className="meme">
        <div className="form">
          <input type="text" placeholder="Top text" className="form--input"
                 ref={topTextRef} value={meme.topText}
                 onChange={onTextChanged} name="topText"/>
          <input type="text" placeholder="Bottom text" className="form--input"
                 ref={bottomTextRef} value={meme.bottomText}
                 onChange={onTextChanged} name="bottomText"/>
          <button onClick={onGenerate} className="form--button">Get a new meme
            image
          </button>
        </div>
        {
            meme.url &&
            <div className={"meme--generated"}>
              <img src={meme.url} alt={"memeImage"} className={"memeImage"}/>
              <h2 className="meme--text top">{meme.topText}</h2>
              <h2 className="meme--text bottom">{meme.bottomText}</h2>
            </div>
        }
      </main>
  )
}
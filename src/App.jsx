import { useCallback, useEffect, useRef, useState } from "react"

function App() {
  
  const [copyButtonColor, setCopyButtonColor] = useState(false)
  const [length, setLength] = useState(8)
  const [charAllowed, setCharAllowed] = useState(false)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [password, setPassword] = useState("")

  // use Ref hook
  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (numberAllowed) str += "0123456789"
    if (charAllowed) str += "!@#$%^&*+=[]{}~`"
    for (let i = 1; i < length; i++){
      let char = Math.floor(Math.random() * str.length + 1)
    pass += str.charAt(char)
    }
    setPassword(pass)
  }, [length, charAllowed, numberAllowed, setPassword])

  const handleCopyColor = () => {
    setCopyButtonColor(!copyButtonColor)
    setTimeout(()=> setCopyButtonColor(false), 1000)
  }
  const copyPasswordToClipboard = useCallback(()=> {
    passwordRef.current?.select()
    passwordRef.current?.setSelectionRange(0,100)
    window.navigator.clipboard.writeText(password)
  }, [password])

  useEffect(()=> {
    passwordGenerator()
  } ,[length, charAllowed, numberAllowed, passwordGenerator])
  return (
    <>
   <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-800">
    <h1 className="text-white text-center my-3 text-2xl">Password generator</h1>
    <div className="flex shadow rounded-lg overflow-hidden mb-4">
      <input type="text"
      value={password}
      className="outline-none w-full py-1 px-3" 
      placeholder="password"
      ref={passwordRef}
      readOnly/>
      <button onClick={copyPasswordToClipboard, handleCopyColor} className={`duration-200 outline-none ${ copyButtonColor ? "bg-green-700" : " bg-blue-700"} text-white px-3 py-0.5 shrink-0`}>{copyButtonColor ? "Copying ✓" : "Copy"}</button>
    </div>
    <div className="flex text-sm gap-x-2">
      <div className="flex items-center gap-x-1">
        <input type="range" min={6} max={100} value={length} onChange={(e)=> setLength(e.target.value)} className="cursor-pointer"/>
        <label>Length {length}</label>
      </div>
      <div className="flex items-center gap-x-1">
        <input type="checkbox" defaultValue={numberAllowed} id="numberInput" onChange={()=> setNumberAllowed((prev) => !prev)} />
        <label htmlFor="numberInput">Number</label>
      </div>
      <div className="flex items-center gap-x-1">
        <input type="checkbox" defaultValue={charAllowed} id="charAllowed" onClick={() => setCharAllowed((prev) => !prev)} />
        <label htmlFor="charAllowed">Character</label>
      </div>
    </div>
   </div>
    </>
  )
}

export default App

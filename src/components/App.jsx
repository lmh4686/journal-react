import React, { useEffect, useReducer } from "react"
import { Routes, Route, useParams, useNavigate } from "react-router-dom"
import Navbar from "./Navbar"
import CategorySelection from "./CategorySelection"
import Home from "./Home"
import NewEntry from "./NewEntry"
import ShowEntry from "./ShowEntry"
import reducer from "../reducer"
import JournalContext from "../context"

const initialState = {
  entries: [],
  categories: [],
}

const App = () => {
  // const [entries, setEntries] = useState([])
  // const [categories, setCategories] = useState([])
  const [state, dispatch] = useReducer(reducer, initialState)
  const { entries, categories } = state

  const nav = useNavigate()

  useEffect(() => {
    // To use async function should be this way.
    async function getCategories() {
      const res = await fetch('https://journal-api-production-98a0.up.railway.app/categories')
      const data = await res.json()
      // setCategories(data)
      dispatch({
        type: "setCategories",
        categories: data,
      })
    }
    getCategories()
  }, [])


  useEffect(() => {
    // To use async function should be this way.
    async function fetchEntries() {
      const res = await fetch('https://journal-api-production-98a0.up.railway.app/entries')
      const data = await res.json()
      // setEntries(data)
      dispatch({
        type: "setEntries",
        entries: data
      })
    }
    fetchEntries()
  }, [])

  // HOC (higher-order component)
  const ShowEntryWrapper = () => {
    const { id } = useParams()
    const entry = entries[id]
    return entry ? <ShowEntry entry={entry} /> : <h4>Entry not found!</h4>
  }

  const addEntry = async (category, content) => {
   const id = entries.length
  //  const categoryObject = categories.find(cat => cat.name === category)
    // Add a new entry
    const newEntry = {
      category: category,
      content: content
    }

    const returnedEntry = await fetch('https://journal-api-production-98a0.up.railway.app/entries', {
      method: 'POST',
      headers: {
        //No need quote for single word key
        // Response with json.
         Accept: 'application/json',
         // Letting server know what data is sending by request
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newEntry)
    })
    const data = await returnedEntry.json()
    // setEntries([...entries, data])
    dispatch({
      type: "addEntry",
      newEntry: data
    })
    nav(`/entry/${id}`)
  }

  return (
    <JournalContext.Provider value={{ state, dispatch }}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home entries={entries}/>} />
        <Route path="/category" element={<CategorySelection categories={categories} />} />
        <Route path="/entry/:id" element={<ShowEntryWrapper />} />
        <Route path="/entry/new/:category" element={<NewEntry addEntry={addEntry} />} />
        <Route path="*" element={<h4>Page not found!</h4>} />
      </Routes>
      {/* <Home />
            <CategorySelection />
            <NewEntry /> */}
    </JournalContext.Provider>
  )
}

export default App
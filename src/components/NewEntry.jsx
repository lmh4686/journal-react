import React, { useState } from "react"
import { useParams, useNavigate } from "react-router-dom"

const NewEntry = ({ addEntry }) => {
  const { category } = useParams() //Enable to access the last endpoint
  const [entry, setEntry] = useState('')

  function submit(evt) {
    evt.preventDefault()
    addEntry(category, entry)
  }

  return (
    <>
      <h2>New Entry in {category} category</h2>
      <form onSubmit={submit} className="container">
        <div>
          <textarea value={entry} onChange={(evt) => setEntry(evt.target.value)} rows="10" className="form-control"></textarea>
        </div>
        <button className="btn btn-primary mt-2">Create Entry</button>
      </form>
    </>
  )
}

export default NewEntry
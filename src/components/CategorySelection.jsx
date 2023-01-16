import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const CategorySelection = ({ categories }) => {

  return (
    <>
      <h2>Please select a category:</h2>
      <ul>
        {categories.map((cat, index) => (
          <li key={index}>
            <Link to={`/entry/new/${cat.name}`}>{cat.name}</Link>
          </li>          
        ))}
      </ul>
    </>
  )
}

export default CategorySelection
import React, { useState, useEffect } from 'react'
import Card from '../components/Card'
import axios from 'axios'
import '../styles/Search.scss'

const Search = () => {
  const [kittehs, setKittehs] = useState([])
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredKittehs, setFilteredKittehs] = useState([])

  useEffect(() => {
    setLoading(true)
    axios
      .get('http://sdg-octodex.herokuapp.com')
      .then((resp) => {
        setKittehs(resp.data.data)
        setLoading(false)
        // console.log(resp.data.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  useEffect(() => {
    setFilteredKittehs(
      kittehs.filter((kitteh) =>
        kitteh.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    )
  }, [searchTerm, kittehs])

  if (loading) {
    return <p>Loading...</p>
  }

  return (
    <>
      <div className="search-bar-container">
        <input
          type="text"
          className="search"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="cards-container">
        <Card kittehs={filteredKittehs} />
      </div>
    </>
  )
}

export default Search

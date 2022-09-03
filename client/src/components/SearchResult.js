import React, {useState, useEffect} from "react"
import Card from 'react-bootstrap/Card'
import axios from 'axios'

export const SearchResult = ({ image, organ }) => {
    const [topResults, setTopResults] = useState([])

    useEffect(() => {
        const getPlantInfo = async () => {
          try {
            const { data } = await axios.post('http://localhost:3001/remote/identifyPlant/:image/:organ')
            setUser(data)
          } catch (e) {
            setMsg('error while fetching logged in user')
          }
        }
        getPlantInfo()
      }, [])

    return (
        <>
            <h1>hi</h1>
        </>
    )

}
import React, {useState, useEffect} from "react"
import axios from 'axios'
import { MoreInfo } from "./MoreInfo"

import Card from 'react-bootstrap/Card'
import Button from "react-bootstrap/Button"
import { Container } from "react-bootstrap"
import Spinner from 'react-bootstrap/Spinner';


export const SearchResult = ({ image, organ }) => {
    const [topResults, setTopResults] = useState([])
    const [modalShow, setModalShow] = useState(false)
    const [scientificName, setScientificName] = useState('')

    useEffect(() => {
        const getPlantInfo = async () => {
            const encodedImage = encodeURIComponent(image)
          try {
            const { data } = await axios.post(`http://localhost:3001/remote/identifyPlant/${encodedImage}/${organ}`)
            const results = data.results
            const top = results.splice(0, 3)          
            setTopResults(top)
          } catch (e) {
            console.log(e)
            window.alert('error while fetching top search results')
          }
        }
        getPlantInfo()
      }, [])

      const handleClickMoreInfo = (name) => {
        setModalShow(true)
        setScientificName(name)
      }

    return (
        <>
            <Container className='d-flex'>
                {
                    topResults.length === 0 && (
                    <Spinner animation="border" variant="success"></Spinner>
                    )
                }
                {
                    topResults && (
                        topResults.map(result => {
                            return(
                        <Card style={{ width: '18rem' }}>
                            <Card.Img variant="top" src={result.images[0].url.o} />
                            <Card.Body>
                                <Card.Title>{result.species.scientificNameWithoutAuthor}</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">Similarity: {(Math.round(result.score * 100))}%</Card.Subtitle>
                                <Card.Text>
                                Commonly known as {result.species.commonNames[0]} or {result.species.commonNames[1]}.
                                </Card.Text>
                                <Button variant="secondary" onClick={() => handleClickMoreInfo(result.species.scientificNameWithoutAuthor)}>View more</Button>
                            </Card.Body>
                        </Card>
                            )
                        })
                    )
                }
                <MoreInfo show={modalShow} scientificName={scientificName} setModalShow={setModalShow}></MoreInfo>
            </Container>
        </>
    )

}
import React, {useState, useEffect} from "react"
import axios from 'axios'

import Card from 'react-bootstrap/Card'
import Button from "react-bootstrap/Button"
import { Container } from "react-bootstrap"
import Spinner from 'react-bootstrap/Spinner'
import ProgressBar from 'react-bootstrap/ProgressBar'


export const SearchResult = ({ image, organ, setModalShow, setScientificName, setCommonName }) => {
    const [topResults, setTopResults] = useState([])

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

      const handleClickMoreInfo = (name, commonName) => {
        setModalShow(true)
        setScientificName(name)
        setCommonName(commonName)
      }

      let i = 0
    return (
        <>
            <Container className='d-flex justify-content-center mt-4'>
                {
                    topResults.length === 0 && (
                    <Spinner animation="border" variant="success"></Spinner>
                    )
                }
                {
                    topResults && (
                        topResults.map(result => {
                            return(
                        <Card className="mx-3" style={{ width: '18rem' }} key={i++}>
                            <Card.Img variant="top" src={result.images[0].url.o} />
                            <Card.Body>
                                <Card.Title>{result.species.scientificNameWithoutAuthor}</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">Similarity: {(Math.round(result.score * 100))}%</Card.Subtitle>
                                <ProgressBar now={(Math.round(result.score * 100))} variant='success'></ProgressBar>
                                {
                                    (result.species.commonNames[1] === undefined || result.species.commonNames[1] === '') && 
                                    (
                                        <Card.Text>
                                        Commonly known as {result.species.commonNames[0]}.
                                        </Card.Text>
                                    )
                                }
                                {
                                    (result.species.commonNames[1] !== undefined && result.species.commonNames[1] !== '') && 
                                    (
                                        <Card.Text>
                                        Commonly known as {result.species.commonNames[0]} or {result.species.commonNames[1]}.
                                        </Card.Text>
                                     )
                                }
                                <Button variant="secondary" onClick={() => handleClickMoreInfo(result.species.scientificNameWithoutAuthor, result.species.commonNames[0])}>
                                    View more
                                </Button>
                            </Card.Body>
                        </Card>
                            )
                        })
                    )
                }
            </Container>
        </>
    )

}
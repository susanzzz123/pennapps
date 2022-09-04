import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Badge from 'react-bootstrap/Badge'
import { VscChromeClose } from "react-icons/vsc"

export const MoreInfo = ({ commonName, scientificName, modalShow, setModalShow }) => {
    const [sentiment, setSentiment] = useState()
    const [text, setText] = useState()
    useEffect(() => {
        const getPlantSentiment = async () => {
            if (commonName && modalShow) {
                await axios.get(`http://localhost:3001/wiki?name=${commonName}`
                ).then(response => {
                  const { sentiment, rawText } = response.data
                  console.log(sentiment)
                  console.log(rawText)
                  setSentiment(sentiment)
                  setText(rawText)
                }).catch(err => {
                  console.log(err)
                })
            }
        }
        getPlantSentiment()
      }, [])

    return (
        <>
            <style type="text/css">
                {`
                .close-button {
                    font-size: 1.5rem;
                    margine: auto;
                }
                .close-hover:hover {
                    font-size: 1.5rem;
                    margine: auto;
                    color: #696969;
                    cursor: pointer;
                }
                `}
            </style>
            <Modal
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={modalShow} 
            onHide={() => setModalShow(false)}
            >
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                {scientificName}
                </Modal.Title>
                <VscChromeClose className='close-button close-hover' 
                onClick={() => setModalShow(false)}></VscChromeClose>
            </Modal.Header>
            <Modal.Body>
                <div className='d-flex' style={{ color: 'white' }}>
                    <Badge bg="success" pill>Sentiment score: {sentiment?.score}</Badge>
                    <Badge bg="success" pill>Sentiment magnitude: {sentiment?.magnitude.toFixed(2)}</Badge>
                </div>
                <h4>Centered Modal</h4>
                <p>
                Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
                dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
                consectetur ac, vestibulum at eros.
                </p>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={() => setModalShow(false)}>Close</Button>
            </Modal.Footer>
            </Modal>
        </>
    )
}
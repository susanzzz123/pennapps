const React = require('react')
import { Container, Dropdown, Button } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import ButtonGroup from 'react-bootstrap/ButtonGroup';

const Photo = () => {
  const [mode, setMode] = useState('url')
  const [url, setURL] = useState('')
  const [organ, setOrgan] = useState('Select Plant Organ')

  useEffect(() => {
    const uploadPictureButton = document.querySelector(".photo-upload")
    if (uploadPictureButton) {
        uploadPictureButton.addEventListener('change', function () {
            displayUploadPicture(this);
          });
    } 

    const displayUploadPicture = (input) => {
      if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
          document.getElementById('the-picture').setAttribute('src', reader.result);
        };

        reader.readAsDataURL(input.files[0]);
      }
    }
  })

  return (
    <>
      <style type="text/css">
        {`
        .photo-upload:hover {
          cursor:pointer;
        }
        .photo-url:hover {
            cursor:text;
          }`}
      </style>
      <h1 className="w-full text-center">
        Welcome to Plantr!
      </h1>
      <h3 className="w-full text-center">
        choose an image to get started!
      </h3>
      <Container className='d-flex justify-content-center'>
        <ButtonGroup aria-label="Basic example">
            <Button variant="success" onClick={() => setMode('url')}>Upload URL</Button>
            <Button variant="success" onClick={() => setMode('local')}>Upload Local Image</Button>
        </ButtonGroup>
      </Container>
      {
        mode === 'local' && (
            <> 
      <Container className="d-flex ">
        <input
          role="button"
          id="myImage"
          className="w-fit border border-5 place-self-center mx-auto photo-upload"
          type="file"
          accept=".png,.jpg,.jpeg,.raw,.eps,.gif,.tif,.tiff,.bmp"></input>
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
                {organ}
            </Dropdown.Toggle>
            <Dropdown.Menu>
                <Dropdown.Item href="#/action-1" onClick={() => setOrgan('leaf')}>leaf</Dropdown.Item>
                <Dropdown.Item href="#/action-2" onClick={() => setOrgan('flower')}>flower</Dropdown.Item>
                <Dropdown.Item href="#/action-3" onClick={() => setOrgan('fruit')}>fruit</Dropdown.Item>
                <Dropdown.Item href="#/action-4" onClick={() => setOrgan('bark')}>bark</Dropdown.Item>
                <Dropdown.Item href="#/action-5" onClick={() => setOrgan('auto')}>auto</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
      </Container>
      <Container className="d-flex justify-content-center">
        <img id="the-picture" width="30%" />
      </Container>
            </>
        )
      }
      {
        mode === 'url' && (
            <> 
      <Container className="d-flex ">
        <input
          id="myImage"
          className="w-fit border border-5 place-self-center mx-auto photo-url"
          type="url"
          placeholder='Image URL:'
          onChange={e => setURL(e.target.value)}></input>
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
                {organ}
            </Dropdown.Toggle>
            <Dropdown.Menu>
                <Dropdown.Item href="#/action-1" onClick={() => setOrgan('leaf')}>leaf</Dropdown.Item>
                <Dropdown.Item href="#/action-2" onClick={() => setOrgan('flower')}>flower</Dropdown.Item>
                <Dropdown.Item href="#/action-3" onClick={() => setOrgan('fruit')}>fruit</Dropdown.Item>
                <Dropdown.Item href="#/action-4" onClick={() => setOrgan('bark')}>bark</Dropdown.Item>
                <Dropdown.Item href="#/action-5" onClick={() => setOrgan('auto')}>auto</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
      </Container>
      <Container className="d-flex justify-content-center">
        <img src={url} width="30%" />
      </Container>
            </>
        )
      }
      <Container className="d-flex justify-content-center">
        <Button variant='success'>Identify</Button>
      </Container>
    </>
  )
}

export default Photo
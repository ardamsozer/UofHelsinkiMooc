import { useState } from "react"
import docService from './services/documents'
import PdfRenderer from './components/PdfRenderer'

const App = () => {

  const [document, setDocument] = useState([])
  const [retrievedFiles, setRetrievedFiles] = useState(null)
  let tries = 0

const timeout = (delay) => {
    return new Promise( res => setTimeout(res, delay) );
}

  const retrieveDocument = e => {
    console.log('trying to retrieve document');
    docService
      .get()
      .then(responseData => {
        console.log('response from docService.get() is ', responseData)
        setRetrievedFiles(responseData)
      }).catch(async error => {
        console.log(error)
        if (error.response.status === 404 && tries < 35) {
          console.log('file not found.. retrying GET in 5 seconds');
          await timeout(1000 * 5)
          tries += 1
          retrieveDocument()
        } else if (error.response.status === 404) {
          alert('no file found')
        } else if (error.response.status === 500) {
          alert('no PDF found...probably found folder instead')
        }
      })
  }

      //   if (response[0].length === 0 && tries < 5) {
      //     console.log('no file returned... tryig GET request again in 5 seconds')
      //     setTimeout(5000);
      //     tries += 1
      //     retrieveDocument()
      //   } else if (response[0].length > 0) {
      //     console.log('response is: ', response[0])
      //     console.log('response type is: ', typeof(response[0]))
      //     setRetrievedFiles(response[0])
      //   } else {
      //     throw new Error('no file found')
      //   }
      // }).catch(error => {
      //   alert('Error retrieving file in backend')
      //   console.log('error ', error)


  const sendDocument = e => {
    e.preventDefault()
    console.log('doc sending')
    console.log('document state is ', document)
    docService.create(document)
    .then(response => {
      console.log('returned from server to frontend')
      console.log('response is ', response)
      retrieveDocument()
    })
  }
  
  console.log('retrievedFiles state is: ', typeof(retrievedFiles));
  const pdfToDisplay = retrievedFiles
                          ? retrievedFiles
                          : null


  return (
    <div>
      <form onSubmit={sendDocument}>
        <input type="file" accept="image/pdf" onChange={(e) => {
          const data = new FormData() ;
          data.append('file', e.target.files[0]);          
          setDocument(data)
        }}/>
        <button type="submit">submit</button>
      </form>
      
      <PdfRenderer file={pdfToDisplay} />

        {/* Old Code: wanted to render pdf by creating iframe element for each pdf in list, 'retrievedFiles */}
        {/* {dummyList.map(file => {
          console.log('file in map function: ', file)
          {console.log(`url queried: https://storage.googleapis.com/temp_input_bucket/${file.id}`)}
          <div>
              <iframe src="https://storage.googleapis.com/temp_input_bucket/Attic.pdf" type="application/pdf" width="800px" height="2100px" ></iframe>
            <iframe src={`https://storage.googleapis.com/temp_input_bucket/${file.id}`} type="application/pdf" width="800px" height="2100px" ></iframe>
          </div>
        })} */}

    </div>
  )
}

export default App

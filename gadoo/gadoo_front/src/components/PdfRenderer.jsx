const PdfRenderer = ({file}) => {
    console.log('entered PdfRenderer component')
    console.log('trying to create iframe for pdf: ', file)
    if (file) {
        console.log(`https://storage.googleapis.com/temp_input_bucket/${file.id}`)
        return (
            <div>
                <iframe src={`https://storage.googleapis.com/temp_input_bucket/${file.id}`} width="800px" height="2100px" />
            </div>
        )
    }
}

export default PdfRenderer
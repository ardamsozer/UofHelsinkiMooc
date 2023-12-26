const ErrorMessage = ({ message }) => {
    console.log('ERROR MESSAGE IS: ', message);
    
    const errorStyle = {
        color: 'red',
        background: 'lightgrey',
        fontSize: '20px',
        borderStyle: 'solid',
        borderRadius: '5px',
        padding: '10px',
        marginBottom: '10px'
    }

    if (message) {
        return (
            <div style={errorStyle}>
                { message }
            </div>
        )
    }
}


export default ErrorMessage
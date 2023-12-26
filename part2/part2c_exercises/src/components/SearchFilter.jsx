const SearchFilter = ({ value, onChange }) => {
    console.log('babu')
    return (
        <div>
            search for someone <input value={value} onChange={onChange} />
        </div>
    )
}

export default SearchFilter
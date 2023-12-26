const SearchFilter = ({ value, onChange }) => {
    return (
        <div>
            search for someone <input value={value} onChange={onChange} />
        </div>
    )
}

export default SearchFilter
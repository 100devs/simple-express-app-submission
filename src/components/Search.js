const Search = ({search, handleSearch}) => {
    return (
        <>
            filter shown with <input value={search} onChange={handleSearch} />
        </>
    )
}

export default Search
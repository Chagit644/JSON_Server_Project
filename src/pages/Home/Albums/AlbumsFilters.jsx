import {useState, React} from 'react'

function AlbumsFilters({ currentUserId, getAlbums,setIsGotAlbums}) {

    const [filters, setFilters] = useState({ id: '', title: ''})

    function handleFiltersSubmit(e) {
        e.preventDefault();
        setIsGotAlbums(false)
        let url = `users/${currentUserId}/albums?`
        if (filters.id != '')
          url += `&id=${filters.id}`
        if (filters.title != '')
          url += `&title=${filters.title}`
          getAlbums(url);
      }


  return (
    <div>
        <h4>Filters:</h4>
          <form onSubmit={handleFiltersSubmit}>
            <label>Id:</label>
            <input type='number' value={filters.id} onChange={(e) => setFilters({ ...filters, id: e.target.value })} />
            <label>Title:</label>
            <input type='text' value={filters.title} onChange={(e) => setFilters({ ...filters, title: e.target.value })} />
            <button type='reset' onClick={(e) => {e.preventDefault(); setFilters({ id: '', title: ''})}}>Clear All</button>
            <button type = 'submit' >Search</button>
          </form>
    </div>
    )

}

export default AlbumsFilters
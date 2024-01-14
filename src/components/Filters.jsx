import {React, useState} from 'react'

function Filters({allItems, setFilteredItems, isWithCompleted = false}) {

    const [filters, setFilters] = useState({ id: '', title: '', completed: "all" })

    function handleFiltersSubmit(e) {
        e.preventDefault();
        setFilteredItems( 
          allItems.filter(item => 
              (filters.id == "" || filters.id == item.id) && 
            (filters.title == "" || filters.title == item.title) &&
            (filters.completed == "completed" ? item.completed == true : filters.completed == "notCompleted" ? item.completed == false : true)))
      }

      function handleCompletedOfFiltersChange(e) {
        setFilters({ ...filters, completed: e.target.value })
      }
  
    return (
      <div>
          <h4>Filters:</h4>
            <form onSubmit={handleFiltersSubmit}>
              <label>Id:</label>
              <input type='number' value={filters.id} onChange={(e) => setFilters({ ...filters, id: e.target.value })} />
              <label>Title:</label>
              <input type='text' value={filters.title} onChange={(e) => setFilters({ ...filters, title: e.target.value })} />
              {isWithCompleted && <div>
                <input type='radio' value="completed" id="completed" name="filters" checked={filters.completed == "completed"} onChange={handleCompletedOfFiltersChange} />
                <label htmlFor="completed">Completed</label>
                <input type='radio' value="notCompleted" id="notCompleted" name="filters" checked={filters.completed == "notCompleted"} onChange={handleCompletedOfFiltersChange} />
                <label htmlFor="notCompleted">Not Completed</label>
                <input type='radio' value="all" id="all" name="filters" checked = {filters.completed == "all"}onChange={handleCompletedOfFiltersChange} />
                <label htmlFor="all">All</label>
              </div>}
              <button type='reset' onClick={(e) => {e.preventDefault(); setFilters({ id: '', title: '', completed: "all" })}}>Clear All</button>
              <button type = 'submit' >Search</button>
            </form>
      </div>
      )
}

export default Filters
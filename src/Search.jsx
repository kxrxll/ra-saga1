import React from 'react';
import './bootstrap.css';
import { useSelector, useDispatch } from 'react-redux';
import { changeSearchField } from './actions/index';

function Service() {
  const { items, loading, error, search } = useSelector(state => state.skills);
  const dispatch = useDispatch();

  const handleSearch = evt => {
    const { value } = evt.target;
    dispatch(changeSearchField(value));
  };

  const hasQuery = search.trim() !== '';

  return (
    <div className="card" style={{margin:'40px',padding:'20px',width:'60%'}}>
      <div className="mb-3">
        <label htmlFor="exampleFormControlInput1" className="form-label">Поиск</label>
        <input 
          type="text" 
          value={search}
          onChange={handleSearch}  
          className="form-control" 
          id="search"
        />
        {!hasQuery && <div className='list-group-item'>Начните ввод для поиска</div>}
        {hasQuery && loading && <div className='list-group-item'>Ищем...</div>}
        {error ? <div className='list-group-item'>Error ...</div> : hasQuery ? <ul>{items.map(o => <li className='list-group-item' key={o.id}>{o.name}</li>)}</ul> : false}
      </div>
    </div>
  )
}

export default Service;

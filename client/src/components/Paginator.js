import React, { useState, useEffect } from 'react'
import ReactPaginate from 'react-paginate';

function Paginator(props) {
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);

    useEffect(() => {
        // Fetch items from another resources.
        const endOffset = itemOffset + props.itemsPerPage;
        props.handleAnimalsChange(props.allAnimals.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(props.allAnimals.length / props.itemsPerPage));
        }, [itemOffset, props.allAnimals]);
        
        
        function handlePageClick (event) {
        const newOffset = (event.selected * props.itemsPerPage) % props.allAnimals.length;
        setItemOffset(newOffset);
        };

  return (
    <div className='container'>
        <div className='d-flex justify-content-center'>
        <ReactPaginate
            breakLabel="..."
            previousLabel="<" previousClassName="page-item" previousLinkClassName="page-link"
            nextLabel=">" nextClassName="page-item" nextLinkClassName="page-link"
            onPageChange={handlePageClick}
            pageCount={pageCount}
            containerClassName="pagination"
            pageClassName="page-item" pageLinkClassName="page-link"
            activeClassName='page-item active'
        />
        </div>
 </div>
  )
}

export default Paginator
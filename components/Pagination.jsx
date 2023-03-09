import "./Pagination.css"

const Pagination = ({ currentPage, totalPages, lastPage, path }) => {
    return (
        <>
            <nav aria-label="...">
                {totalPages && <ul className="pagination pagination-lg" >
                    {
                        (currentPage !== 1 && currentPage - 2 !== 1 && currentPage - 1 !== 1) &&
                        <>
                            <li className="page-item " aria-current="page">
                                <a href={`${path.split('&')[0]}&page=1`} className="page-link">1</a>
                            </li>
                            <li className="page-item " aria-current="page">
                                <a href={`${path.split('&')[0]}&page=${Math.ceil((currentPage + 1) / 2)}`} className="page-link">...</a>
                            </li>
                        </>
                    }

                    {totalPages.map((page) => {
                        return (
                            <>
                                {(page === currentPage + 2 || page === currentPage + 1 ||
                                    page === currentPage - 2 || page === currentPage - 1) ?
                                    <li className="page-item " aria-current="page" key={page}>
                                        <a href={`${path.split('&')[0]}&page=${page}`} className="page-link">{page}</a>
                                    </li>
                                    : page === currentPage ? <li className="page-item active or" aria-current="page" key={page}>
                                        <a href={`${path.split('&')[0]}&page=${page}`} className="page-link">{page}</a>
                                    </li> : ''}
                            </>
                        )
                    })
                    }

                    {
                        (currentPage !== lastPage && currentPage + 2 !== lastPage && currentPage + 1 !== lastPage) &&
                        <>
                            <li className="page-item " aria-current="page">
                                <a href={`${path.split('&')[0]}&page=${Math.ceil((currentPage + lastPage) / 2)}`} className="page-link">...</a>
                            </li>
                            <li className="page-item " aria-current="page">
                                <a href={`${path.split('&')[0]}&page=${lastPage}`} className="page-link">{lastPage}</a>
                            </li>
                        </>
                    }
                </ul>}
            </nav>
        </>
    );
}

export default Pagination;
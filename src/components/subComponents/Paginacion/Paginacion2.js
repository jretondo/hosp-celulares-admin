import React, { useEffect, useState } from 'react'
import {
    Pagination,
    PaginationItem,
    PaginationLink,
} from "reactstrap"

const PaginationCustom = ({
    lastPage,
    setLastPage,
    page,
    setPage,
    trigger,
    data
}) => {
    const [pagesLayout, setPagesLayout] = useState(<></>)

    useEffect(() => {
        listBudgets()
        // eslint-disable-next-line
    }, [page, lastPage, data.totalPag, data.cantTotal])

    const prevPage = (e) => {
        e.preventDefault()
        if (page > 1) {
            setPage(1)
            trigger()
        }
    }

    const nextPage = (e) => {
        e.preventDefault()
        if (lastPage > page) {
            setPage(lastPage)
            trigger()
        }
    }

    const changePage = (e, currentPage) => {
        e.preventDefault()
        if (currentPage !== page) {
            setPage(currentPage)
            trigger()
        }
    }

    const listBudgets = () => {
        if (data.totalPag) {
            setLastPage(data.totalPag)
            setPagesLayout(
                data.cantTotal.map((pageList, key) => {
                    return (
                        <PaginationItem className={page === pageList ? "active" : ""} key={key}>
                            <PaginationLink
                                href="#"
                                onClick={e => changePage(e, pageList)}
                            >
                                {pageList}
                            </PaginationLink>
                        </PaginationItem>
                    )
                })
            )
        }
    }

    return (
        <>
            <nav aria-label="...">
                <Pagination
                    className="pagination justify-content-end mb-0"
                    listClassName="justify-content-end mb-0"
                >
                    <PaginationItem className={page === 1 ? "disabled" : ""}>
                        <PaginationLink
                            href="#"
                            onClick={e => prevPage(e)}
                            tabIndex="-1"
                        >
                            <i className="fas fa-angle-double-left" />
                            <span className="sr-only">Primero</span>
                        </PaginationLink>
                    </PaginationItem>

                    {pagesLayout}

                    <PaginationItem className={page === lastPage ? "disabled" : ""}>
                        <PaginationLink
                            href="#"
                            onClick={e => nextPage(e)}
                        >
                            <i className="fas fa-angle-double-right" />
                            <span className="sr-only">Último</span>
                        </PaginationLink>
                    </PaginationItem>
                </Pagination>
            </nav>
        </>
    )
}

export default PaginationCustom
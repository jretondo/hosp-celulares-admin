import Paginacion from 'components/subComponents/Paginacion/Paginacion';
import PaginationCustom from 'components/subComponents/Paginacion/Paginacion2';
import React from 'react';
import { Col, Row } from 'reactstrap';

const RepairFooter = ({
    setPage,
    page,
    lastPage,
    dataList,
    setLastPage,
    trigger
}) => {
    return (
        <Row>
            <Col md="12" style={{ textAlign: "right" }}>
                <PaginationCustom
                    setPage={setPage}
                    page={page}
                    lastPage={lastPage}
                    data={dataList}
                    setLastPage={setLastPage}
                    trigger={trigger}
                />
            </Col>
        </Row>
    )
}

export default RepairFooter
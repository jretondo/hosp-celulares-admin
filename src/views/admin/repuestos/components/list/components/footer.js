import PaginationCustom from 'components/subComponents/Paginacion/Paginacion2';
import React from 'react';
import { Col, Row } from 'reactstrap';

const PartsFooterList = ({
    setPage,
    page,
    lastPage,
    dataList,
    setLastPage,
    trigger
}) => {

    return (<>
        <Row style={{ marginTop: "30px" }}>
            <Col md="12">
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
    </>)
}

export default PartsFooterList
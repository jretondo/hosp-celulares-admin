import Paginacion from 'components/subComponents/Paginacion/Paginacion';
import PaginationCustom from 'components/subComponents/Paginacion/Paginacion2';
import formatMoney from 'Function/NumberFormat';
import React from 'react';
import { Col, FormGroup, Input, Label, Row } from 'reactstrap';

const RepairFooter = ({
    setPage,
    page,
    lastPage,
    dataList,
    setLastPage,
    trigger,
    summarize
}) => {
    console.log('summarize :>> ', summarize);
    return (
        <>
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
            <hr />
            <Row>
                <Col md={3} key={0}>
                    <FormGroup>
                        <Label>Total Costo HPC</Label>
                        <Input style={{ color: "red", fontWeight: "bold", fontSize: "16px" }} type="text" value={"- $ " + formatMoney(summarize.length > 0 ? summarize[0].total_hpc_cost : 0)} disabled />
                    </FormGroup>
                </Col>
                <Col md={3} key={0}>
                    <FormGroup>
                        <Label>Total Cobrado al cliente</Label>
                        <Input style={{ color: "green", fontWeight: "bold", fontSize: "16px" }} type="text" value={"+ $ " + formatMoney(summarize.length > 0 ? summarize[0].total_final_price : 0)} disabled />
                    </FormGroup>
                </Col>
                <Col md={3} key={0}>
                    <FormGroup>
                        <Label>Ganancia neta</Label>
                        <Input style={{ color: "green", fontWeight: "bold", fontSize: "16px" }} type="text" value={"+ $ " + formatMoney(summarize.length > 0 ? summarize[0].total_difference : 0)} disabled />
                    </FormGroup>
                </Col>
            </Row>
        </>
    )
}

export default RepairFooter
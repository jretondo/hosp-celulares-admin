import React from 'react';
import { Col, FormGroup, Input, Label, Row } from 'reactstrap';

const FranchisesFooterList = ({ franchisesArray }) => {

    return (
        <Row>
            <Col md="4" style={{ textAlign: "left" }}>
                <FormGroup>
                    <Label>
                        Total de franquicias listadas
                    </Label>
                    <Input value={franchisesArray.length} disabled />
                </FormGroup>
            </Col>
        </Row>
    )
}

export default FranchisesFooterList
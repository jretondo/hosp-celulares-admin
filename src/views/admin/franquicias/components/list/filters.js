import React from 'react';
import { Button, Col, Form, FormGroup, Input, InputGroup, InputGroupAddon, Label, Row } from 'reactstrap';

const FranchiseFilter = ({ searchText, setSearchText, trigger }) => {

    const FilterFranchises = async (e) => {
        e.preventDefault();
        trigger()
    }

    return (
        <>
            <Row>
                <Col md="12">
                    <Form onSubmit={(e) => FilterFranchises(e)}>
                        <FormGroup>
                            <Label>
                                Buscar franquicia
                            </Label>
                            <InputGroup>
                                <Input value={searchText} onChange={e => setSearchText(e.target.value)} placeHolder="Nombre, dirección, usuario..." />
                                <InputGroupAddon addonType="append">
                                    <Button color="primary" type="submit">
                                        Buscar
                                    </Button>
                                </InputGroupAddon>
                            </InputGroup>
                        </FormGroup>
                    </Form>
                </Col>
            </Row>
        </>
    )
}

export default FranchiseFilter
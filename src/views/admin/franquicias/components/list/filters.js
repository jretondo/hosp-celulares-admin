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
                    <FormGroup>
                        <Label>
                            Buscar franquicia
                        </Label>
                        <InputGroup>
                            <Input value={searchText} onChange={e => setSearchText(e.target.value)} placeHolder="Nombre, dirección, usuario..." onKeyDown={e => {
                                if (e.keyCode === 13) {
                                    FilterFranchises(e)
                                }
                            }
                            } />
                            <InputGroupAddon addonType="append">
                                <Button color="primary" onClick={e => {
                                    FilterFranchises(e)
                                }}>
                                    Buscar
                                </Button>
                            </InputGroupAddon>
                        </InputGroup>
                    </FormGroup>
                </Col>
            </Row>
        </>
    )
}

export default FranchiseFilter
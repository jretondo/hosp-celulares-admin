import React from 'react';
import { Button, FormGroup, Input, InputGroup, InputGroupAddon, Label } from 'reactstrap';
import ModalFranchise from './modalFranchise';

const FranchisesInput = ({ franchiseName, setIsOpenModal, isOpenModal, setFranchiseName, setFranchiseId, all }) => {

    return (<>
        <FormGroup>
            <Label>
                Punto de Venta
            </Label>
            <InputGroup>
                <Input type="text" value={franchiseName} disabled />
                <InputGroupAddon addonType="append">
                    <Button color="primary" onClick={e => setIsOpenModal(true)}>
                        Seleccionar
                    </Button>
                </InputGroupAddon>
            </InputGroup>
        </FormGroup>
        <ModalFranchise
            isOpen={isOpenModal}
            toggle={() => setIsOpenModal(!isOpenModal)}
            setFranchiseName={setFranchiseName}
            setFranchiseId={setFranchiseId}
            all={all}
        />
    </>)
}

export default FranchisesInput
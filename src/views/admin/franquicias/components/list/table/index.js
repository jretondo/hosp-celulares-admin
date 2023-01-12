import ListadoTable from 'components/subComponents/Listados/ListadoTable2';
import React from 'react';
import { Col, Row } from 'reactstrap';
import FranchiseRow from './row';

const FranchisesTable = ({ franchisesArray, setNewForm, setIdFranchise, trigger }) => {

    return (
        <Row>
            <Col>
                <ListadoTable
                    titulos={["Franquicia", "Dirección", "Usuario", "Email", ""]}>

                    {franchisesArray.length > 0 ?
                        franchisesArray.map(item => {
                            return (<FranchiseRow franchiseObj={item} setNewForm={setNewForm} setIdFranchise={setIdFranchise} trigger={trigger} />)
                        }) : <></>
                    }
                </ListadoTable>
            </Col>
        </Row>
    )
}

export default FranchisesTable
import ListadoTable from 'components/subComponents/Listados/ListadoTable2';
import React from 'react';
import { Col, Row } from 'reactstrap';
import RepairRow from './repairsRow';

const RepairsTableList = ({ repairsArray }) => {
    return (
        <Row style={{ marginTop: "35px" }}>
            <Col>
                <ListadoTable
                    titulos={["ID", "Fecha", "Cliente", "Estado", "Costos", "Precio Final", "Franquicia", ""]}>

                    {repairsArray.length > 0 ?
                        repairsArray.map((item, key) => {
                            return (<RepairRow
                                key={key}
                                id={key}
                                item={item}
                            />)
                        }) : <tr><td>No hay reparaciones listadas</td></tr>
                    }
                </ListadoTable>
            </Col>
        </Row>
    )
}

export default RepairsTableList
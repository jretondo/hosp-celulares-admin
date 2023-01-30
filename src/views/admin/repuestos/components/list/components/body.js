import ListadoTable from 'components/subComponents/Listados/ListadoTable2';
import React from 'react';
import { Col, Row, Spinner } from 'reactstrap';
import PartsRow from './partsRow';

const PartsBodyList = ({
    loading,
    partsArray,
    trigger,
    setNewForm,
    setDataPart
}) => {
    return (<>
        <Row style={{ marginTop: "30px" }}>
            <Col md="12">
                {
                    !loading ?
                        <ListadoTable
                            titulos={["Fecha", "Tipo de accesorio", "Modelo", "Color", "Estado", "Vendedor", "Punto de Venta", ""]}>

                            {
                                partsArray && partsArray.length > 0 ?
                                    partsArray.map((item, key) => {
                                        return (
                                            <PartsRow
                                                key={key}
                                                id={key}
                                                item={item}
                                                trigger={trigger}
                                                setNewForm={setNewForm}
                                                setDataPart={setDataPart}
                                            />
                                        )
                                    }) :
                                    <tr><td>No hay tipos cargados</td></tr>
                            }
                        </ListadoTable> :
                        <Spinner />
                }
            </Col>
        </Row>
    </>)
}

export default PartsBodyList
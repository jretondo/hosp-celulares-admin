import UrlNodeServer from '../../../../../../api/NodeServer';
import axios from 'axios';
import ListadoTable from 'components/subComponents/Listados/ListadoTable2';
import React, { useEffect, useState } from 'react';
import { Button, Col, Modal, ModalBody, ModalFooter, ModalHeader, Row, Spinner } from 'reactstrap';
import FranchiseFilter from '../../../../franquicias/components/list/filters';
import FranchiseRow from '../franchiseRow';

const ModalFranchise = ({ isOpen, toggle, setFranchiseName, setFranchiseId, all }) => {
    const [loading, setLoading] = useState(false)
    const [franchisesArray, setFranchisesArray] = useState([])
    const [searchText, setSearchText] = useState("")
    const [doSearch, setDoSearch] = useState(false)
    const ptoVta = localStorage.getItem("pv")

    const GetFranchises = async () => {
        setLoading(true)
        await axios.get(UrlNodeServer.ptosVtaDir.ptosVta, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('user-token')
            },
            params: {
                query: searchText
            }
        }).then(res => {
            const response = res.data
            if (response.status === 200) {
                setFranchisesArray(response.body.data)
                if (ptoVta !== "null") {
                    setFranchiseName(`${response.body.data[0].direccion} (${response.body.data[0].raz_soc})`)
                    setFranchiseId(response.body.data[0].id)
                }
            } else {
                setFranchisesArray([])
            }
        }).catch(error => {
            setFranchisesArray([])
        }).finally(() => { setLoading(false) })
    }

    useEffect(() => {
        GetFranchises()
    }, [isOpen, doSearch])

    return (
        <Modal isOpen={isOpen} toggle={toggle} size="lg">
            <ModalHeader>
                Franquicias
            </ModalHeader>
            <ModalBody>
                <FranchiseFilter
                    searchText={searchText}
                    setSearchText={setSearchText}
                    trigger={() => setDoSearch(!doSearch)}
                />
                {loading ? <Row>
                    <Col md="12" style={{ textAlign: "center" }}>
                        <Spinner color="primary" style={{ width: "150px", height: "150px" }} />
                    </Col>
                </Row> :
                    <Row>
                        <Col>
                            <ListadoTable
                                titulos={["Franquicia", "Razón Social", ""]}>
                                {
                                    all ? ptoVta === "null" &&
                                        <tr>
                                            <td>
                                                Todas las franquicias
                                            </td>
                                            <td style={{ textAlign: "right" }}>
                                                <Button color="success"
                                                    onClick={e => {
                                                        e.preventDefault()
                                                        setFranchiseId(false)
                                                        setFranchiseName("Todas las franquicias")
                                                        toggle()
                                                    }}
                                                >Seleccionar</Button>
                                            </td>
                                        </tr> : <></>
                                }
                                {franchisesArray.length > 0 ?
                                    franchisesArray.map((item, key) => {
                                        return (<FranchiseRow
                                            key={key}
                                            id={key}
                                            item={item}
                                            setFranchiseId={setFranchiseId}
                                            setFranchiseName={setFranchiseName}
                                            toggle={toggle}
                                        />)
                                    }) : <tr><td>No hay franquicias</td></tr>
                                }
                            </ListadoTable>
                        </Col>
                    </Row>}
            </ModalBody>
            <ModalFooter>
                <Button color="danger" onClick={toggle} >Cerrar</Button>
            </ModalFooter>
        </Modal>
    )
}

export default ModalFranchise
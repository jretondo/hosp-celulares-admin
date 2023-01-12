import UrlNodeServer from '../../../../../../../api/NodeServer';
import axios from 'axios';
import React, { useState } from 'react';
import { Button, Col, DropdownItem, DropdownMenu, DropdownToggle, Input, Modal, ModalBody, ModalHeader, Row, Spinner, UncontrolledDropdown } from 'reactstrap';
import swal from 'sweetalert';

const FranchiseRow = ({ franchiseObj, setNewForm, setIdFranchise, trigger }) => {

    const [loading, setLoading] = useState(false)
    const [modalObs, setModalObs] = useState(false)
    const [obs, setObs] = useState(franchiseObj.obs)

    const ModifyFranchise = () => {
        setNewForm(false)
        setIdFranchise(franchiseObj.id)
    }

    const DeleteFranchise = async () => {
        let deleteFranchise = false
        deleteFranchise = await swal({
            title: "¿Está seguro de eliminar esta franquicia?",
            text: "Esta operación no tiene retroceso. Si tiene reparaciones relacionadas no se pofrá eliminar la franquicia.",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    return true
                }
            })
        if (deleteFranchise) {
            setLoading(true)
            await axios.delete(UrlNodeServer.franchisesDir.franchises + "/" + franchiseObj.id, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('user-token')
                },
            }).then(res => {
                const response = res.data
                if (response.status === 200) {
                    swal("Eliminación de Franquicias", "La franquicia ha sido eliminada con éxito!", "success");
                } else {
                    throw Error
                }
            }).catch(error => {
                swal("Eliminación de Franquicias", "Hubo un error al querer eliminar la franquicia. " + error.msg, "error");
            }).finally(() => {
                setLoading(false)
                trigger()
            })
        }
    }

    const ResetPass = async () => {
        let changePass = false
        changePass = await swal({
            title: "¿Está seguro de resetear la contraseña de esta franquicia?",
            text: "Esta operación no tiene retroceso.",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willChange) => {
                if (willChange) {
                    return true
                }
            })
        if (changePass) {
            setLoading(true)
            await axios.put(UrlNodeServer.franchisesDir.sub.pass + "/" + franchiseObj.id, {}, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('user-token')
                },
            }).then(res => {
                const response = res.data
                if (response.status === 200) {
                    swal("Resetear contraseña", "La contraseña se ha reseteado con éxito!", "success");
                } else {
                    throw Error
                }
            }).catch(error => {
                swal("Resetear contraseña", "Hubo un error al querer resetear la contraseña", "error");
            }).finally(() => {
                setLoading(false)
                trigger()
            })
        }
    }

    const changeObs = async () => {
        setLoading(true)
        const data = {
            id: franchiseObj.id,
            newObs: obs
        }
        await axios.put(UrlNodeServer.franchisesDir.sub.obs, data, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('user-token')
            }
        }).then(res => {
            const response = res.data
            if (response.status === 200) {
                swal("Observaciones", "Observaciones actualizada correctamente!", "success");
            } else {
                swal("Observaciones", "Hubo un error al querer cambiar las observaciones", "error");
            }
        }).catch(error => {
            swal("Observaciones", "Hubo un error al querer cambiar las observaciones", "error");
        }).finally(() => {
            setLoading(false)
            setModalObs(false)
        })
    }

    return (
        <>
            <tr className={loading ? "shimmer" : ""}>
                <td style={{ textAlign: "center" }}>
                    {franchiseObj.name}
                </td>
                <td style={{ textAlign: "center" }}>
                    {franchiseObj.direction}
                </td>
                <td style={{ textAlign: "center" }}>
                    {franchiseObj.f_user}
                </td>
                <td style={{ textAlign: "center" }}>
                    {franchiseObj.email}
                </td>
                <td style={{ textAlign: "right" }}>
                    <UncontrolledDropdown>
                        <DropdownToggle
                            className="btn-icon-only text-light"
                            href="#pablo"
                            role="button"
                            size="sm"
                            color=""
                            onClick={e => e.preventDefault()}
                        >
                            <i className="fas fa-ellipsis-v" />
                        </DropdownToggle>
                        <DropdownMenu className="dropdown-menu-arrow" right>
                            <DropdownItem
                                href="#pablo"
                                onClick={e => {
                                    e.preventDefault()
                                    ModifyFranchise()
                                }}
                            >
                                <i className="fa fa-eraser"></i>
                                Editar
                            </DropdownItem>
                            <DropdownItem
                                href="#pablo"
                                onClick={e => {
                                    e.preventDefault()
                                    DeleteFranchise()
                                }}
                            >
                                <i className="fas fa-trash-alt"></i>
                                Eliminar
                            </DropdownItem>
                            <DropdownItem
                                href="#pablo"
                                onClick={e => {
                                    e.preventDefault()
                                    ResetPass()
                                }}
                            >
                                <i className="fas fa-unlock-alt"></i>
                                Resetear Contraseña
                            </DropdownItem>
                            <DropdownItem
                                href="#pablo"
                                onClick={e => {
                                    e.preventDefault()
                                    setModalObs(true)
                                }}
                            >
                                <i className="fas fa-search"></i>
                                Observaciones
                            </DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown>
                </td>
            </tr>
            <Modal isOpen={modalObs} toggle={() => setModalObs(!modalObs)}>
                <ModalHeader>
                    Obserbaciones:
                </ModalHeader>
                <ModalBody>
                    {
                        loading ?
                            <Row>
                                <Col md="12" style={{ textAlign: "center" }}><Spinner style={{ width: "120px", height: "120px" }} /></Col>
                            </Row> :
                            <>
                                <Row>
                                    <Col md="12">
                                        <Input type="textarea" style={{ height: "120px" }} value={obs} onChange={e => setObs(e.target.value)} />
                                    </Col>
                                </Row>
                                <Row style={{ marginTop: "20px" }}>
                                    <Col md="12" style={{ textAlign: "center" }}>
                                        <Button color="success" onClick={e => {
                                            e.preventDefault()
                                            changeObs()
                                        }}>Cambiar Observaciones</Button>
                                        <Button color="danger" onClick={e => {
                                            e.preventDefault()
                                            setModalObs(false)
                                        }}>Cancelar</Button>
                                    </Col>
                                </Row>
                            </>
                    }
                </ModalBody>
            </Modal>
        </>
    )
}

export default FranchiseRow
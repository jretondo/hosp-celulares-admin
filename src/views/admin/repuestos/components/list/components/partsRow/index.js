import UrlNodeServer from '../../../../../../../api/NodeServer';
import axios from 'axios';
import moment from 'moment';
import React, { useState } from 'react';
import { Button, DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from 'reactstrap';
import swal from 'sweetalert';
import ModalDetails from './modalDetails';
import ModalChangeState from './modalState';

const PartsRow = ({
    id,
    item,
    trigger,
    setNewForm,
    setDataPart
}) => {
    const [isOpenModalState, setIsOpenModalState] = useState(false)
    const [isOpenModalDetails, setIsOpenModalDetails] = useState(false)
    const [loading, setLoading] = useState(false)

    const modifyPart = () => {
        setDataPart(item)
        setNewForm(false)
    }

    const removePart = async () => {
        swal({
            title: `¿Está seguro de eliminar el repuesto/accesorio?`,
            text: "Esta operación no tiene retroceso.",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then(async (willDelete) => {
                if (willDelete) {
                    await axios.delete(UrlNodeServer.partsDir.parts + "/" + item.id, {
                        headers: {
                            'Authorization': 'Bearer ' + localStorage.getItem('user-token')
                        }
                    }).then(res => {
                        const response = res.data
                        if (response.status === 200) {
                            swal("Pagos", "Repuesto/Accesorio eliminada con éxito!", "success")
                            trigger()
                        } else {
                            throw Error("Error inesperado")
                        }
                    }).catch(error => {
                        swal("Pagos", "Hubo un error inesperado", "error")
                    }).finally(() => {
                        setLoading(false)
                    })
                }
            });
    }

    return (<>
        <tr id={id} className={loading && "shimmer"} style={item.stateColor === "" ? {} : { backgroundColor: `${item.stateColor}`, color: "white" }}>
            <td>{moment(item.date).format("DD/MM/YYYY")}</td>
            <td>{item.accessoryType}</td>
            <td>{item.model}</td>
            <td>{item.accessoryColor}</td>
            <td><Button
                disabled={loading}
                onClick={e => {
                    e.preventDefault()
                    setIsOpenModalState(true)
                }}
                style={item.stateColor === "" ? {} : { color: `${item.stateColor}` }}>
                {item.state}
            </Button></td>
            <td>{item.name} {item.lastname}</td>
            <td>(PV: {item.pv}) {item.direction}</td>
            <td>
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
                                removePart()
                            }}
                        >
                            <i className="fas fa-trash-alt"></i>
                            Eliminar
                        </DropdownItem>
                        {
                            /*
                              <DropdownItem
                                href="#pablo"
                                onClick={e => {
                                    e.preventDefault()
                                    modifyPart
                                }}
                            >
                                <i className="ni ni-curved-next"></i>
                                Modificar
                            </DropdownItem>
                            */
                        }
                        <DropdownItem
                            href="#pablo"
                            onClick={e => {
                                e.preventDefault()
                                setIsOpenModalDetails(true)
                            }}
                        >
                            <i className="fas fa-search"></i>
                            Detalles
                        </DropdownItem>
                    </DropdownMenu>
                </UncontrolledDropdown>
            </td>
        </tr>

        <ModalChangeState
            isOpen={isOpenModalState}
            toggle={() => setIsOpenModalState(!isOpenModalState)}
            trigger={trigger}
            item={item}
            setLoading={setLoading}
        />
        <ModalDetails
            setLoading={setLoading}
            item={item}
            loading={loading}
            trigger={trigger}
            isOpenModal={isOpenModalDetails}
            setIsOpenModal={setIsOpenModalDetails}
        />
    </>)
}

export default PartsRow
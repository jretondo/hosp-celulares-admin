import UrlNodeServer from 'api/NodeServer';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import swal from 'sweetalert';
import PartStateModal from '../../../form/partStateModal';

const ModalChangeState = ({
    isOpen,
    toggle,
    item,
    trigger,
    setLoading
}) => {
    const [stateId, setStateId] = useState(false)
    const [stateName, setStateName] = useState("")
    const [stateColor, setStateColor] = useState("")

    const changeState = () => {
        swal({
            title: "Modificar el estado " + item.accessoryType + " " + item.model + "!",
            text: "¿Está seguro de modificar este estado? Esta desición es permanente.",
            icon: "warning",
            buttons: {
                cancel: "No",
                Si: true
            },
            dangerMode: true,
        })
            .then(async (willDelete) => {
                if (willDelete) {
                    setLoading(true)
                    const data = {
                        update: {
                            state_id: stateId
                        },
                        id: item.id
                    }
                    await axios.patch(UrlNodeServer.partsDir.parts, data, {
                        headers: {
                            'Authorization': 'Bearer ' + localStorage.getItem('user-token')
                        }
                    })
                        .then(res => {
                            const status = parseInt(res.data.status)
                            if (status === 200) {
                                swal("Modificar estado", "Estado modificado con éxito!", "success")
                                trigger()
                            } else {
                                throw Error("No se pudo eliminar")
                            }
                        })
                        .catch(() => {
                            swal("Modificar estado", "No se pudo modificar el estado", "error")
                        }).finally(() => {
                            setLoading(false)
                        })
                }
            });
    }

    useEffect(() => {
        if (stateId >= 0 && isOpen) {
            changeState()
        }
    }, [stateId])

    return (<>
        <PartStateModal
            setStateId={setStateId}
            setStateName={setStateName}
            setStateColor={setStateColor}
            isOpenModalState={isOpen}
            toggle={toggle}
            update={true}
        />
    </>)
}

export default ModalChangeState
import UrlNodeServer from '../../../../../../api/NodeServer';
import React, { useEffect, useState } from 'react';
import { Button, Spinner } from 'reactstrap';
import swal from 'sweetalert';
import axios from 'axios';

const TypeRow = ({
    id,
    item,
    setPartTypeId,
    setPartTypeName,
    toggle,
    refresh
}) => {
    const [loading, setLoading] = useState(false)
    const [newType, setNewType] = useState(item.type)
    const [isChangingType, setIsChangingType] = useState(false)

    const selectType = () => {
        setPartTypeId(item.id)
        setPartTypeName(item.type)
        toggle()
    }

    useEffect(() => {
        if (isChangingType && !loading) {
            document.getElementById("clientData_" + id).focus()
            document.getElementById("clientData_" + id).select()
        }
    }, [isChangingType])

    const updateTypeName = async () => {
        setLoading(true)
        const data = {
            type: newType,
            id: item.id
        }
        await axios.patch(UrlNodeServer.partsDir.sub.types, data, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('user-token')
            }
        }).then(res => {
            const response = res.data
            if (response.status === 200) {
                swal("Tipo de repuestos", "El tipo se modificó con éxito!", "success")
            } else {
                throw Error("Error inesperado")
            }
        }).catch(error => {
            swal("ipo de repuestos", "Hubo un error inesperado", "error")
        }).finally(() => {
            setIsChangingType(false)
            setLoading(false)
            refresh()
        })
    }


    const changeType = (e) => {
        if (e.keyCode === 13) {
            updateTypeName()
        } else if (e.keyCode === 27) {
            setIsChangingType(false)
        }
    }

    const deleteType = async (idType) => {
        swal({
            title: "Eliminar el tipo " + item.type + "!",
            text: "¿Está seguro de eliminar este tipo? Esta desición es permanente.",
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
                    await axios.delete(`${UrlNodeServer.partsDir.sub.types}/${idType}`, {
                        headers: {
                            'Authorization': 'Bearer ' + localStorage.getItem('user-token')
                        }
                    })
                        .then(res => {
                            const status = parseInt(res.data.status)
                            if (status === 200) {
                                swal("Eliminar tipo", "Tipo eliminado con éxito!", "success")
                            } else {
                                throw Error("No se pudo eliminar")
                            }
                        })
                        .catch(() => {
                            swal("Eliminar tipo", "No se pudo eliminar el tipo", "error")
                        }).finally(() => {
                            setLoading(false)
                            refresh()
                        })
                }
            });
    }

    return (
        <tr key={id} className={loading ? "shimmer" : ""}>
            <td onDoubleClick={() => setIsChangingType(true)}>
                {loading ? <Spinner /> :
                    !isChangingType ? <span id={"inpNewState_" + id} >{item.type}</span> :
                        <input onBlur={() => setIsChangingType(false)} id={"clientData_" + id} value={newType} onChange={e => setNewType(e.target.value)} onKeyDown={e => changeType(e)} />
                }
            </td>
            <td style={{ textAlign: "right" }}>
                <Button
                    color="success"
                    onClick={e => {
                        e.preventDefault()
                        selectType()
                    }}><i className='fa fa-check'></i>
                </Button>
                <Button
                    color="danger"
                    onClick={e => {
                        e.preventDefault()
                        deleteType(item.id)
                    }}><i className='fa fa-trash'></i>
                </Button>
            </td>
        </tr>
    )
}

export default TypeRow
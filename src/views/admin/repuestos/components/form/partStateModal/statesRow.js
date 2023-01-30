import UrlNodeServer from '../../../../../../api/NodeServer';
import React, { useEffect, useState } from 'react';
import { Button, Spinner } from 'reactstrap';
import swal from 'sweetalert';
import axios from 'axios';

const StateRow = ({
    id,
    item,
    setStateId,
    setStateName,
    setStateColor,
    toggle,
    refresh,
    update
}) => {
    const [loading, setLoading] = useState(false)
    const [isChangingState, setIsChangingState] = useState(false)
    const [newState, setNewState] = useState(item.state)

    const selectState = () => {
        setStateId(item.id)
        setStateName(item.state)
        setStateColor(item.color)
        !update && toggle()
    }

    useEffect(() => {
        if (isChangingState && !loading) {
            document.getElementById("inpNewState_" + id).focus()
            document.getElementById("inpNewState_" + id).select()
        }
    }, [isChangingState])

    const updateStateName = async () => {
        setLoading(true)
        const data = {
            state: newState,
            color: item.color,
            id: item.id
        }
        await axios.patch(UrlNodeServer.partsDir.sub.states, data, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('user-token')
            }
        }).then(res => {
            const response = res.data
            if (response.status === 200) {
                swal("Estados de repuestos", "El estado se modificó con éxito!", "success")
            } else {
                throw Error("Error inesperado")
            }
        }).catch(error => {
            swal("Estado de repuestos", "Hubo un error inesperado", "error")
        }).finally(() => {
            setIsChangingState(false)
            setLoading(false)
            refresh()
        })
    }


    const changeState = (e) => {
        if (e.keyCode === 13) {
            updateStateName()
        } else if (e.keyCode === 27) {
            setIsChangingState(false)
        }
    }

    const deleteState = async (idState) => {
        swal({
            title: "Eliminar el estado " + item.state + "!",
            text: "¿Está seguro de eliminar este estado? Esta desición es permanente.",
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
                    await axios.delete(`${UrlNodeServer.partsDir.sub.states}/${idState}`, {
                        headers: {
                            'Authorization': 'Bearer ' + localStorage.getItem('user-token')
                        }
                    })
                        .then(res => {
                            const status = parseInt(res.data.status)
                            if (status === 200) {
                                swal("Eliminar estado", "Estado eliminado con éxito!", "success")
                            } else {
                                throw Error("No se pudo eliminar")
                            }
                        })
                        .catch(() => {
                            swal("Eliminar estado", "No se pudo eliminar el estado", "error")
                        }).finally(() => {
                            setLoading(false)
                            refresh()
                        })
                }
            });
    }

    return (
        <>
            <tr style={item.color === "" ? {} : { backgroundColor: `${item.color}`, color: "white" }} key={id} className={loading ? "shimmer" : ""}>
                <td onDoubleClick={() => setIsChangingState(true)}>
                    {loading ? <Spinner /> :
                        !isChangingState ? <span id={"inpNewState_" + id} >{item.state}</span> :
                            <input onBlur={() => setIsChangingState(false)} id={"inpNewState_" + id} value={newState} onChange={e => setNewState(e.target.value)} onKeyDown={e => changeState(e)} />
                    }
                </td>
                <td style={{ textAlign: "right" }}>
                    <Button
                        color="success"
                        onClick={e => {
                            e.preventDefault()
                            selectState()
                        }}><i className='fa fa-check'></i>
                    </Button>
                    <Button
                        color="danger"
                        onClick={e => {
                            e.preventDefault()
                            deleteState(item.id)
                        }}><i className='fa fa-trash'></i>
                    </Button>
                </td>
            </tr>
        </>
    )
}

export default StateRow
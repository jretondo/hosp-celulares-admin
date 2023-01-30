import ListadoTable from '../../../../../../components/subComponents/Listados/ListadoTable2';
import React, { useEffect, useState } from 'react';
import StateRow from './statesRow';
import axios from 'axios';
import UrlNodeServer from '../../../../../../api/NodeServer';
import { Button, Spinner } from 'reactstrap';

const ListPartStates = ({
    setStateId,
    setStateName,
    setStateColor,
    toggle,
    statesArray,
    setStatesArray,
    filter,
    update
}) => {
    const [loading, setLoading] = useState(false)
    const [searchStates, setSearchStates] = useState(false)

    const listStates = async () => {
        setLoading(true)
        await axios.get(UrlNodeServer.partsDir.sub.states, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('user-token')
            }
        }).then(res => {
            const response = res.data
            if (response.status === 200) {
                setStatesArray(response.body)
            } else {
                throw Error("Error inesperado")
            }
        }).catch(() => {
            setStatesArray([])
        }).finally(() => {
            setLoading(false)
        })
    }

    useEffect(() => {
        listStates()
    }, [searchStates])

    const selectState = () => {
        setStateId(false)
        setStateName("Todos los estados")
        setStateColor("")
        toggle()
    }

    return (<>
        {
            !loading ?
                <ListadoTable
                    titulos={["Estado", ""]}
                >
                    {
                        filter &&
                        <tr key={- 1}>
                            <td>
                                <span >Todos los estados</span> </td>
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
                                    disabled
                                    onClick={e => {
                                        e.preventDefault()
                                    }}><i className='fa fa-trash'></i>
                                </Button>
                            </td>
                        </tr>
                    }
                    {
                        statesArray.length > 0 ?
                            statesArray.map((item, key) => {
                                return (
                                    <StateRow
                                        key={key}
                                        id={key}
                                        item={item}
                                        setStateId={setStateId}
                                        setStateName={setStateName}
                                        setStateColor={setStateColor}
                                        toggle={toggle}
                                        refresh={() => setSearchStates(!searchStates)}
                                        update={update}
                                    />
                                )
                            }) :
                            <tr><td>No hay estados cargados</td></tr>
                    }
                </ListadoTable> :
                <Spinner />
        }
    </>)
}

export default ListPartStates
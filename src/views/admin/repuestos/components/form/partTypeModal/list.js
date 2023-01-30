import ListadoTable from '../../../../../../components/subComponents/Listados/ListadoTable2';
import React, { useEffect, useState } from 'react';
import TypeRow from './typeRow';
import axios from 'axios';
import UrlNodeServer from '../../../../../../api/NodeServer';
import { Button, Spinner } from 'reactstrap';

const ListPartTypes = ({
    setPartTypeId,
    setPartTypeName,
    toggle,
    partTypesArray,
    setPartTypesArray,
    filter
}) => {
    const [loading, setLoading] = useState(false)
    const [searchTypes, setSearchTypes] = useState(false)

    const listTypes = async () => {
        setLoading(true)
        await axios.get(UrlNodeServer.partsDir.sub.types, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('user-token')
            }
        }).then(res => {
            const response = res.data
            if (response.status === 200) {
                setPartTypesArray(response.body)
            } else {
                throw Error("Error inesperado")
            }
        }).catch(() => {
            setPartTypesArray([])
        }).finally(() => {
            setLoading(false)
        })
    }

    useEffect(() => {
        listTypes()
    }, [searchTypes])

    const selectType = () => {
        setPartTypeId(false)
        setPartTypeName("Todos los tipos")
        toggle()
    }

    return (<>
        {
            !loading ?
                <ListadoTable
                    titulos={["Tipo de repuesto", ""]}
                >
                    {
                        filter &&
                        <tr key={- 1}>
                            <td>
                                <span >Todos los tipos</span> </td>
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
                                    disabled
                                    onClick={e => {
                                        e.preventDefault()
                                    }}><i className='fa fa-trash'></i>
                                </Button>
                            </td>
                        </tr>
                    }
                    {
                        partTypesArray.length > 0 ?
                            partTypesArray.map((item, key) => {
                                return (
                                    <TypeRow
                                        key={key}
                                        id={key}
                                        item={item}
                                        setPartTypeId={setPartTypeId}
                                        setPartTypeName={setPartTypeName}
                                        toggle={toggle}
                                        refresh={() => setSearchTypes(!searchTypes)}
                                    />
                                )
                            }) :
                            <tr><td>No hay tipos cargados</td></tr>
                    }
                </ListadoTable> :
                <Spinner />
        }
    </>)
}

export default ListPartTypes
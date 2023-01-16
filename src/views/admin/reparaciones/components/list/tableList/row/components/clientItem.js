import UrlNodeServer from 'api/NodeServer';
import axios from 'axios';
import React, { useState } from 'react';
import { Spinner, Tooltip } from 'reactstrap';

const ClientItemRow = ({ client, id, trigger }) => {
    const [newClient, setNewClient] = useState(client)
    const [isToolTipOpen, setIsToolTipOpen] = useState(false)
    const [isChangingClient, setIsChangingClient] = useState(false)
    const [loading, setLoading] = useState(false)
    const ptoVta = localStorage.getItem("pv")
    const actChangeClient = () => {
        if (ptoVta === "null") {
            setIsToolTipOpen(false)
            setIsChangingClient(true)
            setTimeout(() => {
                document.getElementById("inpNewClient_" + id).focus()
                document.getElementById("inpNewClient_" + id).select()
            }, 300);
        }
    }

    const updateClient = async () => {
        setLoading(true)
        const data = {
            update: { client: newClient },
            id: id
        }
        await axios.patch(UrlNodeServer.repairsDir.repairs, data, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('user-token')
            }
        }).then(res => {
            const response = res.data
            if (response.status === 200) {
                swal("Reparaciones", "El cliente de la repación se modificó con éxito!", "success")
            } else {
                throw Error("Error inesperado")
            }
        }).catch(error => {
            swal("Reparaciones", "Hubo un error inesperado", "error")
        }).finally(() => {
            setIsChangingClient(false)
            setLoading(false)
            trigger()
        })
    }


    const changeClient = (e) => {
        if (e.keyCode === 13) {
            updateClient()
        } else if (e.keyCode === 27) {
            setIsChangingClient(false)
        }
    }

    return (<>
        <td style={{ textAlign: "center" }} onDoubleClick={() => actChangeClient()}>
            {loading ? <Spinner /> :
                !isChangingClient ? <span id={"clientData_" + id} >{client}</span> :
                    <input id={"inpNewClient_" + id} value={newClient} onChange={e => setNewClient(e.target.value)} onKeyDown={e => changeClient(e)} />
            }
        </td>
        {ptoVta === "null" && !loading && <Tooltip placement="right" isOpen={isToolTipOpen} target={"clientData_" + id} toggle={() => setIsToolTipOpen(!isToolTipOpen)}>
            Doble click para cambiarlo
        </Tooltip>}
    </>)

}

export default ClientItemRow
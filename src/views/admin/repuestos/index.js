import React, { useState, useEffect } from 'react'

//NPM Modules
import {
    ButtonGroup,
    Card,
    CardBody,
    Collapse,
    Container,
    Spinner
} from "reactstrap"

//Custom Hooks
import { Redirect } from "react-router-dom"
import { useActividad } from '../../../Hooks/UseNvaActividad'

//Links to Server
import UrlNodeServer from '../../../api/NodeServer'

//My modules
import AlertaForm from 'components/subComponents/Alertas/Alerta1'
import Header from "components/Headers/Header.js"

import { UseSecureRoutes } from 'Hooks/UseSecureRoutes'
import ButtonOpenCollapse from 'components/buttonOpen'
import { useWindowSize } from 'Hooks/UseWindowSize'
import PartsForm from './components/form'
import AccessoriesPartsList from './components/list'

const ClientesView = () => {
    //user massages
    const [alertar, setAlertar] = useState(false)
    const [msgStrongAlert, setMsgStrong] = useState("")
    const [msgGralAlert, setMsgGralAlert] = useState("")
    const [successAlert, setSuccessAlert] = useState(false)
    const [call, setCall] = useState(false)

    //Activities
    const [nvaActCall, setNvaActCall] = useState(false)
    const [actividadStr, setActividadStr] = useState("")

    const [moduleActive, setModuleActive] = useState(0)
    const [refresh, setRefresh] = useState(false)
    const [dataPart, setDataPart] = useState(false)
    const [newForm, setNewForm] = useState(true)
    const trigger = () => setRefresh(!refresh)
    const width = useWindowSize()

    useEffect(() => {
        setCall(!call)
        // eslint-disable-next-line 
    }, [])

    useEffect(() => {
        if (!newForm) {
            setModuleActive(1)
        }
    }, [newForm])

    useActividad(
        nvaActCall,
        actividadStr
    )

    const { loading, error } = UseSecureRoutes(
        UrlNodeServer.routesDir.sub.repuestos,
        call
    )

    if (error) {
        return (
            <Redirect
                className="text-light"
                to={process.env.PUBLIC_URL + "/"}
            />
        )
    } else if (loading) {
        return (
            <div style={{ textAlign: "center", marginTop: "100px" }}>
                <Spinner type="grow" color="primary" style={{ width: "100px", height: "100px" }} />
            </div>
        )
    } else {
        return (
            <>
                <AlertaForm
                    success={successAlert}
                    msgStrong={msgStrongAlert}
                    msgGral={msgGralAlert}
                    alertar={alertar}
                />
                <Header />
                <Container className="mt--7" fluid>
                    <div style={{ width: "100%" }}>
                        <Card style={{ marginTop: "5px", marginBottom: "10px" }}>
                            <CardBody style={{ textAlign: "center" }}>
                                <ButtonGroup vertical={width > 1030 ? false : true}>
                                    <ButtonOpenCollapse
                                        action={() => setModuleActive(0)}
                                        tittle={"Listado"}
                                        active={moduleActive === 0 ? true : false}
                                    />
                                    <ButtonOpenCollapse
                                        action={() => setModuleActive(1)}
                                        tittle={newForm ? "Nuevo Registro" : "Modificar Registro"}
                                        active={moduleActive === 1 ? true : false}
                                    />
                                    <ButtonOpenCollapse
                                        action={() => setModuleActive(2)}
                                        tittle={"Reportes"}
                                        active={moduleActive === 2 ? true : false}
                                    />
                                </ButtonGroup>
                            </CardBody>
                        </Card>

                        <Collapse isOpen={moduleActive === 0 ? true : false} >
                            <AccessoriesPartsList
                                trigger={trigger}
                                refresh={refresh}
                                setNewForm={setNewForm}
                                setDataPart={setDataPart}
                            />
                        </Collapse>

                        <Collapse isOpen={moduleActive === 1 ? true : false} >
                            <PartsForm
                                trigger={trigger}
                                dataPart={dataPart}
                                newForm={newForm}
                            />
                        </Collapse>

                        <Collapse isOpen={moduleActive === 2 ? true : false} >


                        </Collapse>
                    </div>
                </Container>
            </>
        )
    }
}

export default ClientesView
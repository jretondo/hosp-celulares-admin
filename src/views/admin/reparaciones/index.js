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
import { useWindowSize } from 'Hooks/UseWindowSize'
import RepairsForm from './components/form'
import ButtonOpenCollapse from 'components/buttonOpen'
import RepairsList from './components/list'
import RepairsReports from './components/reports'

const RepairsModule = () => {

    const width = useWindowSize()

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
    const [newForm, setNewForm] = useState(true)
    const [idRepair, setIdRepair] = useState(false)
    const [dataRepair, setDataRepair] = useState(false)
    const [searchTrigger, setSearchTrigger] = useState(false)

    useEffect(() => {
        setCall(!call)
        // eslint-disable-next-line 
    }, [])

    const activateList = () => {
        setModuleActive(0)
    }

    const activateForm = () => {
        setModuleActive(1)
    }

    const activateReports = () => {
        setModuleActive(2)
    }

    useActividad(
        nvaActCall,
        actividadStr
    )

    const { loading, error } = UseSecureRoutes(
        UrlNodeServer.routesDir.sub.clientes,
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
                                        action={activateList}
                                        tittle={"Listado"}
                                        active={moduleActive === 0 ? true : false}
                                    />
                                    <ButtonOpenCollapse
                                        action={activateForm}
                                        tittle={"Nueva Reparación"}
                                        active={moduleActive === 1 ? true : false}
                                    />
                                    <ButtonOpenCollapse
                                        action={activateReports}
                                        tittle={"Reportes"}
                                        active={moduleActive === 2 ? true : false}
                                    />
                                </ButtonGroup>
                            </CardBody>
                        </Card>

                        <Collapse isOpen={moduleActive === 0 ? true : false} >
                            <RepairsList
                                setMsgStrong={setMsgStrong}
                                setMsgGralAlert={setMsgGralAlert}
                                setSuccessAlert={setSuccessAlert}
                                setAlertar={setAlertar}
                                alertar={alertar}
                                triggerList={() => setSearchTrigger(!searchTrigger)}
                                searchTrigger={searchTrigger}
                                setNewForm={setNewForm}
                                setIdRepair={setIdRepair}
                            />
                        </Collapse>

                        <Collapse isOpen={moduleActive === 1 ? true : false} >
                            <RepairsForm
                                newForm={newForm}
                                setNewForm={setNewForm}
                                idRepair={idRepair}
                                setIdRepair={setIdRepair}
                                dataRepair={dataRepair}
                                setActividadStr={setActividadStr}
                                setNvaActCall={setNvaActCall}
                                setMsgStrong={setMsgStrong}
                                setAlertar={setAlertar}
                                alertar={alertar}
                                setMsgGralAlert={setMsgGralAlert}
                                setSuccessAlert={setSuccessAlert}
                                nvaActCall={nvaActCall}
                                triggerList={() => setSearchTrigger(!searchTrigger)}
                            />
                        </Collapse>
                        <Collapse isOpen={moduleActive === 2 ? true : false} >
                            <RepairsReports />
                        </Collapse>
                    </div>
                </Container>
            </>
        )
    }
}

export default RepairsModule
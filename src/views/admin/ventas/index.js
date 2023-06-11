import Header from 'components/Headers/Header';
import React, { useEffect, useState } from 'react';
import { Collapse, Container, Spinner, Card, CardBody, ButtonGroup, Row, Col } from 'reactstrap';
import VenderModule from './components/vender';
import { Redirect } from "react-router-dom";
import { UseSecureRoutes } from "Hooks/UseSecureRoutes";
import UrlNodeServer from '../../../api/NodeServer';
import ListaCajaModule from './components/listaCaja';
import ConsultaVentasModule from './components/consultas';
import ButtonOpenCollapse from '../../../components/buttonOpen';
import { useWindowSize } from '../../../Hooks/UseWindowSize';
import axios from 'axios';
import InfoAfipMod from './components/vender/infoAfip';
import CustomSell from './components/customSell';
import moment from 'moment';
import ModalNewCashFound from './modalNewCashFound';
import swal from 'sweetalert';
import CashWithdrawalModal from './cashWithdrawalModal';

const VentasModule = () => {
    const [call, setCall] = useState(false)
    const [moduleActive, setModuleActive] = useState(0)
    const [validPV, setValidPV] = useState([])
    const [afipStatus, setAfipStatus] = useState({
        latencia: 0,
        status: 0,
        info: "Esperando respuesta...",
    })
    const [refreshAfip, setRefreshAfip] = useState(false)
    const [cashFoundModal, setCashFoundModal] = useState(false)
    const [cashWithdrawalModal, setCashWithdrawalModal] = useState(false)

    const width = useWindowSize()

    const activeVentas = () => {
        setModuleActive(0)
    }
    const activeConsultas = () => {
        setModuleActive(1)
    }
    const activeCajaLista = () => {
        setModuleActive(2)
    }
    const activeCustomSell = () => {
        setModuleActive(3)
    }

    const getDummy = async () => {
        setAfipStatus({
            latencia: 0,
            status: 0,
            info: "Esperando respuesta...",
        })
        const query = `?certFile=${validPV.cert_file}&keyFile=${validPV.key_file}&cuit=${validPV.cuit}`
        await axios.get(UrlNodeServer.invoicesDir.sub.dummy + query, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('user-token')
            }
        }).then(res => {
            const respuesta = res.data
            const status = respuesta.status
            if (status === 200) {
                setAfipStatus({
                    latencia: respuesta.body.difference,
                    status: respuesta.body.statusDummy.status,
                    info: respuesta.body.statusDummy.data,
                })
            } else {
                setAfipStatus({
                    latencia: 0,
                    status: 500,
                    info: "Error desconocido",
                })
            }
        }).catch(error => {
            console.error(error);
            setAfipStatus({
                latencia: 0,
                status: 500,
                info: "Error desconocido",
            })
        })
    }

    const getCashFound = async () => {
        const today = moment(new Date()).format("YYYY-MM-DD")
        let createNewCashFound = false
        await axios.get(UrlNodeServer.invoicesDir.sub.cashFound, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('user-token')
            }
        }).then(res => {
            if (res.data.status === 200) {
                const cashDateDB = moment(new Date(res.data.body[0].cash_date)).format("YYYY-MM-DD")
                const cashFoundDB = res.data.body[0].cash_found
                if (cashDateDB !== today) {
                    createNewCashFound = true
                } else {
                    localStorage.setItem("lastDateCash", cashDateDB)
                    localStorage.setItem("lastCashFound", cashFoundDB)
                }
            } else {
                createNewCashFound = true
            }
        }).catch(() => {
            createNewCashFound = true
        })
        if (createNewCashFound) {
            swal("No posee fondo de caja!", "Es obligatorio poseer fondo de caja para poder vender!", "warning");
            setCashFoundModal(true)
        }
    }

    useEffect(() => {
        setCall(!call)
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        getDummy()
        const intervalDummy = setInterval(() => {
            getDummy()
        }, 300000);
        return () => clearInterval(intervalDummy)
    }, [validPV])

    useEffect(() => {
        getDummy()
    }, [refreshAfip])

    useEffect(() => {
        !cashFoundModal && getCashFound()
    }, [cashFoundModal])

    const { loading, error } = UseSecureRoutes(
        UrlNodeServer.routesDir.sub.stock,
        call
    )

    if (loading) {
        return (
            <div style={{ textAlign: "center" }}  >
                <Spinner type="grow" color="light" /> </div>
        )
    } else if (error) {
        return (
            <Redirect
                className="text-light"
                to={process.env.PUBLIC_URL + "/"}
            />
        )
    } else {
        return (
            <>
                <ModalNewCashFound
                    isOpen={cashFoundModal}
                    toggle={() => setCashFoundModal(!cashFoundModal)}
                />
                <CashWithdrawalModal
                    isOpen={cashWithdrawalModal}
                    toggle={() => setCashWithdrawalModal(!cashWithdrawalModal)}
                />
                <Header />
                <Container className="mt--7" fluid>
                    <div style={{ width: "100%" }}>
                        <Card style={{ marginTop: "5px", marginBottom: "10px" }}>
                            <CardBody style={{ textAlign: "center" }}>
                                <ButtonGroup vertical={width > 1030 ? false : true}>
                                    <ButtonOpenCollapse
                                        action={activeVentas}
                                        tittle={"Vender Productos"}
                                        active={moduleActive === 0 ? true : false}
                                    />
                                    <ButtonOpenCollapse
                                        action={activeCajaLista}
                                        tittle={"Listar Caja"}
                                        active={moduleActive === 2 ? true : false}
                                    />
                                    <ButtonOpenCollapse
                                        action={activeConsultas}
                                        tittle={"Consulta de Ventas"}
                                        active={moduleActive === 1 ? true : false}
                                    />
                                </ButtonGroup>

                                <ButtonGroup vertical={width > 1030 ? false : true}>
                                    <ButtonOpenCollapse
                                        action={activeCustomSell}
                                        tittle={"Factura Libre"}
                                        active={moduleActive === 3 ? true : false}
                                    />
                                    <ButtonOpenCollapse
                                        action={() => setCashWithdrawalModal(true)}
                                        tittle={"Retiro de Efectivo"}
                                        active={false}
                                    />
                                    <ButtonOpenCollapse
                                        action={() => setCashFoundModal(true)}
                                        tittle={"Modificar Fondo de Caja"}
                                        active={false}
                                    />
                                </ButtonGroup>
                            </CardBody>
                        </Card>
                        <InfoAfipMod
                            afipStatus={afipStatus}
                            setRefreshAfip={setRefreshAfip}
                            refreshAfip={refreshAfip}
                        />
                        <Collapse isOpen={moduleActive === 0 ? true : false} >
                            <VenderModule
                                setValidPV={setValidPV}
                            />
                        </Collapse>

                        <Collapse isOpen={moduleActive === 2 ? true : false} >
                            <ListaCajaModule />
                        </Collapse>

                        <Collapse isOpen={moduleActive === 1 ? true : false} >
                            <ConsultaVentasModule />
                        </Collapse>
                        <Collapse isOpen={moduleActive === 3 ? true : false} >
                            <CustomSell
                                setValidPV={setValidPV}
                            />
                        </Collapse>
                    </div>
                </Container>
            </>
        )
    }
}

export default VentasModule
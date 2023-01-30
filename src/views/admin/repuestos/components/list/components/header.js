import UrlNodeServer from '../../../../../../api/NodeServer';
import axios from 'axios';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Button, Col, Form, FormGroup, Input, InputGroup, InputGroupAddon, Label, Row } from 'reactstrap';
import PtosVtas from 'views/admin/dashboard/products/header/ptosVta';
import UsuariosList from 'views/admin/ventas/components/listaCaja/header/usersList';
import PartStateModal from '../../form/partStateModal';
import PartTypeModal from '../../form/partTypeModal';

const PartsHeaderList = ({
    setPartsArray,
    page,
    refresh,
    setDataList,
    setLastPage,
    setLoading
}) => {
    const [isOpenModalTypes, setIsOpenModalTypes] = useState(false)
    const [isOpenModalStates, setIsOpenModalStates] = useState(false)
    const [ptoVta, setPtoVta] = useState({ id: false })
    const [ptoVtaList, setPtoVtaList] = useState([])
    const [user, setUser] = useState({ id: false })
    const [userList, setUsersList] = useState([])
    const [fromDate, setFromDate] = useState(moment(new Date().setDate((new Date().getDate()) - 10)).format("YYYY-MM-DD"))
    const [toDate, setToDate] = useState(moment(new Date()).format("YYYY-MM-DD"))
    const [stateId, setStateId] = useState(false)
    const [stateName, setStateName] = useState("Todos los estados")
    const [stateColor, setStateColor] = useState("")
    const [partTypeName, setPartTypeName] = useState("Todos los tipos")
    const [partTypeId, setPartTypeId] = useState(false)
    const [searchText, setSearchText] = useState("")


    const searchList = async () => {
        setLoading(true)
        const query = {
            fromDate: fromDate,
            toDate: toDate,
            search: searchText,
            pvId: ptoVta.id && ptoVta.id,
            state: stateId && stateId,
            userId: user.id && user.id,
            typeId: partTypeId && partTypeId
        }
        await axios.get(UrlNodeServer.partsDir.parts + "/" + page, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('user-token')
            },
            params: query
        }).then(res => {
            const response = res.data
            if (response.status === 200) {
                setPartsArray(response.body.data)
                setLastPage(response.body.pagesObj.totalPag)
                setDataList(response.body.pagesObj)
            } else {
                throw Error("Error inesperado")
            }
        }).catch(() => {
            setPartsArray([])
        }).finally(() => {
            setLoading(false)
        })
    }

    useEffect(() => {
        searchList()
    }, [refresh])

    return (<>
        <Form onSubmit={e => {
            e.preventDefault()
            searchList()
        }}>
            <Row>
                <Col md="2">
                    <FormGroup>
                        <Label>Desde</Label>
                        <Input type="date" value={fromDate} onChange={e => setFromDate(e.target.value)} />
                    </FormGroup>
                </Col>
                <Col md="2">
                    <FormGroup>
                        <Label>Hasta</Label>
                        <Input type="date" value={toDate} onChange={e => setToDate(e.target.value)} />
                    </FormGroup>
                </Col>
                <PtosVtas
                    setPtoVta={setPtoVta}
                    setPtoVtaList={setPtoVtaList}
                    ptoVtaList={ptoVtaList}
                    ptoVta={ptoVta}
                    colSize={4}
                />
                <UsuariosList
                    setUser={setUser}
                    setUsersList={setUsersList}
                    user={user}
                    usersList={userList}
                    colSize={4}
                />
            </Row>
            <Row>
                <Col md="4">
                    <FormGroup>
                        <Label>Estado</Label>
                        <InputGroup>
                            <Input style={stateColor === "" ? {} : { backgroundColor: `${stateColor}`, color: "white" }} value={stateName} disabled />
                            <InputGroupAddon addonType="append"><Button color="primary" onClick={() => setIsOpenModalStates(!isOpenModalStates)}>Buscar</Button></InputGroupAddon>
                        </InputGroup>
                    </FormGroup>
                </Col>
                <Col md="4">
                    <FormGroup>
                        <Label>Tipo</Label>
                        <InputGroup>
                            <Input value={partTypeName} disabled />
                            <InputGroupAddon addonType="append"><Button color="primary" onClick={() => setIsOpenModalTypes(!isOpenModalTypes)}>Buscar</Button></InputGroupAddon>
                        </InputGroup>
                    </FormGroup>
                </Col>
                <Col md="4">
                    <FormGroup>
                        <Label>Observación/Modelo/Color</Label>
                        <Input value={searchText} onChange={e => setSearchText(e.target.value)} />
                    </FormGroup>
                </Col>
            </Row>
            <Row>
                <Col md="12" style={{ textAlign: "center" }}>
                    <Button type="submit" style={{ width: "150px" }} color="success">
                        Buscar
                    </Button>
                </Col>
            </Row>
        </Form>
        <PartTypeModal
            setPartTypeId={setPartTypeId}
            setPartTypeName={setPartTypeName}
            isOpenModalTypes={isOpenModalTypes}
            toggle={() => setIsOpenModalTypes(!isOpenModalTypes)}
            filter={true}
        />
        <PartStateModal
            setStateId={setStateId}
            setStateName={setStateName}
            isOpenModalState={isOpenModalStates}
            setStateColor={setStateColor}
            toggle={() => setIsOpenModalStates(!isOpenModalStates)}
            filter={true}
        />
    </>)
}

export default PartsHeaderList
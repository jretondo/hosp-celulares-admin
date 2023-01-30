import UrlNodeServer from '../../../../../api/NodeServer';
import axios from 'axios';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Card, CardBody, Col, Row, Spinner } from 'reactstrap';
import RepairsFilter from './filter';
import RepairFooter from './footer';
import RepairsTableList from './tableList/index.js';

const RepairsList = ({
    setMsgStrong,
    setMsgGralAlert,
    setSuccessAlert,
    setAlertar,
    alertar,
    triggerList,
    searchTrigger,
    setNewForm,
    setIdRepair
}) => {
    const [searchText, setSearchText] = useState("")
    const [fromDate, setFromDate] = useState(moment(new Date().setDate(new Date().getDate() - 15)).format("YYYY-MM-DD"))
    const [toDate, setToDate] = useState(moment(new Date()).format("YYYY-MM-DD"))
    const [repairState, setRepairState] = useState(false)
    const [franchiseId, setFranchiseId] = useState(false)
    const [repairsArray, setRepairsArray] = useState([])
    const [page, setPage] = useState(1)
    const [lastPage, setLastPage] = useState(1)
    const [dataList, setDataList] = useState([])
    const [loading, setLoading] = useState(false)
    const [summarize, setSummarize] = useState([])

    const ptoVta = localStorage.getItem("pv")

    const getRepairs = async () => {
        setLoading(true)
        await axios.get(UrlNodeServer.repairsDir.repairs + "/" + page, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('user-token')
            },
            params: {
                fromDate: fromDate,
                toDate: toDate,
                search: searchText,
                franchiseId: franchiseId ? franchiseId : "",
                state: repairState ? repairState : ""
            }
        }).then(res => {
            const response = res.data
            if (response.status === 200) {
                setRepairsArray(response.body.data)
                setLastPage(response.body.pagesObj.totalPag)
                setDataList(response.body.pagesObj)
                setSummarize(response.body.summarizes)
            } else {
                setRepairsArray([])
                setSummarize([])
            }
        }).catch(error => {
            setMsgStrong("hubo un error! ")
            setMsgGralAlert("Error: " + error.msg)
            setSuccessAlert(false)
            setAlertar(!alertar)
            setSummarize([])
            setRepairsArray([])
        }).finally(() => { setLoading(false) })
    }

    const GetFranchises = async () => {
        setLoading(true)
        await axios.get(UrlNodeServer.ptosVtaDir.ptosVta, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('user-token')
            },
            params: {
                query: searchText
            }
        }).then(res => {
            const response = res.data
            if (response.status === 200) {
                if (ptoVta !== "null") {
                    setFranchiseId(response.body.data[0].id)
                }
            }
        }).catch(error => {
        }).finally(() => { setLoading(false) })
    }

    useEffect(() => {
        getRepairs()
    }, [searchTrigger])

    useEffect(() => {
        if (ptoVta !== "null") {
            getRepairs()
        }
    }, [franchiseId])

    useEffect(() => {
        if (ptoVta !== "null") {
            GetFranchises()
        }
    }, [])

    return (
        <Card style={{ marginTop: "30px" }}>
            <CardBody>
                <RepairsFilter
                    fromDate={fromDate}
                    setFromDate={setFromDate}
                    toDate={toDate}
                    setToDate={setToDate}
                    repairState={repairState}
                    setRepairState={setRepairState}
                    franchiseId={franchiseId}
                    setFranchiseId={setFranchiseId}
                    searchText={searchText}
                    setSearchText={setSearchText}
                    trigger={() => triggerList()}
                />

                {
                    loading ?
                        <Row>
                            <Col style={{ textAlign: "center" }}>
                                <Spinner color="primary" style={{ width: "200px", height: "200px" }} />
                            </Col>
                        </Row> :
                        <>
                            <RepairsTableList
                                repairsArray={repairsArray}
                                trigger={() => triggerList()}
                                setNewForm={setNewForm}
                                setIdRepair={setIdRepair}
                            />
                            <RepairFooter
                                setPage={setPage}
                                page={page}
                                lastPage={lastPage}
                                dataList={dataList}
                                setLastPage={setLastPage}
                                trigger={triggerList}
                                summarize={summarize}
                            />
                        </>
                }

            </CardBody>
        </Card>
    )
}

export default RepairsList
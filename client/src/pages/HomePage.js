import React, { useState, useEffect } from 'react'
import Layout from '../components/Layout/Layout'
import { Button, Modal, Form, Input, message, Select, Table, DatePicker } from 'antd';
import axios from 'axios';
import moment from 'moment/moment';
import { UnorderedListOutlined, AreaChartOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'
import Analytics from '../components/Layout/Analytics';
const { RangePicker } = DatePicker;
const HomePage = () => {
    const [showModal, setShowModal] = useState(false)
    const [allTransactions, setAllTransactions] = useState([])
    const [frequency, setFrequency] = useState('7')
    const [selectedDate, setSelectedDate] = useState([])
    const [type, setType] = useState("all")
    const [viewData, setViewData] = useState('table')
    const [editable, setEditable] = useState(null)
    const handleOk = () => {
        setShowModal(false);
    };

    const handleCancel = () => {
        setShowModal(false);
    };

    useEffect(() => {
        const getAllTransactions = async () => {
            try {
                const user = JSON.parse(localStorage.getItem("loginusers"))
                const res = await axios.post("http://localhost:4000/get-transaction", { userId: user.id, frequency, selectedDate, type });
                setAllTransactions(res.data)
                console.log(res.data)

            } catch (err) {
                message.error("issue with fetch transactions")
            }
        }
        getAllTransactions()
    }, [frequency, selectedDate, type])

    const columns = [
        {
            title: "Date",
            dataIndex: "date",
            render: (text) => <span>{moment(text).format("YYYY-MM-DD")}</span>
        },
        {
            title: "Amount",
            dataIndex: "amount"
        },
        {
            title: "Type",
            dataIndex: "type"
        }, {
            title: "Category",
            dataIndex: "category"
        },
        {
            title: "Refrence",
            dataIndex: "refrence"
        },
        {
            title: "Actions",
            render: (text, record) => (
                <div>
                    <EditOutlined onClick={() => {
                        setEditable(record)
                        setShowModal(true)
                    }} />
                    <DeleteOutlined className='mx-2' onClick={() => handleDelete(record)} />
                </div>
            )
        }
    ]
    const handleDelete = async (record) => {
        try {
            await axios.post("http://localhost:4000/delete-transaction", { transactionId: record.id })
            message.success("Deleted Successfully")
        } catch (err) {
            console.log(err)
            message.error("unable to delete")
        }
    }
    const handleSubmit = async (values) => {
        try {
            const user = JSON.parse(localStorage.getItem("loginusers"))
            if (editable) {
                await axios.post("http://localhost:4000/edit-transaction", { payload: { ...values, userId: user.id }, transactionId: editable.id })
                    .then(() => {
                        message.success("Transaction Updated Succesfully")
                        setShowModal(false)
                        setEditable(null)
                    }).catch((err) => {
                        message.error("something went wrong")
                    })
            } else {
                await axios.post("http://localhost:4000/add-transaction", { ...values, userId: user.id })
                    .then(() => {
                        message.success("Transaction Added Succesfully")
                        setShowModal(false)
                        setEditable(null)
                    }).catch((err) => {
                        message.error("something went wrong")
                    })
            }
        } catch (err) {
            message.error("something went wrong")
        }
    }
    return (
        <Layout>
            <div className='filters'>
                <div >
                    <h6>Select Frequency</h6>
                    <Select value={frequency} onChange={(values) => setFrequency(values)}>
                        <Select.Option value="7">LAST 1 WEEK</Select.Option>
                        <Select.Option value="30">LAST 1 MONTH</Select.Option>
                        <Select.Option value="365">LAST 1 YEAR</Select.Option>
                        <Select.Option value="custom">CUSTOM</Select.Option>
                    </Select>
                    {frequency === "custom" && <RangePicker value={selectedDate} onChange={(values) => setSelectedDate(values)} />}
                </div>

                {/* //-------------------------------------------------- */}
                <div >
                    <h6>Select Type</h6>
                    <Select value={type} onChange={(values) => setType(values)}>
                        <Select.Option value="all">ALL</Select.Option>
                        <Select.Option value="income">INCOME</Select.Option>
                        <Select.Option value="expense">EXPENSE</Select.Option>

                    </Select>
                    {frequency === "custom" && <RangePicker value={selectedDate} onChange={(values) => setSelectedDate(values)} />}
                </div>
                <div className='mx-2 icon-conatiner'>
                    <UnorderedListOutlined className={`mx-2 ${viewData === 'table' ? 'active-icon' : "inactive-icon"}`} onClick={() => setViewData('table')} />
                    <AreaChartOutlined className={`mx-2 ${viewData === 'analytics' ? 'active-icon' : "inactive-icon"}`} onClick={() => setViewData('analytics')} />
                </div>
                <div>

                    <button className='btn btn-primary' onClick={() => setShowModal(!showModal)}>Add New</button>
                </div>

            </div>
            <div className='content'>
                {viewData === 'table' ? <Table columns={columns} dataSource={allTransactions} /> : <Analytics allTransactions={allTransactions} />}

            </div>
            <Modal title={editable ? "Edit Transaction" : "Add Transaction"} open={showModal} onOk={handleOk} onCancel={handleCancel} footer={false}>
                <Form layout="vertical" onFinish={handleSubmit} initialValues={editable}>
                    <Form.Item label="Amount" name="amount">
                        <Input type="text" />
                    </Form.Item>
                    <Form.Item label="type" name="type">
                        <Select>
                            <Select.Option value="income">Income</Select.Option>
                            <Select.Option value="expense">Expense</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label="Category" name="category">
                        <Select>
                            <Select.Option value="salary">Salary</Select.Option>
                            <Select.Option value="tip">Tip</Select.Option>
                            <Select.Option value="project">Project</Select.Option>
                            <Select.Option value="food">Food</Select.Option>
                            <Select.Option value="movie">Movie</Select.Option>
                            <Select.Option value="bills">Bills</Select.Option>
                            <Select.Option value="gym">Gym</Select.Option>
                            <Select.Option value="medical">Medical</Select.Option>
                            <Select.Option value="tax">Taxes</Select.Option>
                            <Select.Option value="fees">Fees</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label="Reference" name="refrence">
                        <Input type="text" />
                    </Form.Item>
                    <Form.Item label="Description" name="decription">
                        <Input type="text" />
                    </Form.Item>
                    <Form.Item label="Date" name="date">
                        <Input type="date" />
                    </Form.Item>
                    <div className='d-flex justify-content-end'>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </div>
                </Form>
            </Modal>
        </Layout>
    )
}

export default HomePage
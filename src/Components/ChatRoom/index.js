import React from 'react'
import { Row, Col } from 'antd'
import Sidebar from './Sidebar'
import ChatWindow from './ChatWindow'


export default function index() {
    return (
        <Row>
            <Col span={6}> <Sidebar /></Col>
            <Col span={18}> <ChatWindow />  </Col>
        </Row>
    )
}

import React, { useContext, useState } from 'react'
import { Modal, Form, Input } from 'antd'
import { AppContext } from '../../Context/AppProvider'
import { addDocument } from '../../FireBase/service';
import { AuthContext } from '../../Context/AuthProvider';

export default function AddRoom() {
    const { isVisibale, setIsVisibale } = useContext(AppContext);
    const { user: { uid } } = useContext(AuthContext);

    const [form] = Form.useForm();
    const handleOk = () => {
        addDocument('rooms', { ...form.getFieldValue(), members: [uid] })
        form.resetFields();
        setIsVisibale(false);
    }
    const handleCancel = () => {
        form.resetFields();
        setIsVisibale(false);
    }
    return (
        <div>
            <Modal
                title="Tạo phòng"
                visible={isVisibale}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Form form={form} layout="vertical">
                    <Form.Item label='Tên phòng: ' name="name" >
                        <Input placeholder="Nhập tên phòng..." />
                    </Form.Item>
                    <Form.Item label='Mô tả: ' name="description" >
                        <Input.TextArea placeholder="Nhập mô tả..." />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}

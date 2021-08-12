import { Avatar, Form, Modal, Select, Spin } from 'antd';
import { debounce } from 'lodash';
import React, { useContext, useState } from 'react';
import { AppContext } from '../../Context/AppProvider';
import { AuthContext } from '../../Context/AuthProvider';
import { db } from '../../FireBase/Config';

function DebounceSelect({ fetchOptions, debounceTimeout = 300, ...props }) {

    const [fetching, setFetching] = useState(false);
    const [options, setOptions] = useState([]);

    const debounceFetcher = React.useMemo(() => {
        const loadOptions = (value) => {
            setOptions([]);
            setFetching(true);

            fetchOptions(value, props.curMembers).then(newOptions => {
                setOptions(newOptions);
                setFetching(false);
            })
        }

        return debounce(loadOptions, debounceTimeout);

    }, [debounceTimeout, fetchOptions, props.curMembers]);

    React.useEffect(() => {
        return () => {
            // clear when unmount
            setOptions([]);
        };
    }, []);


    return (
        <Select
            labelInValue
            filterOption={false}
            onSearch={debounceFetcher}
            notFoundContent={fetching ? <Spin size='small' /> : null}
            {...props}
        >
            {
                options.map((opt) => (
                    <Select.Option key={opt.value} value={opt.value} title={opt.label}>
                        <Avatar size='small' src={opt.photoURL}>
                            {opt.photoURL ? '' : opt.label?.charAt(0)?.toUpperCase()}
                        </Avatar>
                        {` ${opt.label}`}
                    </Select.Option>
                ))
            }
        </Select>
    )
}

async function fetchUserList(search, curMembers) {
    return db.collection('users')
        .where('keywords', 'array-contains', search?.toUpperCase())
        .orderBy('displayName')
        .limit(10)
        .get()
        .then(snapshot => {
            return snapshot.docs.map(doc => ({
                label: doc.data().displayName,
                value: doc.data().uid,
                photoURL: doc.data().photoURL,

            })).filter(opt => curMembers.includes(opt.value));
        });
}

export default function InvitedMember() {
    const { isInvitedMember, setIsInvitedMember, selectedRoom, roomSelected } = useContext(AppContext);
    const [value, setValue] = useState([])
    const [form] = Form.useForm();

    const handleOk = () => {
        form.resetFields();

        const roomRef = db.collection('rooms').doc(selectedRoom);

        roomRef.update({
            members: [...roomSelected.members, ...value.map((val) => val.value)]
        })

        setIsInvitedMember(false);
    }
    const handleCancel = () => {
        form.resetFields();
        setValue([])
        setIsInvitedMember(false);
    }

    return (
        <div>
            <Modal
                title="Thêm Thành Viên !!!"
                visible={isInvitedMember}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Form form={form} layout="vertical">
                    <DebounceSelect
                        mode="multiple"
                        label="Tên các thành viên"
                        value={value}
                        placeholder="Nhập tên thành viên ..."
                        fetchOptions={fetchUserList}
                        onChange={(newValue) => setValue(newValue)}
                        style={{ width: '100%' }}
                        curMembers={roomSelected.members}
                    />
                </Form>
            </Modal>
        </div>
    )
}

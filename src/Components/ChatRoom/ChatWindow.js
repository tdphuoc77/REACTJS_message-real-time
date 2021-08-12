import { UserAddOutlined } from '@ant-design/icons';
import { Alert, Avatar, Button, Form, Input, Tooltip } from 'antd';
import React, { useContext, useState } from 'react'
import styled from 'styled-components'
import AppProvider, { AppContext } from '../../Context/AppProvider';
import { AuthContext } from '../../Context/AuthProvider';
import { addDocument } from '../../FireBase/service';
import useFireStore from '../../Hooks/useFireStore';
import Message from './Message';

const HeaderStyled = styled.div`
    display: flex;
    justify-content: space-between;
    height: 56px;
    padding : 0 16px;
    align-item: center;
    border-bottom: 1px solid rgb(230, 230, 230);

    .header {
        &__info{
        display: flex;
        flex-direction: column;
         justify-content: center;
        }

        &__title{
            margin:0;
            font-weight: bold;
        }
        &__description{
            font-size: 12px;
        }
    }
`;

const ButtonGroupStyled = styled.div`
    display:flex;
    align-item:centter;
`;

const WrapperStyled = styled.div`
    height:100vh;
`;

const FormStyled = styled(Form)`
    display: flex;
    justify-content: space-between;
    align-item: center;
    padding: 2px 2px 2px 0;
    border: 1px solid rgb(230, 230, 230);
    border-radius: 2px;

    .ant-form-item{
        flex    :1;
        margin-bottom: 0;
    }
`;

const ContentStyled = styled.div`
    height: calc(100% - 56PX);
    display:flex;
    flex-direction: column;
    padding: 11px;
    justify-content: flex-end;
`;

const MessageListStyled = styled.div`
    max-height: 100%;
    overflow-y:auto;
`;
export default function ChatWindow() {

    const { roomSelected, members, setIsInvitedMember } = useContext(AppContext);
    const { user: { uid, displayName, photoURL } } = useContext(AuthContext);

    const [inputValue, setInputValue] = useState('');
    const [form] = Form.useForm();

    const handleInputChange = (e) => {
        setInputValue(e.target.value)
    }
    const handleSubmit = () => {
        addDocument('messages', {
            text: inputValue,
            uid,
            photoURL,
            roomID: roomSelected.id,
            displayName,
        });

        form.resetFields(['message']);
    };

    const condition = React.useMemo(() => ({
        fieldName: 'roomID',
        operator: '==',
        compareValue: roomSelected.id,
    }), [roomSelected.id]
    );
    const messages = useFireStore('messages', condition);
    console.log({ messages })


    return (
        <WrapperStyled>
            {
                roomSelected.id ? (
                    <>
                        <HeaderStyled>
                            <div className="header__info">
                                <p className="header__title">{roomSelected.name}</p>
                                <span className="header__description">{roomSelected.description}</span>
                            </div>
                            <ButtonGroupStyled>
                                <Button onClick={() => setIsInvitedMember(true)} icon={<UserAddOutlined />} >Mời</Button>
                                <Avatar.Group size='small' maxCount={2}>
                                    {
                                        members.map(member =>
                                            <Tooltip title={member.displayName} key={member.id} >
                                                <Avatar size='small' src={member.photoURL} >{member.photoURL ? '' : member.displayName?.charAt(0)?.toUpperCase()}</Avatar>
                                            </Tooltip>
                                        )
                                    }

                                </Avatar.Group>
                            </ButtonGroupStyled>
                        </HeaderStyled>
                        <ContentStyled>
                            <MessageListStyled>
                                {messages.map((mes) => (
                                    <Message
                                        key={mes.id}
                                        text={mes.text}
                                        photoURL={mes.photoURL}
                                        displayName={mes.displayName}
                                        createdAt={mes.createAt}
                                    />
                                ))}

                            </MessageListStyled>
                            <FormStyled form={form} >
                                <Form.Item name="message" >
                                    <Input
                                        onChange={handleInputChange}
                                        onPressEnter={handleSubmit}
                                        placeholder='nhập tin nhắn ...' bordered={false} autoComplete='off' />
                                </Form.Item>
                                <Button type='primary' onClick={handleSubmit} >Gửi</Button>
                            </FormStyled>
                        </ContentStyled>
                    </>
                ) : <Alert message="Hãy chọn phòng" type="warning" showIcon style={{ margin: 5 }} closable />
            }
        </WrapperStyled>
    )
}

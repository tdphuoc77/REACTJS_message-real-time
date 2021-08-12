import { Avatar, Button, Typography } from 'antd';
import React from 'react';
import styled from 'styled-components';
import { AuthContext } from '../../Context/AuthProvider';
import { auth } from '../../FireBase/Config';

const WrapperStyled = styled.div`
    display:flex;
    justify-content: space-between;
    padding: 12px 16px;
    border-bottom: 1px solid rgba(82, 38, 83);

    .userName{
        color:white;
        margin-left:5px;
    }
`;

export default function UserInfo() {


    const { user: {
        displayName,
        photoURL,
    } } = React.useContext(AuthContext);

    return (
        <WrapperStyled>

            <div>
                <Avatar src={photoURL}>{photoURL ? '' : displayName?.charAt(0)?.toUpperCase()}</Avatar>
                <Typography.Text className="userName">{displayName}</Typography.Text>
            </div>
            <Button ghost onClick={() => { auth.signOut() }} > Đăng Xuất</Button>

        </WrapperStyled>
    )
}

import { Button, Col, Row, Typography } from 'antd';
import React from 'react';
import firebase, { auth } from '../../FireBase/Config';
import { addDocument, generateKeywords } from '../../FireBase/service';

const { Title } = Typography;

const fbProvider = new firebase.auth.FacebookAuthProvider();

export default function Index() {


    const handleFBLogin = async () => {
        const { additionalUserInfo, user } = await auth.signInWithPopup(fbProvider)

        if (additionalUserInfo?.isNewUser) {
            addDocument('users', {
                displayName: user.displayName,
                email: user.email,
                photoURL: user.photoURL,
                uid: user.uid,
                providerId: additionalUserInfo.providerId,
                keywords: generateKeywords(user.displayName)
            });
        }
    }

    return (
        <div>
            <Row justify="center" style={{ height: 800 }}>
                <Col span={8}>
                    <Title style={{ textAlign: 'center' }} level={3}> Fun Chat</Title>
                    <Button style={{ width: '100%', marginBottom: 5 }}>
                        Đăng nhập bằng Google
                    </Button>
                    <Button onClick={handleFBLogin} style={{ width: '100%', marginBottom: 5 }}>
                        Đăng nhập bằng Facebook
                    </Button>

                </Col>
            </Row>
        </div>
    )
}

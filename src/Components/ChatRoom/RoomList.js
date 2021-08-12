import { PlusSquareOutlined } from '@ant-design/icons';
import { Button, Collapse, Typography } from 'antd';
import React from 'react';
import styled from 'styled-components';
import { AppContext } from '../../Context/AppProvider';

const { Panel } = Collapse;

const PanelStyled = styled(Panel)`
    &&&{
        .ant-collapse-header,p{
            color: white;
        }

        .ant-collapse-content-box{
            padding: 0 40px;
        }
        .add-room{
            color: white;
            padding: 0 ;
        }z
    }
`;

const LinkStyled = styled(Typography.Link)`
    display: block;
    margin-bottom: 5px;
    color: white;
`
export default function RoomList() {

    const { rooms, setIsVisibale, setSelectedRoom } = React.useContext(AppContext);

    const handleAddRoom = () => {
        setIsVisibale(true)
    };

    return (
        <Collapse ghost defaultActiveKey={['1']}>
            <PanelStyled header="Danh Sách Các Phòng Chat" key='1' >
                {
                    rooms.map(room => <LinkStyled
                        onClick={() => setSelectedRoom(room.id)} key={room.id}>{room.name}</LinkStyled>)
                }

                <Button onClick={handleAddRoom} type="text" icon={<PlusSquareOutlined />} className="add-room">Thêm Phòng</Button>
            </PanelStyled>
        </Collapse>
    )
}

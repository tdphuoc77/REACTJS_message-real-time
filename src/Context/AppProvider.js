import React, { useState } from 'react';
import useFireStore from '../Hooks/useFireStore';
import { AuthContext } from './AuthProvider';

export const AppContext = React.createContext();

export default function AppProvider({ children }) {

    const [isVisibale, setIsVisibale] = useState(false)
    const [isInvitedMember, setIsInvitedMember] = useState(false)

    const [selectedRoom, setSelectedRoom] = useState("");

    const { user:
        { uid },
    } = React.useContext(AuthContext);

    const roomsCondition = React.useMemo(() => {
        return {
            fieldName: 'members',
            operator: 'array-contains',
            compareValue: uid,
        }
    }, [uid]);

    const rooms = useFireStore('rooms', roomsCondition);

    const [roomSelected, setRoomSelected] = useState({})
    React.useMemo(() => {
        rooms.find((room) => room.id === selectedRoom)
        rooms.map((room, key) => {
            if (room.id === selectedRoom) {
                setRoomSelected(room);
            }
        })
    }, [rooms, selectedRoom]);

    const usersCondition = React.useMemo(() => {
        return {
            fieldName: 'uid',
            operator: 'in',
            compareValue: roomSelected.members,
        }
    }, [roomSelected.members]);

    const members = useFireStore('users', usersCondition)



    return (
        <AppContext.Provider value={{ members, roomSelected, rooms, isVisibale, setIsVisibale, selectedRoom, setSelectedRoom, isInvitedMember, setIsInvitedMember }} >
            {children}
        </AppContext.Provider>
    );


}
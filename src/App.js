import Login from "./Components/Login"
import ChatRoom from "./Components/ChatRoom"
import { Route, Switch, BrowserRouter } from 'react-router-dom'
import AuthProvider from "./Context/AuthProvider"
import AppProvider from "./Context/AppProvider"
import AddRoom from "./Components/Modal/AddRoom"
import InvitedMember from "./Components/Modal/InvitedMember"


function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppProvider >
          <Switch>
            <Route component={Login} path="/login" />
            <Route component={ChatRoom} path="/" />
          </Switch>
          <AddRoom />
          <InvitedMember />
        </AppProvider>
      </AuthProvider>
    </BrowserRouter >
  );
}

export default App;

import * as React from "react";
import "./index.css";
import { Layout } from "./app/layout";
import { Inbox } from "./app/Inbox";
import { Mail } from "app/Mail";
import { LogonPage } from "app/LogonPage";
import { LoginPage } from "app/LoginPage";
import MainInbox from "app/MainInbox";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
  useNavigate,
} from "react-router-dom";
import Authdata from "./services/authservice";

interface UserData {
  id: string;
  name: string;
  email: string;
  // Add other fields as necessary
}
interface AppProps {
  prop: string;
}
const App: React.FC<AppProps> = ({ prop }) => {
  const [currentUser, setCurrentUser] = React.useState<UserData | null>(null);
  const isAuthenticated = () => {
    return Boolean(localStorage.getItem("user"));
  };
  React.useEffect(() => {
    const user = Authdata.getuserdata();
    console.log("user is",user);

    if (user) {
      const user: UserData = { id: '1', name: 'John Doe', email: 'john.doe@example.com' };
    setCurrentUser(user);
    }
  }, []);
  
  return (
    <Router>
      <Routes>
        {isAuthenticated() ? (
          <>
            <Route path="/" element={<MainInbox />} />
            <Route path="*" element={<Navigate to="/" />} />
          </>
        ) : (
          <>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/createaccount" element={<LogonPage />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </>
        )}
      </Routes>
    </Router>
  );
};

export default App;

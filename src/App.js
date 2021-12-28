import '../node_modules/bootstrap/dist/js/bootstrap.bundle'
import "bootstrap-icons/font/bootstrap-icons.css"
import { AuthContextProvider } from "./contexts/AuthContext"
import { DatabaseContextProvider } from "./contexts/DatabaseContext"
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import Spots from "./components/Spots"
import {ModalProvider} from "./contexts/ModalContext";
import {NavigationContextProvider} from "./contexts/Navigation";
import {SpotsContextProvider} from "./contexts/SpotsContext";

export default function App() {
    return (
        <div className="App">
            <AuthContextProvider>
            <DatabaseContextProvider>
            <SpotsContextProvider>
            <ModalProvider>       
            <NavigationContextProvider>
                <Router>
                    <Routes>
                        <Route exact path="/" element={<Spots/>} />
                        <Route path="/:anythingelse" element={<Navigate to="/"/>}/>
                    </Routes>
                </Router>
            </NavigationContextProvider>
            </ModalProvider>  
            </SpotsContextProvider>
            </DatabaseContextProvider>
            </AuthContextProvider>

        </div>
    )
}

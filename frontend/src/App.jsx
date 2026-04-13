import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import BrowsePets from "./pages/BrowsePets";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ApplyAdoption from "./pages/ApplyAdoption";
import ApplyFoster from "./pages/ApplyFoster";
import ViewApplications from "./pages/ViewApplications";
import AddPet from "./pages/AddPet";
import ViewAllApplications from "./pages/ViewAllApplications";

function App() {
    return (
        <AuthProvider>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/pets" element={<BrowsePets />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />

                <Route
                    path="/apply-adoption/:petId"
                    element={
                        <ProtectedRoute>
                            <ApplyAdoption />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/apply-foster/:petId"
                    element={
                        <ProtectedRoute>
                            <ApplyFoster />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/applications"
                    element={
                        <ProtectedRoute>
                            <ViewApplications />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/admin/add-pet"
                    element={
                        <ProtectedRoute adminOnly={true}>
                            <AddPet />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/admin/applications"
                    element={
                        <ProtectedRoute adminOnly={true}>
                            <ViewAllApplications />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </AuthProvider>
    );
}

export default App;
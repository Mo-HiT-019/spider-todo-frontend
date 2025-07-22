import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import TodoPage from "./pages/TodoPage";
import ProtectedRoutes from "./components/ProtectedRoutes";
import PublicRoute from "./components/PublicRoutes";
import AssignedTasksPage from "./pages/AssignedTaskPage";
import AssignTaskPage from "./pages/AssignTask";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<PublicRoute> <SignupPage /> </PublicRoute> } />
        <Route path="/login"  element={<PublicRoute> <LoginPage /> </PublicRoute>} />
        <Route
          path="/"
          element={
            <ProtectedRoutes>
              <TodoPage />
            </ProtectedRoutes>
          }
        />
        <Route path='/assigned' element={<ProtectedRoutes> <AssignedTasksPage/> </ProtectedRoutes>}/>
        <Route path='/assign' element={<ProtectedRoutes> <AssignTaskPage/> </ProtectedRoutes>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

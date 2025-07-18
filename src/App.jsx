import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import TodoPage from "./pages/TodoPage";
import ProtectedRoutes from "./components/ProtectedRoutes";
import PublicRoute from "./components/PublicRoutes";

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
      </Routes>
    </BrowserRouter>
  );
}

export default App;

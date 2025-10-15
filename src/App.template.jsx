import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./auth/AuthContext";
import ProtectedRoute from "./auth/ProtectedRoute";

import Login from "./pages/Login";
import AdminHome from "./pages/AdminHome";
import TeacherHome from "./pages/TeacherHome";
import StudentHome from "./pages/StudentHome";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Rutas públicas */}
          <Route path="/login" element={<Login />} />

          {/* Rutas protegidas */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute requiredRole="ADMIN">
                <AdminHome />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profesor"
            element={
              <ProtectedRoute requiredRole="PROFESOR">
                <TeacherHome />
              </ProtectedRoute>
            }
          />
          <Route
            path="/estudiante"
            element={
              <ProtectedRoute requiredRole="ESTUDIANTE">
                <StudentHome />
              </ProtectedRoute>
            }
          />

          {/* Redirección por defecto */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

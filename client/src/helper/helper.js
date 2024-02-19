import { Navigate } from "react-router-dom"

export function ProtectedRoutes({ children }) {
    if (localStorage.getItem("loginusers")) {
        return children
    } else {
        <Navigate to="/login" />
    }
}
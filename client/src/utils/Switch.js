// Packages
import React, { useState, useEffect } from "react"
import { Routes, Route } from "react-router-dom"
import axios from "axios"

// Routes
import routes from "./routes"

// Pages
// Auth
import Verify from "../pages/auth/Verify"
import ResetPassword from "../pages/auth/ResetPassword"

// Utils
import ProtectedRoutes from "./ProtectedRoutes"
import AnonRoutes from "./AnonRoutes"

function Switch() {
    const [allUsers, setAllUsers] = useState([])
    const [edited, setEdited] = useState(false)

    useEffect(() => {
        axios
            .get("/users/user")
            .then(res => setAllUsers(res.data))
            .catch(err => console.log(err))
    }, [])

    return (
        <Routes>
            {routes.map((route, i) => (
                <Route
                    path={route.path}
                    element={
                        route.protected ? (
                            <ProtectedRoutes>
                                <route.element
                                    edited={route.edit && edited}
                                    setEdited={route.edit && setEdited}
                                />
                            </ProtectedRoutes>
                        ) : route.anon ? (
                            <AnonRoutes>
                                <route.element
                                    edited={route.edit && edited}
                                    setEdited={route.edit && setEdited}
                                />
                            </AnonRoutes>
                        ) : (
                            <route.element
                                edited={route.edit && edited}
                                setEdited={route.edit && setEdited}
                            />
                        )
                    }
                    key={i}
                />
            ))}

            <Route
                path="/verify/:token/:id"
                element={
                    <ProtectedRoutes redirectTo="/login">
                        <Verify edited={edited} setEdited={setEdited} />
                    </ProtectedRoutes>
                }
            />

            {allUsers.map(user => (
                <Route
                    path={`/reset-password/${user.resetToken}/${user._id}`}
                    element={<ResetPassword />}
                    key={`${user.resetToken}-${user._id}`}
                />
            ))}
        </Routes>
    )
}

export default Switch

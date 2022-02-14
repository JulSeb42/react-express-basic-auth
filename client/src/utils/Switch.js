// Packages
import React, { useState } from "react"
import { Routes, Route } from "react-router-dom"

// Routes
import routes from "./routes"

// Utils
import ProtectedRoutes from "./ProtectedRoutes"
import AnonRoutes from "./AnonRoutes"

function Switch() {
    const [edited, setEdited] = useState(false)

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
        </Routes>
    )
}

export default Switch

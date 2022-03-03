// Packages
import React from "react"
import { Link } from "react-router-dom"
import { Font } from "components-react-julseb"

// Components
import Page from "../components/layouts/Page"

const NotFound = () => {
    // Texts
    const title = "Page not found"

    return (
        <Page title={title}>
            <Font.H1>{title}</Font.H1>

            <Font.P>
                <Link to="/">Back to homepage.</Link>
            </Font.P>
        </Page>
    )
}

export default NotFound

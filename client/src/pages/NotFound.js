// Packages
import React from "react"
import { Font, LinkScroll as Link } from "components-react-julseb"

// Components
import Page from "../components/layouts/Page"

function NotFound() {
    return (
        <Page title="Not found!">
            <Font.H1>Page not found!</Font.H1>

            <Font.P>
                <Link to="/">Back to homepage.</Link>
            </Font.P>
        </Page>
    )
}

export default NotFound

// Packages
import React from "react"
import { Font } from "components-react-julseb"

// Components
import Page from "../components/layouts/Page"

const Home = () => {
    // Texts
    const title = "Homepage"

    return (
        <Page title={title}>
            <Font.H1>{title}</Font.H1>
        </Page>
    )
}

export default Home

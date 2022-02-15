// Packages
import React from "react"
import { Font } from "components-react-julseb"

// Components
import Page from "../components/layouts/Page"

const Home = () => {
    // Texts
    const texts = {
        title: "Homepage",
    }

    return (
        <Page title={texts.title}>
            <Font.H1>{texts.title}</Font.H1>
        </Page>
    )
}

export default Home

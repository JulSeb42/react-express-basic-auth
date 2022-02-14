// Packages
import React, { useContext } from "react"
import { Link } from "react-router-dom"
import { Font, getFirstName } from "components-react-julseb"

// Components
import { AuthContext } from "../../context/auth"
import Page from "../../components/layouts/Page"

function MyAccount() {
    // Context
    const { user } = useContext(AuthContext)

    // Texts
    const texts = {
        title: `Hello ${getFirstName(user.fullName)}`,
        accountNotVerified: "Your account is not verified.",
        editAccount: "Edit your account.",
    }

    return (
        <Page title={user.fullName}>
            <Font.H1>{texts.title}</Font.H1>

            {!user.verified && <Font.P>{texts.accountNotVerified}</Font.P>}

            <Font.P>
                <Link to="/my-account/edit">{texts.editAccount}</Link>
            </Font.P>
        </Page>
    )
}

export default MyAccount

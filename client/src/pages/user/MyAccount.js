// Packages
import React, { useContext, useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Font, getFirstName, PageLoading } from "components-react-julseb"

// API
import getPopulatedUser from "../../context/populatedUser"

// Components
import { AuthContext } from "../../context/auth"
import Page from "../../components/layouts/Page"

const MyAccount = () => {
    // Context
    const { user } = useContext(AuthContext)

    // Texts
    const texts = {
        title: `Hello ${getFirstName(user.fullName)}`,
        accountNotVerified: "Your account is not verified.",
        editAccount: "Edit your account.",
    }

    // Get populatedUser
    const [populatedUser, setPopulatedUser] = useState()
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        getPopulatedUser(user._id).then(res => {
            setPopulatedUser(res)
            setIsLoading(false)
        })
    }, [user._id])

    return isLoading ? (
        <PageLoading />
    ) : (
        <Page title={populatedUser.fullName}>
            <Font.H1>{texts.title}</Font.H1>

            {!populatedUser.verified && (
                <Font.P>{texts.accountNotVerified}</Font.P>
            )}

            <Font.P>
                <Link to="/my-account/edit">{texts.editAccount}</Link>
            </Font.P>
        </Page>
    )
}

export default MyAccount

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

    // Get populatedUser
    const [populatedUser, setPopulatedUser] = useState()
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        getPopulatedUser(user._id).then(res => {
            setPopulatedUser(res)
            setIsLoading(false)
        })
    }, [user._id])

    return (
        <Page title={user.fullName}>
            {isLoading ? (
                <PageLoading />
            ) : (
                <>
                    <Font.H1>Hello {getFirstName(user.fullName)}</Font.H1>

                    {!populatedUser.verified && (
                        <Font.P>Your account is not verified.</Font.P>
                    )}

                    <Font.P>
                        <Link to="/my-account/edit">Edit your account.</Link>
                    </Font.P>
                </>
            )}
        </Page>
    )
}

export default MyAccount

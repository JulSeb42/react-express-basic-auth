// Packages
import React, { useContext, useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import axios from "axios"
import { Font, Form, Input, Alert } from "components-react-julseb"

// Components
import { AuthContext } from "../../context/auth"
import Page from "../../components/layouts/Page"
import DangerZone from "../../components/DangerZone"

function EditAccount({ edited, setEdited }) {
    // Consts
    const { user, updateUser, logoutUser } = useContext(AuthContext)
    const navigate = useNavigate()

    // Texts
    const texts = {
        title: "Edit your account",
        saveBtn: "Save changes",
        linkPassword: "Edit your password.",

        // Delete
        textbtnopen: "Delete your account",
        textalert: "Are you sure you want to delete your account?",
        textbtndelete: "Yes, delete my account",
    }

    // Form items
    const [fullName, setFullName] = useState(user.fullName)
    const [errorMessage, setErrorMessage] = useState(undefined)

    // Form handles
    const handleFullName = e => setFullName(e.target.value)

    // Form submit
    const handleSubmit = e => {
        e.preventDefault()

        const requestBody = { fullName }

        axios
            .put(`/users/edit/${user._id}`, requestBody)
            .then(res => {
                const { user } = res.data
                updateUser(user)
                setEdited(!edited)
                navigate("/my-account")
            })
            .catch(err => {
                const errorDescription = err.response.data.message
                setErrorMessage(errorDescription)
            })
    }

    // Delete account
    const handleDelete = () => {
        axios
            .delete(`/users/delete-user/${user._id}`)
            .then(() => {
                logoutUser()
                navigate("/goodbye")
            })
            .catch(err => console.log(err))
    }

    return (
        <Page title={texts.title} template="form">
            <Font.H1>{texts.title}</Font.H1>

            <Form
                btnprimary={texts.saveBtn}
                btncancel="/my-account"
                onSubmit={handleSubmit}
            >
                <Input
                    label="Full name"
                    id="fullName"
                    onChange={handleFullName}
                    value={fullName}
                />

                <Input
                    label="Email"
                    type="email"
                    id="email"
                    value={user.email}
                    disabled
                />
            </Form>

            {errorMessage && <Alert color="danger">{errorMessage}</Alert>}

            <Font.P>
                <Link to="/my-account/edit-password">{texts.linkPassword}</Link>
            </Font.P>

            <DangerZone
                onClickPrimary={handleDelete}
                textbtnopen={texts.textbtnopen}
                text={texts.textalert}
                textbtndelete={texts.textbtndelete}
            />
        </Page>
    )
}

export default EditAccount

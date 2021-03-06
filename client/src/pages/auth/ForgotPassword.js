// Packages
import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import {
    Font,
    Form,
    Input,
    Alert,
    getRandomString,
} from "components-react-julseb"

// Components
import Page from "../../components/layouts/Page"

const ForgotPassword = () => {
    // Consts
    const navigate = useNavigate()

    // Texts
    const title = "I forgot my password"

    // Form items
    const [email, setEmail] = useState("")
    const [errorMessage, setErrorMessage] = useState(undefined)

    // Form handles
    const handleEmail = e => setEmail(e.target.value)

    // Submit form
    const handleSubmit = e => {
        e.preventDefault()

        const requestBody = {
            email,
            resetToken: getRandomString(20),
        }

        axios
            .post("/auth/forgot", requestBody)
            .then(res => {
                console.log(res)
                navigate("/login/forgot-password/email-sent")
            })
            .catch(err => {
                const errorDescription = err.response.data.message
                setErrorMessage(errorDescription)
            })
    }

    return (
        <Page title={title} template="form">
            <Font.H1>{title}</Font.H1>

            <Font.P>
                Please enter your email address, we will send you a link to
                reset your password.
            </Font.P>

            <Form btnprimary="Send" onSubmit={handleSubmit}>
                <Input
                    label="Email"
                    type="email"
                    id="email"
                    onChange={handleEmail}
                    value={email}
                />
            </Form>

            {errorMessage && <Alert color="danger">{errorMessage}</Alert>}
        </Page>
    )
}

export default ForgotPassword

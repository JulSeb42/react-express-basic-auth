// Packages
import React, { useContext, useState } from "react"
import axios from "axios"
import { useNavigate, Link } from "react-router-dom"
import {
    Font,
    Form,
    Input,
    Alert,
    getRandomString,
} from "components-react-julseb"

// Components
import { AuthContext } from "../../context/auth"
import Page from "../../components/layouts/Page"

const Signup = () => {
    // Consts
    const { loginUser } = useContext(AuthContext)
    const navigate = useNavigate()

    // Texts
    const title = "Sign up"

    // Form items
    const [fullName, setFullName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errorMessage, setErrorMessage] = useState(undefined)

    // Form handles
    const handleFullName = e => setFullName(e.target.value)
    const handleEmail = e => setEmail(e.target.value)
    const handlePassword = e => setPassword(e.target.value)

    // Submit form
    const handleSubmit = e => {
        e.preventDefault()

        const requestBody = {
            fullName,
            email,
            password,
            verified: false,
            verifyToken: getRandomString(20),
        }

        axios
            .post("/auth/signup", requestBody)
            .then(res => {
                navigate("/thank-you")
                loginUser(res.data)
            })
            .catch(err => {
                const errorDescription = err.response.data.message
                setErrorMessage(errorDescription)
            })
    }

    return (
        <Page title={title} template="form">
            <Font.H1>{title}</Font.H1>

            <Form onSubmit={handleSubmit} btnprimary="Create your account">
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
                    onChange={handleEmail}
                    value={email}
                />

                <Input
                    label="Password"
                    id="password"
                    onChange={handlePassword}
                    value={password}
                    password
                />
            </Form>

            <Font.P>
                You already have an account? <Link to="/login">Log in</Link>.
            </Font.P>

            {errorMessage && <Alert color="danger">{errorMessage}</Alert>}
        </Page>
    )
}

export default Signup

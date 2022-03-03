// Packages
import React, { useContext, useState } from "react"
import axios from "axios"
import { useNavigate, Link } from "react-router-dom"
import { Font, Form, Input, Alert } from "components-react-julseb"

// Components
import { AuthContext } from "../../context/auth"
import Page from "../../components/layouts/Page"

const Login = () => {
    // Consts
    const { loginUser } = useContext(AuthContext)
    const navigate = useNavigate()

    // Texts
    const title = "Login"

    // Form items
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errorMessage, setErrorMessage] = useState(undefined)

    // Form handles
    const handleEmail = e => setEmail(e.target.value)
    const handlePassword = e => setPassword(e.target.value)

    // Submit form
    const handleSubmit = e => {
        e.preventDefault()

        const requestBody = { email, password }

        axios
            .post("/auth/login", requestBody)
            .then(res => {
                loginUser(res.data)
                navigate("/")
            })
            .catch(err => {
                const errorDescription = err.response.data.message
                setErrorMessage(errorDescription)
            })
    }

    return (
        <Page title={title} template="form">
            <Font.H1>{title}</Font.H1>

            <Form onSubmit={handleSubmit} btnprimary="Log in">
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
                <Link to="/login/forgot-password">I forgot my password.</Link>
            </Font.P>

            <Font.P>
                You don't have an account? <Link to="/signup">Sign up</Link>.
            </Font.P>

            {errorMessage && <Alert color="danger">{errorMessage}</Alert>}
        </Page>
    )
}

export default Login

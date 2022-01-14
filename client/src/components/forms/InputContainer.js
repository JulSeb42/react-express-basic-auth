// Packages
import React from "react"
import styled from "styled-components"

// Components
import * as Variables from "../styles/Variables"

// Styles
const Container = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: ${Variables.Margins.XXS};
`

const Label = styled.label`
    color: black;
    font-weight: ${Variables.FontWeights.Bold};
`

function InputContainer(props) {
    return props.label ? (
        <Container>
            {props.label && <Label htmlFor={props.id}>{props.label}</Label>}

            {props.children}
        </Container>
    ) : (
        props.children
    )
}

export default InputContainer

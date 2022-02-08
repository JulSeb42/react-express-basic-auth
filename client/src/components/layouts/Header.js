// Packages
import React, { useContext, useState } from "react"
import { NavLink, Link } from "react-router-dom"
import styled from "styled-components"
import { Variables, Burger } from "components-react-julseb"

// Components
import { AuthContext } from "../../context/auth"

// Data
import SiteData from "../data/SiteData"

// Styles
const Container = styled.header`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: ${Variables.Margins.L} 5vw;
`

const Nav = styled.nav`
    display: flex;
    align-items: center;
    justify-content: flex-start;

    @media ${Variables.Breakpoints.Mobile} {
        position: absolute;
        width: 100%;
        background-color: white;
        left: 0;
        top: -200px;
        padding: 0 5vw ${Variables.Margins.S} 5vw;
        flex-direction: column;
        align-items: flex-start;
        transition: ${Variables.Transitions.Short};

        &.open {
            top: 72px;
        }
    }
`

const LinkNav = styled(NavLink)`
    color: black;
    font-family: ${Variables.FontFamilies.Body};
    font-size: ${Variables.FontSizes.Body};
    text-decoration: none;
    border: none;
    padding: 0;
    background: none;

    &.active {
        font-weight: ${Variables.FontWeights.Bold};
    }

    &:not(:last-child) {
        margin-right: ${Variables.Margins.M};
    }
`

const ButtonMenu = styled(Burger)`
    display: none;

    @media ${Variables.Breakpoints.Mobile} {
        display: inline;
    }
`

function Header() {
    const { isLoggedIn, logoutUser } = useContext(AuthContext)

    // Burger
    const [isOpen, setIsOpen] = useState(false)
    const open = isOpen ? "open" : ""

    return (
        <Container>
            <LinkNav as={Link} to="/">
                {SiteData.Name}
            </LinkNav>

            <ButtonMenu
                className={open}
                color="black"
                width={24}
                height={16}
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Open menu"
            />

            <Nav className={open}>
                <LinkNav to="/">Home</LinkNav>

                {isLoggedIn ? (
                    <>
                        <LinkNav to="/my-account">My account</LinkNav>
                        <LinkNav as="button" onClick={logoutUser}>
                            Log out
                        </LinkNav>
                    </>
                ) : (
                    <>
                        <LinkNav to="/login">Login</LinkNav>
                    </>
                )}
            </Nav>
        </Container>
    )
}

export default Header

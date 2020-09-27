import React from "react";
import styled from "styled-components";

const Button = styled.button`
    padding: 0.5rem 2rem;
    border-radius: .5rem;
    display: block;
    margin: 1rem auto;
    background: rgb(255, 150, 150);
    border: none;
    cursor: pointer;
    text-align: center;
    font-size: 1.5rem;
    font-weight: 500;
    color: white;
    transition: .2s;
    outline: none;
    &:hover {
        background: rgb(255, 109, 109);
    }
`

const NotFoundPage = ({ pageOpen, changePage }) => {

    if (pageOpen !== "NotFoundPage") return null

    return (
        <>
            <h2 style={{ color: "white", marginBottom: "5rem" }}>Sorry, there's no game with such identifier! Please, try again or go back to home page</h2>
            <Button onClick={() => changePage("StartPage")}>Home</Button>
        </>
    );
}

export default NotFoundPage
import styled from 'styled-components'

export const RetryButton = styled.button`
border-radius: .3rem;
display: block;
margin: 1rem auto;
width: 7rem;
height: 3rem;
background: transparent;
border: .2rem solid rgb(95, 217, 250);
cursor: pointer;
text-align: center;
font-size: 1.5rem;
font-weight: 600;
color: rgb(95, 217, 250);
visibility: ${props => props.winner ? 'visible' : 'hidden'};
transition: .2s;
&:hover {
color: rgb(41,40,61);
background: rgb(95, 217, 250);
}
`
import styled from 'styled-components'

export const Table = styled.table`
margin: 7rem auto 3rem;
opacity: ${props => props.winner && '0.2'};
transition: .5s;
`
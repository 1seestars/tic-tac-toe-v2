import styled from 'styled-components'

const Table = styled.table`
    margin: 0 auto 3rem;
    opacity: ${props => props.winner && '0.2'};
    transition: .5s;
`
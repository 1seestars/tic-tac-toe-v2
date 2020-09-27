import React from "react";
import styled from 'styled-components'

export const Counter = styled.div`
    display: inline-block;
    margin: 5rem 0 0;
    color: orange;
    font-weight: 700;
    font-size: 7rem;
`

class ReadySteadyGo extends React.Component {

    state = {
        countdown: 3
    }

    pageToReturn = () => {
        if (this.props.pageOpen === "ReadySteadyGo") {
            this.timeout =  setTimeout(() => {
                if (this.state.countdown === 1) {
                    this.props.changePage("MainPage")
                    this.setState({ countdown: 4 })
                    clearTimeout(this.timeout)
                }
                this.setState(state => ({ countdown: state.countdown - 1 }))
            }, 1000)

            return this.state.countdown
        }
    }

    render() {
        return (
            <>
                <Counter>{this.pageToReturn()}</Counter>
            </>
        )
    }
}

export default ReadySteadyGo
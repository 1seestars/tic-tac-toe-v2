import React from "react";

class ReadySteadyGo extends React.Component {

    state = {
        countdown: 3
    }

    componentWillUnmount() {
        clearInterval(this.timeout);
        clearTimeout(this.timeout2);
    }

    pageToReturn = () => {
        if (this.props.pageOpen === "ReadySteadyGo") {
            this.timeout =  setTimeout(() => {
                this.setState(state => ({ countdown: state.countdown - 1 }))
            }, 1000)

            this.timeout2 = setTimeout(() => {
                this.props.changePage("MainPage")
            }, 3000)

            return this.state.countdown
        } else {
            return null
        }
    }

    render() {
        return (
            <>
                {this.pageToReturn()}
            </>
        )
    }
}

export default ReadySteadyGo
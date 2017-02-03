import React from 'react';
import { connect } from 'react-redux';

class App extends React.Component {
    render() {
        return (
            <main>
                { this.props.children }
            </main>
        );
    }
}

App.propTypes = {
    children: React.PropTypes.node,
    info: React.PropTypes.object,
    dispatch: React.PropTypes.func
};

function mapStateToProps(state) {
    return {
        info: state.info
    };
}
export default connect(mapStateToProps)(App);
export { App as AppTest }; // Export for testing.

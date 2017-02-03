import React from 'react';
import { connect } from 'react-redux';

class HomePage extends React.Component {
    render() {
        return (
            <div>Hello World!</div>
        );
    }
}

HomePage.propTypes = {
    dispatch: React.PropTypes.func
};

export default connect()(HomePage);
export { HomePage as HomePageTest }; // Export for testing.

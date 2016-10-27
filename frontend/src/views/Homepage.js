import React, {
    Component
} from 'react';

import MainContainer from './MainContainer';


class Homepage extends Component {
    render() {
        return (
            <MainContainer pageTitle="Homepage" breadcrumb="test">
                Hello World
            </MainContainer>
        );
    }
}

export default Homepage;

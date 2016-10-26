import React, {
    Component,
    PropTypes,
} from 'react';

import { Field,reduxForm, SubmissionError } from 'redux-form';
import { Button } from 'react-bootstrap';
import TextFieldGroup from '../../common/TextFieldGroup';

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(values){
        this.setState({errors: {}});
        return this.props.login(values).then(
            (res) => this.context.router.push('/'),
            (err) => {
                //this.setState({errors: err.response.data});
                throw new SubmissionError(err.response.data.errors);
            }
        );
    }
    render() {
        const {handleSubmit,submitting,error} = this.props;

        return (
            <form onSubmit={handleSubmit(this.onSubmit)}>
                { error && <div className="alert alert-danger">{error}</div> }
                <Field name="username" label="Username" component={TextFieldGroup}/>
                <Field name="password" label="Password" type="password" component={TextFieldGroup}/>
                <Button type="submit" disabled={submitting}>Login</Button>
            </form>
        );
    }
}

LoginForm.propTypes = {
    addFlashMessage: PropTypes.func.isRequired,
    login: PropTypes.func.isRequired
};
LoginForm.contextTypes = {
    router: PropTypes.object.isRequired
};

export default reduxForm({
    form: 'login'
})(LoginForm);

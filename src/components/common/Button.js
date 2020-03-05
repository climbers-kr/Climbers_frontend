import { Link } from 'react-router-dom';
import React from 'react';
import Button from '@material-ui/core/Button';


function LinkWrapperButton(props) {
    const { icon, primary, to } = props;

    const renderLink = React.useMemo(
        () =>
            React.forwardRef((linkProps, ref) => (
                <Link ref={ref} to={to} {...linkProps} />
            )),
        [to],
    );

    return (
        <Button component={renderLink} variant="outlined" color="primary">
            link_wrapper_button
        </Button>
    );
}

export default LinkWrapperButton;
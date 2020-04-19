import { Link } from 'react-router-dom';
import React from 'react';
import Button from '@material-ui/core/Button';

function LinkWrapperButton(props) {
    const { to, ...buttonProps } = props;
    //console.dir(props);
    const renderLink = React.useMemo(
        () =>
            React.forwardRef((linkProps, ref) => (
                <Link ref={ref} to={to} {...linkProps} />
            )),
        [to],
    );

    return (
        <Button component={renderLink} {...buttonProps}>
            { props.children }
        </Button>
    );
}

export default LinkWrapperButton;
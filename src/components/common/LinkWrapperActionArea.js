import { Link } from 'react-router-dom';
import React from 'react';
import CardActionArea from '@material-ui/core/CardActionArea';
function LinkWrapperActionArea(props) {
    const { to, ...buttonProps } = props;
    const renderLink = React.useMemo(
        () =>
            React.forwardRef((linkProps, ref) => (
                <Link ref={ref} to='/' {...linkProps} />
            )),
        [to],
    );

    return (
        <CardActionArea component={renderLink} {...buttonProps}>
            { props.children }
        </CardActionArea>
    );
}

export default LinkWrapperActionArea;
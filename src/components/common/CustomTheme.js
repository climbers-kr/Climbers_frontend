import { createMuiTheme } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';

const theme = createMuiTheme({
    palette: {
        primary: {
            main:'#1ca9d0'
        },
        secondary: {
            main:'#FE6B8B',
        },
        test: {
            main:'#FF8E53',
        }
    },
});

export default theme;
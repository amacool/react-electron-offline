import React from 'react';
import FormControl from "@material-ui/core/FormControl/FormControl";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import Select from "@material-ui/core/Select/Select";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import {makeStyles} from "@material-ui/core";
import './styles.css';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    formControl: {
        minWidth: 120,
        width: '45%'
    }
}));

function Identities() {
    const classes = useStyles();
    const [state, setState] = React.useState({
        type: '',
        category: ''
    });

    const typeLabel = React.useRef(null);
    const categoryLabel = React.useRef(null);

    const [typeLabelWidth, setTypeLabelWidth] = React.useState(0);
    const [categoryLabelWidth, setCategoryLabelWidth] = React.useState(0);

    React.useEffect(() => {
        setTypeLabelWidth(typeLabel.current.offsetWidth);
        setCategoryLabelWidth(categoryLabel.current.offsetWidth);
    }, []);

    const handleChange = name => event => {
        setState({
            ...state,
            [name]: event.target.value,
        });
    };

    return (
        <div className="Identities">
            <div className="header">
                <h5>IDENTITIES</h5>
            </div>
            <div className="content">
                <FormControl variant="outlined" className={classes.formControl}>
                    <InputLabel ref={typeLabel} htmlFor="identity-type">
                        Identity Type*
                    </InputLabel>
                    <Select
                        value={state.type}
                        onChange={handleChange('type')}
                        labelWidth={typeLabelWidth}
                        inputProps={{
                            name: 'type',
                            id: 'identity-type',
                        }}
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                </FormControl>
                <FormControl variant="outlined" className={classes.formControl}>
                    <InputLabel ref={categoryLabel} htmlFor="category">
                        Category*
                    </InputLabel>
                    <Select
                        value={state.category}
                        onChange={handleChange('category')}
                        labelWidth={categoryLabelWidth}
                        inputProps={{
                            name: 'category',
                            id: 'category',
                        }}
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                </FormControl>
            </div>
        </div>
    );
}

export default Identities;

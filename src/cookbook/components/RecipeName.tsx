import { makeStyles, TextField } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles(() => ({
    title: {
        marginBottom: '30px',
    },
}));

function RecipeName(props) {
    const classes = useStyles();
    const { editable, value, onChange } = props;

    return (
        <>
            {editable ? (
                <TextField
                    variant="standard"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    fullWidth
                    placeholder="Recipe Name"
                    className={classes.title}
                />
            ) : (
                <h1 className={classes.title}>{value}</h1>
            )}
        </>
    );
}

export default RecipeName;

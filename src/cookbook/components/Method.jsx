import React from 'react';
import {
    IconButton,
    ListItemSecondaryAction,
    makeStyles,
    TextField,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles(() => ({
    methodIndex: {
        paddingTop: '0.2rem',
        fontSize: '1.2rem',
        background: 'cadetblue',
        marginRight: '0.8rem',
        borderRadius: '50%',
        color: 'white',
        width: '2rem',
        height: '2rem',
        textAlign: 'center',
        boxSizing: 'border-box',
        fontFamily: 'cursive',
    },
    methodTextField: {
        width: '90%',
    },
}));

function Method({
    value, index, onChange, onDelete, editable,
}) {
    const classes = useStyles();
    const handleOnMethodChange = (e) => {
        const newMethod = e.target.value;
        onChange(index, { ...value, method: newMethod });
    };

    return (
        <>
            <span className={classes.methodIndex}>{index + 1}</span>
            {editable ? (
                <TextField
                    variant="outlined"
                    placeholder="Method"
                    size="small"
                    value={value.method}
                    onChange={handleOnMethodChange}
                    multiline
                    className={classes.methodTextField}
                />
            ) : (
                value.method
            )}
            {editable ? (
                <ListItemSecondaryAction>
                    <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={() => onDelete(index)}
                    >
                        <DeleteIcon />
                    </IconButton>
                </ListItemSecondaryAction>
            ) : null}
        </>
    );
}

export default Method;

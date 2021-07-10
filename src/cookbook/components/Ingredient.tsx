import React, { useEffect, useState } from 'react';
import {
    IconButton,
    ListItemSecondaryAction,
    makeStyles,
    TextField,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import CreatableSelect from 'react-select/creatable';
import { fetchJsonData, getData } from '../../utilities';

const useStyles = makeStyles(() => ({
    quantity: {
        width: '20%',
        marginLeft: '0.8rem',
        marginRight: '0.8rem',
    },
    food: {
        width: '50%',
    },
    dotPoint: {
        background: 'cadetblue',
        marginRight: '0.8rem',
        marginLeft: '0.5rem',
        borderRadius: '50%',
        color: 'white',
        width: '0.6rem',
        height: '0.6rem',
    },
}));

function Ingredient({
    value, index, onDelete, onChange, editable,
}) {
    const classes = useStyles();

    const [options, setOptions] = useState(null);

    // Probably do this fetch higher up. Don't want to be sending the same request
    // every time user adds a new ingredient line.
    const getOptions = async () => {
        const response = await getData(() => {},
            'http://127.0.0.1:8000/api/cookbook/food/');

        setOptions(
            response.map((food) => ({ value: food.id, label: food.name })),
        );
    };

    useEffect(() => {
        getOptions().then();
    }, []);

    const handleCreateNewOption = async (newFood) => {
        const response = await fetchJsonData(
            'http://127.0.0.1:8000/api/cookbook/food/',
            'POST',
            {
                id: null,
                name: newFood,
            },
        );

        if (response) {
            const newOptions = [
                ...options,
                { value: response.id, label: response.name },
            ];
            setOptions(newOptions);
            onChange(index, {
                ...value,
                food: { id: response.id, name: response.name },
            });
        }
    };

    const handleOnFoodChange = (selectedFood) => {
        const newFood = { id: selectedFood.value, name: selectedFood.label };
        onChange(index, { ...value, food: newFood });
    };

    const handleOnQuantityChange = (e) => {
        const newQuantity = e.target.value;
        onChange(index, { ...value, quantity: newQuantity });
    };

    const foodName = value?.food?.name;

    return (
        <>
            <span className={classes.dotPoint} />
            {editable ? (
                <TextField
                    className={classes.quantity}
                    variant={editable ? 'outlined' : 'standard'}
                    placeholder="Quantity"
                    size="small"
                    value={value.quantity}
                    onChange={editable ? handleOnQuantityChange : null}
                />
            ) : (
                <div className={classes.quantity}>{value.quantity}</div>
            )}
            <div className={classes.food}>
                {editable ? (
                    <CreatableSelect
                        defaultOptions
                        options={options}
                        onChange={handleOnFoodChange}
                        value={{ value: value?.food?.id, label: foodName }}
                        onCreateOption={handleCreateNewOption}
                    />
                ) : foodName || (
                    '-'
                )}
            </div>
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

export default Ingredient;

import {
    Button, Container, makeStyles, TextField,
} from '@material-ui/core';
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Redirect } from 'react-router-dom';
import { fetchData } from '../../utilities';
import { CREATE_RECIPE_URL } from '../../constants';
import DynamicList from '../../components/DynamicList';
import Ingredient from './Ingredient';
import Method from './Method';
import RecipeName from './RecipeName';

export const emptyIngredient = () => ({
    id: null,
    food: {},
    quantity: '',
    __isNew__: true,
    __key__: uuidv4(),
});

export const emptyMethod = () => ({
    id: null,
    method: '',
    __isNew__: true,
    __key__: uuidv4(),
});

const useStyles = makeStyles(() => ({
    submitButton: {
        float: 'right',
    },
}));

function CreateRecipe() {
    const classes = useStyles();
    const [redirect, setRedirect] = useState(false);

    const [title, setTitle] = useState(null);
    const [ingredients, setIngredients] = useState([emptyIngredient()]);
    const [methods, setMethods] = useState([emptyMethod()]);

    const handleSubmit = async () => {
        const postData = {
            name: title,
            ingredients,
            methods,
        };
        await fetchData(CREATE_RECIPE_URL, 'POST', postData);
        setRedirect(true);
    };

    if (redirect) return <Redirect to="/cookbook" />;

    return (
        <Container maxWidth="md">
            <RecipeName value={title} onChange={setTitle} editable />
            <DynamicList
                valueList={ingredients}
                onChange={setIngredients}
                emptyChildCallback={emptyIngredient}
                idKey="__key__"
                Component={Ingredient}
            />
            <DynamicList
                valueList={methods}
                onChange={setMethods}
                emptyChildCallback={emptyMethod}
                idKey="__key__"
                Component={Method}
            />
            <Button
                className={classes.submitButton}
                variant="contained"
                color="primary"
                onClick={handleSubmit}
            >
                Submit
            </Button>
        </Container>
    );
}

export default CreateRecipe;

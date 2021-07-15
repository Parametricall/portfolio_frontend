import React, { useCallback, useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { Grid, IconButton, makeStyles } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import { fetchJsonData, getData, splitArrayIntoChunks } from '../../utilities';
import { FETCH_RECIPE_URL, UPDATE_RECIPE_URL } from '../../constants';
import { setUserAuthenticated } from '../../reduxStore/actions';
import DynamicList from '../../components/DynamicList';
import Ingredient from './Ingredient';
import Method from './Method';
import RecipeName from './RecipeName';
import UserPermissions from '../../components/UserPermissions';

const useStyles = makeStyles((theme) => ({
    editIcons: {
        '& > *': {
            margin: theme.spacing(1),
        },
        textAlign: 'end',
    },
}));

function RecipeDetail() {
    const classes = useStyles();
    // @ts-ignore
    const { recipeId } = useParams();

    const [editable, setEditable] = useState(false);

    const [recipeName, setRecipeName] = useState('');
    const [ingredients, setIngredients] = useState([]);
    const [methods, setMethods] = useState([]);

    useEffect(() => {
        const getRecipe = async () => {
            const response = await fetchJsonData(`${FETCH_RECIPE_URL}${recipeId}/`, 'GET');
            setRecipeName(response.name);
            setIngredients(response.ingredients);
            setMethods(response.methods);
        };
        getRecipe().then();
    }, [recipeId]);

    let ingredientChunks;
    if (ingredients) {
        ingredientChunks = splitArrayIntoChunks(ingredients, 3);
    }

    const handleUpdateRecipe = useCallback(async () => {
        const postData = {
            name: recipeName,
            ingredients,
            methods,
        };
        const response = await fetchJsonData(
            `${UPDATE_RECIPE_URL}${recipeId}/`,
            'PUT',
            postData,
        );
        if (response) {
            setEditable(false);
        }
    }, [ingredients, methods, recipeId, recipeName]);

    return (
        <Container className="recipe-detail-container">
            <UserPermissions permissions={['cookbook.change_recipe']}>
                <div className={classes.editIcons}>
                    <IconButton aria-label="edit" onClick={() => setEditable(!editable)}>
                        <EditIcon />
                    </IconButton>
                    <IconButton aria-label="save" onClick={handleUpdateRecipe}>
                        <SaveIcon />
                    </IconButton>
                </div>
            </UserPermissions>

            <RecipeName
                value={recipeName}
                onChange={setRecipeName}
                editable={editable}
            />

            <hr />
            {editable ? (
                <DynamicList
                    valueList={ingredients}
                    onChange={setIngredients}
                    idKey="id"
                    Component={Ingredient}
                    editable={editable}
                    emptyChildCallback={() => {}}
                />
            ) : (
                <Grid container>
                    {ingredientChunks.map((chunk, index) => (
                        // eslint-disable-next-line react/no-array-index-key
                        <Grid item xs={12} md={6} key={index}>
                            <DynamicList
                                valueList={chunk}
                                onChange={setIngredients}
                                idKey="id"
                                Component={Ingredient}
                                editable={editable}
                                emptyChildCallback={() => {}}
                            />
                        </Grid>
                    ))}
                </Grid>
            )}
            <hr />
            <DynamicList
                valueList={methods}
                onChange={setIngredients}
                idKey="id"
                Component={Method}
                editable={editable}
                emptyChildCallback={() => {}}
            />
        </Container>
    );
}

export default connect(null, { setUserAuthenticated })(RecipeDetail);

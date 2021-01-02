import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { getData, splitArrayIntoChunks } from '../../utilities';
import { FETCH_RECIPE_URL } from '../../constants';
import { useParams } from 'react-router-dom';


function RecipeDetail() {
  let {recipeId} = useParams();

  const [recipeName, setRecipeName] = useState('');
  const [ingredients, setIngredients] = useState([]);

  const getRecipe = () => {
    getData(`${FETCH_RECIPE_URL}${recipeId}/`)
      .then(json => {
        setRecipeName(json.name);
        setIngredients(json.ingredients);
      });
  };

  useEffect(() => {
    getRecipe();
  }, []);

  let ingredientChunks;
  if (ingredients) {
    ingredientChunks = splitArrayIntoChunks(ingredients, 3);
  }

  return (
    <Container>
      <Row>
        <Col>
          <h1>{recipeName}</h1>
        </Col>
      </Row>
      <Row />
      {ingredientChunks &&
      ingredientChunks.map((ingredients) => {
        return (
          <Row>
            {ingredients &&
            ingredients.map((ingredient) => {
              return (
                <Col>
                  {ingredient.quantity}
                  {ingredient.food.name}
                </Col>
              )
            })
            }
          </Row>
        )
      })
      }
      <div>
        Recipe Details Section
      </div>
    </Container>
  );
}

export default RecipeDetail;
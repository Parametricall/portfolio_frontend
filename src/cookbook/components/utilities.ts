import { fetchJsonData } from '../../utilities';
import { CREATE_RECIPE_URL } from '../../constants';

/**
 * @typedef {Object} Food
 * @property {number} id
 * @property {string} name
 */

/**
 * @typedef {Object} Ingredient
 * @property {number} id
 * @property {string} quantity
 * @property {Food} food
 */

/**
 * @typedef {Object} Method
 * @property {number} id
 * @property {string} method
 */

/**
 * @typedef {Object} Recipe
 * @property {string} name
 * @property {Ingredient[]} ingredients
 * @property {Method[]} methods
 */

/**
 *
 * @param {Recipe} newRecipe
 * @returns {Promise<Recipe|{}>}
 */
export async function createRecipe(newRecipe) {
    const response = await fetchJsonData(CREATE_RECIPE_URL, 'POST', newRecipe);
    if (response) {
        return response;
    }
    return null;
}

export const dummy = () => {};

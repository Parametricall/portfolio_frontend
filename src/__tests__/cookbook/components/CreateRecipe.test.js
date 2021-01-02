import React from 'react';
import { shallow } from 'enzyme';
import CreateRecipe from '../../../cookbook/components/CreateRecipe';


describe('CreateRecipe', () => {
  const createRecipeWrapper = shallow(<CreateRecipe/>);

  it('renders correctly', () => {
    expect(createRecipeWrapper).toMatchSnapshot()
  })
});
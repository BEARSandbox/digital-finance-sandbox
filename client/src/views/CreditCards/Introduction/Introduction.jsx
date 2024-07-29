import React from 'react';
import { useHistory } from 'react-router-dom';

import { Container, Hero, Categories } from './Introduction.styles';

import ResponsiveBox from '../../../shared/ResponsiveBox/ResponsiveBox';
import CardUtils from '../../../utils/cards';
import ButtonWrapper from '../../../shared/ButtonWrapper/ButtonWrapper';

export function HeroSection() {
  return (
    <Hero>
      <ResponsiveBox column>
        <label className="title">Credit Cards</label>
        <label className="subtitle">How do you want to get started?</label>
      </ResponsiveBox>
    </Hero>
  );
}

function CategoriesSection() {
  const history = useHistory();
  const categoryKeys = ['rewards', 'low-fees'];
  const links = ['/credit-cards/view/rewards', '/credit-cards/view/low-fees'];

  return (
    <Categories>
      <ResponsiveBox column>
        <h1>Credit Card Categories</h1>
        <div className="categories">
          {categoryKeys.map((categoryKey, index) => (
            <ButtonWrapper
              key={categoryKey}
              component={(props) => (
                <div {...props} className="category">
                  <img
                    src={CardUtils.getCardCategoryIcon(categoryKey)}
                    alt={categoryKey}
                  />
                  {props.children}
                </div>
              )}
              onClick={() => history.push(links[index])}
              text={CardUtils.getCardCategoryName(categoryKey)}
              location="Categories"
            />
          ))}
        </div>
        <div className="links">
          <ButtonWrapper
            component={(props) => (
              <button {...props} className="view-all-cards" />
            )}
            onClick={() => history.push('/credit-cards/view/all')}
            text="VIEW ALL CREDIT CARDS &rarr;"
            location="Bottom"
          />
          {/* <ButtonWrapper
            component={(props) => (
              <button {...props} className="compare-cards" />
            )}
            onClick={() => history.push('/credit-cards/compare')}
            text="COMPARE CARDS &rarr;"
            location="Bottom"
          /> */}
        </div>
      </ResponsiveBox>
    </Categories>
  );
}

function CreditCardsIntroduction() {
  return (
    <Container>
      <HeroSection />
      <CategoriesSection />
    </Container>
  );
}

export default CreditCardsIntroduction;

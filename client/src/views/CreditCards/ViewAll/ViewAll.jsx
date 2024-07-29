import React, { useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

import AllCards from '../../../data/Cards';

import {
  StyledCreditCardsViewAll,
  Hero,
  Filters,
  CategoryFilterItem,
  Main,
  DropdownContainer,
  Results,
} from './ViewAll.styles';

import ResponsiveBox from '../../../shared/ResponsiveBox/ResponsiveBox';
// import CardDetailsList from '../../../shared/CardDetailsList/CardDetailsList';
import CardUtils from '../../../utils/cards';
import SchumerBoxButton from '../../../shared/SchumerBoxButton/SchumerBoxButton';
import ButtonWrapper from '../../../shared/ButtonWrapper/ButtonWrapper';

function CreditCardsViewAll() {
  const location = useLocation();
  const history = useHistory();
  const [filterCategory, setFilterCategory] = useState('all');

  const dropdownCategories = [
    'Initial cashback offer',
    'Purchase interest rate',
    'Annual fee',
    'Cash advance interest rate',
    'Adjusted cashback offer',
  ];
  const [dropdownOption, setDropdownOption] = useState(dropdownCategories[0]);
  // const factorTwo = useSelector((state) => state.auth.factorTwo);
  const factorThree = useSelector((state) => state.auth.factorThree);

  console.log(dropdownOption);

  useEffect(() => {
    const split = location.pathname.split('/');
    const filterValue = split[split.length - 1];

    setFilterCategory(filterValue);
  }, [location.pathname]);

  const RenderHeroSection = () => {
    return (
      <Hero>
        <ResponsiveBox column>
          <label className="title">
            {CardUtils.getCardCategoryName(filterCategory)}
          </label>
          <label className="subtitle">Find the best credit card for you</label>
        </ResponsiveBox>
      </Hero>
    );
  };

  // NOTE: Decided against showing all details on the cards page
  // To see all the details, the user must click Learn More
  // const RenderCardDetails = ({ card }) => {
  //   let details;

  //   switch (factorTwo) {
  //     case 0:
  //     case 2:
  //       details = card.baseCosts;
  //       break;
  //     case 1:
  //       details = card.baseRewards;
  //       break;
  //     default:
  //       break;
  //   }

  //   return <CardDetailsList cardId={card.key} details={details} />;
  // };

  const RenderFiltersSection = () => {
    const categoryKeys = ['all', 'rewards', 'low-fees'];

    let filteredCards = AllCards;
    if (filterCategory !== 'all') {
      filteredCards = AllCards.filter(
        (card) => filterCategory === card.category
      );
    }

    return (
      <ResponsiveBox>
        <Filters>
          {categoryKeys.map((categoryKey) => (
            <ButtonWrapper
              key={categoryKey}
              component={(props) => (
                <CategoryFilterItem
                  {...props}
                  isCurrentCategory={filterCategory === categoryKey}
                >
                  <img
                    src={CardUtils.getCardCategoryIcon(categoryKey)}
                    alt={categoryKey}
                  />
                  {props.children}
                </CategoryFilterItem>
              )}
              onClick={() => history.push(`/credit-cards/view/${categoryKey}`)}
              text={CardUtils.getCardCategoryName(categoryKey)}
              location="Sidebar"
            />
          ))}
          {/* <ButtonWrapper
            component={CategoryFilterItem}
            onClick={() => history.push('/credit-cards/compare')}
            text="Compare Cards &rarr;"
            location="Sidebar"
          /> */}
        </Filters>
        <Main>
          {/* Enable this feature later, as requested */}
          {/* <DropdownContainer>
            <p className="dropdown-text">Choose an option:</p>
            <select
              className="dropdown"
              value={dropdownOption}
              onChange={(e) => setDropdownOption(e.target.value)}
            >
              {dropdownCategories.map((item, index) => (
                <option key={index} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </DropdownContainer> */}
          <Results>
            {filteredCards.map((card) => {
              const found1 = card.baseCosts.filter(
                (item) => item.name === dropdownOption
              );
              const found2 = card.baseRewards.filter(
                (item) => item.name === dropdownOption
              );

              return (
                <div className="card" key={card.key}>
                  <img className="image" src={card.image} alt={card.name} />
                  <div className="category">
                    <img
                      src={CardUtils.getCardCategoryIcon(card.category)}
                      alt={card.category}
                    />
                    <label>
                      {CardUtils.getCardCategoryName(
                        card.category
                      ).toUpperCase()}
                    </label>
                  </div>
                  <label className="name">{card.name}</label>
                  {factorThree === 1 && <SchumerBoxButton card={card} />}
                  <label className="description">{card.description}</label>
                  <label className="welcomeOffer">
                    {dropdownOption === 'Initial cashback offer' && (
                      <strong>Welcome offer: </strong>
                    )}
                    {found1.length > 0 && found1[0].text}
                    {found2.length > 0 && found2[0].text}
                  </label>
                  {/* <RenderCardDetails card={card} /> */}
                  <div className="card-buttons">
                    <ButtonWrapper
                      component={(props) => (
                        <button {...props} className="apply" />
                      )}
                      onClick={() => history.push(`/credit-cards/${card.key}`)}
                      text="LEARN MORE"
                      location="Bottom of Card"
                      data={{ card: card.key }}
                    />
                    <ButtonWrapper
                      component={(props) => (
                        <button {...props} className="apply" />
                      )}
                      onClick={() => {
                        history.push(
                          `/credit-cards/apply/${card.key}/before-you-apply`
                        );
                      }}
                      text="APPLY NOW"
                      location="Bottom of Card"
                      data={{ card: card.key }}
                    />
                  </div>
                </div>
              );
            })}
          </Results>
        </Main>
      </ResponsiveBox>
    );
  };

  return (
    <StyledCreditCardsViewAll>
      <RenderHeroSection />
      <RenderFiltersSection />
    </StyledCreditCardsViewAll>
  );
}

export default CreditCardsViewAll;

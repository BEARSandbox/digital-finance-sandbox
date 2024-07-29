import React from 'react';
import { connect } from 'react-redux';

import {
  StyledCreditCardsViewSingle,
  CardDetails,
  CostsList,
  RewardsList,
} from './ViewSingle.styles';

import AllCards, {
  costMinimizationExtraCosts,
  costMinimizationExtraRewards,
  rewardMaximizationExtraCosts,
  rewardMaximizationExtraRewards,
} from '../../../data/Cards';

import ResponsiveBox from '../../../shared/ResponsiveBox/ResponsiveBox';
import CardDetailsList from '../../../shared/CardDetailsList/CardDetailsList';
import CardUtils from '../../../utils/cards';
import SchumerBoxButton from '../../../shared/SchumerBoxButton/SchumerBoxButton';
import ButtonWrapper from '../../../shared/ButtonWrapper/ButtonWrapper';

class CreditCardsViewSingle extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentCard: null,
      showExtraCosts: false,
      showExtraRewards: false,
    };
  }

  // things to do when the page loads
  componentDidMount() {
    // step 0 - no card selected, just empty template

    // step 1 - get the id of selected card
    const { cardId } = this.props.match.params;

    // step 2 - use the id to retrieve the card data
    const targetCard = AllCards.find((card) => {
      return card.key === cardId;
    });

    // step 3 - use the retrieved card's data to fill out empty template
    this.setState({
      currentCard: targetCard,
    });
  }

  renderCostsList(card) {
    const { showExtraCosts } = this.state;

    const extraCosts =
      card.type === 'low-fees'
        ? costMinimizationExtraCosts
        : rewardMaximizationExtraCosts;

    return (
      <CostsList>
        <label>Costs</label>
        <CardDetailsList cardId={card.key} details={card.baseCosts} />
        <ButtonWrapper
          component={(props) => <button {...props} className="more" />}
          onClick={() =>
            this.setState({
              showExtraCosts: !this.state.showExtraCosts,
            })
          }
          text={showExtraCosts ? 'Hide' : 'View more'}
          location="Costs Section"
        />
        {showExtraCosts && (
          <CardDetailsList cardId={card.key} details={extraCosts} />
        )}
      </CostsList>
    );
  }

  renderRewardsList(card) {
    const { showExtraRewards } = this.state;

    const extraRewards =
      card.type === 'low-fees'
        ? costMinimizationExtraRewards
        : rewardMaximizationExtraRewards;

    return (
      <RewardsList>
        <label>Rewards</label>
        <CardDetailsList cardId={card.key} details={card.baseRewards} />
        <ButtonWrapper
          component={(props) => <button {...props} className="more" />}
          onClick={() =>
            this.setState({
              showExtraRewards: !this.state.showExtraRewards,
            })
          }
          text={showExtraRewards ? 'Hide' : 'View more'}
          location="Rewards Section"
        />
        {showExtraRewards && (
          <CardDetailsList cardId={card.key} details={extraRewards} />
        )}
      </RewardsList>
    );
  }

  renderCardDetails(card) {
    const { factorTwo } = this.props;

    let cardDetails;
    switch (factorTwo) {
      case 0:
        // cost minimiazation; show costs first
        cardDetails = (
          <>
            {this.renderCostsList(card)}
            {this.renderRewardsList(card)}
          </>
        );
        break;
      case 1:
      case 2:
        // reward maximization; show rewards first
        cardDetails = (
          <>
            {this.renderRewardsList(card)}
            {this.renderCostsList(card)}
          </>
        );
        break;
      default:
        break;
    }

    return <div className="details">{cardDetails}</div>;
  }

  renderCardDetailsSection() {
    const { factorThree } = this.props;
    if (this.state.currentCard === null) return <div>not loaded</div>;

    const card = this.state.currentCard;

    return (
      <ResponsiveBox>
        <CardDetails>
          <div className="meta">
            <div className="category">
              <img
                src={CardUtils.getCardCategoryIcon(card.category)}
                alt={card.category}
              />
              <label>
                {CardUtils.getCardCategoryName(card.category).toUpperCase()}
              </label>
            </div>
            <label className="name">{card.name}</label>
            {factorThree === 1 && (
              <SchumerBoxButton
                card={card}
                styles={{
                  padding: '0 2rem',
                }}
              />
            )}
            <label className="description">{card.description}</label>
            <ButtonWrapper
              component={(props) => <button {...props} className="apply" />}
              onClick={() => {
                this.props.history.push(
                  `/credit-cards/apply/${card.key}/before-you-apply`
                );
              }}
              text="APPLY NOW"
              location="Top"
            />
          </div>
          <img className="image" src={card.image} alt={card.name} />
          {this.renderCardDetails(card)}
          <ButtonWrapper
            component={(props) => <button {...props} className="apply" />}
            onClick={() => {
              this.props.history.push(
                `/credit-cards/apply/${card.key}/before-you-apply`
              );
            }}
            text="APPLY NOW"
            location="Bottom"
          />
        </CardDetails>
      </ResponsiveBox>
    );
  }

  render() {
    return (
      <StyledCreditCardsViewSingle>
        {this.renderCardDetailsSection()}
      </StyledCreditCardsViewSingle>
    );
  }
}

const mapStateToProps = (state) => ({
  factorTwo: state.auth.factorTwo,
  factorThree: state.auth.factorThree,
});

export default connect(mapStateToProps)(CreditCardsViewSingle);

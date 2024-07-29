import React from 'react';
import { connect } from 'react-redux';

import AllCards from '../../../data/Cards';

import {
  StyledCreditCardCompare,
  Hero,
  Selection,
  SelectionModal,
  CardSlot,
  Filters,
  CategoryFilterItem,
  Results,
  CardPreview,
  StillNotSure,
} from './Compare.styles';

import ResponsiveBox from '../../../shared/ResponsiveBox/ResponsiveBox';
import CardDetailsList from '../../../shared/CardDetailsList/CardDetailsList';
import CardUtils from '../../../utils/cards';
import SchumerBoxButton from '../../../shared/SchumerBoxButton/SchumerBoxButton';
import ButtonWrapper from '../../../shared/ButtonWrapper/ButtonWrapper';

class CreditCardsCompare extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showSelectionModal: false,
      filterCategory: '',
      cardOne: null,
      cardTwo: null,
      currentSlot: null,
    };
  }

  componentDidMount() {
    const { factorTwo } = this.props;
    switch (factorTwo) {
      case 0:
        this.setState({ filterCategory: 'low-fees' });
        break;
      case 1:
        this.setState({ filterCategory: 'rewards' });
        break;
      case 2:
      default:
        this.setState({ filterCategory: 'all' });
        break;
    }
  }

  removeSelectedCard(slotId) {
    this.setState({
      [slotId]: null,
    });
  }

  checkSelected(key) {
    const { cardOne, cardTwo } = this.state;
    if ((cardOne && cardOne.key === key) || (cardTwo && cardTwo.key === key)) {
      return true;
    }
    return false;
  }

  handleCardSelection(card) {
    if (this.checkSelected(card.key)) {
      // already selected, just close modal
      this.setState({
        showSelectionModal: false,
        currentSlot: null,
      });
    } else {
      // put this card in the current slot
      this.setState({
        [this.state.currentSlot]: card,
        showSelectionModal: false,
        currentSlot: null,
      });
    }
  }

  renderHeroSection() {
    const { history } = this.props;
    return (
      <Hero>
        <ResponsiveBox column>
          <label className="title">Compare Cards</label>
          <label className="subtitle">Select cards to compare</label>
          <div className="services">
            <ButtonWrapper
              component={(props) => <label {...props} className="service" />}
              onClick={() => history.push('/credit-cards/view/all')}
              text="VIEW ALL CARDS"
              location="Top"
            />
            <ButtonWrapper
              component={(props) => <label {...props} className="service" />}
              onClick={() => history.push('/credit-cards/view/rewards')}
              text="CASHBACK REWARDS CARDS"
              location="Top"
            />
            <ButtonWrapper
              component={(props) => <label {...props} className="service" />}
              onClick={() => history.push('/credit-cards/view/low-fees')}
              text="LOW INTEREST RATE AND FEES CARDS"
              location="Top"
            />
          </div>
        </ResponsiveBox>
      </Hero>
    );
  }

  renderCardDetails(card) {
    if (!card) return null;

    const { factorTwo, history } = this.props;
    let details;

    switch (factorTwo) {
      case 0:
        details = (
          <div className="details__list">
            <CardDetailsList cardId={card.key} details={card.baseCosts} />
          </div>
        );
        break;
      case 1:
        details = (
          <div className="details__list">
            <CardDetailsList cardId={card.key} details={card.baseRewards} />
          </div>
        );
        break;
      case 2:
        details = (
          <>
            <label className="subtitle">Rewards</label>
            <div className="details__list">
              <CardDetailsList cardId={card.key} details={card.baseRewards} />
            </div>
            <label className="subtitle">Costs</label>
            <div className="details__list">
              <CardDetailsList cardId={card.key} details={card.baseCosts} />
            </div>
          </>
        );
        break;
      default:
        break;
    }

    return (
      <div className="details">
        {details}
        <ButtonWrapper
          component={(props) => <button {...props} />}
          onClick={() => history.push(`/credit-cards/${card.key}`)}
          text="LEARN MORE &rarr;"
          location="Bottom of Card"
          data={{ card: card.key }}
        />
      </div>
    );
  }

  renderCardSlot(slotId) {
    const { factorThree } = this.props;

    const selectedCard = this.state[slotId];
    const noCardsSelected = !this.state.cardOne && !this.state.cardTwo;

    return (
      <CardSlot cardSelected={!!selectedCard} noCardsSelected={noCardsSelected}>
        <ButtonWrapper
          component={(props) => (
            <div {...props} style={{ alignSelf: 'flex-end' }}>
              <img
                className="remove"
                src="/assets/icons/close.png"
                alt="remove"
              />
            </div>
          )}
          onClick={() => this.removeSelectedCard(slotId)}
          location="Close - Top Right Corner of Card"
          data={{ side: slotId, card: selectedCard && selectedCard.key }}
        />
        <div className="image">
          {selectedCard ? (
            <img
              className="card"
              src={selectedCard.image}
              alt={selectedCard.name}
            />
          ) : (
            <ButtonWrapper
              component={(props) => <div {...props} className="placeholder" />}
              onClick={() =>
                this.setState({
                  showSelectionModal: true,
                  currentSlot: slotId,
                })
              }
              text="+"
              location="Card Placeholder"
              data={{ side: slotId }}
            />
          )}
        </div>
        <label className="title">
          {selectedCard
            ? selectedCard.name
            : 'Add a new credit card to compare'}
        </label>
        {factorThree === 1 &&
          selectedCard && ( // only show this button if we want salient schumer boxes
            <SchumerBoxButton
              card={selectedCard}
              styles={{
                width: '100%',
                padding: '0 6rem',
              }}
            />
          )}
        {this.renderCardDetails(selectedCard)}
      </CardSlot>
    );
  }

  renderCardSelection() {
    return (
      <Selection>
        <ResponsiveBox>
          <div className="cardSlots">
            {this.renderCardSlot('cardOne')}
            {this.renderCardSlot('cardTwo')}
          </div>
        </ResponsiveBox>
      </Selection>
    );
  }

  renderStillNotSure() {
    const noCardsSelected = !this.state.cardOne && !this.state.cardTwo;

    if (noCardsSelected) return null;

    const { history } = this.props;

    return (
      <StillNotSure>
        <ResponsiveBox column>
          <label className="subtitle">Still not sure?</label>
          <div className="services">
            <ButtonWrapper
              component={(props) => <label {...props} className="service" />}
              onClick={() => history.push('/credit-cards/view/all')}
              text="VIEW ALL CARDS"
              location="Bottom"
            />
            <ButtonWrapper
              component={(props) => <label {...props} className="service" />}
              onClick={() => history.push('/credit-cards/view/rewards')}
              text="CASHBACK REWARDS CARDS"
              location="Bottom"
            />
            <ButtonWrapper
              component={(props) => <label {...props} className="service" />}
              onClick={() => history.push('/credit-cards/view/low-fees')}
              text="LOW INTEREST RATE AND FEES CARDS"
              location="Bottom"
            />
          </div>
        </ResponsiveBox>
      </StillNotSure>
    );
  }

  renderSelectionModal() {
    if (!this.state.showSelectionModal) return null;

    const categoryKeys = ['all', 'rewards', 'low-fees'];

    let filteredCards = AllCards;
    if (this.state.filterCategory !== 'all') {
      filteredCards = AllCards.filter(
        (card) => this.state.filterCategory === card.category
      );
    }

    return (
      <SelectionModal>
        <div className="content">
          <h1>Select a card to compare</h1>
          <ButtonWrapper
            component={(props) => (
              <div {...props} style={{ alignSelf: 'flex-end' }}>
                <img
                  className="remove"
                  src="/assets/icons/close.png"
                  alt="remove"
                />
              </div>
            )}
            onClick={() =>
              this.setState({ showSelectionModal: false, currentSlot: null })
            }
            location="Close - Card Selection Popup"
          />
          <Filters>
            {categoryKeys.map((categoryKey) => {
              return (
                <ButtonWrapper
                  key={categoryKey}
                  component={(props) => (
                    <CategoryFilterItem
                      {...props}
                      isCurrentCategory={
                        this.state.filterCategory === categoryKey
                      }
                    />
                  )}
                  onClick={() =>
                    this.setState({
                      filterCategory: categoryKey,
                    })
                  }
                  text={CardUtils.getCardCategoryName(categoryKey)}
                  location="Card Selection Popup"
                />
              );
            })}
          </Filters>
          <Results>
            {filteredCards.map((card) => (
              <ButtonWrapper
                key={card.key}
                component={(props) => (
                  <CardPreview
                    {...props}
                    className="view-all-cards"
                    isSelected={this.checkSelected(card.key)}
                  >
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
                    <label className="name">{props.children}</label>
                    <label className="description">{card.description}</label>
                  </CardPreview>
                )}
                onClick={() => this.handleCardSelection(card)}
                text={card.name}
                location="Card Selection Popup"
                data={{ side: this.state.currentSlot, card: card.key }}
              />
            ))}
          </Results>
        </div>
      </SelectionModal>
    );
  }

  render() {
    return (
      <StyledCreditCardCompare>
        {this.renderHeroSection()}
        {this.renderCardSelection()}
        {this.renderStillNotSure()}
        {this.renderSelectionModal()}
      </StyledCreditCardCompare>
    );
  }
}

const mapStateToProps = (state) => ({
  factorTwo: state.auth.factorTwo,
  factorThree: state.auth.factorThree,
});

export default connect(mapStateToProps)(CreditCardsCompare);

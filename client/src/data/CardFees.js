import React from 'react';

import {
  FeesContainer,
  FeeSection,
  FeeName,
  FeeDetailContainer,
  FeeDetail,
  Bold,
  BoldBig,
  Underline,
  Logo,
} from './commonStyles';

import { AllCards, cardValues } from './Cards';

const CardFees = ({ cardKey }) => {
  if (!cardKey) return null;

  const cardData = cardValues[cardKey];

  const targetCard = AllCards.find((card) => {
    return card.key === cardKey;
  });
  const name = targetCard.name;

  return (
    <>
      <Logo>Choice Research Bank</Logo>
      <Bold>Get to know your credit card’s rates and fees</Bold>
      <p>
        As required by law, rates, fees, and other important costs of the Choice
        Research credit cards are disclosed below. Additional fees and account
        terms are described in the Credit Card Agreement (the “Agreement”) that
        will be enclosed with the card if a card is issued. The terms disclosed
        below and in the Agreement are not guaranteed for any period of time;
        all terms may change at any time before or after the account is opened,
        in accordance with the Agreement and as permitted by federal law. Choice
        Research Bank, N.A. (“we,” “us,” “our,”) may change terms and add new
        terms and fees at any time, based on information in your credit report,
        market conditions, our business strategies, or for any other reason.
      </p>
      <p>
        The information about the costs of the cards described below is accurate
        as of today. This information may change after that date. To find out
        what may have changed (or to obtain a copy of the current Credit Card
        Agreement), please call Choice Research Bank at 1-123-456-7890 or write
        to Choice Research Card Services, P.O. Box 12345, BEAR, CA 11111-9876.
      </p>
      <BoldBig>Information Box for {name}</BoldBig>
      <FeesContainer>
        <FeeSection>
          <FeeName>
            <BoldBig>Annual Interest Rate</BoldBig>
          </FeeName>
          <FeeDetailContainer>
            <FeeDetail>
              Purchases:{' '}
              <BoldBig>{`${cardData.purchaseInterestRate}%`}</BoldBig>
            </FeeDetail>
            <FeeDetail>
              Cash advances:{' '}
              <BoldBig>{`${cardData.cashAdvanceInterestRate}%`}</BoldBig>
            </FeeDetail>
            <FeeDetail>
              Default rate:{' '}
              <BoldBig>{`${cardData.purchaseInterestRateHike}%`}</BoldBig>
            </FeeDetail>
            <FeeDetail>
              Rates will increase to{' '}
              <BoldBig>{`${cardData.purchaseInterestRateHike}%`}</BoldBig> on
              purchases and cash advances for at least <BoldBig>6</BoldBig>{' '}
              months if your minimum payment is not made by the payment due date
              and it is not paid by the date we prepare your next statement{' '}
              <BoldBig>2</BoldBig> or more times in any <BoldBig>12</BoldBig>{' '}
              month period. This will take effect in the third statement period
              following the missed payment that caused the rates to increase.
            </FeeDetail>
          </FeeDetailContainer>
        </FeeSection>
        <FeeSection>
          <FeeName>
            <BoldBig>Interest-free Grace Period</BoldBig>
          </FeeName>
          <FeeDetailContainer>
            <FeeDetail>
              You will benefit from an interest-free period of at least{' '}
              <BoldBig>21</BoldBig> days for new purchases and fees if you pay
              your statement balance in full by the payment due date shown on
              your statement.
            </FeeDetail>
            <FeeDetail>
              If you do not pay your statement balance in full by the payment
              due date, you must then pay interest on all purchase and fees
              shown on that month’s statement from the transaction date until we
              receive your payment for the total amount you owe.
            </FeeDetail>
            <FeeDetail>
              There is no interest-free period for cash advances. Cash
              withdrawals, balance transfers, and certain bill payments are all
              cash advances. Interest is charged from the day the cash advance
              is made until we receive your payment for the total amount you
              owe.
            </FeeDetail>
          </FeeDetailContainer>
        </FeeSection>
        <FeeSection>
          <FeeName>
            <BoldBig>Minimum Payment</BoldBig>
          </FeeName>
          <FeeDetailContainer>
            <FeeDetail>
              Your minimum payment will be the greater of the following: (i){' '}
              <BoldBig>5.00%</BoldBig> of the outstanding balance plus any
              amount past due on your account statement; or (ii) any amount by
              which your new balance exceeds your credit limit; or (iii){' '}
              <BoldBig>$10.00</BoldBig>. If your new balance is{' '}
              <BoldBig>$10.00</BoldBig> or less, you must pay the full amount.
            </FeeDetail>
          </FeeDetailContainer>
        </FeeSection>
        <FeeSection>
          <FeeName>
            <BoldBig>Foreign Currency Conversion</BoldBig>
          </FeeName>
          <FeeDetailContainer>
            <FeeDetail>
              Transactions in a foreign currency are converted to US dollars no
              later than the date we post the transaction to your credit card
              account at an exchange rate that is <BoldBig>2.50%</BoldBig> over
              a benchmark rate Choice Research Bank pays on the date of
              conversion.
            </FeeDetail>
          </FeeDetailContainer>
        </FeeSection>
        <FeeSection>
          <FeeName>
            <BoldBig>Annual Fee</BoldBig>
          </FeeName>
          <FeeDetailContainer>
            <FeeDetail>
              <BoldBig>${cardData.annualFee}</BoldBig>
            </FeeDetail>
            <FeeDetail>
              Annual fees are charged on the first day of the month following
              account opening (whether or not the card is activated) and
              annually thereafter on the first day of that same month.
            </FeeDetail>
          </FeeDetailContainer>
        </FeeSection>
        <FeeSection>
          <FeeName>
            <BoldBig>Other Fees</BoldBig>
          </FeeName>
          <FeeDetailContainer>
            <FeeDetail>
              <Underline>Cash Advance Fee</Underline>: <BoldBig>$3.50</BoldBig>{' '}
              for cash withdrawals or cash-like transactions.{' '}
              <BoldBig>$3.50</BoldBig> for bill payments or balance transfers
              made at an introductory interest rate offered at account opening
              or at your standard interest rate.
            </FeeDetail>
            <FeeDetail>
              <Underline>Promotional Rate Fee</Underline>: Up to{' '}
              <BoldBig>3%</BoldBig> of the transaction amount when you take
              advantage of a promotional interest rate offered to you after
              account opening by making a balance transfer during the
              promotional period. Exact fee will be disclosed at the time of the
              offer. Cash Advance and Balance Transfer Promotional Rate fees are
              charged within <BoldBig>3</BoldBig> business days of the
              transaction being posted to your account.
            </FeeDetail>
            <FeeDetail>
              <Underline>Over limit</Underline>: <BoldBig>$29</BoldBig> if your
              balance exceeds your credit limit at any time during your monthly
              statement period. Charged once per statement period, on the day
              your balance first exceeds your credit limit, and on the first day
              of each subsequent statement period, if your balance remains over
              limit.
            </FeeDetail>
            <FeeDetail>
              <Underline>Additional Copies</Underline>: <BoldBig>$5</BoldBig>{' '}
              for each monthly statement, <BoldBig>$1.50</BoldBig> for each
              statement update at an ATM or branch, <BoldBig>$2</BoldBig> for
              each transaction receipt that does not relate to the current
              statement. Charged within <BoldBig>3</BoldBig> business days of
              each request.
            </FeeDetail>
            <FeeDetail>
              <Underline>Dishonored Payment</Underline>: <BoldBig>$45</BoldBig>{' '}
              charged on the date a payment reversal is posted for a payment
              returned to your credit card.
            </FeeDetail>
            <FeeDetail>
              <Underline>Installment Plan Fee</Underline>: If applicable, either
              a (i) one-time fee of up to <BoldBig>3%</BoldBig> of the total
              purchase amount converted to an installment plan, charged within{' '}
              <BoldBig>3</BoldBig> business days of conversion; or (ii) monthly
              fee of up to <BoldBig>1.15%</BoldBig> of the total purchase amount
              converted to an installment plan, charged on the last day of each
              statement period, so long as any portion of the purchase amount
              remains in the installment plan (fees for the first and second
              month are charged on your second statement). Exact fee will be
              disclosed at the time of the offer.
            </FeeDetail>
            <FeeDetail>
              <Underline>
                Travel Arrangement Change or Cancellation Fee
              </Underline>
              : <BoldBig>$39</BoldBig> is charged for each travel arrangement
              change or cancellation
            </FeeDetail>
          </FeeDetailContainer>
        </FeeSection>
      </FeesContainer>
    </>
  );
};

export default CardFees;

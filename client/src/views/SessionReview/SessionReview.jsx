import React from 'react';
import { connect } from 'react-redux';
import printf from 'printf';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import {
  Container,
  FormContainer,
  Header,
  QuestionsContainer,
  Question,
  ButtonContainer,
  Label,
  SmallLabel,
  SubmitButton,
} from './SessionReview.styles';

import TextAreaWordCount from '../../shared/TextAreaWordCount/TextAreaWordCount';
import Questions from './SessionReview.metadata';
import formActions from '../../redux/form/actions';

class SessionReview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {},
      page: 1,
      allValid: {},
    };
  }

  componentDidMount() {
    // application not submitted; redirect back to Home
    if (!this.props.applicationSubmitted) {
      this.props.history.push('/');
    }
  }

  onFieldChange(fieldName, value) {
    this.setState({
      formData: {
        ...this.state.formData,
        [fieldName]: value,
      },
    });
  }

  handleTextareaChange(text, isValid, question) {
    this.setState({
      allValid: {
        ...this.state.allValid,
        [question.key]: isValid,
      },
    });
    this.onFieldChange(question.key, text);
  }

  onBack() {
    this.setState({ page: this.state.page - 1 });
  }

  onNext() {
    this.setState({ page: this.state.page + 1 });
  }

  onSubmit() {
    this.props.submitSessionReviewRequest(this.state.formData);
  }

  renderHeader() {
    const numPages = Object.keys(Questions).length;

    return (
      <Header>
        <SmallLabel>
          Page {this.state.page} of {numPages}
        </SmallLabel>
        <h2>Thank you for participating in this research.</h2>
        <h3>As a final step, please answer some questions.</h3>
      </Header>
    );
  }

  renderQuestion(question, index) {
    const args = (question.args && question.args(this.props)) || [];

    return (
      <Question key={index}>
        <label>{printf(question.primaryText || '', ...args)}</label>
        <label>{question.secondaryText}</label>
        {question.type === 'label' && <Label>{question.labelText}</Label>}
        {question.type === 'text' && (
          <input
            type="text"
            value={this.state.formData[question.key] || ''}
            onChange={(e) => this.onFieldChange(question.key, e.target.value)}
          />
        )}
        {question.type === 'constrainedTextarea' && (
          <TextAreaWordCount
            value={this.state.formData[question.key] || ''}
            onChange={(text, isValid) =>
              this.handleTextareaChange(text, isValid, question)
            }
            minWordCount={question.minWordCount}
            maxWordCount={question.maxWordCount}
          />
        )}
        {question.type === 'number' && (
          <input
            type="number"
            min={question.min}
            max={question.max}
            value={this.state.formData[question.key] || ''}
            onChange={(e) => this.onFieldChange(question.key, e.target.value)}
          />
        )}
        {question.type === 'radio' && (
          <RadioGroup
            row
            aria-label={question.key}
            name={question.key}
            value={this.state.formData[question.key] || ''}
            onChange={(e) => this.onFieldChange(question.key, e.target.value)}
          >
            {question.options.map((option, index) => (
              <FormControlLabel
                key={index}
                value={option}
                control={<Radio />}
                label={option}
              />
            ))}
          </RadioGroup>
        )}
      </Question>
    );
  }

  renderQuestions() {
    return (
      <QuestionsContainer>
        {Questions[this.state.page].map((question, index) =>
          this.renderQuestion(question, index)
        )}
      </QuestionsContainer>
    );
  }

  renderButton(text, onClick) {
    const { formData } = this.state;
    const questionKeys = Questions[this.state.page]
      .filter((question) => question.type !== 'label')
      .map((question) => question.key);

    const anyFieldsNotComplete = !questionKeys.every(
      (key) => Object.keys(formData).includes(key) && formData[key]
    );

    const anyFieldsNotValid = Object.values(this.state.allValid).some(
      (v) => v === false
    );

    const disabled = anyFieldsNotComplete || anyFieldsNotValid;

    return (
      <ButtonContainer>
        <SubmitButton onClick={onClick} disabled={disabled}>
          {text}
        </SubmitButton>
      </ButtonContainer>
    );
  }

  render() {
    const numPages = Object.keys(Questions).length;
    let BackButton;

    // If not the first page, show the Back button
    if (this.state.page !== 1) {
      BackButton = (
        <ButtonContainer>
          <SubmitButton onClick={() => this.onBack()}>BACK</SubmitButton>
        </ButtonContainer>
      );
    }

    return (
      <Container>
        <FormContainer>
          {this.renderHeader()}
          {this.renderQuestions()}
          <ButtonContainer>
            {/* For Dev Env only. We don't want users to be able to go back. */}
            {process.env.NODE_ENV === 'development' ? BackButton : null}

            {/* If the last page, show Submit button, otherwise Next button */}
            {this.state.page === numPages
              ? this.renderButton('SUBMIT', () => this.onSubmit())
              : this.renderButton('NEXT', () => this.onNext())}
          </ButtonContainer>
        </FormContainer>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  cardName:
    (state.form.formData.card && state.form.formData.card.name) ||
    state.form.cardName,
  applicationSubmitted: state.form.applicationSubmitted,
});

const mapDispatchToProps = (dispatch) => ({
  submitSessionReviewRequest: (formData) =>
    dispatch(formActions.submitSessionReviewRequest(formData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SessionReview);

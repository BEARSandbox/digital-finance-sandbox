import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import formActions from '../../redux/form/actions';

import {
  Container,
  FormContainer,
  HomeButton,
  Button,
} from './ThankYou.styles';

function ThankYou() {
  const history = useHistory();
  const dispatch = useDispatch();
  const sessionReviewSubmitted = useSelector(
    (state) => state.form.sessionReviewSubmitted
  );
  const surveyCode = useSelector((state) => state.form.surveyCode);

  useEffect(() => {
    // review form not complete; redirect back to Home
    if (!sessionReviewSubmitted) {
      history.push('/');
    }
  }, [sessionReviewSubmitted, history]);

  useEffect(() => {
    dispatch(formActions.generateSurveyCodeRequest());
  }, [dispatch]);

  return (
    <Container>
      <FormContainer>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <HomeButton>Choice Research Bank</HomeButton>
        </div>
        <h2>Thank you for participating in this research.</h2>
        <p>You can fill out the application form only once.</p>
        <h3
          style={{
            textAlign: 'center',
            background: '#efefef',
            border: '1px solid #dbdbdb',
            borderRadius: 4,
            padding: '20px 0',
          }}
        >
          Survey Code: <span style={{ fontWeight: 400 }}>{surveyCode}</span>
        </h3>
        <Button onClick={() => history.push(`/debriefing-form`)}>
          Show Debriefing Form
        </Button>
      </FormContainer>
    </Container>
  );
}

export default ThankYou;

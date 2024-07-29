import React, { useState } from 'react';
import {
  Container,
  Heading,
  HeadingSmall,
  HeaderImage,
  Button,
  ButtonContainer,
} from './ConsentForm.styles';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import authActions from '../../redux/auth/actions';

function ConsentForm() {
  const [doNotConsent, setDoNotConsent] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();

  return (
    <Container>
      <HeaderImage src="/assets/images/header-image.jpg" alt="header logo" />
      <Heading>Consent Form</Heading>
      <p>
        You are invited to participate in research being conducted by Dr.
        Matthew Hilchey, who is a post-doctoral fellow at the University of
        Toronto Rotman School of Management. This research is being supervised
        by Professor Dilip Soman. The research is funded by a partnership grant
        awarded by the Social Sciences and Humanities Research Council (SSHRC)
        of Canada. Your participation in this study is voluntary, and you may
        refuse to participate or withdraw from the study, at any time, without
        penalty, by leaving the website. If you decide to withdraw from the
        study, your data will be deleted and not used in any analyses.
      </p>
      <p>
        You will be granted access to a website ('Choice Research Bank') that
        allows you to find and apply for a fake credit card. Your goal is to
        apply for the card that is in your best financial interest, given a
        hypothetical scenario that we show you at the beginning. During the
        credit card application process, you will be asked to provide some
        information about yourself. Afterward, you will be asked to answer
        financial literacy questions. While we do not ask for any personally
        identifying information, note that it is your right to refuse to answer
        questions. Recognize further that we do not have the authority to issue
        credit card products and that you will not receive any product for which
        you apply.
      </p>
      <p>
        You will receive $2 US for completing the study, and an additional $4 US
        if you choose the card that is in your best financial interest, given
        the hypothetical scenario. It should take you no longer than 30 minutes
        to complete this study, from start to finish. All responses that you
        provide will be anonymous and your participation in this study will be
        strictly confidential. Your name will not be associated with your
        responses in any way; the data that you provide will be associated with
        a random number, not your name.
      </p>
      <p>
        The data that you provide will first be accessed by Dr. Hilchey, Prof.
        Soman and researchers working under their supervision. Later, the
        de-identified data will be made public through the Open Science
        Framework (
        <a
          href="https://cos.io/our-products/osf/"
          target="_blank"
          rel="noopener noreferrer"
        >
          https://cos.io/our-products/osf/
        </a>
        ), so that conclusions can be drawn by independent researchers and
        agencies. The data that we collect from this website are encrypted and
        stored securely. There are no known risks associated with participating
        in this study and you are expected to benefit only by contributing to
        scientific research.
      </p>
      <p>
        If you would like further information regarding this study, you may
        contact: Matthew Hilchey at 416-864-8057 or by email:{' '}
        <a href="mailto:matthew.hilchey@rotman.utoronto.ca">
          matthew.hilchey@rotman.utoronto.ca
        </a>
        , or Dilip Soman at 416-946-0195 or by e-mail:{' '}
        <a href="mailto:dilip.Soman@rotman.utoronto.ca">
          dilip.Soman@rotman.utoronto.ca
        </a>
        . If you would like further information regarding your rights as a
        participant, you may contact the Ethics Review Office, 416-946-3273 or{' '}
        <a href="mailto:ethics.review@utoronto.ca">ethics.review@utoronto.ca</a>
        .{' '}
      </p>
      <p>
        If the preceding information is clear to you, and you wish to continue,
        then you may continue to the website by clicking 'I consent'. Doing so
        means that you understand your rights as a participant and give your
        consent to participate in this study. If the preceding information is
        not clear to you or you do not wish to continue, then click 'I do not
        consent' and exit this webpage. You may copy this form for your records.
      </p>
      {doNotConsent && (
        <HeadingSmall>Thank you. You can exit this website now.</HeadingSmall>
      )}
      <ButtonContainer>
        <Button onClick={() => setDoNotConsent(true)}>I do not consent</Button>
        <Button
          onClick={() => {
            dispatch(authActions.consent());
            history.push(`/`);
          }}
        >
          I consent
        </Button>
      </ButtonContainer>
    </Container>
  );
}

export default ConsentForm;

import React from 'react';
import { Container, Heading, Button, Table } from './DebriefingForm.styles';
import { useHistory } from 'react-router-dom';

function DebriefingForm() {
  const history = useHistory();

  return (
    <Container>
      <Heading>Debriefing Form</Heading>
      <p>
        The goal of this research is to assess how different ways of providing
        information about financial goods and services can influence what
        consumers attend to and ultimately choose. The research is motivated by
        recent government reports calling into question the effectiveness of
        mandated information disclosures on improving consumer welfare. These
        reports have acknowledged that most people do not attend to or
        understand the information that is provided about financial goods and
        services and that mandated financial information disclosures have had
        unsatisfactory effects on improving financial well-being. More
        information on this can be found in recent reports by the Ontario
        Securities Commission:{' '}
        <a
          href="https://www.osc.gov.on.ca/en/SecuritiesLaw_sn_20190819_11-787_improving-fee-disclosure-through-behavioural-insights.htm"
          target="_blank"
          rel="noopener noreferrer"
        >
          https://www.osc.gov.on.ca/en/SecuritiesLaw_sn_20190819_11-787_improving-fee-disclosure-through-behavioural-insights.htm
        </a>
        and the Australian Securities and Investment Commission (ASIC) and Dutch
        Monetary Fund (DMF):{' '}
        <a
          href="https://asic.gov.au/regulatory-resources/find-a-document/reports/rep-632-disclosure-why-it-shouldn-t-be-the-default/"
          target="_blank"
          rel="noopener noreferrer"
        >
          https://asic.gov.au/regulatory-resources/find-a-document/reports/rep-632-disclosure-why-it-shouldn-t-be-the-default/
        </a>
        .
      </p>
      <p>
        In these experiments, we present financial information to different
        people in different ways, and request that they sort through it to make
        an informed choice between competing financial products. In this
        particular experiment, we randomly vary between people how difficult it
        is to access a federally mandated disclosure form called an ‘information
        box’ in Canada and a ‘Schumer box’ in the United States. This form
        consists of a text-laden summary table with credit card fees and terms
        that people should know about before acquiring a credit card product. In
        practice, these forms are often difficult to find on banking websites
        until an application for a credit card is made, and thus consumers are
        likely to overlook important credit card terms and make poor choices.{' '}
      </p>
      <p>
        While you were on the website, we recorded what you clicked on, which
        webpages you accessed, how long you spent on them and what credit card
        you chose. With this information, we can determine the situations in
        which important financial information disclosures are most likely to be
        processed and have an impact on the choices that people make. You also
        provided sociodemographic information and completed a financial literacy
        questionnaire. These data allow us to determine whether certain
        populations are more likely to be positively or negatively impacted by
        the manner in which information is disclosed.{' '}
      </p>
      <p>
        By contributing to this research project today, you have helped us
        better understand what needs to be done to ensure that consumers have
        access to and understand financial products and services in the
        marketplace. We will use this knowledge to develop theories and to
        recommend best practices for making sure that the consumer accesses and
        understands important financial product information.{' '}
      </p>
      <p>
        Should you have any further inquiries regarding the study you
        participated, please feel free to contact the research team with the
        following contact information:
      </p>
      <Table>
        <tbody>
          <tr>
            <td>Researcher Name:</td>
            <td>Matthew Hilchey</td>
          </tr>
          <tr>
            <td>Researcher Email:</td>
            <td>
              <a href="mailto:Matthew.hilchey@rotman.utoronto.ca">
                Matthew.hilchey@rotman.utoronto.ca
              </a>
            </td>
          </tr>
          <tr>
            <td>Researcher Phone Number:</td>
            <td>(416) 864-8057</td>
          </tr>
          <tr>
            <td>Supervisor Name:</td>
            <td>Dilip Soman</td>
          </tr>
          <tr>
            <td>Supervisor Email:</td>
            <td>
              <a href="mailto:Dilip.soman@rotman.utoronto.ca">
                Dilip.soman@rotman.utoronto.ca
              </a>
            </td>
          </tr>
          <tr>
            <td>Supervisor Phone Number:</td>
            <td>(416) 946-0195</td>
          </tr>
        </tbody>
      </Table>
      <p>
        If you would like to receive a project report when the project is
        completed, you may contact Matt Hilchey (above). If you would like
        further information regarding your rights as a participant, you may
        contact the Ethics Review Office, 416-946-3273 or{' '}
        <a href="mailto:ethics.review@utoronto.ca">ethics.review@utoronto.ca</a>
        .
      </p>
      <Button onClick={() => history.goBack()}>Back</Button>
    </Container>
  );
}

export default DebriefingForm;

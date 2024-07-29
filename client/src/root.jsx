import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Bowser from 'bowser';
import * as QueryString from 'query-string';

// shared components
import Login from './shared/Login/Login';
import Header from './shared/Header/Header';
import Footer from './shared/Footer/Footer';

// views
import Main from './views/Main/Main';
import CreditCardsIntroduction from './views/CreditCards/Introduction/Introduction';
import CreditCardsViewAll from './views/CreditCards/ViewAll/ViewAll';
import CreditCardsViewSingle from './views/CreditCards/ViewSingle/ViewSingle';
// import CreditCardsCompare from './views/CreditCards/Compare/Compare';
import CreditCardsBeforeYouApply from './views/CreditCards/Apply/BeforeYouApply';
import CreditCardsApplyFees from './views/CreditCards/Apply/Fees';
import CreditCardsApplyPersonal from './views/CreditCards/Apply/Personal';
import CreditCardsApplyEmployment from './views/CreditCards/Apply/Employment';
import CreditCardsApplyReview from './views/CreditCards/Apply/Review';
import ScenarioManager from './views/ScenarioManager/ScenarioManager';
import SchumerBox from './views/SchumerBox/SchumerBox';
import SessionReview from './views/SessionReview/SessionReview';
import ThankYou from './views/ThankYou/ThankYou';
import TermsAndConditions from './views/TermsAndConditions/TermsAndConditions';
import AdminControls from './views/AdminControls/AdminControls';
import Page404 from './views/Page404/Page404';
import NotFromMturk from './views/NotFromMturk/NotFromMturk';
import ConsentForm from './views/ConsentForm/ConsentForm';
import DebriefingForm from './views/DebriefingForm/DebriefingForm';

import authActions from './redux/auth/actions';
import metricsActions from './redux/metrics/actions';

class Root extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      unlistenFunc: null,
      saveMetricsFunc: null,
    };
  }

  trackMetrics() {
    if (this.props.applicationSubmitted) return;

    this.props.addPageData(this.props.location.pathname);

    const unlistenFunc = this.props.history.listen((location) => {
      this.props.addPageData(location.pathname);
    });

    // Continue saving clickstream data and other metrics to the
    // database every few seconds
    const saveMetricsFunc = setInterval(() => {
      this.props.savePageDataToDB();
      this.props.saveActionDataToDB();
    }, 10000);

    this.setState({ unlistenFunc, saveMetricsFunc });
  }

  stopTrackingMetrics() {
    if (this.state.unlistenFunc) this.state.unlistenFunc();
    if (this.state.saveMetricsFunc) clearInterval(this.state.saveMetricsFunc);
  }

  findExistingUser = () => {
    const userInfoFromStorage = localStorage.getItem(
      'digitalFinanceSandbox_userInfo_temp'
    );

    if (userInfoFromStorage) {
      localStorage.setItem(
        'digitalFinanceSandbox_userInfo',
        userInfoFromStorage
      );
      localStorage.removeItem('digitalFinanceSandbox_userInfo_temp');
      return true;
    }
    return false;
  };

  onUnload = (e) => {
    if (this.props.applicationSubmitted) return;

    e.preventDefault();
    e.returnValue = '';

    // We don't want to do any tracking for admins
    if (!this.props.isAdmin) {
      this.props.savePageDataToDB(true);
      this.props.saveActionDataToDB();
    }
  };

  componentDidMount() {
    // We don't want to do any tracking for admins
    if (!this.props.isAdmin) {
      this.trackMetrics();
    }

    const { assignmentId, workerId, isRA } = QueryString.parse(
      this.props.location.search
    );

    // On page load, if the user is not authenticated, generate a new
    // user for and assign all details like factorOne, factorTwo, etc...
    if (!this.props.isAuthenticated) {
      if (!assignmentId || !workerId) {
        this.stopTrackingMetrics();
      } else {
        const browserData = Bowser.parse(window.navigator.userAgent);

        this.props.generateNewUser(assignmentId, workerId, isRA === 'true', {
          os: `${browserData.os.name} ${browserData.os.version}`,
          browser: `${browserData.browser.name} ${browserData.browser.version}`,
          platform: browserData.platform.type,
        });
      }
    }
    // else if (workerId && this.props.userId !== workerId) {
    //   // If workerId exists but it is different that what's stored in local storage
    //   if (assignmentId) {
    //     const browserData = Bowser.parse(window.navigator.userAgent);

    //     this.props.generateNewUser(assignmentId, workerId, {
    //       os: `${browserData.os.name} ${browserData.os.version}`,
    //       browser: `${browserData.browser.name} ${browserData.browser.version}`,
    //       platform: browserData.platform.type,
    //     });
    //   }
    // }

    // We need to push certain data to the database before user exits the website
    window.addEventListener('beforeunload', this.onUnload);
  }

  componentWillUnmount() {
    window.removeEventListener('beforeunload', this.onUnload);
  }

  componentDidUpdate(prevProps) {
    // Don't track metrics for admin user
    if (!prevProps.isAdmin && this.props.isAdmin) {
      this.stopTrackingMetrics();
    }

    // If admin user logs out, we want to load old user or generate a
    // new user login, and also start saving metrics data again
    if (prevProps.isAdmin && !this.props.isAdmin) {
      if (this.findExistingUser()) {
        this.props.loadExistingUser();
      } else {
        this.props.generateNewUser();
      }
      this.trackMetrics();
    }

    // application has been successfully submitted; redirect to review page
    if (!prevProps.applicationSubmitted && this.props.applicationSubmitted) {
      this.props.history.push('/review');
      this.stopTrackingMetrics();
    }

    // review form filled out; show thank you screen
    if (
      !prevProps.sessionReviewSubmitted &&
      this.props.sessionReviewSubmitted
    ) {
      this.props.history.push('/thank-you');
      this.stopTrackingMetrics();
    }
  }

  renderProtectedRoute(path, OriginalComponent, exact = true) {
    const { applicationSubmitted, sessionReviewSubmitted, hasConsented } =
      this.props;

    return (
      <Route
        exact={exact}
        path={path}
        render={(props) => {
          if (path === '/admin') {
            return <OriginalComponent {...props} />;
          } else if (!hasConsented) {
            return <ConsentForm {...props} />;
          } else if (sessionReviewSubmitted) {
            const { pathname } = this.props.location;

            if (pathname === '/debriefing-form') {
              return <OriginalComponent {...props} />;
            } else {
              return <ThankYou {...props} />;
            }
          } else if (applicationSubmitted) {
            return <SessionReview {...props} />;
          }
          return <OriginalComponent {...props} />;
        }}
      />
    );
  }

  render() {
    const { isAdmin, applicationSubmitted, isAuthenticated, hasConsented } =
      this.props;

    return (
      <div
        id="app"
        style={{
          display: 'flex',
          width: '100%',
          height: '100%',
          flexDirection: 'column',
          overflowX: 'hidden',
          overflowY: 'auto',
        }}
      >
        {!applicationSubmitted && isAuthenticated && hasConsented && <Header />}
        {!applicationSubmitted && isAuthenticated && hasConsented && (
          <ScenarioManager />
        )}
        {isAdmin && <AdminControls />}
        <div
          id="route-container"
          style={{
            flexGrow: '1',
          }}
        >
          {!isAuthenticated && (
            <Switch>
              {this.renderProtectedRoute('/admin', Login)}
              {this.renderProtectedRoute('/', NotFromMturk, false)}
            </Switch>
          )}
          {isAuthenticated && (
            <Switch>
              {this.renderProtectedRoute(
                '/credit-cards',
                CreditCardsIntroduction
              )}
              {this.renderProtectedRoute(
                '/credit-cards/view',
                CreditCardsViewAll,
                false
              )}
              {/* {this.renderProtectedRoute(
                '/credit-cards/compare',
                CreditCardsCompare
              )} */}
              {this.renderProtectedRoute(
                '/credit-cards/:cardId',
                CreditCardsViewSingle
              )}
              {this.renderProtectedRoute(
                '/credit-cards/apply/:cardId',
                CreditCardsApplyFees
              )}
              {this.renderProtectedRoute(
                '/credit-cards/apply/:cardId/before-you-apply',
                CreditCardsBeforeYouApply
              )}
              {this.renderProtectedRoute(
                '/credit-cards/apply/:cardId/personal-info',
                CreditCardsApplyPersonal
              )}
              {this.renderProtectedRoute(
                '/credit-cards/apply/:cardId/employment-info',
                CreditCardsApplyEmployment
              )}
              {this.renderProtectedRoute(
                '/credit-cards/apply/:cardId/review',
                CreditCardsApplyReview
              )}
              {this.renderProtectedRoute('/review', SessionReview)}
              {this.renderProtectedRoute('/thank-you', ThankYou)}
              {this.renderProtectedRoute('/admin', Login)}
              {this.renderProtectedRoute('/important-fees/:cardId', SchumerBox)}
              {this.renderProtectedRoute(
                '/terms-and-conditions',
                TermsAndConditions
              )}
              {this.renderProtectedRoute('/consent-form', ConsentForm)}
              {this.renderProtectedRoute('/debriefing-form', DebriefingForm)}
              {this.renderProtectedRoute('/', Main)}
              {this.renderProtectedRoute('/', Page404, false)}
            </Switch>
          )}
        </div>
        {!applicationSubmitted && isAuthenticated && hasConsented && <Footer />}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userId: state.auth.userId,
  isAuthenticated: state.auth.isAuthenticated,
  hasConsented: state.auth.hasConsented,
  isAdmin: state.auth.isAdmin,
  applicationSubmitted: state.form.applicationSubmitted,
  sessionReviewSubmitted: state.form.sessionReviewSubmitted,
});

const mapDispatchToProps = (dispatch) => ({
  generateNewUser: (assignmentId, workerId, isRA, clientData) =>
    dispatch(
      authActions.newUserRequest(assignmentId, workerId, isRA, clientData)
    ),
  loadExistingUser: () => dispatch(authActions.loadExistingUser()),
  addPageData: (webpage) => dispatch(metricsActions.addPageData(webpage)),
  savePageDataToDB: (isLastSave) =>
    dispatch(metricsActions.savePageDataToDB(isLastSave)),
  saveActionDataToDB: () => dispatch(metricsActions.saveActionDataToDB()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Root));

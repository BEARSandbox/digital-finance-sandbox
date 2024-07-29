import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import ScenarioToggle from './ScenarioToggle/ScenarioToggle';
import ScenarioViewer from './ScenarioViewer/ScenarioViewer';

const RouterWrapper = withRouter((props) => <ScenarioManager {...props} />);

class ScenarioManager extends React.Component {
  constructor(props) {
    super(props);
    const { pathname } = this.props.location;
    this.state = {
      // don't start full-screen if admin or if on sign in page for admin
      showFullScreen: !props.isAdmin && pathname.replace(/\//g, '') !== 'admin',
    };
  }

  toggleFullScreen() {
    this.setState({
      showFullScreen: !this.state.showFullScreen,
    });
  }

  render() {
    const { factorOne } = this.props;
    const { showFullScreen } = this.state;

    return (
      <>
        <ScenarioToggle onToggle={() => this.toggleFullScreen()} />
        {showFullScreen ? (
          <ScenarioViewer
            factorOne={factorOne}
            showFullScreen={this.state.showFullScreen}
            onToggle={() => this.toggleFullScreen()}
          />
        ) : null}
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  isAdmin: state.auth.isAdmin,
  userEmail: state.auth.userEmail,
  factorOne: state.auth.factorOne,
});

export default connect(mapStateToProps)(RouterWrapper);

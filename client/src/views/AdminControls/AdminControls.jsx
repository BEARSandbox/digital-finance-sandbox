import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { IoIosArrowUp, IoIosArrowDown } from 'react-icons/io';
import DatePicker from 'react-datepicker';
import LoadingIcons from 'react-loading-icons';

import {
  StyledAdminControls,
  ControlsHeader,
  PanelToggleButton,
  DatesContainer,
  DateContainer,
  ControlsButtons,
  FactorToggle,
  FullWidthButton,
  Divider,
} from './AdminControls.styles';
import 'react-datepicker/dist/react-datepicker.css';

import MultiButton from '../../shared/MultiButton/MultiButton';

import authActions from '../../redux/auth/actions';
import userDataActions from '../../redux/userData/actions';

function AdminControls() {
  const [showPanel, setShowPanel] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const userData = useSelector((state) => state.userData);
  const pending = userData.status.getPending || userData.status.downloadPending;

  const deleteLocalUser = () => {
    const userInfoFromStorage = localStorage.getItem(
      'digitalFinanceSandbox_userInfo_temp'
    );

    if (userInfoFromStorage) {
      localStorage.removeItem('digitalFinanceSandbox_userInfo_temp');
      alert('Successfully deleted local user');
    } else {
      alert('Local user does not exist');
    }
  };

  const onTogglePanel = () => {
    setShowPanel(!showPanel);
  };

  const onSelectFactor = (factorKey, factorValue) => {
    dispatch(authActions.toggleFactor(factorKey, factorValue));
  };

  const renderHeader = () => {
    return (
      <ControlsHeader onClick={onTogglePanel}>
        <label>Admin controls</label>
        <PanelToggleButton title="Close">
          {showPanel ? <IoIosArrowDown /> : <IoIosArrowUp />}
        </PanelToggleButton>
      </ControlsHeader>
    );
  };

  const renderFactorToggle = (factor) => {
    return (
      <FactorToggle key={factor.key}>
        <label>{factor.name}</label>
        <MultiButton
          currentValue={auth[factor.key]}
          onClickOption={(value) => onSelectFactor(factor.key, value)}
          options={factor.options}
        />
      </FactorToggle>
    );
  };

  const renderStartDatePicker = () => {
    return (
      <FactorToggle>
        <label>Start Date</label>
        <DateContainer>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            className="date-picker"
          />
          {startDate !== null && (
            <img
              role="button"
              onClick={() => setStartDate(null)}
              className="clear"
              src="/assets/icons/close.png"
              alt="clear date"
            />
          )}
        </DateContainer>
      </FactorToggle>
    );
  };

  const renderEndDatePicker = () => {
    return (
      <FactorToggle>
        <label>End Date</label>
        <DateContainer>
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            className="date-picker"
          />
          {endDate !== null && (
            <img
              role="button"
              onClick={() => setEndDate(null)}
              className="clear"
              src="/assets/icons/close.png"
              alt="clear date"
            />
          )}
        </DateContainer>
      </FactorToggle>
    );
  };

  const renderButtons = () => {
    const factors = [
      {
        key: 'factorOne',
        name: 'Factor 1 (Hypothetical scenario)',
        options: [
          { label: 'Cost minimization (0)', value: 0 },
          { label: 'Reward maximization (1)', value: 1 },
        ],
      },
      {
        key: 'factorTwo',
        name: 'Factor 2 (Page emphasis)',
        options: [
          { label: 'Cost min. (0)', value: 0 },
          { label: 'Reward max. (1)', value: 1 },
          { label: 'Null (2)', value: 2 },
        ],
      },
      {
        key: 'factorThree',
        name: 'Factor 3 (Schumer box timing)',
        options: [
          { label: 'Undistinguished (0)', value: 0 },
          { label: 'Salient (1)', value: 1 },
        ],
      },
      {
        key: 'buttonId',
        name: 'Button Text',
        options: [
          { label: 'Normal (0)', value: 0 },
          { label: 'Button Id (1)', value: 1 },
        ],
      },
    ];

    return (
      <ControlsButtons showDeleteButton={auth.hasDeleteAccess}>
        {factors.map((factor) => renderFactorToggle(factor))}
        <Divider />
        <DatesContainer>
          {renderStartDatePicker()}
          {renderEndDatePicker()}
        </DatesContainer>
        {auth.hasDeleteAccess ? (
          <FullWidthButton
            onClick={() => {
              if (window.confirm('Are you sure?')) {
                dispatch(userDataActions.deleteAllDataRequest());
              }
            }}
          >
            Delete All Metrics Data
          </FullWidthButton>
        ) : null}
        <FullWidthButton
          onClick={() => {
            if (window.confirm('Are you sure?')) deleteLocalUser();
          }}
        >
          Delete Local User
        </FullWidthButton>
        <FullWidthButton
          disabled={pending}
          onClick={
            pending
              ? null
              : () =>
                  dispatch(
                    userDataActions.getAllDataRequest(startDate, endDate)
                  )
          }
        >
          {pending ? (
            <>
              <LoadingIcons.Oval height={20} stroke="gray" />
              <div>Loading...</div>
            </>
          ) : (
            'Download CSV Data Files'
          )}
        </FullWidthButton>
      </ControlsButtons>
    );
  };

  return (
    <StyledAdminControls
      show={showPanel}
      showDeleteButton={auth.hasDeleteAccess}
    >
      {renderHeader()}
      {renderButtons()}
    </StyledAdminControls>
  );
}

export default AdminControls;

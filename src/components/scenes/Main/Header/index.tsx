import * as React from 'react';

import './styles.scss';

const logo = require('resources/img/logo.svg');

interface IHeaderProps {
  title?: string;
  isAuthenticated: boolean;
  signIn: () => void;
  signOut: () => void;
}

const Header = ({ title, isAuthenticated, signIn, signOut }: IHeaderProps) => (
  <>
    <div className="mainHeaderContainer">
      <div className="leftBlock">
        <img src={logo} className="logo" />
      </div>
      {isAuthenticated ? (
        <div className="rightBlock" onClick={signOut}>
          Sign Out
        </div>
      ) : (
        <div className="rightBlock" onClick={signIn}>
          Sign In
        </div>
      )}
    </div>
  </>
);

export default Header;


import React, { useContext } from 'react';
import { FaBars } from 'react-icons/fa';
import { NavLink as Link } from 'react-router-dom';

import styled from 'styled-components';
import { userContext } from '../userContext';

const Nav = styled.nav`
  background: #2d2d2d;
  height: 85px;
  display: flex;
  justify-content: space-between;
  padding: 0.2rem calc((100vw - 1000px) / 10);
  z-index: 12;
  /* Third Nav */
  /* justify-content: flex-start; */
`;

const NavLink = styled(Link)`
  color: #eee;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0 1rem;
  height: 100%;
  cursor: pointer;
  &.active {
    color: #777;
  }
`;

const Bars = styled(FaBars)`
  display: none;
  color: #808080;
  @media screen and (max-width: 768px) {
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(-100%, 75%);
    font-size: 1.8rem;
    cursor: pointer;
  }
`;

const NavMenu = styled.div`
  display: flex;
  align-items: center;
  margin-right: -24px;
  /* Second Nav */
  /* margin-right: 24px; */
  /* Third Nav */
  /* width: 100vw;
  white-space: nowrap; */
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const NavBtn = styled.nav`
  display: flex;
  align-items: center;
  margin-right: 24px;
  /* Third Nav */
  /* justify-content: flex-end;
  width: 100vw; */
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const NavBtnLink = styled(Link)`
  border-radius: 4px;
  background: #808080;
  padding: 10px 22px;
  color: #fff;
  outline: none;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  /* Second Nav */
  margin-left: 24px;
  &:hover {
    transition: all 0.2s ease-in-out;
    background: #fff;
    color: #808080;
  }
`;

const Navbar = () => {

  const { user } = useContext(userContext)

  return (
    <>
      <Nav>
        <Bars />

        <NavMenu>
          <NavLink to='/about' >
            About
          </NavLink>
          <NavLink to='/institutions' >
            Institutions
          </NavLink>
          {/* show user or institution profile according to the user role */}
          {user.name ?
            <>
              {user.role == "association" ?
                <NavLink to={'/institutionProfile/' + user.id} activeStyle>
                  Profile
                </NavLink>
                :
                <NavLink to={'/userProfile/' + user.id} activeStyle>
                  Profile
                </NavLink>
              }
            </>
            : null}

        </NavMenu>
        {/* sign in or out according to the current user context */}
        {!user.name ?
          <NavBtn>
            <NavBtnLink to='/signin'>Sign In</NavBtnLink>
          </NavBtn>
          :
          <NavBtn>
            <NavBtnLink to='/signout'>Sign Out</NavBtnLink>
          </NavBtn>
        }
      </Nav>
    </>
  );
};

export default Navbar;
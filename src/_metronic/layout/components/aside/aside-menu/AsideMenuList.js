/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from "react";
import { useLocation } from "react-router";
import { NavLink } from "react-router-dom";
import SVG from "react-inlinesvg";
import { toAbsoluteUrl, checkIsActive } from "../../../../_helpers";

export function AsideMenuList({ layoutProps }) {
  const location = useLocation();
  const getMenuItemActive = (url, hasSubmenu = false) => {
    return checkIsActive(location, url)
      ? ` ${!hasSubmenu && "menu-item-active"} menu-item-open `
      : "";
  };

  return (
    <>
      {/* begin::Menu Nav */}
      <ul className={`menu-nav ${layoutProps.ulClasses}`}>
        {/*begin::1 Level*/}
        <li
          className={`menu-item ${getMenuItemActive("/dashboard", false)}`}
          aria-haspopup="true"
        >
          <NavLink className="menu-link" to="/dashboard">
            <span className="svg-icon menu-icon">
              <SVG src={toAbsoluteUrl("/media/svg/icons/Design/Layers.svg")} />
            </span>
            <span className="menu-text">Dashboard</span>
          </NavLink>
        </li>
        {/*end::1 Level*/}


        {/*begin::1 Level*/}
        <li
          className={`menu-item ${getMenuItemActive("/e-commerce/map", false)}`}
          aria-haspopup="true"
        >
          <NavLink className="menu-link" to="/e-commerce/map">
            <span className="svg-icon menu-icon">
              <SVG src={toAbsoluteUrl("/media/svg/icons/Design/Layers.svg")} />
            </span>
            <span className="menu-text">Map</span>
          </NavLink>
        </li>
        {/*end::1 Level*/}

        {/*begin::2 Level*/}
        <li
          className={`menu-item ${getMenuItemActive(
            "/e-commerce/customers"
          )}`}
          aria-haspopup="true"
        >
          <NavLink className="menu-link" to="/e-commerce/customers">
            <span className="svg-icon menu-icon">
              <SVG src={toAbsoluteUrl("/media/svg/icons/Design/Layers.svg")} />
            </span>
            <span className="menu-text">Users</span>
          </NavLink>
        </li>
        {/*end::2 Level*/}
        {/*begin::2 Level*/}
        <li
          className={`menu-item ${getMenuItemActive(
            "/e-commerce/products"
          )}`}
          aria-haspopup="true"
        >
          <NavLink className="menu-link" to="/e-commerce/products">
            <span className="svg-icon menu-icon">
              <SVG src={toAbsoluteUrl("/media/svg/icons/Design/Layers.svg")} />
            </span>
            <span className="menu-text">Vehicle</span>
          </NavLink>
        </li>
        {/*end::2 Level*/}

        {/*begin::2 Level*/}
        <li
          className={`menu-item ${getMenuItemActive(
            "/e-commerce/parts"
          )}`}
          aria-haspopup="true"
        >
          <NavLink className="menu-link" to="/e-commerce/parts">
            <span className="svg-icon menu-icon">
              <SVG src={toAbsoluteUrl("/media/svg/icons/Design/Layers.svg")} />
            </span>
            <span className="menu-text">Parts</span>
          </NavLink>
        </li>
        {/*end::2 Level*/}

        {/*begin::2 Level*/}
        <li
          className={`menu-item ${getMenuItemActive(
            "/e-commerce/decoration"
          )}`}
          aria-haspopup="true"
        >
          <NavLink className="menu-link" to="/e-commerce/decoration">
            <span className="svg-icon menu-icon">
              <SVG src={toAbsoluteUrl("/media/svg/icons/Design/Layers.svg")} />
            </span>
            <span className="menu-text">Decoration</span>
          </NavLink>
        </li>
        {/*end::2 Level*/}


        {/*begin::2 Level*/}
        <li
          className={`menu-item ${getMenuItemActive(
            "/e-commerce/ticket"
          )}`}
          aria-haspopup="true"
        >
          <NavLink className="menu-link" to="/e-commerce/ticket">
            <span className="svg-icon menu-icon">
              <SVG src={toAbsoluteUrl("/media/svg/icons/Design/Layers.svg")} />
            </span>
            <span className="menu-text">Ticket</span>
          </NavLink>
        </li>
        {/*end::2 Level*/}


        {/*begin::2 Level*/}
        <li
          className={`menu-item ${getMenuItemActive(
            "/e-commerce/events"
          )}`}
          aria-haspopup="true"
        >
          <NavLink className="menu-link" to="/e-commerce/events">
            <span className="svg-icon menu-icon">
              <SVG src={toAbsoluteUrl("/media/svg/icons/Design/Layers.svg")} />
            </span>
            <span className="menu-text">Events</span>
          </NavLink>
        </li>
        {/*end::2 Level*/}


        {/*begin::2 Level*/}
        <li
          className={`menu-item ${getMenuItemActive(
            "/e-commerce/training"
          )}`}
          aria-haspopup="true"
        >
          <NavLink className="menu-link" to="/e-commerce/training">
            <span className="svg-icon menu-icon">
              <SVG src={toAbsoluteUrl("/media/svg/icons/Design/Layers.svg")} />
            </span>
            <span className="menu-text">Training</span>
          </NavLink>
        </li>
        {/*end::2 Level*/}

        {/*begin::2 Level*/}
        <li
          className={`menu-item ${getMenuItemActive(
            "/e-commerce/job"
          )}`}
          aria-haspopup="true"
        >
          <NavLink className="menu-link" to="/e-commerce/job">
            <span className="svg-icon menu-icon">
              <SVG src={toAbsoluteUrl("/media/svg/icons/Design/Layers.svg")} />
            </span>
            <span className="menu-text">Job</span>
          </NavLink>
        </li>
        {/*end::2 Level*/}

        {/*begin::2 Level*/}
        <li
          className={`menu-item ${getMenuItemActive(
            "/e-commerce/logistic"
          )}`}
          aria-haspopup="true"
        >
          <NavLink className="menu-link" to="/e-commerce/logistic">
            <span className="svg-icon menu-icon">
              <SVG src={toAbsoluteUrl("/media/svg/icons/Design/Layers.svg")} />
            </span>
            <span className="menu-text">Logistic</span>
          </NavLink>
        </li>
        {/*end::2 Level*/}

        {/* users
          vehicle
          parts
          decoration
          workshop - map
          ticket
          event
          training
          job
          logistic */}
      </ul>

      {/* end::Menu Nav */}
    </>
  );
}

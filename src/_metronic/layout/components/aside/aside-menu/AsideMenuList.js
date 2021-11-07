/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from "react";
import { useLocation } from "react-router";
import { NavLink } from "react-router-dom";
import {  checkIsActive } from "../../../../_helpers";
import { MdDashboard, MdOutlineEvent, MdOutlineModelTraining, MdWorkOutline, MdOutlineInventory } from "react-icons/md";
import { FaMapMarkerAlt } from "react-icons/fa";
import { BsCalendarDate } from "react-icons/bs";
import { FiUsers } from "react-icons/fi";
import { AiOutlineCar, AiOutlineAntDesign } from "react-icons/ai";
import { BsNut } from "react-icons/bs";
import { IoTicketOutline } from "react-icons/io5";
import { VscTools } from "react-icons/vsc";


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
          <MdDashboard/>
            </span>
            <span className="menu-text"> Dashboard</span>
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
            <FaMapMarkerAlt/>
            </span>
            <span className="menu-text"> Map</span>
          </NavLink>
        </li>
        {/*end::1 Level*/}

        {/*begin::2 Level*/}
        <li
          className={`menu-item ${getMenuItemActive(
            "/e-commerce/users"
          )}`}
          aria-haspopup="true"
        >
          <NavLink className="menu-link" to="/e-commerce/users">
          <span className="svg-icon menu-icon">
          <FiUsers/>
            </span>
            <span className="menu-text">Users</span>
          </NavLink>
        </li>


        <li
          className={`menu-item ${getMenuItemActive(
            "/e-commerce/bookings"
          )}`}
          aria-haspopup="true"
        >
          <NavLink className="menu-link" to="/e-commerce/bookings">
          <span className="svg-icon menu-icon">
          <BsCalendarDate/>
            </span>
            <span className="menu-text">Bookings</span>
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
          <AiOutlineCar/>
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
          <BsNut/>
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
          <AiOutlineAntDesign/>
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
          <IoTicketOutline/>
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
          <MdOutlineEvent/>
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
          <MdOutlineModelTraining/>
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
          <MdWorkOutline/>
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
          <MdOutlineInventory/>
            </span>
            <span className="menu-text">Logistic</span>
          </NavLink>
        </li>
        {/*end::2 Level*/}

        <li
          className={`menu-item ${getMenuItemActive(
            "/e-commerce/workshop"
          )}`}
          aria-haspopup="true"
        >
          <NavLink className="menu-link" to="/e-commerce/workshop">
          <span className="svg-icon menu-icon">
          <VscTools/>
            </span>
            <span className="menu-text">Workshop</span>
          </NavLink>
        </li>

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
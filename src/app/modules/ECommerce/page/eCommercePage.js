import React, { Suspense } from "react";
import { Redirect, Switch } from "react-router-dom";
import { UserPage } from "./users/user";
import { LayoutSplashScreen,ContentRoute } from "../../../../_metronic/layout";
import { VehiclePage } from "./vehicles/vehicle";
import { PartPage } from "./parts/parts";
import { DecorationPage } from "./decoration/decoration";
import { TicketPage } from "./ticket/ticket";
import { EventPage } from "./event/event";
import { TrainingPage } from "./training/training";
import { JobPage } from "./job/job";
import { LogisticPage } from "./logistic/logistic";
import {BookingPage} from "./booking/booking";
import Maps from "./map/map";
import { WorkshopPage } from "./workshop/workshop";

export default function eCommercePage() {
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
        {
          /* Redirect from eCommerce root URL to /customers */
          <Redirect
            exact={true}
            from="/e-commerce"
            to="/e-commerce/customers"
          />
        }
        <ContentRoute path="/e-commerce/users" component={UserPage} />
        <ContentRoute path="/e-commerce/map" component={Maps} />
        <ContentRoute path="/e-commerce/products" component={VehiclePage} />
        <ContentRoute path="/e-commerce/parts" component={PartPage} />
        <ContentRoute path="/e-commerce/decoration" component={DecorationPage} />
        <ContentRoute path="/e-commerce/ticket" component={TicketPage} />
        <ContentRoute path="/e-commerce/events" component={EventPage} />
        <ContentRoute path="/e-commerce/training" component={TrainingPage} />
        <ContentRoute path="/e-commerce/job" component={JobPage} />
        <ContentRoute path="/e-commerce/logistic" component={LogisticPage} />
        <ContentRoute path="/e-commerce/bookings" component={BookingPage} />
        <ContentRoute path="/e-commerce/workshop" component={WorkshopPage} />
      </Switch>
    </Suspense>
  );
}

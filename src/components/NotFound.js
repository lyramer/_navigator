import React from "react";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";

const NotFound = () => (
    <div className="not-found">
      <div>
        <div className="error-outline">
          <h2 class="error">Oops! Page Not Found!</h2>
          <Link className="btn" to="/">Return Home</Link>
        </div>
      </div>
    </div>
);

export default NotFound;

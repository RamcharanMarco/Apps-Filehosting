import React from "react";
import { useParams, Link } from "react-router-dom";
import "../styles/portfoliohome.scss";

const PortfolioHome = () => {
  const { id } = useParams();
  let portfolioid = "1234";

  return (
    <div className="portfoliohome">
      <h1>portfolio</h1>
      <p>your personal portfolio page</p>
      <Link to={`/console/${id}/portfolio/create`}>create</Link>
      <Link to={`/console/${id}/portfolio/${portfolioid}`}>linkbio</Link>
      <Link to="/">view</Link>
    </div>
  );
};

export default PortfolioHome;

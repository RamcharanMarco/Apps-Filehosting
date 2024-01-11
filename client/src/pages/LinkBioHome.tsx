import React from "react";
import "../styles/linkbiohome.scss";
import { useParams, Link } from "react-router-dom";

const LinkBioHome = () => {
  const { id } = useParams();
  let linkbioid = "1234";
  return (
    <div className="linkbiohome">
      <h1>linkbio page</h1>
      <p>your linkbio page</p>
      <Link to={`/console/${id}/linkbio/create`}>create</Link>
      <Link to={`/console/${id}/linkbio/${linkbioid}`}>portfolio</Link>
      <Link to="/">view</Link>
    </div>
  );
};

export default LinkBioHome;

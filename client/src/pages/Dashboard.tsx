import {useEffect, useState, useCallback} from 'react'
import { useStore } from '../store/store';
import { Link,useParams,useNavigate } from 'react-router-dom';
import '../styles/dashboard.scss'

const Dashboard = () => {

  const {id} = useParams();

  return (
    <div className="dashboard">
      <h1>file-hosting</h1>
        <Link to={`/console/${id}/buckets`}>buckets</Link>
    </div>
  );
};

export default Dashboard;

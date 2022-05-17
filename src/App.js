import { render } from "@testing-library/react";
// import React, { useState } from "react";
import './index.css'
import {useEffect, useState} from "react";
import axios from 'axios'

import RepoDetails from './RepoDetails'

function App(){
  const[username,setUsername] = useState("");
  const[loading,setLoading] = useState(false);
  const [repos,setRepos] = useState([]);
  const [details,setDetails] = useState({});
  const [detailsLoading,setDetailsLoading] = useState(false)

  useEffect(()=>{
    setRepos([]);
    setDetails({});

  },[username]);

  function handleSubmit(e){
    e.preventDefault();
    searchRepos();
  }

  function searchRepos(){
    setLoading(true);
    axios({
      method:"get",
      url:`https://api.github.com/users/${username}/repos `,

    }).then(res =>{
      setLoading(false);
      console.log("response",res.data);
      setRepos(res.data);
    });
  }

  function renderRepo(repo){
    return(
      <div className="row" onClick={() => getDetails(repo.name)} key ={repo.id}> 
      <h2 className="repo-name">
        {repo.name}
      </h2>
      </div>
    )
  };

 function getDetails(repoName){
  setDetailsLoading(true);
  axios({
    method:"get",
    url:`https://api.github.com/repos/${username}/${repoName}`,

  }).then(res =>{
    setDetailsLoading(false);
    setDetails(res.data);
  });

 }




  return (
    <div className="page">
      <div className="landing-page-container">
        <div className="left-side">
          <form className="form">
            <input className="input"
            value={username}
            placeholder="GitHub Username"
            onChange={e => setUsername(e.target.value) }
            />
            <button className="button" onClick={handleSubmit}>{loading ? "searching..." :"search"}  </button>

          </form>
          <div className="results-container">
            {repos.map(renderRepo)}

          </div>

        </div>
        <RepoDetails details={details} loading={detailsLoading}/>

      </div>

    </div>
  )
}
export default App
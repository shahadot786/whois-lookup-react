import axios from "axios";
import React, { useState, useEffect } from "react";

export default function Home() {
  const [searchDomain, setSearchDomain] = useState("");
  const [whoisData, setWhoisData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const API_KEY = "JSW8crw0RChBjSO0u5RIEg==D9WSHGeECU1pwQyk";
  const BASE_URL = "https://api.api-ninjas.com/v1/whois?domain=" + searchDomain;
  const HEADERS = {
    headers: { "X-Api-Key": API_KEY, "Content-Type": "application/json" },
  };

  const getWhoisData = async () => {
    if (searchDomain != "") {
      try {
        setIsLoading(true);
        const response = await axios.get(BASE_URL, HEADERS);
        setWhoisData(response?.data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.log(error);
      }
    } else {
      setError("Input field is required!!");
    }
  };

  console.log(whoisData);

  return (
    <div style={{ justifyContent: "center", alignItems: "center" }}>
      <div style={{ padding: "40px" }}>
        <h1>Whois Lookup</h1>
        <form>
          <input
            required
            type="text"
            value={searchDomain}
            onChange={(e) => setSearchDomain(e.target.value)}
            placeholder="search domain..."
            style={{
              backgroundColor: "#fff",
              color: "black",
              padding: "10px",
              borderRadius: "10px",
            }}
          />
        </form>
        <p>{error}</p>
        <button
          onClick={() => getWhoisData()}
          style={{
            marginTop: "10px",
            padding: "10px 20px",
            borderRadius: "10px",
          }}
        >
          Search
        </button>
      </div>
      <div>
        <p>
          Domain Name: <span>{whoisData?.domain_name}</span>
        </p>
        <p>
          Registrar Name: <span>{whoisData?.registrar}</span>
        </p>
        <p>
          Whois server Name: <span>{whoisData?.whois_server}</span>
        </p>
        {whoisData?.name_servers && (
          <p>
            Name servers Name:
            {whoisData?.name_servers.map((item, index) => {
              return <p key={index}>{item}</p>;
            })}
          </p>
        )}
        {whoisData?.emails && (
          <p>
            Emails:
            {whoisData?.emails.map((item, index) => {
              return <p key={index}>{item}</p>;
            })}
          </p>
        )}
        <p>
          Name: <span>{whoisData?.name}</span>
        </p>
        <p>
          City: <span>{whoisData?.city}</span>
        </p>
        <p>
          Address: <span>{whoisData?.address}</span>
        </p>
        <p>
          Country: <span>{whoisData?.country}</span>
        </p>
      </div>
    </div>
  );
}

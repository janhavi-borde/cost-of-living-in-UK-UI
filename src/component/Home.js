import React, { useState, useEffect } from "react";
import { Card, CardGroup } from "react-bootstrap";
import "../asset/home.css";
import img from "../asset/image/top-icon.svg";
import person from "../asset/image/man.png";
import family from "../asset/image/family.png";
import budget from "../asset/image/budget.png";
import house from "../asset/image/house.png";
import rest from "../asset/image/restaurants.svg";
import mark from "../asset/image/grocerystore.svg";
import Select from "react-select";
import {
  getCities,
  getCitiesByCountry,
  getPriciesByCategory,
  getCityByname,
} from "../server/CityService";
import Navbar from "./Navbar";
import axios from "axios";
export default function Home() {
  let curren = "";
 
  const [cities, setCities] = useState([]);
  const [countries, setcountries] = useState([]);
  const [city, setCity] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [markets, setMarkets] = useState([]);
  const [showResults, setShowResults] = useState(false);
  // const [ratesList, setRatesList] = useState([]);
  // const [base, setBase] = useState(curr);
  const [currencies, setCurrencies] = useState([]);
  const [currsObj, setCurrsObj] = useState({});
  const [indexno,setIndexno]=useState(-1)
const [selectedCurr, setSelectedCurr] = useState({
    label: "",
    value: ""
  });

  const onClick = () => {
    setShowResults(true);
  };
  useEffect(() => {
    loadCountries();
   
  }, []);
  const [data, setData] = useState({
    city: "",
    country: "",
  });

  const handleChange = (event, property) => {
    setData({ ...data, [property]: event.target.value });
    if (event.target.name == "country") {
      getCitiesByCountry(event.target.value).then((res) => {
        setCity(res);
      });
    }
  };

  const loadCountries = async () => {
    await getCities().then((resp) => {
      setCities(resp);
      const countriess = new Set();
      const newCountries = [];
      resp.forEach((item) => {
        countriess.add(item.country);
      });
      countriess.forEach((item) => {
        newCountries.push(item);
      });
      setcountries(newCountries);
    });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    //fetch(`/api/city_prices/${data.city}/?name=`)

    getCityByname(data.city).then((response) => {
      const temp = {
        label : response.currency,
        value : response.currency
      }
      setSelectedCurr(temp);
      curren = response.currency;
     
      getCurrencies(curren);
     
    });
    getPriciesByCategory(data.city, "Restaurants").then((resp) => {
      setRestaurants(resp);
    });
    getPriciesByCategory(data.city, "Markets").then((resp) => {
      setMarkets(resp);
    });
  };

  // const getRates = async (base) => {
  //   const res = await axios.get(
  //     ` https://api.exchangerate.host/latest?base=${base}`
  //   );
  //   const { rates } = res.data;

  //   const ratesTemp = [];
  //   for (const [symbol, rate] of Object.entries(rates)) {
  //     ratesTemp.push({ symbol, rate });
  //   }
  //   setRatesList(ratesTemp);
  // };
  const changeHandler = (e) => {
    setSelectedCurr(e);
  };

  const getCurrencies = (curren) => {
    var requestURL = `https://api.exchangerate.host/latest?base=${curren}`;
    var request = new XMLHttpRequest();
    request.open("GET", requestURL);
    request.responseType = "json";
    request.send();

    request.onload = function () {
      var response = request.response;
      //console.log("response", response);
    
      var index = -1;
      setCurrsObj(response.rates);
      const currs = Object.keys(response.rates).reduce((curr, key) => {
        index++;
        if (key == curren) 
        {
          setIndexno(index)
        }
       
        return [
          ...curr,
          {
            label: key,
            value: key,
          },
        ];
      }, []);
      console.log("curr", currs);
      setCurrencies(currs);
      //console.log(currencies);
    };
  };

  const getCost = (costInUsd) => {
    // console.log("currsObj", currsObj);
    // console.log(costInUsd, selectedCurr);
    const cost = costInUsd * currsObj[selectedCurr?.value];
    return (Math.round(cost * 100) / 100).toFixed(2);
    // return "";
  };
  return (
    <>
      <Navbar />
      <div className=" container-fluid cont px-1 px-md-5 px-lg-1 px-xl-5 py-5 mx-auto my-auto">
        <div className=" card rounded card0 border-1 cont ">
          <div className="container rounded border mt-5">
            <div className="my-auto row d-flex  ">
              <div className="col-lg-7 border-line my-auto">
                <div className="card1 pb-5 justify-content-center">
                  <div className="row px-3 justify-content-center mt-5 mb-5 ">
                    <img src={img} alt="not found" className="image" />
                  </div>
                </div>
              </div>
              <div className="col-lg-5">
                <div className="card2 card border-0 px-4 py-5">
                  <div className="row mb-4 px-3">
                    <center>
                      <h2>
                        <b>I want to live in</b>
                      </h2>
                    </center>
                  </div>

                  <form onSubmit={handleFormSubmit}>
                    <div className="row px-1">
                      <label className="mb-1">
                        <h6 className="mb-0 text-sm">Country</h6>
                      </label>
                      <input
                        className="mb-4"
                        id="country"
                        name="country"
                        placeholder="choose country "
                        type="text"
                        list="data"
                        value={data.country}
                        onChange={(e) => handleChange(e, "country")}
                      />
                      <datalist id="data">
                        {countries.map((item) => (
                          <option>{item}</option>
                        ))}
                      </datalist>
                    </div>
                    <div className="row px-1">
                      <label className="mb-1">
                        <h6 className="mb-0 text-sm">City</h6>
                      </label>
                      <input
                        id="city"
                        name="city"
                        placeholder="select city"
                        type="text"
                        list="data1"
                        value={data.city}
                        onChange={(e) => handleChange(e, "city")}
                      />
                      <datalist id="data1">
                        {city.map((item) => (
                          <option>{item.city}</option>
                        ))}
                      </datalist>
                    </div>
                    <div className="row mb-3 px-3 py-5">
                      <button
                        type="submit"
                        className="btn btn-blue text-center"
                        onClick={onClick}
                      >
                        calculate
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>

          <div className="container border mt-3 rounded">
            <div className="row mt-3">
              <div className="col-md-3 col-sm-4 mb-3">
                <div className="row">
                  <div className="col-lg-12 col-md-12 col-sm-3 col-3">
                    <div className="card mobCard p-5">
                      <img src={person} alt="Photo of sunset" />
                    </div>
                  </div>
                  <div className="col-lg-12 col-md-9 col-sm-9 col-9">
                    <p className="card-text text-center">
                      A single person estimated monthly costs are 312.00$
                      (25,662.11₹) without rent.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-3 col-sm-4 mb-3">
                <div className="row">
                  <div className="col-lg-12 col-md-12 col-sm-3 col-3 ">
                    <div className="card mobCard p-5">
                      <img
                        //class="mx-5 d-block"
                        src={family}
                        alt="Photo of sunset"
                      />
                    </div>
                  </div>
                  <div className="col-lg-12 col-md-9 col-sm-9 col-9 ">
                    <p className="card-text text-center">
                      Family of four estimated monthly costs are 1,097.98$
                      (90,309.55₹) without rent.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-3 col-sm-4 mb-3">
                <div className="row">
                  <div className="col-lg-12 col-md-12 col-sm-3 col-3">
                    <div className="card mobCard p-5">
                      <img src={house} alt="Photo of sunset" />
                    </div>
                  </div>
                  <div className="col-lg-12 col-md-9 col-sm-9 col-9">
                    <p className="card-text text-center">
                      Rent in India is, on average, 88.48% lower than in United
                      States.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-3 col-sm-4 mb-3">
                <div className="row">
                  <div className="col-lg-12 col-md-12 col-sm-3 col-3">
                    <div className="card mobCard p-5">
                      <img src={budget} alt="Photo of sunset" />
                    </div>
                  </div>
                  <div className="col-lg-12 col-md-9 col-sm-9 col-9">
                    <p className="card-text text-center">
                      Cost of living in India is, on average, 68.47% lower than
                      in United States.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {showResults ? (
            <div>
              {/* <div>
                <select
                  className="custom-select"
                  value={base}
                  onChange={(e) => {
                    const value = e.target.value;
                    setBase(value);
                    getRates(value);
                  }}
                >
                  {ratesList.map((d) => (
                    <option value={d.symbol} key={d.symbol}>
                      {d.symbol}
                    </option>
                  ))}
                </select>
              </div> */}
              <div
                className="currency"
                style={{
                  padding: "50px 20px",
                  maxWidth: "300px",
                  display: "flex",
                  alignItems: "center",
                  overflow:"visible",
                  height: "65px",
                  zIndex:"999999 !important"

                }}
              >
                {currencies.length !== 0 ? (
                  <>
                    Currency :
                    <Select
                      options={currencies}
                      menuPosition=""
                      defaultValue={currencies[indexno]}
                      onChange={changeHandler}
                    />
                  </>
                ) : (
                  ""
                )}
              </div>
              <div className="container rounded border mt-3 mb-2">
                <div className="section_our_solution">
                  <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12">
                      <div className="our_solution_category">
                        <div className="solution_cards_box">
                          <div className="solution_card">
                            <div className="hover_color_bubble"></div>
                            <div className="so_top_icon">
                              <img src={rest} />
                            </div>

                            <div className="solu_title">
                              <h3>Restaurants</h3>
                            </div>

                            <div className="solu_description">
                              <p>
                                It is a long established fact that a reader will
                                be distracted by the readable content of a page
                                when looking at its layout.
                              </p>

                              <div className="table-responsive">
                                <table className="table">
                                  <thead>
                                    <tr>
                                      <th scope="col" className="col-4">
                                        item
                                      </th>
                                      <th scope="col" className="col-4">
                                        Money
                                      </th>
                                      <th scope="col" className="col-4">
                                        Range
                                      </th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {restaurants.map((item) => {
                                      return (
                                        <tr>
                                          <td className="col-4">
                                            {item.imp.name}
                                          </td>
                                          <td className="col-4">
                                            <div>
                                            {getCost(item.average_price)} {selectedCurr.label}
                                            </div>
                                          </td>
                                          <td className="col-4">
                                            {getCost(item.lowest_price)}-
                                            {getCost(item.highest_price)} {selectedCurr.label}
                                          </td>
                                        </tr>
                                      );
                                    })}
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="container rounded border mt-3 mb-2">
                <div className="section_our_solution">
                  <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12">
                      <div className="our_solution_category">
                        <div className="solution_cards_box">
                          <div className="solution_card">
                            <div className="hover_color_bubble"></div>

                            <div className="so_top_icon">
                              {/* <svg
                                id="Layer_1"
                                enable-background="new 0 0 512 512"
                                height="50"
                                viewBox="0 0 512 512"
                                width="40" 
                                xmlns="http://www.w3.org/2000/svg"
                              > */}
                              <img src={mark} />
                              {/* </svg> */}
                            </div>

                            <div className="solu_title">
                              <h3>Markets</h3>
                            </div>

                            <div className="solu_description">
                              <p>
                                It is a long established fact that a reader will
                                be distracted by the readable content of a page
                                when looking at its layout.
                              </p>

                              <div className="table-responsive">
                                <table className="table">
                                  <thead>
                                    <tr>
                                      <th scope="col" className="col-4">
                                        {" "}
                                        item{" "}
                                      </th>
                                      <th scope="col" className="col-4">
                                        Money
                                      </th>
                                      <th scope="col" className="col-4">
                                        Range
                                      </th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {markets.map((item) => {
                                      return (
                                        <tr>
                                          <td className="col-4">
                                            {item.imp.name}
                                          </td>
                                          <td className="col-4">
                                          {getCost(item.average_price)} {selectedCurr.label}
                                          </td>
                                          <td className="col-4">
                                            {getCost(item.lowest_price)}-
                                            {getCost(item.highest_price)} {selectedCurr.label}
                                          </td>
                                        </tr>
                                      );
                                    })}
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </div>
        <div></div>
      </div>
    </>
  );
}

import React, { useState, useEffect } from "react";

import CompanyCard from "../components/CompanyCard";
import Notifications from "../components/Modals/Notifications";
import Details from "../components/Details";
import { Button, Col, Form, FormGroup, Input, Label, Row } from "reactstrap";
import { useParams } from "react-router-dom";
import {
  getMachineDetails,
  getMetricsByMachine,
  
} from "../store/actions/dashboardActions";
import {machineSalesPageGraph} from '../store/actions/machineActions'
import { useDispatch, useSelector } from "react-redux";
import ReactApexChart from "react-apexcharts";
import { getCombinedData } from "../helpers/getCombinedData";
import Barcode from "../assets/images/dawaam/barcode.png";
import SerialNO from "../assets/images/dawaam/binary-code 1.png";
import MachineType from "../assets/images/dawaam/machine -type.png";
import MotorType from "../assets/images/dawaam/motor-type.png";
import Nozzles from "../assets/images/dawaam/Nozzles.png";
import ITSystem from "../assets/images/dawaam/ITSystem.png";
import calendarsvgrepo from "../assets/images/dawaam/calendar-svgrepo-com 1.png";
import batteryIcon from "../assets/images/dawaam/battery.png";
import Replenished from "../assets/images/dawaam/Replenished.png";
import StockLeft from "../assets/images/dawaam/StockLeft.png";
import Tank1 from "../assets/images/dawaam/Tank1.png";
import Tank2 from "../assets/images/dawaam/Tank2.png";
import Tank3 from "../assets/images/dawaam/Tank3.png";
import Tank4 from "../assets/images/dawaam/Tank4.png";
import systemUpdate from "../assets/images/dawaam/systemUpdate.png";
import machineCircle from "../assets/images/dawaam/machineCircle.png";
import moment from "moment";

import tankGroup from "../assets/images/dawaam/tankGroup.png";
import technicalSupport from "../assets/images/dawaam/technical-support.png";
import bucket from "../assets/images/dawaam/bucket.png";
import toolBox from "../assets/images/dawaam/tool-box.png";
import clock from "../assets/images/dawaam/clock.png";
import numberOrder from "../assets/images/dawaam/numberOrder.png";
import typicalOrder from "../assets/images/dawaam/typicalOrder.png";
import singleUser from "../assets/images/dawaam/singleUser.png";
import allUser from "../assets/images/dawaam/allUser.png";
import users188 from "../assets/images/dawaam/users188.png";
// import { useSearchParams } from 'react-router-dom';
import Group292 from "../assets/images/dawaam/Group292.svg";
import Group258 from "../assets/images/dawaam/Group258.svg";
import Group256 from "../assets/images/dawaam/Group256.svg";
import Group255 from "../assets/images/dawaam/Group255.svg";
import { Card } from "reactstrap";
import BarChart from "../helpers/Charts/BarChart";
import { connect } from "react-redux";

function MachineDetails({ stock_level, graph_data, sales_per, sales_graphData }) {
  const [notiModal, setNotiModal] = useState(false);
  const [tab, setTab] = useState("4");
  const dispatch = useDispatch();
  const [series1, setSeries1] = useState([60, 40]);
  const [pieEnabled, setEnabled] = useState("Revenue");
  const { single_machine_metrics } = useSelector((state) => state.metrics);

  const { user } = useSelector((state) => state.auth);
  // const { stock_level, machine_details, sales_level, graph_data } = useSelector(
  //   (state) => state.machine
  // );
  // console.log(stock_level, machine_details, graph_data, "my stocks eeee");
  const [barChartTab, setBarChartTab] = useState("1");

  const Types = { LastfourMonth: "last_four_months", LastWeek: "last_week" };

  const [allsales, setAllSales] = useState([]);
  const [sumOfTotal, setSumOfTotal] = useState({totalWeek: {revenue: 0, transaction: 0}, totalMonths: {revenue: 0, transaction: 0}});

  const [options3, setOptions3] = useState({
    colors: ["#D5CFE1", "#09814A"],
    chart: {
      type: "bar",
      height: 350,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "55%",
        endingShape: "rounded",
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },
    states: {
      hover: {
        filter: {
          type: "darken",
          value: 0.5,
          // type: 'none',
        },
      },
    },
    xaxis: {
      categories: [
        // "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        // "Jul",
        // "Aug",
        // "Sep",
        // "Oct",
      ],
    },
    yaxis: {
      title: {
        // text: '$ (thousands)',
      },
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      y: {
        // formatter: function (val) {
        // 	return '$ ' + val + ' thousands';
        // },
      },
    },
  });
  const [series3, setSeries3] = useState([
    {
      name: "Transaction",
      data: [44, 55, 57, 56],
    },
    {
      name: "Revenue",
      data: [76, 85, 101, 98],
    },
  ]);

  const [options2, setOptions2] = useState({
    colors: ["#D5CFE1", "#09814A"],
    chart: {
      type: "bar",
      height: 350,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "55%",
        endingShape: "rounded",
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },
    states: {
      hover: {
        filter: {
          type: "darken",
          value: 0.5,
          // type: 'none',
        },
      },
    },
    xaxis: {
      categories: ["Week1", "Week2", "Week3", "Week4"],
    },
    yaxis: {
      title: {
        // text: '$ (thousands)',
      },
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      y: {
        // formatter: function (val) {
        // 	return '$ ' + val + ' thousands';
        // },
      },
    },
  });
  const [series2, setSeries2] = useState([
    {
      name: "Transaction",
      data: [44, 55, 57, 56],
    },
    {
      name: "Revenue",
      data: [76, 85, 101, 98],
    },
  ]);
  const [salesPercentages, setSalesPercentages] = useState({
    data: [],
    label: [],
  });

  const [pieDates, setPieDate] = useState({
    start_date: moment().format("YYYY-MM-DD"),
    end_date: moment().format("YYYY-MM-DD"),
  });

  const [pieGraph, setPieGraph] = useState({});

  const [optionsBar1, setOptionsBar1] = useState({
    colors: ["#D5CFE1", "#09814A"],
    chart: {
      type: "bar",
      height: 350,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "55%",
        endingShape: "rounded",
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },
    states: {
      hover: {
        filter: {
          type: "darken",
          value: 0.5,
          // type: 'none',
        },
      },
    },
    xaxis: {
      categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    },
    yaxis: {
      title: {
        // text: '$ (thousands)',
      },
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      y: {
        // formatter: function (val) {
        // 	return '$ ' + val + ' thousands';
        // },
      },
    },
  });
  const [seriesBar1, setSeriesBar1] = useState([
    {
      name: "Transaction",
      data: [0, 3, 4, 4, 5, 5],
    },
    {
      name: "Revenue",
      data: [0, 3, 3, 3, 3, 3],
    },
  ]);

  const [options1, setPieChartData] = useState({
    colors: ["#D5CFE1", "#09814A"],
    chart: {
      id: "mychart",
      width: 380,
      type: "pie",
    },
    labels: ["Brand 5", "Brand 6"],
    states: {
      hover: {
        filter: {
          type: "darken",
          value: 0.5,
          // type: 'none',
        },
      },
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  });

  const params = useParams();
  // console.log(window.location.search)
  // const flag = window.location.search.split('=')[1]
  // console.log(flag)
  const flag = false; //all sections

  const notiToggle = () => {
    setNotiModal(!notiModal);
    // console.log("asd", props.history);
  };
  useEffect(() => {
    // console.log(params.id, "hello one");
    dispatch(
      getMachineDetails({
        company_code: user?.company_code,
        machine_id: params?.id,
      })
    );

    dispatch(
      machineSalesPageGraph({
        company_code: user?.company_code,
        machine_id: params?.id,
        ...pieDates
        // "start_date": "2022-06-01",
        // "end_date": "2022-08-01"
      })
    );
  }, []);

  const handleChange = async (e) => {
    setPieDate((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));

    dispatch(
      machineSalesPageGraph({
        company_code: user?.company_code,
        machine_id: params?.id,
        ...pieDates
        // "start_date": "2022-06-01",
        // "end_date": "2022-08-01"
      })
    );

  };

  useEffect(() => {
    const { getLast, getFourMonth } = graph_data;
    /** SET LABELS */
    setOptionsBar1({
      ...optionsBar1,
      xaxis: { categories: getLast?.revenue.label || [""] },
    });
    setOptions3({
      ...options3,
      xaxis: { categories: getFourMonth?.revenue.label || [""] },
    });

    // console.log(getLast);
    setSeriesBar1([
      {
        name: "Transaction",
        data: getLast == undefined ? [""] : getLast.transaction?.data,
      },
      {
        name: "Revenue",
        data: getLast == undefined ? [""] : getLast?.revenue?.data,
      },
    ]);
    setSeries3([
      {
        name: "Transaction",
        data: getFourMonth == undefined ? [""] : getFourMonth.transaction?.data,
      },
      {
        name: "Revenue",
        data: getFourMonth == undefined ? [""] : getFourMonth?.revenue?.data,
      },
    ]);

    const salesGraph = {
      label: [],
      data: [],
    };
    for (const [key, value] of Object.entries(
      sales_per?.percent_sales_by_brand || {}
    )) {
      salesGraph.label.push(key);
      salesGraph.data.push(value);
      // console.log(`${key}: ${value}`);
    }
    setSalesPercentages({ ...salesGraph });
    // setSumOfTotal({totalWeek: {revenue: sumOfArray(getLast?.revenue?.data || []), transaction: sumOfArray(getLast?.transaction?.data || [] )},
    // totalMonths: {revenue: sumOfArray(getFourMonth?.revenue?.data || []), transaction: sumOfArray(getFourMonth?.transaction?.data)}
    // })


    // console.log(sumOfTotal);

    setPieChartData({ ...options1, labels: salesGraph.label || [""] });
    setSeries1(salesGraph?.data);

    if(!isEmpty(sales_graphData)) {
      // console.log(sales_graphData);
      const graph = getgraphData(sales_graphData);
      setPieGraph(graph);
      // if(pieEnabled =='Revenue') {
      setPieChartData({ ...options1, labels: pieEnabled== 'Revenue' ? graph.revenue.label : graph.transaction.label || [""] });
      setSeries1(pieEnabled=='Revenue' ? graph?.revenue.data : graph?.transaction.data || []);
      // }
      // console.log(graph);
    }
    // console.log(salesPercentages);
  }, [graph_data, sales_graphData]);


  const getgraphData = (data) => {
    // console.log(data);
    // return;
  
    const revenue = {
      label: [],
      data: [],
    };
    const transaction = {
      label: [],
      data: [],
    };
    const volume = {
      label: [],
      data: [],
    };
    for (const [key, value] of Object.entries(data.revenue)) {
      revenue.label.push(key);
      revenue.data.push(value);
    }

    for (const [key, value] of Object.entries(data.transactions)) {
      transaction.label.push(key);
      transaction.data.push(value);
    }

    for (const [key, value] of Object.entries(data.volume)) {
      transaction.label.push(key);
      transaction.data.push(value);
    }
    
    return {revenue, transaction, volume, total_revenue: data.total_revenue, 
      total_transactions: data.total_transactions, total_volume:  data.total_volume}
      // console.log(sales);
    // }
  }

  useEffect(() => {
    // console.log(pieGraph);
    if(!isEmpty(pieGraph)) {
    // console.log(pieEnabled);
    setPieChartData({ ...options1, labels: pieEnabled== 'Revenue' ? pieGraph.revenue.label : pieGraph.transaction.label || [""] });
    setSeries1(pieEnabled=='Revenue' ? pieGraph?.revenue.data : pieGraph?.transaction.data || []);
    }
  }, [pieEnabled])

  const isEmpty = (obj) => {
    return Object.keys(obj).length === 0;
  }

  // const sumOfArray = (data) => {
  //   // console.log(data);
  //   return !data ? [] : data.reduce((a,b)=> a+b, 0);
  // }
  //  console.log(percent_sales_by_brand);
  // const [pieDates, setPieDate] = useState({
  //   start_date: moment().format("YYYY-MM-DD"),
  //   end_date: moment().format("YYYY-MM-DD"),
  // });

  // const handleChange = async (e) => {
  //   console.log(e.target.value);

  //   await setPieDate((prevState) => ({
  //     ...prevState,
  //     [e.target.name]: e.target.value,
  //   }));
  // };

  // useEffect(() => {
  //   // getSales();
  //   // console.log(getSales(Types.LastWeek), "Hello from the other side");
  // });

  // const getSales = (type) => {
  //   console.log(sales_level);
  //   const getSalesData = sales_level[`${type}`];
  //   console.log(sales_level, "yayyayaayhelloo");
  //   return;
  //   const graphData = {
  //     revenue: { label: [], data: [] },
  //     transaction: { label: [], data: [] },
  //   };
  //   const getRevenue = getSalesData.Revenue.map((v, i) => {
  //     graphData.revenue.label.push(i);
  //     graphData.revenue.data.push(v);
  //   });

  //   const getTransaction = getSalesData.Transaction.map((v, i) => {
  //     graphData.transaction.label.push(i);
  //     graphData.transaction.data.push(v);
  //   });

  //   return graphData;
  // };

  // const getStocksLevelPage = () => {
  //   const mystocks = machine_details.machine_page.stock_levels_page;
  //   return mystocks;
  // };

  // useEffect(() => {
  //   let tempArr = getCombinedData(single_machine_metrics, pieEnabled);
  //   console.log(tempArr);
  //   // // tempArr.map(temp => {
  //   setTimeout(() => {
  //     setSeries1(tempArr.map((item) => item.volume));
  //     setPieChartData({
  //       ...options1,
  //       labels: tempArr.map((item) => item.brand),
  //     });
  //   }, 1500);
  // }, [single_machine_metrics, pieEnabled]);
  // useEffect(() => {
  //   if (flag) {
  //     setTab("3")
  //   }
  // }, [flag])
  // BarChart DATA

  // console.log("=>", params?.id);
  return (
    <div className="main-content">
      <div className="page-wrapper">
        <div className="container py-5">
          <div className="row justify-content-center">
            <div className="col-lg-10 col-md-12">
              <div className="flex-column align-items-start ">
                <div
                  className="nav flex-row justify-content-center nav-pills m-md-3 mt-3"
                  id="v-pills-tab"
                  role="tablist"
                  aria-orientation="vertical"
                >
                  {!flag && (
                    <Button
                      className={`nav-link ${tab == "1" ? "btn-active " : ""}`}
                      onClick={() => setTab("1")}
                    >
                      Machine
                    </Button>
                  )}
                  {!flag && (
                    <Button
                      className={`nav-link ${tab == "2" ? "btn-active" : ""}`}
                      onClick={() => setTab("2")}
                    >
                      Stock Levels
                    </Button>
                  )}
                  {/* <Button
                    className={`nav-link ${tab == "3" ? "btn-active" : ""}`}
                    onClick={() => setTab("3")}
                  >
                    Product <br />
                    Dispensed
                  </Button> */}
                  <Button
                    className={`nav-link ${tab == "4" ? "btn-active" : ""}`}
                    onClick={() => setTab("4")}
                  >
                    Sales & Usage
                  </Button>
                  {!flag && (
                    <Button
                      className={`nav-link ${tab == "5" ? "btn-active" : ""}`}
                      onClick={() => setTab("5")}
                    >
                      Tank <br />
                      Management
                    </Button>
                  )}
                  {/* {!flag && <Button
                    className={`nav-link ${tab == "6" ? "btn-active" : ""}`}
                    onClick={() => setTab("6")}
                  >
                    Warnings
                  </Button>} */}
                  {/* {!flag && <Button
                    className={`nav-link ${tab == "7" ? "btn-active" : ""}`}
                    onClick={() => setTab("7")}
                  >
                    Maintenance
                  </Button>} */}
                  {!flag && (
                    <Button
                      className={`nav-link ${tab == "8" ? "btn-active" : ""}`}
                      onClick={() => setTab("8")}
                    >
                      Bottle Details
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="row justify-content-end">
            <div className="row pt-4">
              <div className="col-md-4"></div>
              <div className="col-md-4"></div>
              <div className="col-md-4">
                <CompanyCard />
              </div>
            </div>
          </div>
          <div className="tab-content" id="v-pills-tabContent">
            {tab == "1" && (
              <div
                className="tab-pane fade show active"
                id="machine"
                role="tabpanel"
                aria-labelledby="machine-tab"
              >
                <div className="row justify-content-center">
                  <div className="col-lg-10 pt-5">
                    <div className="secondcard">
                      <div id="secondcard" className="card-body">
                        <Details />
                        <div
                          style={{
                            border: "1px solid #FFFFFF",
                            boxShadow: "30px 70px 120px rgba(27, 49, 66, 0.13)",
                            borderRadius: "15px",
                            marginTop: "2rem",
                            overflowY: "scroll",
                            maxHeight: "29rem",
                          }}
                        >
                          <div
                            style={{
                              background: "#FFFFFF",
                              border: "1px solid #E5E5E5",
                              borderRadius: "16px",
                              margin: "1rem",
                            }}
                          >
                            <div className="row pt-5 ">
                              <div className="col-lg-10 offset-lg-1">
                                <div className="row">
                                  <div className="col-md-12 ">
                                    <div className="dateDeployed  px-3 px-md-0">
                                      <ul
                                        className="d-flex p-0"
                                        style={{
                                          alignItems: "center",
                                        }}
                                      >
                                        <li
                                          className="px-2"
                                          style={{
                                            listStyle: "none",
                                          }}
                                        >
                                          <img src={calendarsvgrepo} />
                                        </li>
                                        <li
                                          className="pr-2"
                                          style={{
                                            listStyle: "none",
                                          }}
                                        >
                                          <strong>Date Deployed:</strong>
                                        </li>
                                        <li
                                          className="pr-3"
                                          style={{
                                            listStyle: "none",
                                          }}
                                        >
                                          <span>May 11, 2022 11:12 am</span>
                                        </li>
                                      </ul>
                                    </div>
                                    <div className="dateDeployed  px-3 px-md-0">
                                      <ul
                                        className="d-flex "
                                        style={{
                                          alignItems: "center",
                                        }}
                                      >
                                        <li
                                          className="pl-2 pr-3"
                                          style={{
                                            listStyle: "none",
                                          }}
                                        >
                                          <img src={batteryIcon} />
                                        </li>
                                        <li
                                          className="pr-2"
                                          style={{
                                            listStyle: "none",
                                          }}
                                        >
                                          <strong>Status:</strong>
                                        </li>
                                        <li
                                          className="pr-3"
                                          style={{
                                            listStyle: "none",
                                          }}
                                        >
                                          <span
                                            style={{
                                              fontFamily: "Poppins",
                                              fontStyle: "normal",
                                              fontWeight: "500",
                                              fontSize: "14px",
                                              lineHeight: "21px",
                                              alignItems: "center",
                                              textAlign: "center",

                                              color: "#09B39D",
                                            }}
                                          >
                                            <b>Active</b>
                                          </span>
                                        </li>
                                      </ul>
                                    </div>
                                  </div>
                                </div>
                                <div className="row px-2 g-3">
                                  <div className="col-md-3 col-sm-6 mb-md-0 mb-3 ">
                                    <div
                                      className="card px-1 px-md-0"
                                      style={{
                                        borderRadius: "0",
                                      }}
                                    >
                                      <div
                                        className=""
                                        style={{
                                          background: "#CFF2EE",
                                          boxShadow:
                                            "0px 4px 8px rgba(0, 0, 0, 0.12)",
                                          paddingTop: "10px",
                                          paddingBottom: "5px",
                                        }}
                                      >
                                        <img
                                          className="card-img-top"
                                          src={Barcode}
                                          alt="Card image cap"
                                          style={{
                                            width: "50%",
                                            margin: "auto",
                                          }}
                                        />
                                      </div>
                                      <div
                                        className=""
                                        style={{
                                          background: "#CFF2EE",
                                          boxShadow:
                                            "0px 4px 8px rgba(0, 0, 0, 0.12)",
                                        }}
                                      >
                                        <h5
                                          className="card-title"
                                          style={{
                                            fontFamily: "Open Sans",
                                            fontStyle: "normal",
                                            fontWeight: "600",
                                            fontSize: "16px",
                                            lineHeight: "24px",
                                            alignItems: "center",
                                            textAlign: "center",
                                            color: "#1d2023",
                                          }}
                                        >
                                          Barcode
                                        </h5>
                                      </div>
                                      <div
                                        className="card-body"
                                        style={{
                                          padding: "30px 0px",
                                          margin: "auto",
                                        }}
                                      >
                                        <p
                                          className="card-text"
                                          style={{
                                            fontFamily: "Open Sans",
                                            fontStyle: "normal",
                                            fontWeight: "400",
                                            fontSize: "14px",
                                            lineHeight: "21px",
                                            display: "flex",
                                            alignItems: "center",
                                            textAlign: "center",

                                            color: "#1d2023",
                                          }}
                                        >
                                          barcode here
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-md-3 col-sm-6 mb-md-0 mb-3">
                                    <div
                                      className="card px-1 px-md-0"
                                      style={{
                                        borderRadius: "0",
                                      }}
                                    >
                                      <div
                                        className=""
                                        style={{
                                          background: "#CFF2EE",
                                          boxShadow:
                                            "0px 4px 8px rgba(0, 0, 0, 0.12)",
                                          paddingTop: "10px",
                                          paddingBottom: "5px",
                                        }}
                                      >
                                        <img
                                          className="card-img-top"
                                          src={SerialNO}
                                          alt="Card image cap"
                                          style={{
                                            width: "50%",
                                            margin: "auto",
                                          }}
                                        />
                                      </div>
                                      <div
                                        className=""
                                        style={{
                                          background: "#CFF2EE",
                                          boxShadow:
                                            "0px 4px 8px rgba(0, 0, 0, 0.12)",
                                        }}
                                      >
                                        <h5
                                          className="card-title"
                                          style={{
                                            fontFamily: "Open Sans",
                                            fontStyle: "normal",
                                            fontWeight: "600",
                                            fontSize: "16px",
                                            lineHeight: "24px",
                                            alignItems: "center",
                                            textAlign: "center",
                                            color: "#1d2023",
                                          }}
                                        >
                                          Serial NO#
                                        </h5>
                                      </div>
                                      <div
                                        className="card-body"
                                        style={{
                                          padding: "30px 0px",
                                          margin: "auto",
                                        }}
                                      >
                                        <p
                                          className="card-text"
                                          style={{
                                            fontFamily: "Open Sans",
                                            fontStyle: "normal",
                                            fontWeight: "400",
                                            fontSize: "14px",
                                            lineHeight: "21px",
                                            display: "flex",
                                            alignItems: "center",
                                            textAlign: "center",

                                            color: "#1d2023 ",
                                          }}
                                        >
                                          serial number here
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-md-3 col-sm-6 mb-md-0 mb-3">
                                    <div
                                      className="card px-1 px-md-0"
                                      style={{
                                        borderRadius: "0",
                                      }}
                                    >
                                      <div
                                        className=""
                                        style={{
                                          background: "#CFF2EE",
                                          boxShadow:
                                            "0px 4px 8px rgba(0, 0, 0, 0.12)",
                                          paddingTop: "5px",
                                        }}
                                      >
                                        <img
                                          className="card-img-top"
                                          src={MachineType}
                                          alt="Card image cap"
                                          style={{
                                            width: "35%",
                                            margin: "auto",
                                          }}
                                        />
                                      </div>
                                      <div
                                        className=""
                                        style={{
                                          background: "#CFF2EE",
                                          boxShadow:
                                            "0px 4px 8px rgba(0, 0, 0, 0.12)",
                                          paddingTop: "5px",
                                        }}
                                      >
                                        <h5
                                          className="card-title"
                                          style={{
                                            fontFamily: "Open Sans",
                                            fontStyle: "normal",
                                            fontWeight: "600",
                                            fontSize: "16px",
                                            lineHeight: "24px",
                                            alignItems: "center",
                                            textAlign: "center",
                                            color: "#1d2023",
                                          }}
                                        >
                                          Machine Type
                                        </h5>
                                      </div>
                                      <div
                                        className="card-body"
                                        style={{
                                          padding: "30px 0px",
                                          margin: "auto",
                                        }}
                                      >
                                        <p
                                          className="card-text"
                                          style={{
                                            fontFamily: "Open Sans",
                                            fontStyle: "normal",
                                            fontWeight: "400",
                                            fontSize: "14px",
                                            lineHeight: "21px",
                                            display: "flex",
                                            alignItems: "center",
                                            textAlign: "center",

                                            color: "#1d2023 ",
                                          }}
                                        >
                                          Machine Type here
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-md-3 col-sm-6 mb-md-0 mb-3">
                                    <div
                                      className="card px-1 px-md-0"
                                      style={{
                                        borderRadius: "0",
                                      }}
                                    >
                                      <div
                                        className=""
                                        style={{
                                          background: "#CFF2EE",
                                          boxShadow:
                                            "0px 4px 8px rgba(0, 0, 0, 0.12)",
                                          paddingTop: "10px",
                                          paddingBottom: "5px",
                                        }}
                                      >
                                        <img
                                          className="card-img-top"
                                          src={MotorType}
                                          alt="Card image cap"
                                          style={{
                                            width: "50%",
                                            margin: "auto",
                                          }}
                                        />
                                      </div>
                                      <div
                                        className=""
                                        style={{
                                          background: "#CFF2EE",
                                          boxShadow:
                                            "0px 4px 8px rgba(0, 0, 0, 0.12)",
                                        }}
                                      >
                                        <h5
                                          className="card-title"
                                          style={{
                                            fontFamily: "Open Sans",
                                            fontStyle: "normal",
                                            fontWeight: "600",
                                            fontSize: "16px",
                                            lineHeight: "24px",
                                            alignItems: "center",
                                            textAlign: "center",
                                            color: "#1d2023",
                                          }}
                                        >
                                          Motor Type
                                        </h5>
                                      </div>
                                      <div
                                        className="card-body"
                                        style={{
                                          padding: "30px 0px",
                                          margin: "auto",
                                        }}
                                      >
                                        <p
                                          className="card-text"
                                          style={{
                                            fontFamily: "Open Sans",
                                            fontStyle: "normal",
                                            fontWeight: "400",
                                            fontSize: "14px",
                                            lineHeight: "21px",
                                            display: "flex",
                                            alignItems: "center",
                                            textAlign: "center",

                                            color: "#1d2023 ",
                                          }}
                                        >
                                          motor type here
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-md-3 col-sm-6 mb-md-0 mb-3">
                                    <div
                                      className="card px-1 px-md-0"
                                      style={{
                                        borderRadius: "0",
                                      }}
                                    >
                                      <div
                                        className=""
                                        style={{
                                          background: "#CFF2EE",
                                          boxShadow:
                                            "0px 4px 8px rgba(0, 0, 0, 0.12)",
                                          paddingTop: "10px",
                                          paddingBottom: "5px",
                                        }}
                                      >
                                        <img
                                          className="card-img-top"
                                          src={Nozzles}
                                          alt="Card image cap"
                                          style={{
                                            width: "50%",
                                            margin: "auto",
                                          }}
                                        />
                                      </div>
                                      <div
                                        className=""
                                        style={{
                                          background: "#CFF2EE",
                                          boxShadow:
                                            "0px 4px 8px rgba(0, 0, 0, 0.12)",
                                        }}
                                      >
                                        <h5
                                          className="card-title"
                                          style={{
                                            fontFamily: "Open Sans",
                                            fontStyle: "normal",
                                            fontWeight: "600",
                                            fontSize: "16px",
                                            lineHeight: "24px",
                                            alignItems: "center",
                                            textAlign: "center",
                                            color: "#1d2023",
                                          }}
                                        >
                                          Nozzles
                                        </h5>
                                      </div>
                                      <div
                                        className="card-body"
                                        style={{
                                          padding: "30px 0px",
                                          margin: "auto",
                                        }}
                                      >
                                        <p
                                          className="card-text"
                                          style={{
                                            fontFamily: "Open Sans",
                                            fontStyle: "normal",
                                            fontWeight: "400",
                                            fontSize: "14px",
                                            lineHeight: "21px",
                                            display: "flex",
                                            alignItems: "center",
                                            textAlign: "center",

                                            color: "#1d2023 ",
                                          }}
                                        >
                                          number of nozzles
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-md-3 col-sm-6 mb-md-0 mb-3">
                                    <div
                                      className="card px-1 px-md-0"
                                      style={{
                                        borderRadius: "0",
                                      }}
                                    >
                                      <div
                                        className=""
                                        style={{
                                          background: "#CFF2EE",
                                          boxShadow:
                                            "0px 4px 8px rgba(0, 0, 0, 0.12)",
                                          paddingTop: "10px",
                                          paddingBottom: "5px",
                                        }}
                                      >
                                        <img
                                          className="card-img-top"
                                          src={ITSystem}
                                          alt="Card image cap"
                                          style={{
                                            width: "50%",
                                            margin: "auto",
                                          }}
                                        />
                                      </div>
                                      <div
                                        className=""
                                        style={{
                                          background: "#CFF2EE",
                                          boxShadow:
                                            "0px 4px 8px rgba(0, 0, 0, 0.12)",
                                        }}
                                      >
                                        <h5
                                          className="card-title"
                                          style={{
                                            fontFamily: "Open Sans",
                                            fontStyle: "normal",
                                            fontWeight: "600",
                                            fontSize: "16px",
                                            lineHeight: "24px",
                                            alignItems: "center",
                                            textAlign: "center",
                                            color: "#1d2023",
                                          }}
                                        >
                                          IT System
                                        </h5>
                                      </div>
                                      <div
                                        className="card-body"
                                        style={{
                                          padding: "30px 0px",
                                          margin: "auto",
                                        }}
                                      >
                                        <p
                                          className="card-text"
                                          style={{
                                            fontFamily: "Open Sans",
                                            fontStyle: "normal",
                                            fontWeight: "400",
                                            fontSize: "14px",
                                            lineHeight: "21px",
                                            display: "flex",
                                            alignItems: "center",
                                            textAlign: "center",

                                            color: "#1d2023 ",
                                          }}
                                        >
                                          details here
                                        </p>
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
                  </div>
                </div>
              </div>
            )}
            {tab == "2" && (
              <div
                className="tab-pane fade show active"
                id="stock-levels"
                role="tabpanel"
                aria-labelledby="stock-levels-tab"
              >
                <div className="row justify-content-center">
                  <div className="col-lg-10 pt-5">
                    <div className="secondcard">
                      <div id="secondcard" className="card-body">
                        <Details />
                        <div
                          style={{
                            border: "1px solid #FFFFFF",
                            boxShadow: "30px 70px 120px rgba(27, 49, 66, 0.13)",
                            borderRadius: "15px",
                            marginTop: "2rem",
                            overflowY: "scroll",
                            maxHeight: "28rem",
                          }}
                        >
                          <div
                            style={{
                              background: "#FFFFFF",
                              border: "1px solid #E5E5E5",
                              borderRadius: "16px",
                              margin: "1rem",
                            }}
                          >
                            <div className="row pt-md-5 pt-3">
                              <div className="col-lg-10 offset-lg-1">
                                <div className="row g-3 px-md-0 px-3">
                                  <div className="col-md-3">
                                    <div id="tankCard">
                                      <div className="card">
                                        <div className="cardContent">
                                          <img
                                            className="card-img-top"
                                            src={Tank1}
                                            alt="Card image cap"
                                          />
                                        </div>
                                        <div
                                          className="tank1Content"
                                          style={{
                                            background: "#CFF2EE",
                                            boxShadow:
                                              "0px 4px 8px rgba(0, 0, 0, 0.12)",
                                          }}
                                        >
                                          <h5 className="card-title">Tank 1</h5>
                                        </div>

                                        <div className="card-body">
                                          <img
                                            className="pb-2"
                                            src={StockLeft}
                                            alt="Card image cap"
                                          />
                                          <h5 className="card-title">
                                            {stock_level[1]?.brand_id}
                                          </h5>
                                          <p className="card-text">
                                            {stock_level[1]?.current_volume}
                                          </p>
                                          {/* <span className="m-0">
                                            <b className="p-0">
                                              {stock_level[1]?.last_refill_date}
                                            </b>
                                          </span> */}
                                        </div>

                                        <div className="card-body">
                                          <img
                                            className="pb-2"
                                            src={Replenished}
                                            alt="Card image cap"
                                          />
                                          <h5 className="card-title">
                                            Replenished:
                                          </h5>
                                          <p className="card-text">
                                            {stock_level[1]?.last_refill_date}
                                          </p>
                                          {/* <span className="m-0">
                                            dd / mm / yyyy <br /> 11:22 am
                                          </span> */}
                                        </div>
                                        <div className="card-body">
                                          <h5 className="card-title">
                                            <strong>Brand name</strong>
                                          </h5>
                                          <p className="card-text">
                                            {stock_level[1]?.name}
                                          </p>
                                          {/* <span className="m-0">
                                            Product type
                                          </span> */}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-md-3">
                                    <div id="tankCard">
                                      <div className="card">
                                        <div className="cardContent">
                                          <img
                                            className="card-img-top"
                                            src={Tank2}
                                            alt="Card image cap"
                                          />
                                        </div>
                                        <div
                                          className="tank1Content"
                                          style={{
                                            background: "#CFF2EE",
                                            boxShadow:
                                              "0px 4px 8px rgba(0, 0, 0, 0.12)",
                                          }}
                                        >
                                          <h5 className="card-title">Tank 2</h5>
                                        </div>
                                        <div className="card-body">
                                          <img
                                            className="pb-2"
                                            src={StockLeft}
                                            alt="Card image cap"
                                          />
                                          <h5 className="card-title">
                                            {stock_level[2]?.brand_id}
                                          </h5>
                                          <p className="card-text">
                                            {stock_level[2]?.current_volume}
                                          </p>
                                          {/* <span className="m-0">
                                            <b className="p-0">
                                              {stock_level[2]?.last_refill_date}
                                            </b>
                                          </span> */}
                                        </div>
                                        <div className="card-body">
                                          <img
                                            className="pb-2"
                                            src={Replenished}
                                            alt="Card image cap"
                                          />
                                          <h5 className="card-title">
                                            Replenished:
                                          </h5>
                                          <p className="card-text">
                                            {stock_level[2]?.last_refill_date}
                                          </p>
                                          {/* <span className="m-0">
                                            dd / mm / yyyy <br /> 11:22 am
                                          </span> */}
                                        </div>
                                        <div className="card-body">
                                          <h5 className="card-title">
                                            <strong>Brand name</strong>
                                          </h5>
                                          <p className="card-text">
                                            {stock_level[2]?.name}
                                          </p>
                                          {/* <span className="m-0">
                                            Product type
                                          </span> */}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-md-3">
                                    <div id="tankCard">
                                      <div className="card">
                                        <div className="cardContent">
                                          <img
                                            className="card-img-top"
                                            src={Tank3}
                                            alt="Card image cap"
                                          />
                                        </div>
                                        <div
                                          className="tank1Content"
                                          style={{
                                            background: "#CFF2EE",
                                            boxShadow:
                                              "0px 4px 8px rgba(0, 0, 0, 0.12)",
                                          }}
                                        >
                                          <h5 className="card-title">Tank 3</h5>
                                        </div>
                                        <div className="card-body">
                                          <img
                                            className="pb-2"
                                            src={StockLeft}
                                            alt="Card image cap"
                                          />
                                          <h5 className="card-title">
                                            {" "}
                                            {stock_level[3]?.brand_id}
                                          </h5>
                                          <p className="card-text">
                                            {stock_level[3]?.current_volume}
                                          </p>
                                          {/* <span className="m-0">
                                            <b className="p-0">
                                              {" "}
                                              {stock_level[3]?.last_refill_date}
                                            </b>
                                          </span> */}
                                        </div>
                                        <div className="card-body">
                                          <img
                                            className="pb-2"
                                            src={Replenished}
                                            alt="Card image cap"
                                          />
                                          <h5 className="card-title">
                                            Replenished:
                                          </h5>
                                          <p className="card-text">
                                            {stock_level[3]?.last_refill_date}
                                          </p>
                                          {/* <span className="m-0">
                                            dd / mm / yyyy <br /> 11:22 am
                                          </span> */}
                                        </div>
                                        <div className="card-body">
                                          <h5 className="card-title">
                                            <strong>Brand name</strong>
                                          </h5>
                                          <p className="card-text">
                                            {" "}
                                            {stock_level[3]?.name}
                                          </p>
                                          {/* <span className="m-0">
                                            Product type
                                          </span> */}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-md-3">
                                    <div id="tankCard">
                                      <div className="card">
                                        <div className="cardContent">
                                          <img
                                            className="card-img-top"
                                            src={Tank4}
                                            alt="Card image cap"
                                          />
                                        </div>
                                        <div
                                          className="tank1Content"
                                          style={{
                                            background: "#CFF2EE",
                                            boxShadow:
                                              "0px 4px 8px rgba(0, 0, 0, 0.12)",
                                          }}
                                        >
                                          <h5 className="card-title">Tank 4</h5>
                                        </div>
                                        <div className="card-body">
                                          <img
                                            className="pb-2"
                                            src={StockLeft}
                                            alt="Card image cap"
                                          />
                                          <h5 className="card-title">
                                            {stock_level[4]?.brand_id}
                                          </h5>
                                          <p className="card-text">
                                            {stock_level[4]?.current_volume}
                                          </p>
                                          {/* <span className="m-0">
                                            <b className="p-0">
                                              {stock_level[4]?.last_refill_date}
                                            </b>
                                          </span> */}
                                        </div>
                                        <div className="card-body">
                                          <img
                                            className="pb-2"
                                            src={Replenished}
                                            alt="Card image cap"
                                          />
                                          <h5 className="card-title">
                                            Replenished:
                                          </h5>
                                          <p className="card-text">
                                            {stock_level[4]?.last_refill_date}
                                          </p>
                                          {/* <span className="m-0">
                                            dd / mm / yyyy <br /> 11:22 am
                                          </span> */}
                                        </div>
                                        <div className="card-body">
                                          <h5 className="card-title">
                                            <strong>Brand name</strong>
                                          </h5>
                                          <p className="card-text">
                                            {" "}
                                            {stock_level[4]?.name}
                                          </p>
                                          {/* <span className="m-0">
                                            Product type
                                          </span> */}
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
                    </div>
                  </div>
                </div>
              </div>
            )}
            {tab == "3" && (
              <div
                className="tab-pane fade show active"
                id="product-dispensed"
                role="tabpanel"
                aria-labelledby="product-dispensed-tab"
              >
                <div className="row justify-content-center">
                  <div className="col-lg-10 pt-5">
                    <div className="secondcard">
                      <div id="secondcard" className="card-body">
                        <Details />
                        <div
                          style={{
                            border: "1px solid #FFFFFF",
                            boxShadow: "30px 70px 120px rgba(27, 49, 66, 0.13)",
                            borderRadius: "15px",
                            marginTop: "2rem",
                          }}
                        >
                          <div
                            style={{
                              background: "#FFFFFF",
                              border: "1px solid #E5E5E5",
                              borderRadius: "16px",
                              margin: "1rem",
                            }}
                          >
                            <div className="row pt-5">
                              <div className="col-lg-10 offset-lg-1">
                                <div
                                  className="row"
                                  style={{
                                    alignItems: "baseline",
                                  }}
                                >
                                  <div className="col-lg-6">
                                    <div className="dateDeployed">
                                      {flag && (
                                        <Row className="justify-content-end">
                                          <Col md="6" xs="6">
                                            <FormGroup className="text-left">
                                              <Label>From</Label>
                                              <Input type="date" xs="6" />
                                            </FormGroup>
                                          </Col>
                                          <Col md="6">
                                            <FormGroup className="text-left">
                                              <Label>To</Label>
                                              <Input type="date" />
                                            </FormGroup>
                                          </Col>
                                        </Row>
                                      )}
                                    </div>
                                  </div>
                                  <div className="col-lg-6 m-0 p-0">
                                    <div className="dateDeployed">
                                      <ul
                                        className="d-flex p-0"
                                        style={{
                                          alignItems: "center",
                                        }}
                                      >
                                        <li
                                          className="pl-2 pr-3"
                                          style={{
                                            listStyle: "none",
                                          }}
                                        >
                                          <img src={systemUpdate} />
                                        </li>
                                        <li
                                          className=""
                                          style={{
                                            listStyle: "none",
                                          }}
                                        >
                                          <ul className="m-0 p-0">
                                            <li
                                              className=""
                                              style={{
                                                listStyle: "none",
                                              }}
                                            >
                                              <span className="span-machine">
                                                Number of times machine used
                                              </span>
                                            </li>
                                            <li
                                              className=""
                                              style={{
                                                listStyle: "none",
                                              }}
                                            >
                                              <strong
                                                className=""
                                                style={{ color: "#09B39D" }}
                                              >
                                                #123456
                                              </strong>
                                            </li>
                                          </ul>
                                        </li>
                                      </ul>
                                    </div>
                                  </div>
                                </div>
                                <div className="row g-3">
                                  <div className="col-md-3">
                                    <div id="tankCard">
                                      <div className="card">
                                        <div className="cardContent">
                                          <img
                                            className="card-img-top"
                                            src={Tank1}
                                            alt="Card image cap"
                                          />
                                        </div>
                                        <div
                                          className="tank1Content"
                                          style={{
                                            background: "#CFF2EE",
                                            boxShadow:
                                              "0px 4px 8px rgba(0, 0, 0, 0.12)",
                                          }}
                                        >
                                          <h5 className="card-title">Tank 1</h5>
                                        </div>
                                        <div className="card-body">
                                          <img
                                            className="pb-2"
                                            src={Replenished}
                                            alt="Card image cap"
                                          />
                                          <h5 className="card-title">
                                            <strong>
                                              Total Product Dispensed:
                                            </strong>
                                          </h5>
                                          <span className="m-0 amount">
                                            #amount in ML
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-md-3">
                                    <div id="tankCard">
                                      <div className="card">
                                        <div className="cardContent">
                                          <img
                                            className="card-img-top"
                                            src={Tank2}
                                            alt="Card image cap"
                                          />
                                        </div>
                                        <div
                                          className="tank1Content"
                                          style={{
                                            background: "#CFF2EE",
                                            boxShadow:
                                              "0px 4px 8px rgba(0, 0, 0, 0.12)",
                                          }}
                                        >
                                          <h5 className="card-title">Tank 2</h5>
                                        </div>
                                        <div className="card-body">
                                          <img
                                            className="pb-2"
                                            src={Replenished}
                                            alt="Card image cap"
                                          />
                                          <h5 className="card-title">
                                            <strong>
                                              Total Product Dispensed:
                                            </strong>
                                          </h5>
                                          <span className="m-0 amount">
                                            #amount in ML
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-md-3">
                                    <div id="tankCard">
                                      <div className="card">
                                        <div className="cardContent">
                                          <img
                                            className="card-img-top"
                                            src={Tank3}
                                            alt="Card image cap"
                                          />
                                        </div>
                                        <div
                                          className="tank1Content"
                                          style={{
                                            background: "#CFF2EE",
                                            boxShadow:
                                              "0px 4px 8px rgba(0, 0, 0, 0.12)",
                                          }}
                                        >
                                          <h5 className="card-title">Tank 3</h5>
                                        </div>
                                        <div className="card-body">
                                          <img
                                            className="pb-2"
                                            src={Replenished}
                                            alt="Card image cap"
                                          />
                                          <h5 className="card-title">
                                            <strong>
                                              Total Product Dispensed:
                                            </strong>
                                          </h5>
                                          <span className="m-0 amount">
                                            #amount in ML
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-md-3">
                                    <div id="tankCard">
                                      <div className="card">
                                        <div className="cardContent">
                                          <img
                                            className="card-img-top"
                                            src={Tank4}
                                            alt="Card image cap"
                                          />
                                        </div>
                                        <div
                                          className="tank1Content"
                                          style={{
                                            background: "#CFF2EE",
                                            boxShadow:
                                              "0px 4px 8px rgba(0, 0, 0, 0.12)",
                                          }}
                                        >
                                          <h5 className="card-title">Tank 4</h5>
                                        </div>
                                        <div className="card-body">
                                          <img
                                            className="pb-2"
                                            src={Replenished}
                                            alt="Card image cap"
                                          />
                                          <h5 className="card-title">
                                            <strong>
                                              Total Product Dispensed:
                                            </strong>
                                          </h5>
                                          <span className="m-0 amount">
                                            #amount in ML
                                          </span>
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
                    </div>
                  </div>
                </div>
              </div>
            )}
            {tab == "4" && (
              <div
                className="tab-pane fade show active"
                id="sales-usage"
                role="tabpanel"
                aria-labelledby="sales-usage-tab"
              >
                <div className="row justify-content-center">
                  <div className="col-lg-10 pt-5">
                    <div className="secondcard">
                      <div id="secondcard">
                        <Details />
                        <div className="row">
                          <div className="col-md-6 offset-md-3 text-center">
                            <ul
                              className="nav nav-pills "
                              id="pills-tab"
                              role="tablist"
                              style={{
                                justifyContent: "center",
                              }}
                            >
                              <li className="nav-item m-1">
                                <a
                                  className="nav-link active"
                                  id="pills-sales-tab"
                                  data-toggle="pill"
                                  href="#pills-sales"
                                  role="tab"
                                  aria-controls="pills-sales"
                                  aria-selected="true"
                                >
                                  Sales
                                </a>
                              </li>
                              <li className="nav-item m-1">
                                <a
                                  className="nav-link"
                                  id="pills-Usage-tab"
                                  data-toggle="pill"
                                  href="#pills-Usage"
                                  role="tab"
                                  aria-controls="pills-Usage"
                                  aria-selected="false"
                                >
                                  Usage
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>

                        <div className="row">
                          <div
                            className="col-md-12"
                            style={{
                              overflowY: "scroll",
                              maxHeight: "28rem",
                            }}
                          >
                            <div className="tab-content" id="pills-tabContent">
                              <div
                                className="tab-pane fade show active"
                                id="pills-sales"
                                role="tabpanel"
                                aria-labelledby="pills-sales-tab"
                              >
                                <div className="row pt-5">
                                  <div className="col-lg-6 col-md-12 pt-5">
                                    {/* <div>
                                        <h6 className='card-subtitle'>
                                          Revenue
                                        </h6>
                                      </div> */}

                                    <h6 className="card-subtitle">Revenue</h6>

                                    <ul
                                      className="nav nav-pills "
                                      id="pills-tab"
                                      role="tablist"
                                      style={{
                                        justifyContent: "center",
                                      }}
                                    >
                                      <li className="nav-item m-1">
                                        <a
                                          onClick={() => setBarChartTab("1")}
                                          style={{ color: "#1d2023 " }}
                                          className="nav-link active"
                                          id="pills-daily-tab"
                                          data-toggle="pill"
                                          href="#pills-daily"
                                          role="tab"
                                          aria-controls="pills-daily"
                                          aria-selected="true"
                                        >
                                          Daily
                                        </a>
                                      </li>
                                      {/* <li className="nav-item m-1">
                      <a
                        onClick={() => setBarChartTab("2")}
                        className="nav-link"
                        id="pills-weekly-tab"
                        data-toggle="pill"
                        href="#pills-weekly"
                        role="tab"
                        aria-controls="pills-weekly"
                        aria-selected="false"
                        style={{ color: "#1d2023 " }}
                      >
                        Weekly
                      </a>
                    </li> */}
                                      <li className="nav-item m-1">
                                        <a
                                          onClick={() => setBarChartTab("3")}
                                          className="nav-link"
                                          id="pills-montly-tab"
                                          data-toggle="pill"
                                          href="#pills-montly"
                                          role="tab"
                                          aria-controls="pills-montly"
                                          aria-selected="false"
                                          style={{ color: "#1d2023 " }}
                                        >
                                          Montly
                                        </a>
                                      </li>
                                    </ul>
                                    <br />
                                    {flag && (
                                      <Row className="justify-content-end">
                                        <Col md="6" xs="6">
                                          <FormGroup className="text-left">
                                            <Label>From</Label>
                                            <Input type="date" xs="6" />
                                          </FormGroup>
                                        </Col>
                                        <Col md="6">
                                          <FormGroup className="text-left">
                                            <Label>To</Label>
                                            <Input type="date" />
                                          </FormGroup>
                                        </Col>
                                      </Row>
                                    )}

                                    <div
                                      className="amp-pxl mt-4"
                                      style={{
                                        height: "350px",
                                      }}
                                    >
                                      <BarChart
                                        options1={optionsBar1}
                                        series1={seriesBar1}
                                        // options2={options2}
                                        // series2={series2}
                                        options3={options3}
                                        series3={series3}
                                        tab={barChartTab}
                                      ></BarChart>
                                      <div className="chartist-tooltip"></div>
                                    </div>
                                    <div className="row">
                                      <div
                                        className="col-lg-6 col-md-12"
                                        style={{ margin: "auto" }}
                                      >
                                        <p>Total Transactions</p>
                                        <h3>
                                          {pieGraph?.total_transactions} Pkr
                                        </h3>
                                        <p>Total Revenue</p>
                                        <h3>
                                          {pieGraph?.total_revenue} Pkr
                                        </h3>
                                        {/* <p>
                                          <span>
                                            <img
                                              src={require("../assets/images/dawaam/arrow-up.png")}
                                              alt=""
                                            />
                                          </span>{" "}
                                          7,00%
                                        </p> */}
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-lg-6 col-md-12 pt-5 align-items-center justify-items-center">
                                    <h4 className="card-title">
                                      Sales percentage
                                    </h4>
                                    <p className="card-text">
                                      Breakdown of sales percentage by product
                                    </p>

                                    <br />
                                    <div className="row">
                                      <div className="col-md-6">
                                        <div
                                          className="row"
                                          style={{ alignItems: "center" }}
                                        >
                                          <div
                                            style={{ color: "#1d2023 " }}
                                            className="col-md-12"
                                          >
                                            <span className="to_from">To</span>
                                          </div>
                                          <div className="col-md-12">
                                            <input
                                              type="date"
                                              name="start_date"
                                              value={pieDates.start_date}
                                              onChange={(e) => handleChange(e)}
                                              className="__input"
                                              style={{
                                                background: "#5ab9a2",
                                                padding: " 7px",
                                                color: "#fff",
                                                fontSize: "14px",
                                                borderRadius: "12px",
                                              }}
                                            />
                                          </div>
                                        </div>
                                      </div>
                                      <div
                                        className="col-md-6"
                                        style={{ color: "#1d2023 " }}
                                      >
                                        <div
                                          className="row"
                                          style={{ alignItems: "center" }}
                                        >
                                          <div className="col-md-12">
                                            <span className="to_from">
                                              From
                                            </span>
                                          </div>
                                          <div className="col-md-12">
                                            <input
                                              type="date"
                                              name="end_date"
                                              value={pieDates.end_date}
                                              onChange={(e) => handleChange(e)}
                                              className="__input"
                                              style={{
                                                background: "#5ab9a2",
                                                padding: " 7px",
                                                color: "#fff",
                                                fontSize: "14px",
                                                borderRadius: "12px",
                                              }}
                                            />
                                          </div>
                                        </div>
                                      </div>
                                    </div>

                                    <div
                                      className="d-flex justify-content-center"
                                      id=""
                                    >
                                      <ReactApexChart
                                        options={options1}
                                        series={series1}
                                        type="pie"
                                        width={320}
                                      />
                                    </div>
                                    {/* <div
                                      id="chartContainer"
                                      style={{
                                        height: "370px",
                                        width: "auto",
                                      }}
                                    ></div> */}
                                    <div className="row g-0">
                                      <div className="col-2 ">
                                        <button
                                          type="button"
                                          onClick={() => {
                                            setEnabled("Transaction");
                                          }}
                                          className="btn btn-success btn-sm"
                                        >
                                          Transaction
                                        </button>
                                      </div>
                                      <div className="col-2 ">
                                        <button
                                          type="button"
                                          onClick={() => {
                                            setEnabled("Revenue");
                                          }}
                                          className="btn btn-success btn-sm"
                                        >
                                          Revenue
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div
                                className="tab-pane fade"
                                id="pills-Usage"
                                role="tabpanel"
                                aria-labelledby="pills-Usage-tab"
                              >
                                <div className="row pt-5 justify-content-center">
                                  {/* <div className="col-md-3">
                                    <p>
                                      Enter customer mobile number
                                      <br /> to see specific details
                                    </p>
                                    <input
                                      type="text"
                                      name=""
                                      placeholder="****-*******"
                                      id="phoneinput"
                                    />
                                    <br /> <br />
                                    <a
                                      href="/machines"
                                      className="btn btn-danger"
                                    >
                                      {" "}
                                      Process
                                    </a>
                                  </div> */}

                                  <div className="col-lg-3 mt-2 ">
                                    <div id="usageSec">
                                      <div className="card">
                                        <div className="cardContent">
                                          <img
                                            className="card-img-top"
                                            src={typicalOrder}
                                            alt="Card image cap"
                                          />
                                        </div>
                                        <div
                                          className="tank1Content"
                                          style={{
                                            background: "#CFF2EE",
                                            boxShadow:
                                              "0px 4px 8px rgba(0, 0, 0, 0.12)",
                                          }}
                                        >
                                          <h5 className="card-title">
                                            Typical Order Sizes
                                          </h5>
                                        </div>
                                        <div className="card-body">
                                          <img
                                            className="pb-2"
                                            src={allUser}
                                            alt="Card image cap"
                                          />
                                          <br />
                                          <br />
                                          <p className="card-text">
                                            All users combined:
                                          </p>
                                          <span className="m-0">
                                            <b className="p-0">20,000 ML</b>
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="col-lg-3 col-sm-4  mt-lg-0 mt-4">
                                    <div id="usageSec1">
                                      <div className="card">
                                        <div className="cardContent">
                                          <img
                                            className="card-img-top"
                                            src={numberOrder}
                                            alt="Card image cap"
                                          />
                                        </div>
                                        <div
                                          className="tank1Content"
                                          style={{
                                            background: "#CFF2EE",
                                            boxShadow:
                                              "0px 4px 8px rgba(0, 0, 0, 0.12)",
                                          }}
                                        >
                                          <h5 className="card-title">
                                            Number of Orders
                                          </h5>
                                        </div>
                                        <div className="card-body">
                                          <img
                                            className="pb-2"
                                            src={allUser}
                                            alt="Card image cap"
                                          />
                                          <br />
                                          <br />
                                          <p className="card-text">
                                            All users combined:
                                          </p>
                                          <span className="m-0">
                                            <b className="p-0">
                                              #number of orders
                                            </b>
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="row justify-content-center justify-content-lg-start pt-5">
                                <div className="col-lg-3 col-sm-4  ">
                                  <div id="usageSec">
                                    <div className="card">
                                      <div className="card-body">
                                        <img
                                          className="pb-2"
                                          src={singleUser}
                                          alt="Card image cap"
                                        />
                                        <br />
                                        <br />
                                        <p className="card-text">
                                          All users combined:
                                        </p>
                                        <span className="m-0">
                                          <b className="p-0">20,000 ML</b>
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-lg-3 col-sm-4 ">
                                  <div id="usageSec">
                                    <div className="card">
                                      <div className="card-body">
                                        <img
                                          className="pb-2"
                                          src={singleUser}
                                          alt="Card image cap"
                                        />
                                        <br />
                                        <br />
                                        <p className="card-text">
                                          All users combined:
                                        </p>
                                        <span className="m-0">
                                          <b className="p-0">20,000 ML</b>
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                {/* <div className="row pt-5">
                                  <div className="col-md-3"></div>
                                  <div className="col-md-6">
                                    <div className="row align-items-center g-0">
                                      <div className="col-md-8 offset-md-2">
                                        <div className="row">
                                          <div className="col-12">
                                            <a
                                              href="#"
                                              className="btn w-100 btn-normal"
                                              style={{
                                                borderRadius: "5px 5px 0px 0px",
                                              }}
                                            >
                                              Typical order size
                                            </a>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="col-md-12">
                                        <div className="row">
                                          <div className="col-12">
                                            <div
                                              id="displayed2"
                                              style={{
                                                borderRadius: "5px 5px 5px 5px",
                                              }}
                                            >
                                              <p>#123456</p>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="col-md-4 offset-md-4">
                                        <div className="row">
                                          <div className="col-md-12">
                                            <a
                                              href="#"
                                              className="btn w-100 btn-normal"
                                              style={{
                                                borderRadius: "0px 0px 5px 5px",
                                              }}
                                            >
                                              Overall{" "}
                                            </a>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="row pt-5 align-items-center g-0">
                                      <div className="col-md-8 offset-md-2">
                                        <div className="row">
                                          <div className="col-12">
                                            <a
                                              href="#"
                                              className="btn w-100 btn-normal"
                                              style={{
                                                borderRadius: "5px 5px 0px 0px",
                                              }}
                                            >
                                              Number of orders by customer{" "}
                                            </a>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="col-md-12">
                                        <div className="row">
                                          <div className="col-12">
                                            <div
                                              id="displayed2"
                                              style={{
                                                borderRadius: "5px 5px 5px 5px",
                                              }}
                                            >
                                              <p>#123456</p>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="col-md-4 offset-md-4">
                                        <div className="row">
                                          <div className="col-md-12">
                                            <a
                                              href="#"
                                              className="btn w-100 btn-normal"
                                              style={{
                                                borderRadius: "0px 0px 5px 5px",
                                              }}
                                            >
                                              Overall{" "}
                                            </a>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-md-3"></div>
                                </div> */}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {tab == "5" && (
              <div
                className="tab-pane fade show active"
                id="tank-management"
                role="tabpanel"
                aria-labelledby="tank-management-tab"
              >
                <div className="row justify-content-center">
                  <div className="col-lg-10 pt-5">
                    <div className="secondcard">
                      <div id="secondcard" className="card-body">
                        <Details />
                        <div
                          style={{
                            border: "1px solid #FFFFFF",
                            boxShadow: "30px 70px 120px rgba(27, 49, 66, 0.13)",
                            borderRadius: "15px",
                            marginTop: "2rem",
                          }}
                        >
                          <div
                            style={{
                              background: "#FFFFFF",
                              border: "1px solid #E5E5E5",
                              borderRadius: "16px",
                              margin: "1rem",
                            }}
                          >
                            <div className="row pt-5">
                              <div className="col-lg-12 offset-lg-0">
                                <div className="row g-3">
                                  <div className="col-md-12">
                                    <div className="table-content tank-management-table p-3">
                                      <table className="table table-borderless ">
                                        <thead>
                                          <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Barcode</th>
                                            <th scope="col">Product Type</th>
                                            <th scope="col">Brand Name</th>
                                            <th scope="col">
                                              Product Bach N0#
                                            </th>
                                            <th scope="col">
                                              Product Deployed
                                            </th>
                                          </tr>
                                        </thead>
                                        <tbody>
                                          <tr>
                                            <th scope="row">T-1</th>
                                            <td>12939321321</td>
                                            <td>Liquid</td>
                                            <td>Brand Name</td>
                                            <td>########</td>
                                            <td>dd / mm / yyyy</td>
                                          </tr>
                                          <tr>
                                            <th scope="row">T-2</th>
                                            <td>12939321321</td>
                                            <td>Liquid</td>
                                            <td>Brand Name</td>
                                            <td>########</td>
                                            <td>dd / mm / yyyy</td>
                                          </tr>
                                          <tr>
                                            <th scope="row">T-3</th>
                                            <td>12939321321</td>
                                            <td>Liquid</td>
                                            <td>Brand Name</td>
                                            <td>########</td>
                                            <td>dd / mm / yyyy</td>
                                          </tr>
                                          <tr>
                                            <th scope="row">T-4</th>
                                            <td>12939321321</td>
                                            <td>Liquid</td>
                                            <td>Brand Name</td>
                                            <td>########</td>
                                            <td>dd / mm / yyyy</td>
                                          </tr>
                                          <tr>
                                            <th scope="row">T-5</th>
                                            <td>12939321321</td>
                                            <td>Liquid</td>
                                            <td>Brand Name</td>
                                            <td>########</td>
                                            <td>dd / mm / yyyy</td>
                                          </tr>
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
                </div>
              </div>
            )}

            {/* {tab == "6" && (
              <div
                className="tab-pane fade show active"
                id="warnings"
                role="tabpanel"
                aria-labelledby="warnings-tab"
              >
                <div className="row justify-content-center">
                  <div className="col-lg-10 pt-5">
                    <div className="secondcard">
                      <div id="secondcard" className="card-body">
                        <Details />
                        <div style={{
                          border: '1px solid #FFFFFF',
                          boxShadow: '30px 70px 120px rgba(27, 49, 66, 0.13)',
                          borderRadius: '15px',
                          marginTop: '2rem',
                        }}>
                          <div style={{
                            background: '#FFFFFF',
                            border: '1px solid #E5E5E5',
                            borderRadius: '16px',
                            margin: '1rem',
                          }}>
                            <div className="row justify-content-center pt-5">
                              <div className="col-lg-12 offset-lg-0">
                                <div className="row g-3">
                                  <div className="col-md-12">
                                    <h3>Coming Soon .......</h3>
                                    <br />
                                    <br />
                                    <br />
                                    <br />
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
              </div>
            )} */}

            {tab == "7" && (
              <div
                className="tab-pane fade show active"
                id="maintenance"
                role="tabpanel"
                aria-labelledby="maintenance-tab"
              >
                <div className="row justify-content-center">
                  <div className="col-lg-10 pt-5">
                    <div className="secondcard">
                      <div id="secondcard" className="card-body">
                        <Details />
                        <div
                          style={{
                            border: "1px solid #FFFFFF",
                            boxShadow: "30px 70px 120px rgba(27, 49, 66, 0.13)",
                            borderRadius: "15px",
                            marginTop: "2rem",
                          }}
                        >
                          <div
                            style={{
                              background: "#FFFFFF",
                              border: "1px solid #E5E5E5",
                              borderRadius: "16px",
                              margin: "1rem",
                            }}
                          >
                            <div className="row md-py-5 py-3 px-md-0 px-3">
                              <div className="col-lg-10 offset-lg-1">
                                <div className="row px-3">
                                  <div className="col-md-4">
                                    <div id="maintenanceCard">
                                      <div className="card">
                                        <div className="technicalSupport">
                                          <img
                                            className="card-img-top"
                                            src={technicalSupport}
                                            alt="Card image cap"
                                          />
                                        </div>
                                        <div className="card-body">
                                          <div className="">
                                            <h5 className="card-title">
                                              Machine Last Serviced:
                                            </h5>
                                            <div className="dateDeployed">
                                              <ul
                                                className="d-flex p-0"
                                                style={{
                                                  alignItems: "center",
                                                }}
                                              >
                                                <li
                                                  className="pr-2"
                                                  style={{
                                                    listStyle: "none",
                                                  }}
                                                >
                                                  <img src={calendarsvgrepo} />
                                                </li>
                                                <li
                                                  className="pr-3"
                                                  style={{
                                                    listStyle: "none",
                                                  }}
                                                >
                                                  <span>dd / mm / yyyy</span>
                                                </li>
                                              </ul>
                                              <ul
                                                className="d-flex p-0"
                                                style={{
                                                  alignItems: "center",
                                                }}
                                              >
                                                <li
                                                  className="pr-2"
                                                  style={{
                                                    listStyle: "none",
                                                  }}
                                                >
                                                  <img src={clock} />
                                                </li>
                                                <li
                                                  className="pr-3"
                                                  style={{
                                                    listStyle: "none",
                                                  }}
                                                >
                                                  <span>11:12 am</span>
                                                </li>
                                              </ul>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-md-4">
                                    <div id="maintenanceCard">
                                      <div className="card">
                                        <div className="technicalSupport">
                                          <img
                                            className="card-img-top"
                                            src={bucket}
                                            alt="Card image cap"
                                          />
                                        </div>
                                        <div className="card-body">
                                          <h5 className="card-title">
                                            Parts Cleaned:
                                          </h5>
                                          <p className="card-text">
                                            List of parts below
                                          </p>
                                          <h5
                                            className="card-title text-start"
                                            style={{
                                              borderBottom: "2.4px solid #000",
                                              padding: "6px 0px",
                                            }}
                                          >
                                            Part name 1
                                          </h5>
                                          <h5
                                            className="card-title text-start"
                                            style={{
                                              borderBottom: "2.4px solid #000",
                                              padding: "6px 0px",
                                            }}
                                          >
                                            Part name 2
                                          </h5>
                                          <h5
                                            className="card-title text-start"
                                            style={{
                                              borderBottom: "2.4px solid #000",
                                              padding: "6px 0px",
                                            }}
                                          >
                                            Part name 3
                                          </h5>
                                          <h5
                                            className="card-title text-start"
                                            style={{
                                              borderBottom: "2.4px solid #000",
                                              padding: "6px 0px",
                                            }}
                                          >
                                            Part name 4
                                          </h5>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-md-4">
                                    <div id="maintenanceCard">
                                      <div className="card">
                                        <div className="technicalSupport">
                                          <img
                                            className="card-img-top"
                                            src={toolBox}
                                            alt="Card image cap"
                                          />
                                        </div>
                                        <div className="card-body">
                                          <h5 className="card-title">
                                            Parts Replaced:
                                          </h5>
                                          <p className="card-text">
                                            List of parts below
                                          </p>
                                          <h5
                                            className="card-title text-start"
                                            style={{
                                              borderBottom: "2.4px solid #000",
                                              padding: "6px 0px",
                                            }}
                                          >
                                            Part name 1
                                          </h5>
                                          <h5
                                            className="card-title text-start"
                                            style={{
                                              borderBottom: "2.4px solid #000",
                                              padding: "6px 0px",
                                            }}
                                          >
                                            Part name 2
                                          </h5>
                                          <h5
                                            className="card-title text-start"
                                            style={{
                                              borderBottom: "2.4px solid #000",
                                              padding: "6px 0px",
                                            }}
                                          >
                                            Part name 3
                                          </h5>
                                          <h5
                                            className="card-title text-start"
                                            style={{
                                              borderBottom: "2.4px solid #000",
                                              padding: "6px 0px",
                                            }}
                                          >
                                            Part name 4
                                          </h5>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="row pt-1 justify-content-center m-md-5 m-0">
                                  <div className="col-md-6 px-0">
                                    <div className="errorHistory">
                                      <p>
                                        {" "}
                                        Click Below for error specific details
                                      </p>
                                      <button className="btn btn-sm btn-success custom-btn-cls px-md-5 px-2">
                                        Error History
                                      </button>
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
                </div>
              </div>
            )}

            {tab == "8" && (
              <Card className="mt-3">
                <div className="row justify-content-center pt-5">
                  <div className="row ">
                    <div className="col-lg-10 offset-lg-1">
                      {/* <Row className="justify-content-end">
                        <Col md="3" >
                          <FormGroup className="text-left">
                            <Label>From</Label>
                            <Input type="date" xs="6" />
                          </FormGroup>
                        </Col>
                        <Col md="3">
                          <FormGroup className="text-left">
                            <Label>To</Label>
                            <Input type="date" />
                          </FormGroup>
                        </Col>
                      </Row> */}
                      <div className="row">
                        <div className="col-md-3 col-sm-6">
                          <div id="tankCard">
                            <div className="card">
                              <div
                                className="cardContent d-flex justify-content-center align-items-center"
                                style={{
                                  height: "160px",
                                }}
                              >
                                <img
                                  className="card-img-top"
                                  src={Group256}
                                  alt="Card image  "
                                  style={{
                                    width: "auto",
                                  }}
                                />
                              </div>

                              <div
                                className="tank1Content"
                                style={{
                                  background: "#CFF2EE",
                                  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.12)",
                                }}
                              ></div>
                              <div
                                className="card-body"
                                style={{ background: "#F3F3F3;" }}
                              >
                                <h5 className="card-title">
                                  <p
                                    style={{
                                      fontweight: 400,
                                    }}
                                  >
                                    No# of bottles
                                    <br />
                                    currently on the shelf
                                  </p>
                                </h5>
                                <button className="btn btn-outline-info px-4">
                                  45
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-3 col-sm-6">
                          <div id="tankCard">
                            <div className="card">
                              <div
                                className="cardContent d-flex justify-content-center align-items-center"
                                style={{
                                  height: "160px",
                                }}
                              >
                                <img
                                  className="card-img-top"
                                  src={Group255}
                                  alt="Card image cap"
                                  style={{
                                    width: "auto",
                                  }}
                                />
                              </div>
                              <div
                                className="tank1Content"
                                style={{
                                  background: "#CFF2EE",
                                  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.12)",
                                }}
                              ></div>
                              <div className="card-body">
                                <h5 className="card-title">
                                  <p
                                    style={{
                                      fontweight: 400,
                                    }}
                                  >
                                    No# of new empty
                                    <br />
                                    bottles bought
                                  </p>
                                </h5>
                                <button className="btn btn-outline-info px-4">
                                  100
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-3 col-sm-6">
                          <div id="tankCard">
                            <div className="card">
                              <div
                                className="cardContent d-flex justify-content-center align-items-center"
                                style={{
                                  height: "160px",
                                }}
                              >
                                <img
                                  className="card-img-top"
                                  src={Group258}
                                  alt="Card image cap"
                                  style={{
                                    width: "auto",
                                  }}
                                />
                              </div>
                              <div
                                className="tank1Content"
                                style={{
                                  background: "#CFF2EE",
                                  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.12)",
                                }}
                              ></div>
                              <div className="card-body">
                                <h5 className="card-title">
                                  <p
                                    style={{
                                      fontweight: 400,
                                    }}
                                  >
                                    No# of bottles
                                    <br />
                                    refilled
                                  </p>
                                </h5>
                                <button className="btn btn-outline-info px-4">
                                  34
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-3 col-sm-6">
                          <div id="tankCard">
                            <div className="card">
                              <div
                                className="cardContent  d-flex justify-content-center align-items-center "
                                style={{
                                  height: "160px",
                                }}
                              >
                                <img
                                  className="card-img-top"
                                  src={Group292}
                                  alt="Card   cap"
                                  style={{
                                    width: "auto",
                                  }}
                                />
                                <br />
                              </div>
                              <div
                                className="tank1Content"
                                style={{
                                  background: "#CFF2EE",
                                  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.12)",
                                }}
                              ></div>
                              <div className="card-body">
                                <h5 className="card-title">
                                  <p
                                    style={{
                                      fontweight: 400,
                                    }}
                                  >
                                    Revenue from new
                                    <br />
                                    bottles sold
                                  </p>
                                </h5>
                                <button className="btn btn-outline-info px-4">
                                  30,000 RS
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            )}
          </div>

          <Notifications notiModal={notiModal} notiToggle={notiToggle} />
        </div>
      </div>
    </div>
  );
}

const getMachineStates = (state) => state.machine;
// console.log(state);
const mapToStateProps = (state) => {
  // console.log(state)
  return {
    ...state,
    graph_data: { ...getMachineStates(state).graph_data },
    stock_level: { ...getMachineStates(state).stock_level },
    sales_per: { ...getMachineStates(state).sales_level },
    sales_graphData: { ...getMachineStates(state).sales_graph},
  };
};

export default connect(mapToStateProps)(MachineDetails);

/* eslint-disable */
import React, { useRef, useEffect } from "react";
import { Box, Paper } from "@mui/material";
import Typography from "@mui/material/Typography";
import { DataGrid } from "@mui/x-data-grid";
// import { useNavigate } from "react-router-dom";
import kurentoUtils from "kurento-utils";
import Stomp from "stompjs";
import TransparentImg from "../assets/img/transparent-1px.png";
import WebRtcImg from "../assets/img/webrtc.png";
import Spinner from "../assets/img/spinner.gif";
import Advertise from "../assets/img/advertise.png";

function MainPage() {
  const navigate = useNavigate();
  // const [loading, setLoading] = useState(true);
  // const [articleList, setArticleList] = useState([]);
  var ws = new WebSocket(`${process.env.REACT_APP_MEDIA_URL}/call`);
  var socket = new WebSocket(`${process.env.REACT_APP_MEDIA_URL}/chat`);
  var stompClient;
  var video = useRef(null);
  var text = useRef(null);
  var webRtcPeer;
  var mediaId;

  window.onload = function () {
    connect();
  };

  window.onbeforeunload = function () {
    ws.close();
  };

  ws.onmessage = function (message) {
    var parsedMessage = JSON.parse(message.data);
    console.info("Received message: " + message.data);

    switch (parsedMessage.id) {
      case "presenterResponse":
        presenterResponse(parsedMessage);
        break;
      case "viewerResponse":
        viewerResponse(parsedMessage);
        break;
      case "iceCandidate":
        webRtcPeer.addIceCandidate(parsedMessage.candidate, function (error) {
          if (error) return console.error("Error adding candidate: " + error);
        });
        break;
      case "stopCommunication":
        dispose();
        break;
      default:
        console.error("Unrecognized message", parsedMessage);
    }
  };

  function presenterResponse(message) {
    if (message.response != "accepted") {
      var errorMsg = message.message ? message.message : "Unknow error";
      console.info("Call not accepted for the following reason: " + errorMsg);
      dispose();
    } else {
      webRtcPeer.processAnswer(message.sdpAnswer, function (error) {
        if (error) return console.error(error);
      });
    }
  }

  function connect() {
    stompClient = Stomp.over(socket);
    stompClient.connect({}, function () {
      stompClient.subscribe("/subscribe", function (greeting) {
        console.log(greeting.body);
      });
    });
  }

  function sendChat() {
    stompClient.send(
      "/publish/messages",
      {},
      JSON.stringify({
        message: text.current.value,
        senderId: 7,
        receiverId: 14,
      })
    );
  }

  function viewerResponse(message) {
    if (message.response != "accepted") {
      var errorMsg = message.message ? message.message : "Unknow error";
      console.info("Call not accepted for the following reason: " + errorMsg);
      dispose();
    } else {
      console.log("webrtcpeer", webRtcPeer);
      webRtcPeer.processAnswer(message.sdpAnswer, function (error) {
        if (error) return console.error(error);
      });
    }
  }

  function presenter(num) {
    if (!webRtcPeer) {
      showSpinner(video.current);
    }
    var options = {
      localVideo: video.current,
      onicecandidate: onIceCandidate,
    };
    mediaId = num;
    webRtcPeer = new kurentoUtils.WebRtcPeer.WebRtcPeerSendonly(
      options,
      function (error) {
        if (error) {
          return console.error(error);
        }
        webRtcPeer.generateOffer(onOfferPresenter);
      }
    );
  }

  function onOfferPresenter(error, offerSdp) {
    if (error) return console.error("Error generating the offer");
    console.info("Invoking SDP offer callback function " + mediaId);
    var message = {
      id: "presenter",
      sdpOffer: offerSdp,
      mediaId: mediaId,
    };
    sendMessage(message);
  }

  function viewer(num) {
    if (!webRtcPeer) {
      showSpinner(video.current);
    }
    mediaId = num;
    console.log(num);
    var options = {
      remoteVideo: video.current,
      onicecandidate: onIceCandidate,
    };
    webRtcPeer = new kurentoUtils.WebRtcPeer.WebRtcPeerRecvonly(
      options,
      function (error) {
        if (error) {
          return console.error(error);
        }
        this.generateOffer(onOfferViewer);
      }
    );
  }

  function onOfferViewer(error, offerSdp) {
    if (error) return console.error("Error generating the offer");
    console.info("Invoking SDP offer callback function " + mediaId);
    var message = {
      id: "viewer",
      sdpOffer: offerSdp,
      mediaId: mediaId,
    };
    sendMessage(message);
  }

  function onIceCandidate(candidate) {
    console.log("Local candidate" + JSON.stringify(candidate));

    var message = {
      id: "onIceCandidate",
      candidate: candidate,
      mediaId: mediaId,
    };
    sendMessage(message);
  }

  function stop() {
    var message = {
      id: "stop",
    };
    sendMessage(message);
    dispose();
  }

  function dispose() {
    if (webRtcPeer) {
      webRtcPeer.dispose();
      webRtcPeer = null;
    }
    hideSpinner(video.current);
  }

  function sendMessage(message) {
    var jsonMessage = JSON.stringify(message);
    console.log("Sending message: " + jsonMessage);
    ws.send(jsonMessage);
  }

  function showSpinner() {
    for (var i = 0; i < arguments.length; i++) {
      arguments[i].poster = TransparentImg;
      arguments[
        i
      ].style.background = `center transparent url(${Spinner}) no-repeat`;
    }
  }

  function hideSpinner() {
    for (var i = 0; i < arguments.length; i++) {
      arguments[i].src = "";
      arguments[i].poster = Advertise;
      arguments[i].style.background = "";
    }
  }

  // const navigate = useNavigate();

  const columns = [
    { field: "id", headerName: "순위", width: 150 },
    { field: "nickname", headerName: "NickName", width: 150, editable: true },
    { field: "laptime", headerName: "LapTime", width: 150, editable: true },
  ];
  const ranking = [];
  ranking.push({
    id: 1,
    nickname: "의권짱짱123",
    laptime: "01:23:59",
  });
  ranking.push({
    id: 2,
    nickname: "v스피드왕번개v",
    laptime: "01:23:59",
  });

  const boardcolumns = [
    { field: "id", headerName: "번호", width: 150 },
    { field: "title", headerName: "제목", width: 300, editable: true },
    { field: "date", headerName: "등록일", width: 150, editable: true },
  ];
  // useEffect(() => {
  //   axios
  //     .get(`${process.env.REACT_APP_BACKEND_URL}/board/notice`)
  //     .then((res) => {
  //       console.log(res);
  //       const articles = res.data;
  //       console.log(articles.nickname);
  //       if (articles.length === 0) {
  //         setArticleList([
  //           [
  //             {
  //               id: "-",
  //               title: "게시글이 없습니다.",
  //               nickname: "-",
  //               hit: "-",
  //             },
  //           ],
  //         ]);
  //       } else {
  //         const numberOfArticlesPerUnit = 3;
  //         const numberOfUnits = Math.ceil(
  //           articles.length / numberOfArticlesPerUnit
  //         );
  //         const List = [];
  //         for (let i = 0; i < numberOfUnits; i += 1) {
  //           List.push(
  //             {
  //               id: {article.id},
  //               title: {article.title},
  //               date: {Date(article.createdTime)},
  //             }
  //           );
  //         }
  //         setArticleList(List);
  //       }
  //       setLoading(false);
  //     });
  // }, []);

  // if (loading) {
  //   return <div>Loading...</div>;
  // }
  const notice = [];
  notice.push({
    id: 1,
    title: "여기는 공지사항 게시판입니다.",
    date: "2023.01.27",
  });
  notice.push({
    id: 2,
    title: "리얼카트 곧 출시 예정!",
    date: "2023.01.27",
  });
  notice.push({
    id: 3,
    title: "많은 사랑 부탁드립니다.",
    date: "2023.01.27",
  });

  ws.onopen = () => {
    setTimeout(() => {
      viewer(1);
    }, 2000);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: 1400,
      }}
    >
      <Box
        sx={{
          width: "90%",
          height: "100%",
        }}
      >
        <Box
          sx={{
            width: "100%",
            height: "45%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderBottom: "solid 1px #E8E8E8",
          }}
        >
          <Paper
            elevation={2}
            sx={{
              width: "60%",
              height: "90%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div>
              <div className="row">
                {/* <div className="col-md-5">
                  <div className="row">
                    <div className="col-md-12">
                      <button
                        onClick={() => {
                          presenter(1);
                        }}
                        id="presenter1"
                        href="#"
                        className="btn btn-success"
                      >
                        <span className="glyphicon glyphicon-play"></span>{" "}
                        Presenter1{" "}
                      </button>
                      <button
                        onClick={() => {
                          presenter(2);
                        }}
                        id="presenter2"
                        href="#"
                        className="btn btn-success"
                      >
                        <span className="glyphicon glyphicon-play"></span>{" "}
                        Presenter2{" "}
                      </button>
                      <button
                        onClick={() => {
                          presenter(3);
                        }}
                        id="presenter3"
                        href="#"
                        className="btn btn-success"
                      >
                        <span className="glyphicon glyphicon-play"></span>{" "}
                        Presenter3{" "}
                      </button>
                      <button
                        onClick={() => {
                          viewer(1);
                        }}
                        id="viewer"
                        href="#"
                        className="btn btn-primary"
                      >
                        <span className="glyphicon glyphicon-user"></span>{" "}
                        Viewer1
                      </button>
                      <button
                        onClick={() => {
                          viewer(2);
                        }}
                        id="viewer"
                        href="#"
                        className="btn btn-primary"
                      >
                        <span className="glyphicon glyphicon-user"></span>{" "}
                        Viewer2
                      </button>
                      <button
                        onClick={() => {
                          viewer(3);
                        }}
                        id="viewer"
                        href="#"
                        className="btn btn-primary"
                      >
                        <span className="glyphicon glyphicon-user"></span>{" "}
                        Viewer3
                      </button>
                    </div>
                  </div>
                </div> */}
                <div className="col-md-7">
                  <div id="videoBig">
                    <video
                      ref={video}
                      id="video"
                      autoPlay
                      width="640px"
                      height="480px"
                      poster={WebRtcImg}
                    ></video>
                  </div>
                </div>
              </div>
            </div>
          </Paper>
        </Box>
        <Box
          sx={{
            width: "100%",
            height: "50%",
            display: "flex",
          }}
        >
          <Box
            sx={{
              width: "50%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                width: "90%",
                height: "90%",
              }}
            >
              <Box
                sx={{
                  height: "5%",
                }}
              >
                <Typography
                  variant="h7"
                  sx={{
                    fontWeight: "bold",
                  }}
                >
                  공지사항
                </Typography>
              </Box>
              <DataGrid
                sx={{
                  height: "42.5%",
                }}
                rows={notice}
                columns={boardcolumns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                experimentalFeatures={{ newEditingApi: true }}
              />
              <Box
                sx={{
                  height: "5%",
                }}
              />
              <Box
                sx={{
                  height: "5%",
                }}
              >
                <Typography
                  variant="h7"
                  sx={{
                    fontWeight: "bold",
                  }}
                >
                  게시글
                </Typography>
              </Box>
              <DataGrid
                sx={{
                  height: "42.5%",
                }}
                rows={ranking}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                experimentalFeatures={{ newEditingApi: true }}
              />
            </Box>
          </Box>
          <Box
            sx={{
              width: "50%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                width: "90%",
                height: "90%",
              }}
            >
              <Box
                sx={{
                  height: "5%",
                }}
              >
                <Typography
                  variant="h7"
                  sx={{
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  Ranking
                </Typography>
              </Box>
              <DataGrid
                sx={{
                  height: "95%",
                }}
                rows={ranking}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                experimentalFeatures={{ newEditingApi: true }}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default MainPage;

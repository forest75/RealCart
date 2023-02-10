/* eslint-disable */
import React, { useRef, useState, useEffect } from "react";
import { Box, Paper } from "@mui/material";
import Typography from "@mui/material/Typography";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import kurentoUtils from "kurento-utils";
import axios from "axios";
import Stomp from "stompjs";
import TransparentImg from "../assets/img/transparent-1px.png";
import WebRtcImg from "../assets/img/webrtc.png";
import Spinner from "../assets/img/spinner.gif";
import Advertise from "../assets/img/advertise.png";

function MainPage() {
  const navigate = useNavigate();
  const [ws, setWs] = useState(null);
  const [socket, setSocket] = useState(null);
  const [stompClient, setStompClient] = useState(null);
  const video = useRef(null);
  const text = useRef(null);
  // const [loading, setLoading] = useState(true);
  const [articleList, setArticleList] = useState([]);
  var webRtcPeer;
  var mediaId;

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

  function viewerResponse(message) {
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

  useEffect(() => {
    const wsConst = new WebSocket(`${process.env.REACT_APP_MEDIA_URL}/call`);
    const socketConst = new WebSocket(
      `${process.env.REACT_APP_MEDIA_URL}/chat`
    );
    const stompClientConst = Stomp.over(socketConst);
    stompClientConst.connect({}, function () {
      stompClientConst.subscribe("/subscribe", function (greeting) {
        console.log(greeting.body);
      });
    });

    setWs(wsConst);
    setSocket(socketConst);
    setStompClient(stompClientConst);

    return () => {
      wsConst.close();
      socketConst.close();
    };
  }, []);

  useEffect(() => {
    if (ws) {
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
            webRtcPeer.addIceCandidate(
              parsedMessage.candidate,
              function (error) {
                if (error)
                  return console.error("Error adding candidate: " + error);
              }
            );
            break;
          case "stopCommunication":
            dispose();
            break;
          default:
            console.error("Unrecognized message", parsedMessage);
        }
      };

      ws.onopen = () => {
        // setTimeout(() => {
        viewer(1);
        // }, 1000);
      };
    }
  }, [ws]);

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

  // 공지사항 게시글 백으로부터 가져오기
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/board/notice`)
      .then((res) => {
        const articles = res.data;
        console.log(articles);
        console.log(articles[0].title);
        console.log(articles.length);

        if (articles.length === 0) {
          setArticleList([
            {
              id: "-",
              title: "게시글이 없습니다.",
              date: "-",
            },
          ]);
        } else {
          const List = [];
          for (let i = 0; i < articles.length; i += 1) {
            List.push({
              id: articles[i].id,
              title: articles[i].title,
              date: articles[i].createdTime,
            });
          }
          setArticleList(List);
        }
        setLoading(false);
      });
  }, []);

  const noticecolumns = [
    { field: "id", headerName: "번호", width: 150, editable: false },
    {
      field: "title",
      headerName: "제목",
      width: 300,
      editable: false,
    },
    {
      field: "date",
      headerName: "등록일",
      width: 150,
      editable: false,
    },
  ];

  // 게시판 백엔드 연결
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/board/notice`)
      .then((res) => {
        const articles = res.data;
        console.log(articles);
        console.log(articles[0].title);
        console.log(articles.length);

        if (articles.length === 0) {
          setArticleList([
            {
              id: "-",
              title: "게시글이 없습니다.",
              date: "-",
            },
          ]);
        } else {
          const List = [];
          for (let i = 0; i < articles.length; i += 1) {
            List.push({
              id: articles[i].id,
              title: articles[i].title,
              date: articles[i].createdTime,
            });
          }
          setArticleList(List);
        }
        setLoading(false);
      });
  }, []);

  const freecolumns = [
    { field: "id", headerName: "번호", width: 150 },
    { field: "title", headerName: "제목", width: 300, editable: true },
    { field: "date", headerName: "등록일", width: 150, editable: true },
    { field: "date", headerName: "등록일", width: 150, editable: true },
  ];

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
            <video
              ref={video}
              id="video"
              autoPlay={true}
              width="640px"
              height="480px"
              poster={WebRtcImg}
              onClick={() => {
                navigate("/spect");
              }}
              muted={true}
            />
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
                editable: "false",
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
                rows={articleList}
                columns={noticecolumns}
                pageSize={5}
                rowsPerPageOptions={[5]}
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
                columns={freecolumns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                editable="false"
                experimentalFeatures={{ newEditingApi: false }}
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

/* eslint-disable */
import React from "react";
import kurentoUtils from "kurento-utils";

function PlayRoom() {
  var ws = new WebSocket("wss://13.125.13.39:8090/call");

  var video;

  window.onload = function () {
    video = document.getElementById("video");
  };

  function sendMessage(message) {
    var jsonMessage = JSON.stringify(message);
    console.log("Sending message: " + jsonMessage);
    ws.send(jsonMessage);
  }

  function onIceCandidate(candidate) {
    console.log("Local candidate" + JSON.stringify(candidate));

    var message = {
      id: "onIceCandidate",
      candidate: candidate,
      mediaId: 1,
    };
    sendMessage(message);
  }

  function onOfferViewer(error, offerSdp) {
    if (error) return console.error("Error generating the offer");
    console.info("Invoking SDP offer callback function " + 1);
    var message = {
      id: "viewer",
      sdpOffer: offerSdp,
      mediaId: 1,
    };
    sendMessage(message);
  }

  let webRtcPeer = kurentoUtils.WebRtcPeer.WebRtcPeerSendonly(
    {
      remoteVideo: video,
      onicecandidate: onIceCandidate,
    },
    function (error) {
      if (error) return console.error(error);
      this.generateOffer(onOfferViewer);
    }
  );

  function dispose() {
    if (webRtcPeer) {
      webRtcPeer.dispose();
      webRtcPeer = null;
    }
  }

  function viewerResponse(message) {
    if (message.response !== "accepted") {
      var errorMsg = message.message ? message.message : "Unknow error";
      console.info("Call not accepted for the following reason: " + errorMsg);
      dispose();
    } else {
      webRtcPeer.processAnswer(message.sdpAnswer, function (error) {
        if (error) return console.error(error);
      });
    }
  }

  ws.onmessage = function (message) {
    var parsedMessage = JSON.parse(message.data);
    console.log("Received message: " + message.data);

    switch (parsedMessage.id) {
      case "viewerResponse":
        viewerResponse(parsedMessage);
        break;
      case "iceCandidate":
        webRtcPeer.addIceCandidate(parsedMessage.candidate, function (error) {
          if (error) {
            return console.error("Error adding candidate: " + error);
          }
        });
        break;
      case "stopCommunication":
        dispose();
        break;
      default:
        console.error("Unrecognized message", parsedMessage);
    }
  };

  return (
    <div className="App">
      <video id="video" autoPlay width="640px" height="480px"></video>
    </div>
  );
}

export default PlayRoom;

package org.example;

import org.java_websocket.WebSocket;

import java.util.List;

public class FlagClass {
    private int player1status;
    private int player2status;
    private int gameStatus;

    public int getPlayer1status() {
        return player1status;
    }

    public synchronized void setPlayer1status(int player1status) {
        this.player1status = player1status;
    }

    public int getPlayer2status() {
        return player2status;
    }

    public synchronized void setPlayer2status(int player2status) {
        this.player2status = player2status;
    }

    public int getGameStatus() {
        return gameStatus;
    }

    public synchronized void setGameStatus(int gameStatus) {
        this.gameStatus = gameStatus;
    }
}

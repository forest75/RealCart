package org.example;

public class FlagClass {
    private String player1Nickname;
    private String player2Nickname;
    private int player1Status;
    private int player2Status;
    private int car1Status;
    private int car2Status;
    private int gameStatus;
    private Long startTime;


    private FlagClass(){}
    private static FlagClass instance = new FlagClass();
    public static FlagClass getInstance(){
        return instance;
    }


    public String getPlayer1Nickname() {
        return player1Nickname;
    }

    public synchronized void setPlayer1Nickname(String player1Nickname) {
        this.player1Nickname = player1Nickname;
    }

    public String getPlayer2Nickname() {
        return player2Nickname;
    }

    public synchronized void setPlayer2Nickname(String player2Nickname) {
        this.player2Nickname = player2Nickname;
    }

    public int getPlayer1Status() {
        return player1Status;
    }

    public synchronized void setPlayer1Status(int player1Status) {
        this.player1Status = player1Status;
    }

    public int getPlayer2Status() {
        return player2Status;
    }

    public synchronized void setPlayer2Status(int player2Status) {
        this.player2Status = player2Status;
    }

    public int getGameStatus() {
        return gameStatus;
    }

    public synchronized void setGameStatus(int gameStatus) {
        this.gameStatus = gameStatus;
    }

    public int getCar1Status() {
        return car1Status;
    }

    public synchronized void setCar1Status(int car1Status) {
        this.car1Status = car1Status;
    }

    public int getCar2Status() {
        return car2Status;
    }

    public synchronized void setCar2Status(int car2Status) {
        this.car2Status = car2Status;
    }

    public Long getStartTime() {
        return startTime;
    }

    public void setStartTime(Long startTime) {
        this.startTime = startTime;
    }

    public void initiateAll() {
        this.gameStatus = 0;
        this.player1Status = 0;
        this.player2Status = 0;
        this.car1Status = 0;
        this.car2Status = 0;
    }
}

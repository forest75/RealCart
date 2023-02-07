package org.example;

public class RcCarTemp {
    private int currentState;
    private int currentGate;
    private boolean isReady;
    private boolean isRunning;
    private boolean isFinish;
    private Long timeStamp;

    public RcCarTemp() {
    }

    public RcCarTemp(int currentState, int currentGate, boolean isReady, boolean isRunning, boolean isFinish, Long timeStamp) {
        this.currentState = currentState;
        this.currentGate = currentGate;
        this.isReady = isReady;
        this.isRunning = isRunning;
        this.isFinish = isFinish;
        this.timeStamp = timeStamp;
    }

    public int getCurrentState() {
        return currentState;
    }

    public void setCurrentState(int currentState) {
        this.currentState = currentState;
    }

    public int getCurrentGate() {
        return currentGate;
    }

    public void setCurrentGate(int currentGate) {
        this.currentGate = currentGate;
    }

    public boolean isReady() {
        return isReady;
    }

    public void setReady(boolean ready) {
        isReady = ready;
    }

    public boolean isRunning() {
        return isRunning;
    }

    public void setRunning(boolean running) {
        isRunning = running;
    }

    public boolean isFinish() {
        return isFinish;
    }

    public void setFinish(boolean finish) {
        isFinish = finish;
    }

    public Long getTimeStamp() {
        return timeStamp;
    }

    public void setTimeStamp(Long timeStamp) {
        this.timeStamp = timeStamp;
    }

    @Override
    public String toString() {
        return "RcCar{" +
                "currentState=" + currentState +
                ", currentGate=" + currentGate +
                ", isReady=" + isReady +
                ", isRunning=" + isRunning +
                ", isFinish=" + isFinish +
                ", timeStamp=" + timeStamp +
                '}';
    }
}

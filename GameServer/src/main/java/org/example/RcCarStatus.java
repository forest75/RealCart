package org.example;

public class RcCarStatus {
    Long timestamp;
    int speed;
    int gateNo;
    int status;

    public RcCarStatus(Long timestamp, int speed, int gateNo, int status) {
        this.timestamp = timestamp;
        this.speed = speed;
        this.gateNo = gateNo;
        this.status = status;
    }

    @Override
    public String toString() {
        return "RcCarStatus{" +
                "timestamp=" + timestamp +
                ", speed=" + speed +
                ", gateNo=" + gateNo +
                ", status=" + status +
                '}';
    }
}

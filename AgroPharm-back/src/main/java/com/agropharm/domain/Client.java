package com.agropharm.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.PrimaryKeyJoinColumn;
import javax.persistence.Table;

@Entity
@Table(name = "clients")
@PrimaryKeyJoinColumn(name = "user_id")
public class Client extends User{

    @Column(name = "penalty_points")
    private int penaltyPoints;
    @Column(name = "is_enabled")
    private Boolean isEnabled;

    public Client(){

    }

    public int getPenaltyPoints() {
        return penaltyPoints;
    }

    public void setPenaltyPoints(int penaltyPoints) {
        int penaltyPointsSum = getPenaltyPoints();
        penaltyPointsSum += penaltyPoints;
        this.penaltyPoints = penaltyPointsSum;
    }

    public Boolean getEnabled() {
        return isEnabled;
    }

    public void setEnabled(Boolean enabled) {
        isEnabled = enabled;
    }
}

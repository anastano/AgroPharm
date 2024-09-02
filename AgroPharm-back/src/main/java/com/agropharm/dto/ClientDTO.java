package com.agropharm.dto;

import com.agropharm.mapper.DTOEntity;

public class ClientDTO implements DTOEntity {
    public UserDTO user;
    public Boolean isEnabled;
    public int penaltyPoints;

    public ClientDTO(){

    }

    public UserDTO getUser() {
        return user;
    }

    public void setUser(UserDTO user) {
        this.user = user;
    }

    public Boolean getEnabled() {
        return isEnabled;
    }

    public void setEnabled(Boolean enabled) {
        isEnabled = enabled;
    }

    public int getPenaltyPoints() {
        return penaltyPoints;
    }

    public void setPenaltyPoints(int penaltyPoints) {
        this.penaltyPoints = penaltyPoints;
    }
}

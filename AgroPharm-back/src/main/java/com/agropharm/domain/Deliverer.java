package com.agropharm.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.PrimaryKeyJoinColumn;
import javax.persistence.Table;

@Entity
@Table(name = "deliverers")
@PrimaryKeyJoinColumn(name = "user_id")
public class Deliverer extends User{

    @Column(name = "is_enabled")
    private Boolean isEnabled;

    //datum registracije ili naziv firme za dostavu

    public Deliverer(){

    }

    public Boolean getEnabled() {
        return isEnabled;
    }

    public void setEnabled(Boolean enabled) {
        isEnabled = enabled;
    }
}

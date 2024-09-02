package com.agropharm.dto;

public class TokenDTO {
    private String accessToken;
    private Long expiresIn;

    public TokenDTO() {
        this.accessToken = null;
        this.expiresIn = null;
    }

    public TokenDTO(String accessToken, long expiresIn) {
        this.accessToken = accessToken;
        this.expiresIn = expiresIn;
    }

    public String getAccessToken() {
        return accessToken;
    }

    public void setAccessToken(String accessToken) {
        this.accessToken = accessToken;
    }

    public Long getExpiresIn() {
        return expiresIn;
    }

    public void setExpiresIn(Long expiresIn) {
        this.expiresIn = expiresIn;
    }

}

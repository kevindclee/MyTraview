package com.mamoorie.mytraview.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum Role {
    COMN("일반유저"),
    SPEC("스페셜");

    private String description;
}
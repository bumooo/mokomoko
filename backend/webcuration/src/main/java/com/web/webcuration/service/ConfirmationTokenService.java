package com.web.webcuration.service;

import java.time.LocalDateTime;

import com.web.webcuration.Entity.ConfirmationToken;
import com.web.webcuration.dto.request.AuthMailCode;

public interface ConfirmationTokenService {

    String createEmailConfirmationToken(String receiveEmail, boolean type);

    void deleteAuthMail(Long id);

    ConfirmationToken existAuthMail(String email, LocalDateTime time);

    ConfirmationToken AuthMailCodeAndTime(AuthMailCode authMailCode, LocalDateTime time, boolean type);
}

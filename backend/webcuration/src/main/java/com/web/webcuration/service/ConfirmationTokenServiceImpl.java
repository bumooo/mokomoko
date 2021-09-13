package com.web.webcuration.service;

import java.time.LocalDateTime;

import com.web.webcuration.Entity.ConfirmationToken;
import com.web.webcuration.dto.request.AuthMailCode;
import com.web.webcuration.mails.EmailSenderService;
import com.web.webcuration.repository.ConfirmationTokenQueryRepository;
import com.web.webcuration.repository.ConfirmationTokenRepository;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.Assert;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ConfirmationTokenServiceImpl implements ConfirmationTokenService {

    private final EmailSenderService emailSenderService;
    private final ConfirmationTokenRepository confirmationTokenRepository;
    private final ConfirmationTokenQueryRepository confirmationTokenQueryRepository;

    @Override
    public String createEmailConfirmationToken(String receiveEmail, boolean type) {

        Assert.hasText(receiveEmail, "Email은 필수 입니다.");

        ConfirmationToken emailConfirmationToken = ConfirmationToken.createEmailConfirmationToken(receiveEmail, type);
        confirmationTokenRepository.save(emailConfirmationToken);
        emailSenderService.sendEmail(receiveEmail, emailConfirmationToken.getVirifyCode(), type);
        return emailConfirmationToken.getEmail();
    }

    @Override
    @Transactional
    public void deleteAuthMail(Long id) {
        confirmationTokenRepository.deleteById(id);
    }

    @Override
    public ConfirmationToken existAuthMail(String email, LocalDateTime time) {
        return confirmationTokenQueryRepository.existAuthMail(email, time);
    }

    @Override
    public ConfirmationToken AuthMailCodeAndTime(AuthMailCode authMailCode, LocalDateTime time, boolean type) {
        return confirmationTokenQueryRepository.AuthMailCodeAndTime(authMailCode, time, type);
    }

}

package com.web.webcuration.mails;

import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class EmailSenderService {

    private final JavaMailSender javaMailSender;
    private static final String FROM_ADDRESS = "mokomoko";

    public void sendEmail(String receiveAddress, String code, boolean type) {
        try {
            MailHandler mailHandler = new MailHandler(javaMailSender);
            System.out.println(receiveAddress);
            // 받는 사람
            mailHandler.setTo(receiveAddress);
            // 보내는 사람
            mailHandler.setFrom(FROM_ADDRESS);
            // 제목
            // 내용(HTML)
            String htmlContent;
            if (type) {
                mailHandler.setSubject("[Mokomoko] 회원 가입 인증 ");
                htmlContent = "<html lang='en'><body><div class='row'><div class='col-2'></div><div class='col'><div style='font-size: large; font-weight: bold; margin-top: 20px'>mokomoko</div><hr style='background-color: #ff5a5f; height: 1px' /><h3 style='margin-top: 20px'>이메일 인증코드</h3><div style='margin-top: 30px'><p>mokomoko에 가입하신것을진심으로 환영합니다.</p><p>아래의 인증코드를 입력하시면 가입이 정상적으로 완료됩니다.</p></div><div style='background-color: #e7e9eb;font-size: x-large;margin-top: 20px;margin-bottom: 30px;'>Code : "
                        + code
                        + "</div><hr style='background-color: #ff5a5f; height: 1px' /></div><div class='col-2'></div></div></body></html>";
            } else {
                mailHandler.setSubject("[Mokomoko] 비밀번호 재설정");
                htmlContent = "<html lang='en'><body><div class='row'><div class='col-2'></div><div class='col'><div style='font-size: large; font-weight: bold; margin-top: 20px'>mokomoko</div><hr style='background-color: #ff5a5f; height: 1px' /><h3 style='margin-top: 20px'>비밀번호 재설정</h3><div style='margin-top: 30px'><br><p>비밀번호 재설정을 하시려면 아래의 인증코드를 입력하세요.</p></div><div style='background-color: #e7e9eb;font-size: x-large;margin-top: 20px;margin-bottom: 30px;'>Code : "
                        + code
                        + "</div><hr style='background-color: #ff5a5f; height: 1px' /></div><div class='col-2'></div></div></body></html>";
            }
            mailHandler.setTest(htmlContent, true);

            mailHandler.send();
        } catch (Exception e) {
            throw new RuntimeException("이메일 전송을 실패하였습니다.");
        }
    }
}

package com.pgbooking.service;

import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

	@Autowired
	private JavaMailSender emailSender;

	public void sendSimpleMessage(String to, String subject, String text) {
		MimeMessage message = emailSender.createMimeMessage();
		try {
			message.setSubject(subject);
			MimeMessageHelper helper = new MimeMessageHelper(message, true);
			helper.setFrom("no-reply@pgbooking.com");
			helper.setTo(to);
			helper.setText(text, true);
			emailSender.send(message);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}

package com.pgbooking;

import java.io.File;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class PGBookingApplication implements CommandLineRunner {

	@Value("${file.upload.location}")
	private String folderName;

	public static void main(String[] args) {
		SpringApplication.run(PGBookingApplication.class, args);
	}

	@Bean
	public ModelMapper mapper() {
		return new ModelMapper();
	}

	@Override
	public void run(String... args) throws Exception {
		File dir = new File(folderName);
		if (!dir.exists()) {
			System.out.println("Created Folder/s " + dir.mkdirs());
		} else {
			System.out.println("Image Folder Already Exists!!!");
		}
	}

}

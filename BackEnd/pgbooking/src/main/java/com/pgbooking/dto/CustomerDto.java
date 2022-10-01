package com.pgbooking.dto;

import java.util.Date;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Past;

import org.hibernate.validator.constraints.Length;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString(exclude = "password")
@NoArgsConstructor
@AllArgsConstructor
public class CustomerDto {
	@JsonProperty("id")
	private Integer id;

	@NotBlank
	private String name;

	@NotBlank
	@Email
	private String email;

	@JsonProperty(access = Access.WRITE_ONLY)
	private String password;

	@NotBlank
	@Length(min = 10, max = 10, message = "Invalid phone number length!")
	private String phone;

	@NotBlank
	private String gender;

	@NotBlank
	private String city;

	@Past(message = "Birth Date must be in Past")
	private Date dateOfBirth;
}

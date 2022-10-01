package com.pgbooking.dto;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

import org.hibernate.validator.constraints.Length;

import com.fasterxml.jackson.annotation.*;
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
public class AdminDto {
	@JsonProperty("id")
	private Integer id;

	@NotBlank
	private String name;

	@NotBlank
	@Email
	private String email;

	@JsonProperty(access = Access.WRITE_ONLY) // for deserialization only
	private String password;

	@NotBlank
	@Length(min = 10, max = 10, message = "Invalid phone number length!")
	private String phone;
}

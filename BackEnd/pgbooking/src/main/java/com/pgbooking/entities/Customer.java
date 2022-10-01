package com.pgbooking.entities;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Past;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "customers")
@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class Customer {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer customerId;

	@NotNull
	private String name;

	@Column(unique = true, nullable = false)
	private String email;

	@Column(unique = true, nullable = false)
	private String phone;

	@Enumerated(EnumType.STRING)
	@NotNull
	private Gender gender;

	private String city;

	@Past(message = "Birth Date Must Be In Past")
	private Date dateOfBirth;

	@NotNull
	private String password;

}

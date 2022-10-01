package com.pgbooking.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "admins")
@Getter
@Setter
@ToString(exclude = "password")
@AllArgsConstructor
@NoArgsConstructor
public class Admin {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer adminId;

	@NotNull
	private String name;

	@NotNull
	private String email;

	@NotNull
	private String password;

	@Column(unique = true, nullable = false)
	private String phone;

}

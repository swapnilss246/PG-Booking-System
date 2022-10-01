package com.pgbooking.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
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
@Table(name = "paying_guest_houses")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class PayingGuestHouse {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer pgId;

	@NotNull
	private String name;

	@NotNull
	private String city;

	@NotNull
	private String locality;

	private String amenities;

	private String pgDescription;

	private String foodAvailability;

	@Enumerated(EnumType.STRING)
	@NotNull
	private Gender type;

	@Column(unique = true)
	private String imagePath;

}

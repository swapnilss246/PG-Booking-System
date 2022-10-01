package com.pgbooking.entities;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "rooms")
@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class Room {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer roomId;

	@Enumerated(EnumType.STRING)
	@NotNull
	private SharingType sharingType;

	@NotNull
	@JoinColumn(name = "pgId")
	private int pgId;

	@NotNull
	private double price;

	@NotNull
	private int occupancyAvailable;

}

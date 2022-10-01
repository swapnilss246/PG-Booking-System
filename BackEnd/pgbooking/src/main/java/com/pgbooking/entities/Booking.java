package com.pgbooking.entities;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;
import javax.validation.constraints.NotNull;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "bookings", uniqueConstraints = @UniqueConstraint(columnNames = { "customerId", "roomId", "pgId" }))

public class Booking {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer bookingId;

	@NotNull
	@JoinColumn(name = "customerId")
	private int customerId;

	@NotNull
	@JoinColumn(name = "roomId")
	private int roomId;

	@NotNull
	@JoinColumn(name = "pgId")
	private int pgId;

	@NotNull
	private Date bookingDate;

	@NotNull
	private Date startDate;

	@NotNull
	private Date endDate;

	@NotNull
	private double amount;
}
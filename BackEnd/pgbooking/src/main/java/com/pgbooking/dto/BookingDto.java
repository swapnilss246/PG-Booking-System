package com.pgbooking.dto;

import java.util.Date;

import javax.validation.constraints.Future;
import javax.validation.constraints.NotBlank;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class BookingDto {
	@JsonProperty("id")
	private Integer bookingId;

	@NotBlank
	private int customerId;

	@NotBlank
	private String sharingType;

	private int roomId;

	@NotBlank
	private int pgId;

	@JsonFormat(pattern = "yyyy-MM-dd")
	private Date bookingDate;

	@JsonFormat(pattern = "yyyy-MM-dd")
	@NotBlank
	@Future(message = "Start date must be in future")
	private Date startDate;

	@JsonFormat(pattern = "yyyy-MM-dd")
	@NotBlank
	@Future(message = "End date must be in future")
	private Date endDate;

	@NotBlank
	private double amount;

}

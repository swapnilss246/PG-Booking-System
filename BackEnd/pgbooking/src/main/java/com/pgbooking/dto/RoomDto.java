package com.pgbooking.dto;

import javax.validation.constraints.NotBlank;

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
public class RoomDto {
	@JsonProperty("id")
	private Integer roomId;

	@NotBlank
	private String sharingType;

	@NotBlank
	private int pgId;

	@NotBlank
	private double price;

	@NotBlank
	private int occupancyAvailable;

	public RoomDto(String sharingType, int pgId, double price, int occupancyAvailable) {
		this.sharingType = sharingType;
		this.pgId = pgId;
		this.price = price;
		this.occupancyAvailable = occupancyAvailable;
	}

}

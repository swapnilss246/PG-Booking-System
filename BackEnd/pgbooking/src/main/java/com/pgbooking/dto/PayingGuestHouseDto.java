package com.pgbooking.dto;

import javax.validation.constraints.NotBlank;

import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

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
public class PayingGuestHouseDto {
	@JsonProperty("id")
	private Integer pgId;

	@NotBlank
	private String name;

	@NotBlank
	private String city;

	@NotBlank
	private String locality;

	private String amenities;

	private String pgDescription;

	private String foodAvailability;
	
	private String type;

	@JsonProperty(access = Access.READ_ONLY) //for serialization only
	private String imagePath;
	
	@NotBlank
//	@JsonProperty(access = Access.WRITE_ONLY)
	private int noOfSingleSharing;
	
	@NotBlank
//	@JsonProperty(access = Access.WRITE_ONLY)
	private int noOfDoubleSharing;
	
	@NotBlank
//	@JsonProperty(access = Access.WRITE_ONLY)
	private int noOfTripleSharing;
	
	
	private double singleSharingPrice;
	
	private double doubleSharingPrice;
	
	private double tripleSharingPrice;
	
	private MultipartFile image;
}

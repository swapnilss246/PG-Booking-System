package com.pgbooking.service;

import java.io.IOException;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.pgbooking.custom_exceptions.ResourceNotFoundException;
import com.pgbooking.dto.PayingGuestHouseDto;

public interface IPGService {

	public List<PayingGuestHouseDto> getAllPGs();

	public PayingGuestHouseDto getPgDetailsById(int id) throws ResourceNotFoundException;

	public PayingGuestHouseDto updatePg(PayingGuestHouseDto detachedPgDto) throws IOException;

	public PayingGuestHouseDto addNewPg(PayingGuestHouseDto transientPg) throws IOException;

	public String removePg(int id);

	public List<PayingGuestHouseDto> getPgByNameOrCityOrLocality(String filter);

	public PayingGuestHouseDto storeImage(int pgId, MultipartFile imageFile) throws IOException;

	public byte[] restoreImage(int pgId) throws IOException;

}

package com.pgbooking.service;

import java.util.List;

import com.pgbooking.dto.BookingDto;

public interface IBookingService {

	public BookingDto bookNewRoom(BookingDto transientBookingDto);

	public String cancelBookingById(int bookingId);

	public List<BookingDto> getAllBookings();

	public List<BookingDto> getBookingsByCustomerId(int customerId);
	
	public boolean existsByPgId(int pgId);

	public void removeExpiredBookings();

}

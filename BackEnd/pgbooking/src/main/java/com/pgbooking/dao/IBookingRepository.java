package com.pgbooking.dao;

import java.util.Date;
import java.util.List;

import javax.validation.constraints.NotNull;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.pgbooking.entities.Booking;

public interface IBookingRepository extends JpaRepository<Booking, Integer> {

	@Query(value = "SELECT b FROM Booking b WHERE b.customerId = ?1")
	List<Booking> findAllByCustomerId(@NotNull int customerId);

	Booking findByPgId(int pgId);

	@Modifying
	@Query(value = "DELETE b FROM bookings b WHERE b.end_date < :today", nativeQuery = true)
	void deleteExpiredBookings(@NotNull Date today);

}

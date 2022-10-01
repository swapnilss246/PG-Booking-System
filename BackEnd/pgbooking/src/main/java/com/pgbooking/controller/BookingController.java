package com.pgbooking.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pgbooking.dto.BookingDto;
import com.pgbooking.service.IBookingService;

@RestController
@RequestMapping("/bookings")
@CrossOrigin
public class BookingController {

	@Autowired
	private IBookingService bookingService;

	public BookingController() {
		System.out.println("In Booking Controller Ctor....");
	}

//	=========================  Book new room in PG (later divide it in three parts-- single, double and triple sharing) =============================
	@PostMapping("/booknewroom")
	public ResponseEntity<?> bookNewRoom(@RequestBody BookingDto transientBookingDto) {
		try {
			return ResponseEntity.ok(bookingService.bookNewRoom(transientBookingDto));
		} catch (RuntimeException e) {
			return new ResponseEntity<>(e.getMessage(), HttpStatus.FORBIDDEN);
		}
	}

//	========================= Get ALl Bookings By Customer Id =======================
	@GetMapping("/details/{customerId}")
	public ResponseEntity<?> getBookingsByCustomerId(@PathVariable int customerId) {
		try {
			return ResponseEntity.ok(bookingService.getBookingsByCustomerId(customerId));
		} catch (RuntimeException e) {
			return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
		}
	}

//	=========================  Cancel Booking by Booking Id ============================
	@DeleteMapping("/{bookingId}")
	public ResponseEntity<?> cancelBookingByBookingId(@PathVariable int bookingId) {
		try {
			return ResponseEntity.ok(bookingService.cancelBookingById(bookingId));
		} catch (RuntimeException e) {
			return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
		}
	}

//	======================== get all bookings  (admin specific) =================================

	@GetMapping("/getall")
	public ResponseEntity<?> getAllBookings() {
		try {
			return ResponseEntity.ok(bookingService.getAllBookings());
		} catch (RuntimeException e) {
			return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
		}
	}

}

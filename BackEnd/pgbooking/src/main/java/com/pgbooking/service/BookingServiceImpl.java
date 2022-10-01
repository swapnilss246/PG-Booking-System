package com.pgbooking.service;

import java.util.Arrays;
import java.util.Date;
import java.util.List;

import javax.transaction.Transactional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pgbooking.custom_exceptions.ResourceNotFoundException;
import com.pgbooking.dao.IBookingRepository;
import com.pgbooking.dao.IPGRepository;
import com.pgbooking.dao.IRoomRepository;
import com.pgbooking.dto.BookingDto;
import com.pgbooking.dto.CustomerDto;
import com.pgbooking.entities.Booking;
import com.pgbooking.entities.PayingGuestHouse;
import com.pgbooking.entities.Room;

@Service
@Transactional
public class BookingServiceImpl implements IBookingService {

	@Autowired
	private IBookingRepository bookingRepo;

	@Autowired
	private IRoomRepository roomRepo;
	
	@Autowired
	private IPGRepository pgRepo;
	
	@Autowired
	private ICustomerService customerService;

	@Autowired
	private ModelMapper modelMapper;
	
	@Autowired
	EmailService emailService;
	
	@Override
	public BookingDto bookNewRoom(BookingDto transientBookingDto) {
		// get distinct room from with with sharing type
		Room room = roomRepo.findByPgIdAndSharingType(transientBookingDto.getPgId(),
				transientBookingDto.getSharingType());
		// check is there occupancy available in given room or not?

		if (room.getOccupancyAvailable() > 0) {
			transientBookingDto.setBookingDate(new Date());
			System.out.println("Booking Date is set to : " + transientBookingDto.getBookingDate());
			transientBookingDto.setRoomId(room.getRoomId());
			Booking transientBooking = modelMapper.map(transientBookingDto, Booking.class);

			Booking persistentBooking = bookingRepo.save(transientBooking);
			
			//get details of pg and customer for details mail (room details are already fetched)
			PayingGuestHouse pg = pgRepo.findById(persistentBooking.getPgId()).orElseThrow();
			CustomerDto customer = customerService.getCustomerDetailsById(persistentBooking.getCustomerId());
			
			// now reduce count of occupancy by 1 for that room
			roomRepo.reduceOccupancyByOneByRoomId(room.getRoomId());
			BookingDto bookingResponseDto = modelMapper.map(persistentBooking, BookingDto.class);
			bookingResponseDto.setSharingType(room.getSharingType().toString());
			

			emailService.sendSimpleMessage(customer.getEmail(), 
					"New Booking",
					"Hi "+ customer.getName()
					+",<br>Welcome To PG-Booking!!!"
					+ "<br>You have successfully booked a " + bookingResponseDto.getSharingType() +" sahring room in "
					+ pg.getName() + " PG in " + pg.getLocality() + ", "+ pg.getCity()
					+ "<br>Your stay in this PG will be from "+ bookingResponseDto.getStartDate() + " to " + bookingResponseDto.getEndDate() 
					+ "<br>Total amount Paid: Rs."
					+ persistentBooking.getAmount()
					+ "<br>For more details about PG contact on 9876543210"
							+ "<br><br><br>Thank You!!!<br>PG Booking Office, Third Floor<br>"
							+ "      Vedanta Towers, FC Road, Pune");
			
			
			return bookingResponseDto;
		} else
			throw new RuntimeException("No occupancy available for requested sharing type in this PG!!!...");
	}

	@Override
	public String cancelBookingById(int bookingId) {
		String message = "Booking Cancellation failed!!!... Check Booking Id again...";

		if (bookingRepo.existsById(bookingId)) {
			// now retrieve roomId from bookingId and add occupancy in room by one then
			// delete booking details
			Booking booking = bookingRepo.findById(bookingId)
					.orElseThrow(() -> new ResourceNotFoundException("No booking available for given booking id!!!"));
			roomRepo.increaseOccupancyByOneByRoomId(booking.getRoomId());
			bookingRepo.deleteById(bookingId);
			message = "Booking Cancelled Successfully!!!...";
		}
		return message;
	}

	@Override
	public List<BookingDto> getAllBookings() {
		removeExpiredBookings();
		List<Booking> bookings = bookingRepo.findAll();
//		List<BookingDto> bookingsDto = bookings.stream().map(i -> modelMapper.map(i, BookingDto.class)).collect(Collectors.toList());
		// or simple way
		List<BookingDto> bookingsDto = Arrays.asList(modelMapper.map(bookings, BookingDto[].class));
		return bookingsDto;
	}

	@Override
	public List<BookingDto> getBookingsByCustomerId(int customerId) {
		removeExpiredBookings();
		List<Booking> bookings = bookingRepo.findAllByCustomerId(customerId);
		if (bookings.size() != 0) {
			List<BookingDto> bookingDtos = Arrays.asList(modelMapper.map(bookings, BookingDto[].class));
			return bookingDtos;
		} else {
			throw new ResourceNotFoundException("You Do Not Have Any Booking Records!!!");
		}
	}

	@Override
	public boolean existsByPgId(int pgId) {
		Booking booking = bookingRepo.findByPgId(pgId);
		if (booking != null) {
			System.out.println("Bookings exist with pgId : " + pgId);
			return true;
		} else {
			System.out.println("Bookings does not exist with pgId : " + pgId);
			return false;
		}
	}

	@Override
	public void removeExpiredBookings() {
		Date today = new Date();
		bookingRepo.deleteExpiredBookings(today);
		
	}
}

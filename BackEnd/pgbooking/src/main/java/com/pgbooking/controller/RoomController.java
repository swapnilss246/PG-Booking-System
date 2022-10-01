package com.pgbooking.controller;

import java.util.List;

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

import com.pgbooking.dto.RoomDto;
import com.pgbooking.service.IRoomService;

@RestController
@RequestMapping("/rooms")
@CrossOrigin
public class RoomController {

	@Autowired
	private IRoomService roomService;

	public RoomController() {
		System.out.println("In room controller ctor.....");
	}

//	======================== get all rooms in all PGs  ===============================
	@GetMapping()
	public ResponseEntity<?> getAllRooms() {
		try {
			return ResponseEntity.ok(roomService.getAllRooms());
		} catch (RuntimeException e) {
			return new ResponseEntity<>(e.getMessage(), HttpStatus.NO_CONTENT);
		}
	}

//	======================== get all rooms in particular PG  ===============================
	@GetMapping("/{pgId}")
	public ResponseEntity<?> getAllRoomsInPg(@PathVariable int pgId) {
		try {
			return ResponseEntity.ok(roomService.getAllRoomsInPg(pgId));
		} catch (RuntimeException e) {
			return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
		}
	}

//	======================== add rooms to particular PG  ===============================
	@PostMapping("addtopg")
	public ResponseEntity<?> addAllRoomsToPg(@RequestBody List<RoomDto> rooms) {
		try {
			return ResponseEntity.ok(roomService.addRoomsToPg(rooms));
		} catch (RuntimeException e) {
			return new ResponseEntity<>(e.getMessage(), HttpStatus.NO_CONTENT);
		}
	}

//	======================== delete single room by roomId  ===============================
	@DeleteMapping("/delete/{roomId}")
	public ResponseEntity<?> deleteRoomFromPgByRoomId(@PathVariable int roomId) {
		try {
			return ResponseEntity.ok(roomService.removeRoomFromPg(roomId));
		} catch (RuntimeException e) {
			return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
		}
	}

//	======================== delete multiple rooms from PG by PgId  ===============================
	@DeleteMapping("/deleteallinpg/{PgId}")
	public ResponseEntity<?> deleteAllRoomsByPgId(@PathVariable int PgId) {
		try {
			return ResponseEntity.ok(roomService.removeAllRoomsFromPg(PgId));
		} catch (RuntimeException e) {
			return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
		}
	}

}

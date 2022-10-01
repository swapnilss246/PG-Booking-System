package com.pgbooking.service;

import java.util.Arrays;
import java.util.List;

import javax.transaction.Transactional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pgbooking.custom_exceptions.ResourceNotFoundException;
import com.pgbooking.dao.IPGRepository;
import com.pgbooking.dao.IRoomRepository;
import com.pgbooking.dto.RoomDto;
import com.pgbooking.entities.Room;

@Service
@Transactional
public class RoomServiceImpl implements IRoomService {

	@Autowired
	private IRoomRepository roomRepo;

	@Autowired
	private IPGRepository pgRepo;

	@Autowired
	private ModelMapper modelMapper;

	@Override
	public List<RoomDto> getAllRooms() {
		List<Room> rooms = roomRepo.findAll();
		return Arrays.asList(modelMapper.map(rooms, RoomDto[].class));
	}

	@Override
	public List<RoomDto> getAllRoomsInPg(int pgId) {
		List<Room> rooms = roomRepo.getRoomByPgId(pgId);
		if (rooms.isEmpty()) {
			throw new ResourceNotFoundException("No rooms found!");
		}
		return Arrays.asList(modelMapper.map(rooms, RoomDto[].class));
	}

	@Override
	public List<RoomDto> addRoomsToPg(List<RoomDto> transientRoomsDto) {
		List<Room> transientRooms = Arrays.asList(modelMapper.map(transientRoomsDto, Room[].class));

		List<Room> persistentRooms = roomRepo.saveAll(transientRooms);

		return Arrays.asList(modelMapper.map(persistentRooms, RoomDto[].class));
	}

	@Override
	public String removeRoomFromPg(int roomId) {
		String message = "Room Removal Failed!!!... Check Room Id again...";
		if (roomRepo.existsById(roomId)) {
			roomRepo.deleteById(roomId);
			message = "Room Removed Successfully!!!...";
		}
		return message;
	}

	@Override
	public String removeAllRoomsFromPg(int pgId) {
		String message = "Rooms Removal Failed!!!... Check PG Id again...";
		if (pgRepo.existsById(pgId)) {
			roomRepo.deleteByPgId(pgId);
			message = "Rooms Removed Successfully!!!...";
		}
		return message;
	}

}

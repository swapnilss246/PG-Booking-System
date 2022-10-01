package com.pgbooking.service;

import java.util.List;

import com.pgbooking.dto.RoomDto;

public interface IRoomService {

	public List<RoomDto> getAllRooms();

	public List<RoomDto> getAllRoomsInPg(int pgId);

	public List<RoomDto> addRoomsToPg(List<RoomDto> transientRooms);

	public String removeRoomFromPg(int roomId);

	public String removeAllRoomsFromPg(int pgId);
}

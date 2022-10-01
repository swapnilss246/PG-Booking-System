package com.pgbooking.dao;

import java.util.List;

import javax.validation.constraints.NotNull;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.pgbooking.entities.Room;

public interface IRoomRepository extends JpaRepository<Room, Integer> {

	public List<Room> getRoomByPgId(int pgId);

	public void deleteByPgId(int pgId);

	@Query(value = "UPDATE Room r SET r.occupancyAvailable = r.occupancyAvailable-1 WHERE r.roomId = ?1")
	@Modifying
	public void reduceOccupancyByOneByRoomId(@NotNull int roomId);

	@Query(value = "UPDATE Room r SET r.occupancyAvailable = r.occupancyAvailable+1 WHERE r.roomId = ?1")
	@Modifying
	public void increaseOccupancyByOneByRoomId(@NotNull int roomId);

	@Query(value = "SELECT * FROM rooms r WHERE r.pg_id = :pgId AND r.sharing_type = :sharingType AND occupancy_available>0 LIMIT 1", nativeQuery = true)
	public Room findByPgIdAndSharingType(@NotNull int pgId, @NotNull String sharingType);

	@Query(value = "SELECT min(r.price) FROM rooms r WHERE r.pg_id = :pgId", nativeQuery = true)
	public double getMinPriceByPgId(int pgId);

	@Query(value = "SELECT r.price FROM rooms r WHERE r.pg_id = :pgId AND r.sharing_type = 'SINGLE' LIMIT 1", nativeQuery = true)
	public double getSingleSharingPriceByPgId(int pgId);

	@Query(value = "SELECT r.price FROM rooms r WHERE r.pg_id = :pgId AND r.sharing_type = 'DOUBLE' LIMIT 1", nativeQuery = true)
	public double getDoubleSharingPriceByPgId(int pgId);

	@Query(value = "SELECT r.price FROM rooms r WHERE r.pg_id = :pgId AND r.sharing_type = 'TRIPLE' LIMIT 1", nativeQuery = true)
	public double getTripleSharingPriceByPgId(int pgId);

	@Query(value = "SELECT COUNT(*) FROM rooms r WHERE r.pg_id = :pgId AND r.sharing_type = 'SINGLE'", nativeQuery = true)
	public int getNoOfSingleSharingByPgId(int pgId);

	@Query(value = "SELECT COUNT(*) FROM rooms r WHERE r.pg_id = :pgId AND r.sharing_type = 'DOUBLE'", nativeQuery = true)
	public int getNonoOfDoubleSharingByPgId(int pgId);

	@Query(value = "SELECT COUNT(*) FROM rooms r WHERE r.pg_id = :pgId AND r.sharing_type = 'TRIPLE'", nativeQuery = true)
	public int getNoOfTripleSharingByPgId(int pgId);

	@Query(value = "UPDATE Room r SET r.price = ?1 WHERE r.pgId = ?2 AND r.sharingType = 'SINGLE'")
	@Modifying
	public void updateSingleSharingPrice(double newSingleSharingPrice, int pgId);

	@Query(value = "UPDATE Room r SET r.price = ?1 WHERE r.pgId = ?2 AND r.sharingType = 'DOUBLE'")
	@Modifying
	public void updateDoubleSharingPrice(double newDoubleSharingPrice, int pgId);

	@Query(value = "UPDATE Room r SET r.price = ?1 WHERE r.pgId = ?2 AND r.sharingType = 'TRIPLE'")
	@Modifying
	public void updateTripleSharingPrice(double newTripleSharingPrice, int pgId);
}











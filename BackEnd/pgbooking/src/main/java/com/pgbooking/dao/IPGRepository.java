package com.pgbooking.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.pgbooking.entities.PayingGuestHouse;

public interface IPGRepository extends JpaRepository<PayingGuestHouse, Integer> {

	//write custom query to find pg using name/city/locality
	@Query(value = "SELECT pg FROM PayingGuestHouse pg WHERE pg.name = ?1 OR pg.city = ?1 OR pg.locality = ?1")
	List<PayingGuestHouse> getPgByNameOrCityOrLocality(String filter);

	
}

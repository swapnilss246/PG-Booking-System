package com.pgbooking.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pgbooking.entities.Admin;

public interface IAdminRepository extends JpaRepository<Admin, Integer> {

	public Admin findByEmailAndPassword(String email, String password);

}

package com.pgbooking.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pgbooking.entities.Customer;

public interface ICustomerRepository extends JpaRepository<Customer, Integer> {

	Customer getByEmailAndPassword(String email, String password);
}

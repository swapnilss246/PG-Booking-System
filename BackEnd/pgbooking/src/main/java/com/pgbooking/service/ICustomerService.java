package com.pgbooking.service;

import java.util.List;

import com.pgbooking.dto.CustomerDto;

public interface ICustomerService {

	public CustomerDto getCustomerByEmailAndPassword(String email, String password);

	public CustomerDto saveNewCustomer(CustomerDto transientCustomer);

	public CustomerDto updateCustomer(CustomerDto detachedCustomerDto);

	public String removeCustomer(int customerId);

	public List<CustomerDto> getAllCustomers();

	public CustomerDto getCustomerDetailsById(int id);

}

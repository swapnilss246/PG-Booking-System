package com.pgbooking.service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import javax.transaction.Transactional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pgbooking.custom_exceptions.ResourceNotFoundException;
import com.pgbooking.dao.ICustomerRepository;
import com.pgbooking.dto.CustomerDto;
import com.pgbooking.entities.Customer;

@Service
@Transactional
public class CustomerServiceImpl implements ICustomerService {
	@Autowired
	private ICustomerRepository customerRepo;

	@Autowired
	private ModelMapper modelMapper;

	@Override
	public CustomerDto getCustomerByEmailAndPassword(String email, String password) throws ResourceNotFoundException {
		Customer customer = customerRepo.getByEmailAndPassword(email, password);
		if (customer != null) {
			CustomerDto customerDto = modelMapper.map(customer, CustomerDto.class);
			return customerDto;
		} else {
			throw new ResourceNotFoundException("No result for given credentials");
		}
	}

	@Override
	public CustomerDto saveNewCustomer(CustomerDto transientCustomer) {
		Customer customer = modelMapper.map(transientCustomer, Customer.class);
		Customer persistentCustomer = customerRepo.save(customer);
		return modelMapper.map(persistentCustomer, CustomerDto.class);
	}

	@Override
	public CustomerDto updateCustomer(CustomerDto detachedCustomerDto) {
		Customer customer = customerRepo.findById(detachedCustomerDto.getId())
				.orElseThrow(() -> new ResourceNotFoundException("Invalid Customer Id"));

		Customer detachedCustomer = modelMapper.map(detachedCustomerDto, Customer.class);
		detachedCustomer.setPassword(customer.getPassword());
		Customer persistentCustomer = customerRepo.save(detachedCustomer);
		return modelMapper.map(persistentCustomer, CustomerDto.class);

	}

	@Override
	public String removeCustomer(int customerId) {
		String message = "Customer deletion failed!!!...";
		if (customerRepo.existsById(customerId)) {
			customerRepo.deleteById(customerId);
			message = "Customer deleted successfully!!!...";
		}
		return message;
	}

	@Override
	public List<CustomerDto> getAllCustomers() {
		List<CustomerDto> customersDto = new ArrayList<>();
		List<Customer> customers = customerRepo.findAll();
		customersDto = Arrays.asList(modelMapper.map(customers, CustomerDto[].class));
		return customersDto;
	}

	@Override
	public CustomerDto getCustomerDetailsById(int id) {
		Customer customer = customerRepo.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("No Customer Exists with given ID!!!"));
		return modelMapper.map(customer, CustomerDto.class);
	}

}

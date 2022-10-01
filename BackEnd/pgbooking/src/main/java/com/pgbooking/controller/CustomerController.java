package com.pgbooking.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pgbooking.dto.CustomerDto;
import com.pgbooking.dto.LoginDto;
import com.pgbooking.service.ICustomerService;

@RestController
@RequestMapping("/customer")
@CrossOrigin
public class CustomerController {

	@Autowired
	private ICustomerService customerService;

	public CustomerController() {
		System.out.println("In Customer Controller Ctor.....");
	}

//	====================  get customer details by customer Id ==========
	@GetMapping("/{id}")
	public ResponseEntity<?> getCustomerDetailsById(@PathVariable int id) {
		try {
			CustomerDto customerResponse = customerService.getCustomerDetailsById(id);
			return ResponseEntity.ok(customerResponse);
		} catch (RuntimeException e) {
			return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
		}
	}

//	====================  Validate Customer Credentials  ====================
	@PostMapping("/validate")
	public ResponseEntity<?> authenticateCustomer(@RequestBody LoginDto loginDto) {
		try {
			return ResponseEntity
					.ok(customerService.getCustomerByEmailAndPassword(loginDto.getEmail(), loginDto.getPassword()));
		} catch (RuntimeException e) {
			return new ResponseEntity<>(e.getMessage(), HttpStatus.UNAUTHORIZED);
		}
	}

//	===================  Update Customer Details =====================
	@PutMapping()
	public ResponseEntity<?> updateCustomer(@RequestBody CustomerDto customer) {
		try {
			return ResponseEntity.ok(customerService.updateCustomer(customer));
		} catch (RuntimeException e) {
			return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_MODIFIED);
		}
	}

//	====================  Register New Customer  ===========================
	@PostMapping("/register")
	public ResponseEntity<?> Register(@RequestBody CustomerDto transientCustomerDto) {
		try {
			return ResponseEntity.ok(customerService.saveNewCustomer(transientCustomerDto));
		} catch (RuntimeException e) {
			return new ResponseEntity<>(e.getMessage(), HttpStatus.FORBIDDEN);
		}
	}

	@DeleteMapping("/delete/{id}")
	public ResponseEntity<?> removeCustomer(@PathVariable int id) {
		try {
			return ResponseEntity.ok(customerService.removeCustomer(id));
		} catch (RuntimeException e) {
			return new ResponseEntity<>(e.getMessage(), HttpStatus.FORBIDDEN);
		}
	}

	@GetMapping("/getall")
	public ResponseEntity<?> getAllCustomers() {
		try {
			return ResponseEntity.ok(customerService.getAllCustomers());
		} catch (RuntimeException e) {
			return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
		}
	}
}

package com.pgbooking.controller;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pgbooking.dto.AdminDto;
import com.pgbooking.dto.LoginDto;
import com.pgbooking.service.IAdminService;

@RestController
@RequestMapping("/admin")
@CrossOrigin
public class AdminController {

	@Autowired
	private IAdminService adminService;

	public AdminController() {
		System.out.println("In admin Controller Ctor...");
	}

//	======================  Validate Admin Details  =======================
	@PostMapping("/validate")
	public ResponseEntity<?> authenticateAdmin(@RequestBody LoginDto loginDto) {
		try {
			return ResponseEntity
					.ok(adminService.getAdminByEmailAndPassword(loginDto.getEmail(), loginDto.getPassword()));
		} catch (RuntimeException e) {
			return new ResponseEntity<>(e.getMessage(), HttpStatus.UNAUTHORIZED);
		}
	}

//	======================  get admin details by Id =============
	@GetMapping("/{id}")
	public ResponseEntity<?> getAdminDetailsById(@PathVariable int id) {
		try {
			return ResponseEntity.ok(adminService.getAdminById(id));
		} catch (RuntimeException e) {
			return new ResponseEntity<>(e.getMessage(), HttpStatus.UNAUTHORIZED);
		}
	}

//	========================  Update Admin Details  ========================
	@PutMapping()
	public ResponseEntity<?> updateAdmin(@RequestBody @Valid AdminDto detachedAdmin) {

		try {
			AdminDto updated = adminService.updateAdmin(detachedAdmin);
			return ResponseEntity.ok(updated);
		} catch (RuntimeException e) {
			System.out.println(e.getMessage());
			return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_MODIFIED);
		}
	}

//	======================= Register New Admin  ====================
	@PostMapping("/register")
	public ResponseEntity<?> addNewAdmin(@RequestBody @Valid AdminDto transientAdmin) {
		try {
			return new ResponseEntity<>(adminService.saveNewAdmin(transientAdmin), HttpStatus.CREATED);
		} catch (RuntimeException e) {
			return new ResponseEntity<>(e.getMessage(), HttpStatus.FORBIDDEN);
		}
	}

}

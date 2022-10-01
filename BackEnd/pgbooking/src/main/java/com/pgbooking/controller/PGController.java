package com.pgbooking.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.pgbooking.dto.PayingGuestHouseDto;
import com.pgbooking.service.IPGService;

@RequestMapping("/paying_guest_houses")
@RestController
@CrossOrigin
public class PGController {

	@Autowired
	private IPGService pgService;

	public PGController() {
		System.out.println("In PGController ctor....");
	}

//	================ Register new PG (Admin only)  ============================
	@PostMapping("/register")
	public ResponseEntity<?> registerNewPG(PayingGuestHouseDto transientPg) {
		try {
			return ResponseEntity.ok(pgService.addNewPg(transientPg));
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>(e.getMessage(), HttpStatus.FORBIDDEN);
		}
	}

//	=================   update selected PG (Admin only)  ================
	@PutMapping("/update")
	public ResponseEntity<?> updatePG(@RequestBody PayingGuestHouseDto detachedPgDto) {
		try {
			return ResponseEntity.ok(pgService.updatePg(detachedPgDto));
		} catch (Exception e) {
			return new ResponseEntity<>(e.getMessage(), HttpStatus.FORBIDDEN);
		}
	}

//	============  delete selected PG (Admin only)  ========================
	@DeleteMapping("/{id}")
	public ResponseEntity<?> removeSelectedPg(@PathVariable int id) {
		try {
			pgService.removePg(id);
			return ResponseEntity.ok("PG with PG id : " + id + " deleted successfully...");
		} catch (RuntimeException e) {
			return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
		}
	}

//	===========  Find All PGs  ==========================
	@GetMapping("/getall")
	public ResponseEntity<?> getAllPGs() {
		try {
			return ResponseEntity.ok(pgService.getAllPGs());
		} catch (RuntimeException e) {
			e.printStackTrace();
			return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
		}
	}

	// ================ get details of particular PG ================
	@GetMapping("/details/{id}")
	public ResponseEntity<?> getPgDetails(@PathVariable int id) {
		try {
			PayingGuestHouseDto pg = pgService.getPgDetailsById(id);
			return ResponseEntity.ok(pg);
		} catch (RuntimeException e) {
			return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
		}
	}

//	================   Find pg by city/locality/name  =========================
	@GetMapping("/filter/{filter}")
	public ResponseEntity<?> getPgByFilter(@PathVariable String filter) {
		try {
			return ResponseEntity.ok(pgService.getPgByNameOrCityOrLocality(filter));
		} catch (RuntimeException e) {
			return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
		}
	}

//	================  Add PG image  ====================
	@PostMapping("/image/{pgId}")
	ResponseEntity<?> uploadImage(@PathVariable int pgId, @RequestParam MultipartFile imageFile) {
		try {
			System.out.println("In upload image for pgId: " + pgId);
			System.out.println("Uploaded img file name : " + imageFile.getOriginalFilename() + ", Content Type: "
					+ imageFile.getContentType() + ", size: " + imageFile.getSize());
			PayingGuestHouseDto pgDTO = pgService.storeImage(pgId, imageFile);
			return ResponseEntity.ok(pgDTO);
		} catch (Exception e) {
			return new ResponseEntity<>(e.getMessage(), HttpStatus.FORBIDDEN);
		}
	}

//	================  Get PG image  ========================
	@GetMapping(value = "/{pgId}/image", produces = { MediaType.IMAGE_GIF_VALUE, MediaType.IMAGE_JPEG_VALUE,
			MediaType.IMAGE_PNG_VALUE })
	ResponseEntity<?> downloadImage(@PathVariable int pgId) {
		try {
			byte[] image = pgService.restoreImage(pgId);
			return ResponseEntity.ok(image);
		} catch (Exception e) {
			return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
		}
	}

}

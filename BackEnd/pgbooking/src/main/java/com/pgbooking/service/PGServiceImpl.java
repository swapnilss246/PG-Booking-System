package com.pgbooking.service;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import javax.transaction.Transactional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.pgbooking.custom_exceptions.ResourceNotFoundException;
import com.pgbooking.dao.IPGRepository;
import com.pgbooking.dao.IRoomRepository;
import com.pgbooking.dto.PayingGuestHouseDto;
import com.pgbooking.dto.RoomDto;
import com.pgbooking.entities.PayingGuestHouse;

@Service
@Transactional
public class PGServiceImpl implements IPGService {

	@Autowired
	private IPGRepository pgRepo;

	@Autowired
	private IRoomRepository roomRepo;

	@Autowired
	private IRoomService roomService;

	@Autowired
	private IBookingService bookingService;

	@Autowired
	private ModelMapper modelMapper;

	@Value("${file.upload.location}")
	private String baseFolder;

	@Override
	public List<PayingGuestHouseDto> getAllPGs() {
		List<PayingGuestHouseDto> pgsDto = new ArrayList<>();
		List<PayingGuestHouse> pgs = pgRepo.findAll();
		pgsDto = Arrays.asList(modelMapper.map(pgs, PayingGuestHouseDto[].class));
		return pgsDto;
	}

	@Override
	public PayingGuestHouseDto getPgDetailsById(int pgId) throws ResourceNotFoundException {
		bookingService.removeExpiredBookings();
		PayingGuestHouse pg = pgRepo.findById(pgId)
				.orElseThrow(() -> new ResourceNotFoundException("NO RESULTS FOUND FOR GIVEN PG ID!!!"));

		System.out.println("in service layer, pg : " + pg);

		PayingGuestHouseDto pgDto = modelMapper.map(pg, PayingGuestHouseDto.class);

		// find prices of rooms according to sharing type from the available rooms in
		// this PG
		double singleSharingPrice = roomRepo.getSingleSharingPriceByPgId(pgId);
		pgDto.setSingleSharingPrice(singleSharingPrice);
		double doubleSharingPrice = roomRepo.getDoubleSharingPriceByPgId(pgId);
		pgDto.setDoubleSharingPrice(doubleSharingPrice);
		double tripleSharingPrice = roomRepo.getTripleSharingPriceByPgId(pgId);
		pgDto.setTripleSharingPrice(tripleSharingPrice);

		// find no rooms available for each sharing type in this PG
		int noOfSingleSharing = roomRepo.getNoOfSingleSharingByPgId(pgId);
		pgDto.setNoOfSingleSharing(noOfSingleSharing);
		int noOfDoubleSharing = roomRepo.getNonoOfDoubleSharingByPgId(pgId);
		pgDto.setNoOfDoubleSharing(noOfDoubleSharing);
		int noOfTripleSharing = roomRepo.getNoOfTripleSharingByPgId(pgId);
		pgDto.setNoOfTripleSharing(noOfTripleSharing);

		System.out.println("in service layer, pgDto : " + pgDto);
		return pgDto;
	}

	@Override
	public PayingGuestHouseDto updatePg(PayingGuestHouseDto detachedPgDto) throws IOException {
		if (pgRepo.existsById(detachedPgDto.getPgId())) {
			PayingGuestHouse pg = modelMapper.map(detachedPgDto, PayingGuestHouse.class);
			pg.setImagePath(pgRepo.findById(pg.getPgId()).orElseThrow().getImagePath());
			PayingGuestHouse persistentPg = pgRepo.save(pg);

			// set new prices of rooms
			roomRepo.updateSingleSharingPrice(detachedPgDto.getSingleSharingPrice(), pg.getPgId());
			roomRepo.updateDoubleSharingPrice(detachedPgDto.getDoubleSharingPrice(), pg.getPgId());
			roomRepo.updateTripleSharingPrice(detachedPgDto.getTripleSharingPrice(), pg.getPgId());

			return modelMapper.map(persistentPg, PayingGuestHouseDto.class);
		} else {
			throw new ResourceNotFoundException("No PG Details Available for given PG ID!!!");
		}
	}

	@Override
	public PayingGuestHouseDto addNewPg(PayingGuestHouseDto transientPg) throws IOException {
		PayingGuestHouse pg = modelMapper.map(transientPg, PayingGuestHouse.class);
		System.out.println("pg entity before saving :");
		System.out.println(pg);
		PayingGuestHouse persistentPg = pgRepo.save(pg);
		System.out.println("pg entity after saving :");
		System.out.println(persistentPg);
		int pgId = persistentPg.getPgId();
		storeImage(pgId, transientPg.getImage());
		// now store rooms data
		List<RoomDto> roomDetachedDTOs = new ArrayList<RoomDto>();
		// for single sharing
		for (int i = 0; i < transientPg.getNoOfSingleSharing(); i++) {
			roomDetachedDTOs.add(new RoomDto("SINGLE", pgId, transientPg.getSingleSharingPrice(), 1));
		}
		for (int i = 0; i < transientPg.getNoOfDoubleSharing(); i++) {
			roomDetachedDTOs.add(new RoomDto("DOUBLE", pgId, transientPg.getDoubleSharingPrice(), 2));
		}
		for (int i = 0; i < transientPg.getNoOfTripleSharing(); i++) {
			roomDetachedDTOs.add(new RoomDto("TRIPLE", pgId, transientPg.getTripleSharingPrice(), 3));
		}
		roomService.addRoomsToPg(roomDetachedDTOs);

		return modelMapper.map(persistentPg, PayingGuestHouseDto.class);
	}

	@Override
	public String removePg(int pgId) {
		String message = "PG Deletion Failed!!!...";
		if (pgRepo.existsById(pgId)) {
			if (!bookingService.existsByPgId(pgId)) {
				roomService.removeAllRoomsFromPg(pgId);
				pgRepo.deleteById(pgId);
				message = "PG Deleted Successfully!!!...";
			}
		}
		return message;
	}

	@Override
	public List<PayingGuestHouseDto> getPgByNameOrCityOrLocality(String filter) {
		List<PayingGuestHouse> pgs = pgRepo.getPgByNameOrCityOrLocality(filter);
		if (pgs.size() == 0) {
			throw new ResourceNotFoundException("No results for entered Name/City/Locality\nCheck credentials again");
		}
		List<PayingGuestHouseDto> pgsDto = new ArrayList<>();
		pgsDto = Arrays.asList(modelMapper.map(pgs, PayingGuestHouseDto[].class));
		return pgsDto;
	}

	@Override
	public PayingGuestHouseDto storeImage(int pgId, MultipartFile imageFile) throws IOException {
		PayingGuestHouse pg = pgRepo.findById(pgId).orElseThrow(() -> new ResourceNotFoundException("Invalid pgId!!!"));
		String completePath = baseFolder + File.separator + imageFile.getOriginalFilename();
		Files.copy(imageFile.getInputStream(), Paths.get(completePath), StandardCopyOption.REPLACE_EXISTING);
		pg.setImagePath(completePath);
		PayingGuestHouseDto pgDto = modelMapper.map(pg, PayingGuestHouseDto.class);
		return pgDto;
	}

	@Override
	public byte[] restoreImage(int pgId) throws IOException {
		PayingGuestHouse pg = pgRepo.findById(pgId)
				.orElseThrow(() -> new ResourceNotFoundException("No pg available for given pgId!!!"));
		String path = pg.getImagePath();
		byte[] image = Files.readAllBytes(Paths.get(path));
		return image;
	}
}

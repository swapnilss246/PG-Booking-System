package com.pgbooking.service;

import javax.transaction.Transactional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pgbooking.custom_exceptions.ResourceNotFoundException;
import com.pgbooking.dao.IAdminRepository;
import com.pgbooking.dto.AdminDto;
import com.pgbooking.entities.Admin;

@Service
@Transactional
public class AdminServiceImpl implements IAdminService {
	@Autowired
	private IAdminRepository adminRepo;

	@Autowired
	private ModelMapper modelMapper;

	@Override
	public AdminDto getAdminByEmailAndPassword(String email, String password) throws ResourceNotFoundException {
		Admin admin = adminRepo.findByEmailAndPassword(email, password);
		if (admin != null) {
			AdminDto adminDto = modelMapper.map(admin, AdminDto.class);
			return adminDto;
		} else {
			throw new ResourceNotFoundException("Admin Not Found With Given Credentials...!!!");
		}
	}

	@Override
	public AdminDto saveNewAdmin(AdminDto transientAdmin) {
		Admin admin = modelMapper.map(transientAdmin, Admin.class);
		Admin persistentAdmin = adminRepo.save(admin);
		return modelMapper.map(persistentAdmin, AdminDto.class);

	}

	@Override
	public AdminDto updateAdmin(AdminDto detachedAdminDto) {
		Admin detachedAdmin = modelMapper.map(detachedAdminDto, Admin.class);
		Admin admin = adminRepo.findById(detachedAdmin.getAdminId())
				.orElseThrow(() -> new RuntimeException("Error Updating Admin!!!"));
		detachedAdmin.setPassword(admin.getPassword());
		Admin persistentAdmin = adminRepo.save(detachedAdmin);
		return modelMapper.map(persistentAdmin, AdminDto.class);
	}

	@Override
	public AdminDto getAdminById(int id) {
		Admin admin = adminRepo.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Admin Not Found for given Id!!!"));
		return modelMapper.map(admin, AdminDto.class);
	}
}

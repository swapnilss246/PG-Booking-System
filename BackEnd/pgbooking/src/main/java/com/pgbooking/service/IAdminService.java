package com.pgbooking.service;

import com.pgbooking.dto.AdminDto;

public interface IAdminService{
	
	public AdminDto getAdminByEmailAndPassword(String email, String password);
	
	public AdminDto saveNewAdmin(AdminDto transientAdmin);
	
	public AdminDto updateAdmin(AdminDto detachedAdmin);

	public AdminDto getAdminById(int id);
}

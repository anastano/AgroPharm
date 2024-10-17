package com.agropharm.repository;

import com.agropharm.domain.Seller;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SellerRepository extends JpaRepository<Seller, Integer> {
}

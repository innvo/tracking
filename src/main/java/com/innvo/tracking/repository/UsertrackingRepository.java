package com.innvo.tracking.repository;

import com.innvo.tracking.domain.Usertracking;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Usertracking entity.
 */
@SuppressWarnings("unused")
@Repository
public interface UsertrackingRepository extends JpaRepository<Usertracking, Long> {

}

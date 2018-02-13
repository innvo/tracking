package com.innvo.tracking.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.innvo.tracking.domain.Usertracking;

import com.innvo.tracking.repository.UsertrackingRepository;
import com.innvo.tracking.web.rest.errors.BadRequestAlertException;
import com.innvo.tracking.web.rest.util.HeaderUtil;
import com.innvo.tracking.web.rest.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Usertracking.
 */
@RestController
@RequestMapping("/api")
public class UsertrackingResource {

    private final Logger log = LoggerFactory.getLogger(UsertrackingResource.class);

    private static final String ENTITY_NAME = "usertracking";

    private final UsertrackingRepository usertrackingRepository;

    public UsertrackingResource(UsertrackingRepository usertrackingRepository) {
        this.usertrackingRepository = usertrackingRepository;
    }

    /**
     * POST  /usertrackings : Create a new usertracking.
     *
     * @param usertracking the usertracking to create
     * @return the ResponseEntity with status 201 (Created) and with body the new usertracking, or with status 400 (Bad Request) if the usertracking has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/usertrackings")
    @Timed
    public ResponseEntity<Usertracking> createUsertracking(@RequestBody Usertracking usertracking) throws URISyntaxException {
        log.debug("REST request to save Usertracking : {}", usertracking);
        if (usertracking.getId() != null) {
            throw new BadRequestAlertException("A new usertracking cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Usertracking result = usertrackingRepository.save(usertracking);
        return ResponseEntity.created(new URI("/api/usertrackings/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /usertrackings : Updates an existing usertracking.
     *
     * @param usertracking the usertracking to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated usertracking,
     * or with status 400 (Bad Request) if the usertracking is not valid,
     * or with status 500 (Internal Server Error) if the usertracking couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/usertrackings")
    @Timed
    public ResponseEntity<Usertracking> updateUsertracking(@RequestBody Usertracking usertracking) throws URISyntaxException {
        log.debug("REST request to update Usertracking : {}", usertracking);
        if (usertracking.getId() == null) {
            return createUsertracking(usertracking);
        }
        Usertracking result = usertrackingRepository.save(usertracking);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, usertracking.getId().toString()))
            .body(result);
    }

    /**
     * GET  /usertrackings : get all the usertrackings.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of usertrackings in body
     */
    @GetMapping("/usertrackings")
    @Timed
    public ResponseEntity<List<Usertracking>> getAllUsertrackings(Pageable pageable) {
        log.debug("REST request to get a page of Usertrackings");
        Page<Usertracking> page = usertrackingRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/usertrackings");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /usertrackings/:id : get the "id" usertracking.
     *
     * @param id the id of the usertracking to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the usertracking, or with status 404 (Not Found)
     */
    @GetMapping("/usertrackings/{id}")
    @Timed
    public ResponseEntity<Usertracking> getUsertracking(@PathVariable Long id) {
        log.debug("REST request to get Usertracking : {}", id);
        Usertracking usertracking = usertrackingRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(usertracking));
    }

    /**
     * DELETE  /usertrackings/:id : delete the "id" usertracking.
     *
     * @param id the id of the usertracking to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/usertrackings/{id}")
    @Timed
    public ResponseEntity<Void> deleteUsertracking(@PathVariable Long id) {
        log.debug("REST request to delete Usertracking : {}", id);
        usertrackingRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}

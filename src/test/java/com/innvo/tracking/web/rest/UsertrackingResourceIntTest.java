package com.innvo.tracking.web.rest;

import com.innvo.tracking.TrackingApp;

import com.innvo.tracking.domain.Usertracking;
import com.innvo.tracking.repository.UsertrackingRepository;
import com.innvo.tracking.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.time.Instant;
import java.time.ZonedDateTime;
import java.time.ZoneOffset;
import java.time.ZoneId;
import java.util.List;

import static com.innvo.tracking.web.rest.TestUtil.sameInstant;
import static com.innvo.tracking.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the UsertrackingResource REST controller.
 *
 * @see UsertrackingResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = TrackingApp.class)
public class UsertrackingResourceIntTest {

    private static final String DEFAULT_USER = "AAAAAAAAAA";
    private static final String UPDATED_USER = "BBBBBBBBBB";

    private static final String DEFAULT_ROUTE = "AAAAAAAAAA";
    private static final String UPDATED_ROUTE = "BBBBBBBBBB";

    private static final String DEFAULT_RESTCALL = "AAAAAAAAAA";
    private static final String UPDATED_RESTCALL = "BBBBBBBBBB";

    private static final ZonedDateTime DEFAULT_TIMETAMP = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_TIMETAMP = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    @Autowired
    private UsertrackingRepository usertrackingRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restUsertrackingMockMvc;

    private Usertracking usertracking;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final UsertrackingResource usertrackingResource = new UsertrackingResource(usertrackingRepository);
        this.restUsertrackingMockMvc = MockMvcBuilders.standaloneSetup(usertrackingResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Usertracking createEntity(EntityManager em) {
        Usertracking usertracking = new Usertracking()
            .user(DEFAULT_USER)
            .route(DEFAULT_ROUTE)
            .restcall(DEFAULT_RESTCALL)
            .timetamp(DEFAULT_TIMETAMP);
        return usertracking;
    }

    @Before
    public void initTest() {
        usertracking = createEntity(em);
    }

    @Test
    @Transactional
    public void createUsertracking() throws Exception {
        int databaseSizeBeforeCreate = usertrackingRepository.findAll().size();

        // Create the Usertracking
        restUsertrackingMockMvc.perform(post("/api/usertrackings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(usertracking)))
            .andExpect(status().isCreated());

        // Validate the Usertracking in the database
        List<Usertracking> usertrackingList = usertrackingRepository.findAll();
        assertThat(usertrackingList).hasSize(databaseSizeBeforeCreate + 1);
        Usertracking testUsertracking = usertrackingList.get(usertrackingList.size() - 1);
        assertThat(testUsertracking.getUser()).isEqualTo(DEFAULT_USER);
        assertThat(testUsertracking.getRoute()).isEqualTo(DEFAULT_ROUTE);
        assertThat(testUsertracking.getRestcall()).isEqualTo(DEFAULT_RESTCALL);
        assertThat(testUsertracking.getTimetamp()).isEqualTo(DEFAULT_TIMETAMP);
    }

    @Test
    @Transactional
    public void createUsertrackingWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = usertrackingRepository.findAll().size();

        // Create the Usertracking with an existing ID
        usertracking.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restUsertrackingMockMvc.perform(post("/api/usertrackings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(usertracking)))
            .andExpect(status().isBadRequest());

        // Validate the Usertracking in the database
        List<Usertracking> usertrackingList = usertrackingRepository.findAll();
        assertThat(usertrackingList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllUsertrackings() throws Exception {
        // Initialize the database
        usertrackingRepository.saveAndFlush(usertracking);

        // Get all the usertrackingList
        restUsertrackingMockMvc.perform(get("/api/usertrackings?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(usertracking.getId().intValue())))
            .andExpect(jsonPath("$.[*].user").value(hasItem(DEFAULT_USER.toString())))
            .andExpect(jsonPath("$.[*].route").value(hasItem(DEFAULT_ROUTE.toString())))
            .andExpect(jsonPath("$.[*].restcall").value(hasItem(DEFAULT_RESTCALL.toString())))
            .andExpect(jsonPath("$.[*].timetamp").value(hasItem(sameInstant(DEFAULT_TIMETAMP))));
    }

    @Test
    @Transactional
    public void getUsertracking() throws Exception {
        // Initialize the database
        usertrackingRepository.saveAndFlush(usertracking);

        // Get the usertracking
        restUsertrackingMockMvc.perform(get("/api/usertrackings/{id}", usertracking.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(usertracking.getId().intValue()))
            .andExpect(jsonPath("$.user").value(DEFAULT_USER.toString()))
            .andExpect(jsonPath("$.route").value(DEFAULT_ROUTE.toString()))
            .andExpect(jsonPath("$.restcall").value(DEFAULT_RESTCALL.toString()))
            .andExpect(jsonPath("$.timetamp").value(sameInstant(DEFAULT_TIMETAMP)));
    }

    @Test
    @Transactional
    public void getNonExistingUsertracking() throws Exception {
        // Get the usertracking
        restUsertrackingMockMvc.perform(get("/api/usertrackings/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateUsertracking() throws Exception {
        // Initialize the database
        usertrackingRepository.saveAndFlush(usertracking);
        int databaseSizeBeforeUpdate = usertrackingRepository.findAll().size();

        // Update the usertracking
        Usertracking updatedUsertracking = usertrackingRepository.findOne(usertracking.getId());
        // Disconnect from session so that the updates on updatedUsertracking are not directly saved in db
        em.detach(updatedUsertracking);
        updatedUsertracking
            .user(UPDATED_USER)
            .route(UPDATED_ROUTE)
            .restcall(UPDATED_RESTCALL)
            .timetamp(UPDATED_TIMETAMP);

        restUsertrackingMockMvc.perform(put("/api/usertrackings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedUsertracking)))
            .andExpect(status().isOk());

        // Validate the Usertracking in the database
        List<Usertracking> usertrackingList = usertrackingRepository.findAll();
        assertThat(usertrackingList).hasSize(databaseSizeBeforeUpdate);
        Usertracking testUsertracking = usertrackingList.get(usertrackingList.size() - 1);
        assertThat(testUsertracking.getUser()).isEqualTo(UPDATED_USER);
        assertThat(testUsertracking.getRoute()).isEqualTo(UPDATED_ROUTE);
        assertThat(testUsertracking.getRestcall()).isEqualTo(UPDATED_RESTCALL);
        assertThat(testUsertracking.getTimetamp()).isEqualTo(UPDATED_TIMETAMP);
    }

    @Test
    @Transactional
    public void updateNonExistingUsertracking() throws Exception {
        int databaseSizeBeforeUpdate = usertrackingRepository.findAll().size();

        // Create the Usertracking

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restUsertrackingMockMvc.perform(put("/api/usertrackings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(usertracking)))
            .andExpect(status().isCreated());

        // Validate the Usertracking in the database
        List<Usertracking> usertrackingList = usertrackingRepository.findAll();
        assertThat(usertrackingList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteUsertracking() throws Exception {
        // Initialize the database
        usertrackingRepository.saveAndFlush(usertracking);
        int databaseSizeBeforeDelete = usertrackingRepository.findAll().size();

        // Get the usertracking
        restUsertrackingMockMvc.perform(delete("/api/usertrackings/{id}", usertracking.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Usertracking> usertrackingList = usertrackingRepository.findAll();
        assertThat(usertrackingList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Usertracking.class);
        Usertracking usertracking1 = new Usertracking();
        usertracking1.setId(1L);
        Usertracking usertracking2 = new Usertracking();
        usertracking2.setId(usertracking1.getId());
        assertThat(usertracking1).isEqualTo(usertracking2);
        usertracking2.setId(2L);
        assertThat(usertracking1).isNotEqualTo(usertracking2);
        usertracking1.setId(null);
        assertThat(usertracking1).isNotEqualTo(usertracking2);
    }
}

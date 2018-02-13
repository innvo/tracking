package com.innvo.tracking.domain;


import javax.persistence.*;

import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.Objects;

/**
 * A Usertracking.
 */
@Entity
@Table(name = "usertracking")
public class Usertracking implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "jhi_user")
    private String user;

    @Column(name = "route")
    private String route;

    @Column(name = "restcall")
    private String restcall;

    @Column(name = "timetamp")
    private ZonedDateTime timetamp;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUser() {
        return user;
    }

    public Usertracking user(String user) {
        this.user = user;
        return this;
    }

    public void setUser(String user) {
        this.user = user;
    }

    public String getRoute() {
        return route;
    }

    public Usertracking route(String route) {
        this.route = route;
        return this;
    }

    public void setRoute(String route) {
        this.route = route;
    }

    public String getRestcall() {
        return restcall;
    }

    public Usertracking restcall(String restcall) {
        this.restcall = restcall;
        return this;
    }

    public void setRestcall(String restcall) {
        this.restcall = restcall;
    }

    public ZonedDateTime getTimetamp() {
        return timetamp;
    }

    public Usertracking timetamp(ZonedDateTime timetamp) {
        this.timetamp = timetamp;
        return this;
    }

    public void setTimetamp(ZonedDateTime timetamp) {
        this.timetamp = timetamp;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Usertracking usertracking = (Usertracking) o;
        if (usertracking.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), usertracking.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Usertracking{" +
            "id=" + getId() +
            ", user='" + getUser() + "'" +
            ", route='" + getRoute() + "'" +
            ", restcall='" + getRestcall() + "'" +
            ", timetamp='" + getTimetamp() + "'" +
            "}";
    }
}

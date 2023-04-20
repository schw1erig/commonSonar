package org.common.common.repository;

import org.common.common.model.ApplicationUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<ApplicationUser, Integer> {
    public List<ApplicationUser> findAllByUsername(String username);
    public ApplicationUser findByEmail(String email);
    public ApplicationUser findByUsername(String username);

}

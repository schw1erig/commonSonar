package org.common.common.service;

import lombok.extern.slf4j.Slf4j;
import org.common.common.model.ApplicationUser;
import org.common.common.repository.UserRepository;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;
import java.util.UUID;

@Service
@Transactional
@Slf4j
public class UserService {
    UserRepository repo;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository repo, PasswordEncoder passwordEncoder)
    {
        this.repo = repo;
        this.passwordEncoder = passwordEncoder;
    }

    public ApplicationUser getUserById(int id) {return repo.findById(id).get();}

    public List<ApplicationUser> getAllUsers() {return repo.findAll();}

    public ApplicationUser saveUser(ApplicationUser user)
    {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return repo.save(user);
    }

    public ApplicationUser getUser(String username)
    {
        log.info("Fetching user {}", username);
        try {
            return repo.findByUsername(username);
        }
        catch (Exception e) {
            System.out.println(e);
            return null;
        }
    }

    //@Override
    public List<ApplicationUser> getUsers()
    {
        log.info("Fetching all users");
        return repo.findAll();
    }

}


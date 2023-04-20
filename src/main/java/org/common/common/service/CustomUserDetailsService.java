package org.common.common.service;

import org.common.common.repository.UserRepository;
import org.common.common.model.ApplicationUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailsService implements UserDetailsService {
    @Autowired
    UserRepository userRepo;

    @Override
    public UserDetails loadUserByUsername(String loginName) throws UsernameNotFoundException {
        final ApplicationUser userByEmail = userRepo.findByEmail(loginName);

        if (userByEmail == null) {
            final ApplicationUser userByName = userRepo.findByUsername(loginName);
            if(userByName == null) {
                throw new UsernameNotFoundException(loginName);
            }
            return getUserDetails(userByName);
        }
        return getUserDetails(userByEmail);
    }

    private UserDetails getUserDetails(ApplicationUser user) {
        UserDetails userDetails = User.withUsername(user.getUsername())
                .password(user.getPassword())
                .authorities(user.getRole().toString()).build();
        return userDetails;
    }
}
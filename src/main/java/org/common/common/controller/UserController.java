package org.common.common.controller;

import lombok.extern.slf4j.Slf4j;
import org.common.common.model.ApplicationUser;
import org.common.common.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@CrossOrigin("*")
@RequestMapping("/api")
@RestController
@Slf4j
public class UserController
{
    private final UserService userService;

    public UserController(UserService userService)
    {
        this.userService = userService;
    }

    @GetMapping("/users")
    public ResponseEntity<List<ApplicationUser>>getUsers()
    {
        return ResponseEntity.ok().body(userService.getUsers());
    }

    @PostMapping("/user/save")
    public ResponseEntity<ApplicationUser>saveUser(@RequestBody ApplicationUser user)
    {
        URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/api/user/save").toUriString()); //get url
        String registerUsername = user.getUsername();

        if (userService.getUser(registerUsername) == null) {
            user.setRole(ApplicationUser.Role.USER);
            return ResponseEntity.created(uri).body(userService.saveUser(user));
        } else {
            System.out.println("User already exists");
            return ResponseEntity.badRequest().build();
        }
    }

}


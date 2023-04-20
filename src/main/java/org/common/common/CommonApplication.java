package org.common.common;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@SpringBootApplication
public class CommonApplication {

	public static void main(String[] args) {
		SpringApplication.run(CommonApplication.class, args);
	}

	@Bean
	BCryptPasswordEncoder passwordEncoder()
	{
		return new BCryptPasswordEncoder();
	}

	/*
	@Bean
	CommandLineRunner run(UserService userService)
	{
		return args ->
		{
			userService.saveRole(new Role(null,"ROLE_USER"));
			userService.saveRole(new Role(null,"ROLE_ADMIN"));

			userService.saveUser(new User(null, "Darkress", "darkress", "1234", new ArrayList<>()));

			userService.addRoleToUser("darkress", "ROLE_USER");
			userService.addRoleToUser("darkress", "ROLE_ADMIN");
		};
	}
	 */

}

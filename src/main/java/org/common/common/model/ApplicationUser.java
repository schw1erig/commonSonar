package org.common.common.model;

import javax.persistence.*;


@Entity
@Table(name = "users")
public class ApplicationUser {

    public enum Role {
        USER, ADMIN
    }

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "user_id")
    private Integer id;

    @Column(name = "role")
    private ApplicationUser.Role role;

    @Column(name = "username")
    private String username;

    @Column(name = "email", unique = true)
    private String email;

    @Column(name = "password")
    private String password;

    public ApplicationUser(){}


    public ApplicationUser(String username, String email, String password, Role role){

        this.username = username;
        this.email = email;
        this.password = password;
        this.role = role;
    }

    public ApplicationUser(Integer id, String username, String email, String password, Role role){

        this.id = id;
        this.username = username;
        this.email = email;
        this.password = password;
        this.role = role;
    }

    public Integer getId(){return id;}
    public void setId(Integer id){this.id = id;}

    public String getUsername(){return username;}
    public void setUsername(String username){this.username = username;}

    public String getEmail(){return email;}
    public void setEmail(String email){this.email = email;}

    public String getPassword(){return password;}
    public void setPassword(String password){this.password = password;}

    public Role getRole()
    {
        return role;
    }
    public void setRole(Role role)
    {
        this.role = role;
    }
}
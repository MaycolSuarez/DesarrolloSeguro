package com.irojas.demojwt.Controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.irojas.demojwt.User.User;
import com.irojas.demojwt.User.UserService;

import lombok.RequiredArgsConstructor;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class UserController {

    private final UserService usuarioService;

    @PostMapping("/saveUser")
    @CrossOrigin(origins = "*")
    public void save(@RequestBody User usuario) {
        usuarioService.saveUsuario(usuario);
    }

    @GetMapping("/users")
    @CrossOrigin(origins = "*")
    public List<User> findUsuario() {
        return usuarioService.findAllUsuario();
    }

    @GetMapping("/user/{id}")
    @CrossOrigin(origins = "*")
    public User findUsuario(@PathVariable String id) {
        return usuarioService.findUsuario(id).get();
    }

    @GetMapping("/userbyemail/{email}")
    @CrossOrigin(origins = "*")
    public User findUsuarioByEmail(@PathVariable String email) {
        return usuarioService.findUsuarioEmail(email).get();
    }

    @DeleteMapping("/user/{id}")
    @CrossOrigin(origins = "*")
    public void deleteUsuario(@PathVariable String id) {
        usuarioService.deleteUsuario(id);
    }

    @PutMapping("/updateUser")
    @CrossOrigin(origins = "*")
    public void updateUsuario(@RequestBody User usuario) {

        usuarioService.updteUsuario(usuario);
    }
}

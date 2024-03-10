package com.irojas.demojwt.User;

import java.util.List;
import java.util.Optional;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;

    public void updteUsuario(User usuario) {
        if (usuario != null) {
            // Realiza operaciones con el objeto Usuario
            usuarioRepository.save(usuario);
        } else {
            // Maneja el caso en que usuario es nulo
        }
    }

    public void saveUsuario(User usuario) {
        final User user = User.builder()
                .username(usuario.getUsername())
                .password(passwordEncoder.encode(usuario.getPassword()))
                .firstname(usuario.getFirstname())
                .lastname(usuario.lastname)
                .country(usuario.getCountry())
                .role(Role.USER)
                .build();

        usuarioRepository.save(user);
    }

    public List<User> findAllUsuario() {
        return usuarioRepository.findAll();
    }

    public Optional<User> findUsuario(String id) {
        if (id != null) {
            // Realiza operaciones con el objeto Usuario
            return usuarioRepository.findById(id);
        } else {
            // Maneja el caso en que usuario es nulo
            System.err.println("Usuario no encontrado");
            return null;
        }
    }

    public Optional<User> findUsuarioEmail(String email) {
        if (email != null) {
            // Realiza operaciones con el objeto Usuario
            return usuarioRepository.findUsuarioByEmail(email);
        } else {
            // Maneja el caso en que usuario es nulo
            System.err.println("Usuario no encontrado");
            return null;
        }
    }

    public void deleteUsuario(String id) {
        if (id != null) {
            usuarioRepository.deleteById(id);
        } else {
            // Maneja el caso en que usuario es nulo
        }
    }
}

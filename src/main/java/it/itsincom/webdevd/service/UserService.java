package it.itsincom.webdevd.service;

import java.util.ArrayList;
import java.util.List;

import io.quarkus.elytron.security.common.BcryptUtil;
import io.quarkus.panache.common.Sort;
import it.itsincom.webdevd.persistence.UserRepository;
import it.itsincom.webdevd.persistence.model.ApplicationUser;
import it.itsincom.webdevd.web.model.CreateUserRequest;
import it.itsincom.webdevd.web.model.UserResponse;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.WebApplicationException;
@ApplicationScoped
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Transactional
    public UserResponse createUser(CreateUserRequest request) {
        ApplicationUser user = new ApplicationUser(
                request.getUsername(),
                request.getPassword(),
                request.getRole());

        userRepository.persist(user);

        return toUserResponse(user);

    }

    public UserResponse authenticate(String username, String password) {
        ApplicationUser user = userRepository.authenticate(username, password);
        if (user != null) {
            return toUserResponse(user);
        }
        return null;
    }

    public List<UserResponse> findAll() {
        List<ApplicationUser> allUsers = userRepository.findAll(Sort.by("username"))
                .list();
        List<UserResponse> result = new ArrayList<>();
        for (ApplicationUser user : allUsers) {
            result.add(toUserResponse(user));
        }
        return result;
    }

    private static UserResponse toUserResponse(ApplicationUser user) {
        return new UserResponse(
                user.getId(),
                user.getUsername(),
                user.getRole());
    }

    @Transactional
    public UserResponse updateUserDetails(
            String currentUsername,
            Long targetUserId,
            String newUsername,
            String newPassword,
            String newRole) {
        ApplicationUser currentUser = userRepository.findByUsername(currentUsername);
        ApplicationUser targetUser = userRepository.findById(targetUserId);

        if (currentUser == null || targetUser == null) {
            throw new WebApplicationException("Utente non trovato", 404);
        }

        if (!"ADMIN".equals(currentUser.getRole())) {
            throw new WebApplicationException("Accesso negato", 403);
        }

        if ("ADMIN".equals(targetUser.getRole()) && !currentUser.getId().equals(targetUser.getId())) {
            throw new WebApplicationException("Non puoi modificare un altro admin", 403);
        }
        targetUser.setUsername(newUsername);
        targetUser.setPassword(BcryptUtil.bcryptHash(newPassword));
        targetUser.setRole(newRole);
        return toUserResponse(targetUser);
    }

    public UserResponse getUserByUsername(String username) {
        return toUserResponse(userRepository.findByUsername(username));
    }
}

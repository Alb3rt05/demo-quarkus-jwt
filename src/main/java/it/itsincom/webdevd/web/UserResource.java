package it.itsincom.webdevd.web;

import java.util.List;

import it.itsincom.webdevd.persistence.model.ApplicationUser;
import it.itsincom.webdevd.service.UserService;
import it.itsincom.webdevd.web.model.CreateUserRequest;
import it.itsincom.webdevd.web.model.UserResponse;
import jakarta.annotation.security.DenyAll;
import jakarta.annotation.security.PermitAll;
import jakarta.annotation.security.RolesAllowed;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.PUT;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.Context;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.SecurityContext;

@Path("/user")
@DenyAll
public class UserResource {

    private final UserService userService;

    public UserResource(UserService userService) {
        this.userService = userService;
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @RolesAllowed("ADMIN")
    public UserResponse register(CreateUserRequest request) {
        return userService.createUser(request);
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @PermitAll
    public List<UserResponse> findAll() {
        return userService.findAll();
    }

    @PUT
    @Path("/{id}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @RolesAllowed("ADMIN")
    public UserResponse updateUser(@PathParam("id") Long userId, CreateUserRequest request,
            @Context SecurityContext securityContext) {
        String currentUsername = securityContext.getUserPrincipal().getName();
        return userService.updateUserDetails(
                currentUsername,
                userId,
                request.getUsername(),
                request.getPassword(),
                request.getRole().name());
    }

    @PUT
    @Path("/me")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @RolesAllowed("USER")
    public UserResponse updateOwnProfile(CreateUserRequest request, @Context SecurityContext securityContext) {
        String currentUsername = securityContext.getUserPrincipal().getName();
        ApplicationUser currentUser = userService.getEntityByUsername(currentUsername);
        return userService.updateOwnDetails(
            currentUsername,
            currentUser.getId(),
            request.getUsername(),
            request.getPassword()
        );
    }

}

package com.dhandha.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import io.swagger.v3.oas.models.servers.Server;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI dhandhaOpenAPI() {
        return new OpenAPI()
            .info(new Info()
                .title("DHANDHA Marketplace REST API")
                .description("Production-minded cooking industry marketplace backend for India. Kaam bhi. Khana bhi.")
                .version("1.0.0")
                .contact(new Contact()
                    .name("DHANDHA Engineering")
                    .email("api@dhandha.in")
                    .url("https://dhandha.in"))
                .license(new License().name("Proprietary")))
            .servers(List.of(
                new Server().url("http://localhost:8080/api/v1").description("Local Development Server"),
                new Server().url("https://api.dhandha.in/api/v1").description("Production Cloud Server")
            ))
            .addSecurityItem(new SecurityRequirement().addList("BearerAuth"))
            .components(new io.swagger.v3.oas.models.Components()
                .addSecuritySchemes("BearerAuth", new SecurityScheme()
                    .name("BearerAuth")
                    .type(SecurityScheme.Type.HTTP)
                    .scheme("bearer")
                    .bearerFormat("JWT")));
    }
}

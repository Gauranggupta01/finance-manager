package com.anvesh.finance_manager.repository;

import com.anvesh.finance_manager.entity.Category;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CategoryRepository
        extends JpaRepository<Category, Long> {

    List<Category> findByUsernameOrUsername(

            String username,

            String defaultUsername
    );

    boolean existsByNameAndUsername(

            String name,

            String username
    );
}